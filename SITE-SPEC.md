# New Level Plumbing — Website Rebuild Spec

Layout reference: https://calloasis.com (Oasis Plumbing)
Content, logo & colors: https://www.newlevelplumbingservices.com
Headline promise: **Fast, Reliable Plumbing Service — 24/7 in Miramar & South Florida**

---

## 1. Business info (use exactly)

| Field | Value |
|---|---|
| Business name | New Level Plumbing |
| Owner / lead plumber | Brent Chambers |
| Location | Miramar, FL (Broward County) — "Serving South Florida" |
| Phone | (954) 860-9927 — `tel:+19548609927` |
| Email (form recipient) | info@newlevelplumbingservices.com ⚠️ confirm spelling — see note at bottom |
| Hours | Monday – Sunday: Open 24 hours |
| Credentials | BBB Accredited • Licensed & Insured • 25+ years experience |
| Google rating | 5.0 ★ (164 reviews) |
| Current promo | Free Water Heater Drain with Service |
| Domain | newlevelplumbingservices.com |

---

## 2. Brand

### Logo
- Source file (download and save as `/assets/logo.png`):
  `https://d14tal8bchn59o.cloudfront.net/eO091uvCi7C57XUcxNpckI1ulG1AXnOicZxBG0yqwww/w:1920/fn:image/plain/s3://multisiteadmin-production/0ty939znfzj3cx7ija0j0st04vwu`
- Native size 1191 × 453 (wide/horizontal).
- Description: black 3D pipe forming the letters "NL" with a blue water drop dripping from the bottom; "NEW LEVEL" in bold black condensed type; "PLUMBING" in spaced navy caps between two thin lines.
- Use the file as-is. Do not redraw, recolor or re-type it. On dark backgrounds, place it on a white pill/card (the logo is black and will disappear on navy).
- Favicon: crop the "NL" pipe mark from the logo.

### Colors (pulled from the live site's CSS)
| Role | Hex | Where |
|---|---|---|
| Navy (primary) | `#054795` | Nav bar, footer, headings, section bands |
| Sky Blue (secondary) | `#4090CD` | Links, icons, accents, hover states, trust badges |
| Emergency Red (CTA) | `#D6000A` | "Request Service" / "Call Now" buttons only |
| Ink | `#111111` | Dark text, logo-matched black |
| Body text | `#333333` | Paragraphs |
| Light gray bg | `#F6F6F8` | Alternating sections |
| Border gray | `#EEEEEE` | Cards, dividers |
| White | `#FFFFFF` | Cards, form |

### Type
- Headings: **Roboto Condensed** (700) — matches the logo's condensed caps.
- Body: **Open Sans** (400/600).
- Load from Google Fonts with `display=swap`.

---

## 3. Site map (single-page home + service pages)

Modeled on Call Oasis: utility bar → sticky header → hero with dual CTA + photo → service cards → reviews → "what to expect" steps → service areas → why choose us → learning center → final CTA → footer.

```
/                     Home (everything below)
/services/leak-detection.html
/services/drain-cleaning.html
/services/pipe-repairs.html
/services/water-heater-installation.html
/services/emergency-plumbing.html
/services/preventative-maintenance.html
/about.html
/reviews.html
/contact.html         (same lead form)
/privacy.html
/thank-you.html       (form success page)
```

---

## 4. Home page sections

### 4.1 Top utility bar (navy `#054795`, white text)
- Left: 📍 "Proudly serving Miramar, Broward & South Florida"
- Right: ☎ "24/7 — Call Today **(954) 860-9927**" (click-to-call)

### 4.2 Sticky header (white)
- Logo left. Nav: Home · Services (dropdown of 6) · Reviews · About · Contact.
- Right: red **CALL NOW** button + navy outline **BOOK SERVICE** button (scrolls to form).
- Mobile: hamburger + always-visible red phone icon.

### 4.3 Hero — "Fast. Reliable. 24/7."
- Eyebrow (spaced caps, blue): `MIRAMAR PLUMBERS — SERVING SOUTH FLORIDA 24/7`
- H1: **Fast, Reliable Plumbing & Heating Solutions in Miramar, FL**
- Sub: "At New Level Plumbing, we deliver swift, expert plumbing solutions tailored to your Miramar home or business. Licensed, insured and BBB Accredited — with 25+ years of experience."
- Buttons: red **CALL (954) 860-9927** · navy **REQUEST SERVICE** (scroll to form)
- Right side on desktop: **the lead form card** (section 5) so booking is above the fold. On mobile the form sits directly under the hero.
- Trust strip under hero (4 badges, blue icons): ⏱ Fast Response · 🕒 Open 24/7 · 🛡 Licensed & Insured · ⭐ 5.0 on Google (164 reviews) · BBB Accredited
- Promo ribbon: "🔥 Free Water Heater Drain with Service"

### 4.4 Services grid (6 cards, light gray bg)
H2: **Professional Plumbing Services near Miramar**

| Service | Card text |
|---|---|
| Leak Detection | Expert leak detection services to swiftly identify and repair hidden water leaks, ensuring minimal disruption and water conservation. |
| Drain Cleaning | Comprehensive drain cleaning to clear blockages and maintain clean and efficient plumbing systems. |
| Pipe Repairs | Quick and reliable pipe repair services to restore the integrity of your plumbing system and prevent future issues. |
| Water Heater Installation | Efficient installation of high-quality water heaters, ensuring you have hot water when you need it without fail. |
| Emergency Plumbing | 24/7 emergency plumbing services to address sudden and urgent plumbing issues promptly. |
| Preventative Maintenance | Routine preventative maintenance to keep your plumbing systems in optimal condition, preventing costly emergencies. |

Each card: blue line icon, title, text, "Learn More →" to its service page.

### 4.5 Reviews — "Not convinced? See why Miramar trusts New Level"
- Big "5.0 ★★★★★ — 164 Google Reviews" + "Read all reviews on Google" button.
- Carousel of real Google reviews (keep wording exactly, first name + last initial, link to Google). Examples from the live site:
  - Wanda G. — "Brent is an awesome man. He is knowledgeable, forthright, and dependable. His prices are reasonable."
  - Yorman S. — "He was very professional and actually had dates available and he kept his commitment."
  - Kat C. — "Brent was quick to return our call and was able to come fix our outdoor spigot the next day."
  - Esther B. — "Great job, fast and reasonable pricing."
  - Julia G. — "Excellent job, he came on time. I felt confident that we were in good hands."
- Preferred: embed a live Google reviews widget so the list stays current; otherwise use only reviews copied from the Google profile.

### 4.6 What to expect (4 steps, navy band)
1. **Tell us what you need** — fill out the form or call 24/7.
2. **Fast callback** — we confirm details and give you a time.
3. **On-time arrival** — a licensed plumber shows up ready to work.
4. **Fixed right** — quality materials, clean work area, satisfaction guaranteed.

### 4.7 Why choose New Level Plumbing (6 items, from live site)
- **Certified Professionals** — Each team member is thoroughly trained and certified.
- **Fast Response Times** — We understand the urgency of plumbing problems.
- **Licensed & Insured** — For the safety of our customers and employees.
- **Affordable Pricing** — Competitive pricing without compromising on quality.
- **Quality Materials** — Durable, long-lasting repairs and installations.
- **Customer Satisfaction** — Dedicated to exceeding expectations.

### 4.8 Areas served
Map embed centered on Miramar, FL + city chips. ⚠️ Confirm the list with the client before launch. Suggested: Miramar, Pembroke Pines, Hollywood, Davie, Weston, Cooper City, Southwest Ranches, Fort Lauderdale, Miami Gardens.

### 4.9 Learning Center (informational / SEO)
3 article cards (write original content, ~600–900 words each, each ending with a CTA):
- "5 Signs You Have a Hidden Water Leak in Your South Florida Home"
- "Tank vs. Tankless Water Heaters: Which Is Right for Your Home?"
- "What to Do in a Plumbing Emergency Before the Plumber Arrives"

### 4.10 FAQ (accordion, adds information + SEO)
- Do you offer 24/7 emergency service? — Yes, Monday–Sunday, 24 hours.
- Are you licensed and insured? — Yes, and BBB Accredited.
- What areas do you serve? — Miramar and South Florida (list).
- How fast can you get here? — We prioritize fast response; call for emergencies.
- Do you work on homes and businesses? — Yes, residential and commercial.
- Do you offer any specials? — Free water heater drain with service.

### 4.11 Final CTA band (red `#D6000A` or navy)
"Plumbing problem? Get fast, reliable help now." → Call button + "Book Online" button.

### 4.12 Footer (navy)
Logo (on white card) · short About blurb ("New Level Plumbing is your trusted local plumber in Miramar, FL, offering a wide range of plumbing services for both homes and businesses. With over 25 years of expertise…") · contact info · hours · service links · BBB badge · Privacy Policy · © 2026 New Level Plumbing.

Mobile only: a fixed bottom bar with two buttons — **Call** (red) and **Book** (navy).

---

## 5. Main booking — the "survey" lead form

The main way to book. Appears in the hero, on /contact, and is the target of every "Book / Request Service" button.

**Title:** "Request Fast Service" · **Subtitle:** "Tell us what's going on — we'll get right back to you."

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text | ✅ | autocomplete="name" |
| Phone number | tel | ✅ | auto-format (954) 555-1234; validate 10 digits |
| Email | email | ✅ | validate format |
| What do you need? | textarea | ✅ | placeholder: "e.g. Leaking water heater, clogged kitchen drain…" |
| (optional) Service type | quick-pick chips | ❌ | Leak · Drain · Pipe · Water Heater · Emergency · Maintenance · Other — prepends to message |
| Honeypot | hidden text | — | spam trap, must be empty |

Button: red **SEND REQUEST**. Under button: "Prefer to talk? Call (954) 860-9927 — 24/7."

### What happens on submit
1. Front end validates, disables button, shows spinner.
2. POST JSON to `/api/lead` (Vercel serverless function).
3. Function sends:
   - **Email** to `info@newlevelplumbingservices.com` via **Resend** — subject `New Service Request — {name}`, with name, phone (tap-to-call), email (reply-to = customer), message, time submitted, page URL.
   - **Text message** to **(954) 860-9927** via **Twilio** — `New Level lead: {name} {phone} — {first 120 chars of need}`.
   - Optional: confirmation email to the customer.
4. Success → redirect to `/thank-you.html` ("Thanks {name}! We'll call you shortly. Emergency? Call (954) 860-9927").
5. Failure → inline error + call button. Never lose the lead: if SMS fails, still send email (and vice versa).

### Environment variables (Vercel → Settings → Environment Variables)
```
RESEND_API_KEY=
LEAD_TO_EMAIL=info@newlevelplumbingservices.com
LEAD_FROM_EMAIL=leads@newlevelplumbingservices.com   # domain must be verified in Resend
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=+1XXXXXXXXXX                       # Twilio number
LEAD_TO_PHONE=+19548609927
```
Notes: Twilio needs A2P 10DLC registration for US business texting (can take a few days). No-code fallback: Formspree/Web3Forms for email + Zapier/Make for SMS.

---

## 6. Technical requirements
- Static HTML/CSS/vanilla JS + one serverless function. Deploy on Vercel.
- Mobile-first, fast: Lighthouse 90+; WebP images, lazy-load below fold, `width/height` on images, preload logo + hero.
- SEO: unique title/meta per page (e.g. "Plumber in Miramar, FL | 24/7 Fast & Reliable | New Level Plumbing"), Open Graph tags, `LocalBusiness`/`Plumber` JSON-LD (name, phone, hours 24/7, area served, aggregateRating 5.0/164), sitemap.xml, robots.txt.
- Accessibility: labels on every field, focus states, 4.5:1 contrast, keyboard nav for menu & carousel.
- Analytics: GA4 events for `call_click` and `lead_submit`.
- Images: use the client's own job photos where possible; licensed stock otherwise.

---

## ⚠️ Confirm before launch
1. **Email spelling** — the request said `info@newlevelplumingservices.com` (missing the "b"). The domain is `newlevelplumbingservices.com`, so this spec uses `info@newlevelplumbingservices.com`. Confirm that inbox exists.
2. Service-area city list.
3. Twilio number + Resend sending domain set up by the owner.
4. Permission to reuse the logo/photos and review quotes (client's own assets — fine if they're the client).
