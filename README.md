# New Level Plumbing website

Production-oriented, static HTML/CSS/vanilla JavaScript site with a Vercel Node 18 lead endpoint. No frontend build step is required.

## Local preview

- Run a static preview with `npx serve .` to browse the pages (the lead API requires Vercel).
- Run `npx vercel dev` to exercise the `/api/lead` function locally.
- Run `npm run check` to check JavaScript syntax.

## Lead delivery setup

1. Copy `.env.example` to `.env.local` for local testing, or enter its variables in Vercel project settings. Never commit actual credentials.
2. Set `RESEND_API_KEY`, `LEAD_TO_EMAIL`, and `LEAD_FROM_EMAIL`. Verify `newlevelplumbingservices.com` in Resend and enable the sender domain before delivery.
3. Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, and `LEAD_TO_PHONE`. Use an active Twilio number and complete the required US A2P 10DLC registration before application-to-person texting.
4. Confirm the recipient inbox exists and that the configured phone numbers accept messages. The API reports a delivery failure only when neither configured delivery channel succeeds.

## Deploy

Install dependencies with `npm install`, connect the repository to Vercel, configure the environment variables for the desired environments, and deploy. Verify the lead function and a real delivery using a controlled test submission. `vercel.json` enables clean URLs. Do not place credentials in source files.

## Content and launch notes

The service-area suggestions are marked for client confirmation in the homepage source. Confirm the recipient email, service area, Resend sender-domain verification, Twilio setup, and permission to publish the supplied review quotes before launch. The supplied logo remains unchanged. Add approved client job photography only when available.

GA4 event hooks (`call_click` and `lead_submit`) are included; add the measurement ID to the marked placeholder in the HTML when provided.
