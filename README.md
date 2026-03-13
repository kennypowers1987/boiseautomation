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

This site is structured to be deployed using **Cloudflare Pages**. This allows us to use a serverless function to securely hide your Google Apps Script Webhook URL from bots, while taking advantage of Cloudflare's built-in bot protection.

### How to Deploy
1. Create a free account on [Cloudflare](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** in the left sidebar.
3. Click **Create Application** -> **Pages** -> **Connect to Git**.
4. Select this GitHub repository (`boiseautomation`).
5. In the build settings, leave the build command and build directory blank (the root folder is correct).
6. Click **Save and Deploy**.

### Securing the Form (Google Sheets & SendGrid Auto-Reply)
The form submits to a secure Cloudflare Function (`/functions/api/submit.js`), which acts as a proxy to a Google Apps Script (to log to Google Sheets) and triggers a branded SendGrid auto-reply.

#### Step 1: Set up Google Sheets (No Zapier required)
1. Create a new Google Sheet.
2. Click **Extensions > Apps Script**.
3. Copy the entire contents of `google-apps-script.js` from this repository and paste it into the editor.
4. Click **Deploy > New deployment**. Select **Web app**.
5. Set "Execute as" to **Me** and "Who has access" to **Anyone**.
6. Click **Deploy** and copy the **Web app URL**.

#### Step 2: Configure Cloudflare & SendGrid
1. Go to **SendGrid** and generate a new API key with Mail Send permissions. Ensure you have a verified Sender Identity.
2. Go to your Cloudflare Pages project settings: **Settings** -> **Environment variables**.
3. Add the following variables:
   * **`GOOGLE_SCRIPT_URL`**: *(Paste your Google Apps Script Web app URL here)*
   * **`SENDGRID_API_KEY`**: *(Paste your SendGrid API key here)*
   * **`SENDGRID_FROM_EMAIL`**: *(Paste your verified SendGrid email here, e.g., hello@boiseautomation.com)*
4. Click **Save** and trigger a new deployment in Cloudflare so the variables take effect.

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

- [ ] **Custom Domain Setup:** Add your custom domain (e.g., `boiseautomation.com`) in Cloudflare Pages and update your DNS records. 
