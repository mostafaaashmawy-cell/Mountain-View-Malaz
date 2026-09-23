# Mountain View Luxury Collection — properties-e

An elevated, high-conversion luxury real estate landing page presenting Mountain View developments across New Cairo and Mostakbal City, built for **properties-e**.

## Features

- **Luxury Aesthetic**: Deep midnight obsidian ambiance with champagne gold accents, balanced editorial typography (`Cormorant Garamond` & `Plus Jakarta Sans`), and glassmorphism.
- **Original Assets**: Includes all original Mountain View project logos, master badge, and architectural renderings.
- **Lead Generation Form**: Connected to Zapier Webhook (`POST`) with input validation, Egyptian phone formatting, project interest selector, loading state, and luxury confirmation modal.
- **Direct WhatsApp Conversion**: 
  - Floating WhatsApp action button linked to `01033373331`.
  - Dedicated WhatsApp consultation CTAs for each specific project with prefilled messages.
- **Mandatory Disclaimers**: Placed directly under the registration form and at the bottom of the page before the footer.
- **Legal Compliance**: Full matching Terms & Conditions (`terms-conditions.html`) and Privacy Policy (`privacy-policy.html`) customized for properties-e.

## Portfolio Featured

1. **Mountain View 1.1** (New Cairo) — Fully Finished, Starting 14,500,000 EGP, 10% Down payment, 7 Years.
2. **Mountain View iCity** (New Cairo) — 4D Living, Starting 15,000,000 EGP, 5% Down payment, 8 Years.
3. **Mountain View Hyde Park** (New Cairo) — 200 Acres, Starting 28,000,000 EGP, 15% Down payment, 7 Years.
4. **ALIVA** (Mostakbal City) — Experiential City, Starting 12,000,000 EGP, 5% Down payment, 12 Years.
5. **Mountain View Grand Valleys** (New Cairo) — Valleys & Topography, Starting 30,400,000 EGP, 5% Down payment, 10 Years.

## Configuration

### Zapier Webhook Setup
To connect your live Zapier webhook:
1. Open `js/app.js`.
2. Locate line 10:
   ```javascript
   const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/XXXXXX/YYYYYY/';
   ```
3. Replace the placeholder URL with your Catch Hook endpoint from Zapier.

## Contact

- **Consultancy**: properties-e
- **WhatsApp**: 01033373331 (`+201033373331`)
- **Address**: New Cairo S5-3, Second District, Fifth Settlement, Cairo, Egypt
