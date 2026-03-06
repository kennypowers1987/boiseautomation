# Boise Automation

Engineering-led automation and AI integrations based in Boise, Idaho.

## Setup & Local Development

This project is a static HTML/CSS site styled with Tailwind CSS via CDN. No build steps are required.

To run locally, start a static server in the root directory:
```bash
npx http-server -p 8080
```
Then visit `http://localhost:8080` in your browser.

## Deployment & Hosting

This site is structured to be deployed seamlessly using **GitHub Pages**.

### Enable GitHub Pages
1. Go to the [Repository Settings](https://github.com/kennypowers1987/boiseautomation/settings)
2. Click **Pages** in the left sidebar
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** 
   - Folder: **/ (root)**
4. Click **Save**

## TODO / Future Customizations

Before launching or driving traffic to this site, you need to update the following placeholder elements in `index.html`:

- [ ] **Contact Form Embed:** Replace the placeholder text in the "Interactive Scheduling Block" (around line 256) with your actual Calendly or SavvyCal embed code.
- [ ] **Contact Form Backend:** The HTML form uses a honeypot (`bot_field`) to block spam, but the `action="#"` attribute on the `<form>` tag needs to be pointed to a real form processor (like Formspree, Netlify Forms, or a custom webhook) to actually receive emails.
- [ ] **Social Links:** Update the `href` attributes in the footer for LinkedIn, GitHub, and Twitter.
- [ ] **Custom Domain Setup:** Once GitHub Pages is active, add your custom domain (e.g., `boiseautomation.com`) in the GitHub Pages settings and configure your DNS records (A/CNAME) with your registrar.