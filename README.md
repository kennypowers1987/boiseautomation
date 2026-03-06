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
- [ ] **Contact Form Backend:** You can capture form submissions straight to a Google Sheet using Zapier. Create a "Catch Hook" trigger in Zapier, map it to a Google Sheets action, and then paste your Catch Hook URL into the `ZAPIER_WEBHOOK_URL` variable at the bottom of `index.html`. 
- [ ] **Social Links:** Update the `href` attributes in the footer for LinkedIn, GitHub, and Twitter.
- [ ] **Custom Domain Setup:** Once GitHub Pages is active, add your custom domain (e.g., `boiseautomation.com`) in the GitHub Pages settings and configure your DNS records (A/CNAME) with your registrar.
- [ ] **Cloudflare Security:** Set up Cloudflare in front of the site to manage DNS and configure WAF (Web Application Firewall) rules to block or challenge all traffic originating from outside the US.