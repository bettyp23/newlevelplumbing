(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const setMenuOpen = open => {
    if (!menuButton || !nav) return;
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = open ? '✕' : '☰';
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => setMenuOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      document.querySelectorAll('.dropdown.open').forEach(dropdown => {
        dropdown.classList.remove('open');
        dropdown.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
  document.querySelectorAll('.dropdown-toggle').forEach(button => button.addEventListener('click', () => {
    const dropdown = button.closest('.dropdown');
    const open = dropdown.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  }));
  document.querySelectorAll('a[href^="tel:"]').forEach(link => link.addEventListener('click', () => {
    if (typeof window.gtag === 'function') window.gtag('event', 'call_click', {event_category: 'engagement'});
  }));
  const cards = [...document.querySelectorAll('.review-card')];
  let reviewStart = 0;
  const updateReviews = () => {
    const compact = window.matchMedia('(max-width: 860px)').matches;
    cards.forEach((card, index) => { card.hidden = compact && index !== reviewStart; });
  };
  document.querySelectorAll('[data-review-shift]').forEach(button => button.addEventListener('click', () => {
    reviewStart = (reviewStart + Number(button.dataset.reviewShift) + cards.length) % cards.length;
    updateReviews();
  }));
  window.addEventListener('resize', updateReviews);
  updateReviews();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold: 0.12});
    document.querySelectorAll('.animate-in').forEach(element => observer.observe(element));
  } else document.querySelectorAll('.animate-in').forEach(element => element.classList.add('is-visible'));
  document.querySelectorAll('.lead-form').forEach(form => {
    const phone = form.querySelector('[name="phone"]');
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');
    if (phone) phone.addEventListener('input', () => {
      const digits = phone.value.replace(/\D/g, '').slice(0, 10);
      if (digits.length >= 7) phone.value = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      else if (digits.length >= 4) phone.value = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      else if (digits.length) phone.value = `(${digits}`;
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      status.classList.remove('error'); status.textContent = '';
      if (!form.reportValidity()) return;
      if (phone.value.replace(/\D/g, '').length !== 10) {
        phone.setCustomValidity('Enter a 10-digit phone number.'); phone.reportValidity(); phone.setCustomValidity(''); return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      const selected = [...form.querySelectorAll('[name="serviceType"]:checked')].map(input => input.value);
      if (selected.length) data.need = `Service type: ${selected.join(', ')}\n\n${data.need}`;
      data.pageUrl = window.location.href;
      submit.disabled = true; submit.textContent = 'SENDING…'; status.textContent = 'Sending your request securely…';
      try {
        const response = await fetch('/api/lead', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'We could not send your request. Please call us.');
        if (typeof window.gtag === 'function') window.gtag('event', 'lead_submit', {event_category: 'lead', event_label: location.pathname});
        window.location.href = `/thank-you.html?name=${encodeURIComponent(data.name.trim())}`;
      } catch (error) {
        status.classList.add('error');
        status.replaceChildren(document.createTextNode(`${error.message} `));
        const callLink = document.createElement('a');
        callLink.href = 'tel:+19548609927';
        callLink.textContent = 'Call (954) 860-9927';
        status.append(callLink, document.createTextNode('.'));
        submit.disabled = false; submit.textContent = 'SEND REQUEST';
      }
    });
  });
  const customerName = new URLSearchParams(location.search).get('name');
  const thankYouName = document.querySelector('[data-customer-name]');
  if (customerName && thankYouName) thankYouName.textContent = customerName;
})();
