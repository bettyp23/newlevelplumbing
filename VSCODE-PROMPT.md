# Paste this into Claude Code / Copilot Chat in VS Code

> Put `SITE-SPEC.md` in the project root first, then paste everything below the line.

---

You are building a production website for **New Level Plumbing**, a 24/7 plumber in Miramar, FL. The full spec is in `SITE-SPEC.md` in this folder — read it completely before writing any code and follow it exactly. Below is the summary and the build order.

## Goal
A fast, very informational, conversion-focused plumbing site. Layout and section flow modeled on https://calloasis.com (utility bar → sticky header → hero with dual CTA → service cards → reviews → "what to expect" steps → areas served → why choose us → learning center → FAQ → final CTA → footer). The first impression must be **"Fast, Reliable Service — 24/7."** All business content, the logo and the colors come from https://www.newlevelplumbingservices.com.

## Brand — do not deviate
- Logo: download this exact file to `/assets/logo.png` and use it unchanged (no redraw, no recolor, no text logo):
  `https://d14tal8bchn59o.cloudfront.net/eO091uvCi7C57XUcxNpckI1ulG1AXnOicZxBG0yqwww/w:1920/fn:image/plain/s3://multisiteadmin-production/0ty939znfzj3cx7ija0j0st04vwu`
  If you can't download it, leave `<img src="/assets/logo.png">` and tell me to drop the file in. On navy backgrounds, show it on a white rounded card. Make a favicon from the "NL" pipe mark.
- CSS variables:
  ```css
  --navy:#054795; --blue:#4090CD; --red:#D6000A;
  --ink:#111111; --text:#333333; --bg-alt:#F6F6F8; --border:#EEEEEE; --white:#FFFFFF;
  ```
  Red is ONLY for call/booking buttons. Navy for nav, footer, headings, bands. Blue for icons, links, accents.
- Fonts: Roboto Condensed 700 (headings), Open Sans 400/600 (body), from Google Fonts with `display=swap`.

## Business facts (use exactly)
- Phone **(954) 860-9927** → `tel:+19548609927` everywhere, click-to-call
- Open **Monday–Sunday, 24 hours**
- Miramar, FL — serving South Florida
- BBB Accredited • Licensed & Insured • 25+ years • **5.0★ on Google (164 reviews)**
- Owner/plumber: Brent Chambers
- Promo: **Free Water Heater Drain with Service**
- Services: Leak Detection, Drain Cleaning, Pipe Repairs, Water Heater Installation, Emergency Plumbing, Preventative Maintenance (use the card copy in the spec)

## Main booking = lead "survey" form
Fields: **Name, Phone number, Email, What do you need?** (all required) + optional service-type chips + hidden honeypot. Red "SEND REQUEST" button. Put it in the hero (right column on desktop, under the hero on mobile), on `/contact.html`, and make every "Book / Request Service" button scroll to it.

On submit → `fetch('/api/lead', {method:'POST', body: JSON})` → Vercel serverless function `api/lead.js` (Node 18+, no framework) that:
1. Validates input + rejects if honeypot filled; basic rate limit by IP.
2. Sends an **email** to `process.env.LEAD_TO_EMAIL` (info@newlevelplumbingservices.com) using **Resend** (`resend` npm package). Subject `New Service Request — {name}`, `reply_to` = customer email, nicely formatted HTML with a tap-to-call link.
3. Sends an **SMS** to `process.env.LEAD_TO_PHONE` (+19548609927) using **Twilio** (`twilio` npm package): `New Level lead: {name} {phone} — {need, max 120 chars}`.
4. Runs email and SMS with `Promise.allSettled` so one failing never loses the lead; returns 200 if at least one succeeded, 500 otherwise.
5. Front end: inline validation, phone auto-format, loading state, redirect to `/thank-you.html?name=…` on success, inline error with call button on failure.

Create `.env.example` with: `RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, LEAD_TO_PHONE`. Never hard-code secrets.

## Tech
- Plain HTML + one `styles.css` + one `main.js` (no framework, no build step), plus `api/lead.js` and `package.json` for the function. Deploy target: Vercel (add `vercel.json` with clean URLs).
- Mobile-first, Lighthouse 90+ on all four scores. Lazy-load below-fold images, explicit width/height, preload logo + hero image, WebP.
- Sticky header; mobile hamburger; **fixed bottom bar on mobile with Call (red) + Book (navy)**.
- Accessible: labels, focus rings, keyboard-friendly menu/carousel/accordion, 4.5:1 contrast.
- SEO: per-page title + meta description, Open Graph, `Plumber` JSON-LD (phone, 24/7 hours, areaServed, aggregateRating 5.0/164), `sitemap.xml`, `robots.txt`.
- GA4 placeholders firing `call_click` and `lead_submit` events.
- Subtle scroll-in animations only (respect `prefers-reduced-motion`).

## File structure
```
/index.html
/services/{leak-detection,drain-cleaning,pipe-repairs,water-heater-installation,emergency-plumbing,preventative-maintenance}.html
/about.html  /reviews.html  /contact.html  /thank-you.html  /privacy.html
/assets/logo.png  /assets/img/…  /assets/icons/…
/styles.css  /main.js
/api/lead.js  /package.json  /vercel.json  /.env.example
/sitemap.xml  /robots.txt  /README.md
```

## Content rules
- Use the real copy from the spec. Service pages: write ~500–700 words of original, helpful copy each (signs you need it, how we do it, why choose us, FAQ, CTA + form).
- Reviews: use only the real Google reviews quoted in the spec (exact wording, first name + last initial) and link to the Google profile. Don't invent reviews or stats.
- Learning Center: 3 original articles from the spec titles.
- Mark the service-area city list with an HTML comment `<!-- CONFIRM WITH CLIENT -->`.

## Build order
1. Scaffold files, CSS variables, fonts, header/footer partial markup (repeat in each page).
2. Home page, all sections in spec order.
3. Lead form front end + `api/lead.js` + `.env.example`.
4. Service pages, About, Reviews, Contact, Thank-you, Privacy.
5. SEO files, JSON-LD, GA4 placeholders.
6. `README.md`: local dev (`npx vercel dev`), how to set env vars, Resend domain verification, Twilio number + A2P 10DLC registration, deploy steps.
7. Final pass: test the form end-to-end with `vercel dev`, check mobile at 375px, run Lighthouse, fix issues.

Ask me before changing any brand color, the logo, or business facts.
