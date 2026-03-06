import { getEmailTemplate } from '../_emailTemplate.js';

export async function onRequestPost(context) {
  // Grab configuration from Cloudflare Environment Variables
  const zapierUrl = context.env.ZAPIER_WEBHOOK_URL;
  const sendgridKey = context.env.SENDGRID_API_KEY;
  const sendgridFrom = context.env.SENDGRID_FROM_EMAIL; // e.g., hello@boiseautomation.com

  if (!zapierUrl) {
    return new Response(JSON.stringify({ error: "ZAPIER_WEBHOOK_URL is not configured in Cloudflare." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Parse the JSON data sent from the frontend
    const requestData = await context.request.json();

    // 1. Forward the data to Zapier
    const zapierResponse = await fetch(zapierUrl, {
      method: 'POST',
      body: JSON.stringify(requestData)
    });

    if (!zapierResponse.ok) {
      throw new Error(`Zapier responded with status: ${zapierResponse.status}`);
    }

    // 2. Send branded auto-reply via SendGrid (if configured)
    if (sendgridKey && sendgridFrom && requestData.email) {
      const userName = requestData.name ? requestData.name.split(' ')[0] : 'there';
      
      const emailHtml = getEmailTemplate(userName);

      const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${sendgridKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: requestData.email }]
          }],
          from: { email: sendgridFrom, name: "Boise Automation" },
          subject: "Consultation Request Received - Boise Automation",
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