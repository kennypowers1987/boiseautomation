# Boise Automation

Engineering-led automation and AI integrations based in Boise, Idaho.

## Setup & Local Development

This project is a static HTML/CSS site styled with Tailwind CSS via CDN. No build steps are required.

To run locally, start a static server in the root directory:
```bash
npx http-server -p 8080
```
Then visit `http://localhost:8080` in your browser.

*(Note: If you want to test the Cloudflare form submission function locally, you will need to use the `wrangler` CLI from Cloudflare instead of `http-server`.)*

## Deployment & Hosting (Cloudflare Pages)

This site is structured to be deployed using **Cloudflare Pages**. This allows us to use a serverless function to securely hide your Zapier Webhook URL from bots, while taking advantage of Cloudflare's built-in bot protection.

### How to Deploy
1. Create a free account on [Cloudflare](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** in the left sidebar.
3. Click **Create Application** -> **Pages** -> **Connect to Git**.
4. Select this GitHub repository (`boiseautomation`).
5. In the build settings, leave the build command and build directory blank (the root folder is correct).
6. Click **Save and Deploy**.

### Securing the Form (Zapier integration)
The form submits to a secure Cloudflare Function (`/functions/api/submit.js`), which acts as a proxy to Zapier. 

1. Go to **Zapier** and create a new **"Webhooks by Zapier"** trigger.
2. Select **"Catch Hook"** and copy the generated Webhook URL.
3. Go back to your Cloudflare Pages project settings: **Settings** -> **Environment variables**.
4. Add a new variable:
   * **Variable name:** `ZAPIER_WEBHOOK_URL`
   * **Value:** *(Paste your Zapier webhook URL here)*
5. Click **Save** and trigger a new deployment in Cloudflare so the variable takes effect.

### Cloudflare Security (Blocking Bots/Spam)
Once your site is running through Cloudflare, enable bot protection:
1. Go to your Cloudflare dashboard and click your domain.
2. Navigate to **Security** -> **WAF** -> **Custom rules**.
3. Create a rule to block or challenge traffic:
   * Field: `Country`
   * Operator: `does not equal`
   * Value: `United States`
   * Action: `Block` (or `Managed Challenge`)

## TODO / Future Customizations

Before launching or driving traffic to this site, you need to update the following placeholder elements in `index.html`:

- [ ] **Contact Form Embed:** Replace the placeholder text in the "Interactive Scheduling Block" (around line 256) with your actual Calendly or SavvyCal embed code.
- [ ] **Social Links:** Update the `href` attribute in the footer for LinkedIn.
- [ ] **Custom Domain Setup:** Add your custom domain (e.g., `boiseautomation.com`) in Cloudflare Pages and update your DNS records.