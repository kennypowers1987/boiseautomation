import { getEmailTemplate } from '../_emailTemplate.js';

export async function onRequestPost(context) {
  // Grab configuration from Cloudflare Environment Variables
  const googleScriptUrl = context.env.GOOGLE_SCRIPT_URL;
  const sendgridKey = context.env.SENDGRID_API_KEY;
  const sendgridFrom = context.env.SENDGRID_FROM_EMAIL; // e.g., hello@boiseautomation.com

  if (!googleScriptUrl) {
    return new Response(JSON.stringify({ error: "GOOGLE_SCRIPT_URL is not configured in Cloudflare." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Parse the JSON data sent from the frontend
    const requestData = await context.request.json();

    // 1. Forward the data to Google Apps Script
    // Google Apps Script expects redirect following and url-encoded or specific CORS headers
    // The most robust way to hit a GAS Web App from Cloudflare is to allow redirects
    const googleResponse = await fetch(googleScriptUrl, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    });

    if (!googleResponse.ok) {
      throw new Error(`Google Script responded with status: ${googleResponse.status}`);
    }

    // 2. Send branded auto-reply via SendGrid (if configured)
    if (sendgridKey && sendgridFrom && requestData.email) {
      const userName = requestData.name ? requestData.name.split(' ')[0] : 'there';
      const formType = requestData.form_type || 'consultation';
      
      const emailHtml = getEmailTemplate(userName, formType);
      
      const subject = formType === 'developer_application' 
        ? "Application Received - Boise Automation"
        : "Consultation Request Received - Boise Automation";

      const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: requestData.email }]
          }],
          from: { email: sendgridFrom, name: "Boise Automation" },
          subject: subject,
          content: [{
            type: "text/html",
            value: emailHtml
          }]
        })
      });

      if (!sgResponse.ok) {
        const errorText = await sgResponse.text();
        console.error("SendGrid error:", errorText);
        // We log the error but don't throw, so the user still sees a success message for their submission
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}