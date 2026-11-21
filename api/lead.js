const {Resend} = require('resend');
const twilio = require('twilio');

const requests = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter(time => now - time < WINDOW_MS);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({error: 'Method not allowed.'});
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return res.status(429).json({error: 'Too many requests. Please call us instead.'});

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({error: 'Invalid request.'});
  if (typeof body.website === 'string' && body.website.trim()) return res.status(400).json({error: 'Invalid request.'});

  const name = typeof body.name === 'string' ? body.name.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 120) : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : '';
  const phoneDigits = phone.replace(/\D/g, '');
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '';
  const need = typeof body.need === 'string' ? body.need.trim().slice(0, 3000) : '';
  const pageUrl = typeof body.pageUrl === 'string' ? body.pageUrl.slice(0, 1000) : '';
  if (!name || !/^\d{10}$/.test(phoneDigits) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !need) {
    return res.status(400).json({error: 'Please provide a name, valid 10-digit phone, email, and service details.'});
  }

  const emailReady = process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL;
  const smsReady = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER && process.env.LEAD_TO_PHONE;
  if (!emailReady && !smsReady) return res.status(500).json({error: 'Lead delivery is not configured. Please call us.'});

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeNeed = escapeHtml(need).replace(/\n/g, '<br>');
  const safeUrl = escapeHtml(pageUrl);
  const jobs = [];

  if (emailReady) {
    jobs.push({channel: 'email', send: () => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      return resend.emails.send({
        from: process.env.LEAD_FROM_EMAIL,
        to: [process.env.LEAD_TO_EMAIL],
        replyTo: email,
        subject: `New Service Request — ${name}`,
        html: `<h1>New service request</h1><p><strong>Name:</strong> ${safeName}</p><p><strong>Phone:</strong> <a href="tel:+1${phoneDigits}">${safePhone}</a></p><p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p><p><strong>What they need:</strong><br>${safeNeed}</p><p><strong>Submitted:</strong> ${new Date().toISOString()}</p><p><strong>Page:</strong> ${safeUrl}</p>`
      });
    }});
  }

  if (smsReady) {
    jobs.push({channel: 'SMS', send: () => {
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      return client.messages.create({
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.LEAD_TO_PHONE,
        body: `New Level lead: ${name} ${phone} — ${need.slice(0, 120)}`
      });
    }});
  }

  const results = await Promise.allSettled(jobs.map(job => Promise.resolve().then(job.send)));
  const failed = results.flatMap((result, index) => {
    if (result.status === 'rejected') return [`${jobs[index].channel}: ${result.reason?.message || 'Unknown delivery error'}`];
    if (result.value?.error) return [`${jobs[index].channel}: ${result.value.error.message || 'Provider rejected delivery'}`];
    return [];
  });
  if (failed.length) console.error('Lead delivery failure:', failed);

  const delivered = results.some(result => result.status === 'fulfilled' && !(result.value && result.value.error));
  if (delivered) return res.status(200).json({ok: true});
  return res.status(500).json({error: 'We could not send your request. Please call us at (954) 860-9927.'});
};
