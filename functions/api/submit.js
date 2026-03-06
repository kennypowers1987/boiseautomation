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
      
      const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Boise Automation</title>
      </head>
      <body style="background-color: #0f172a; color: #f8fafc; font-family: 'Inter', Helvetica, Arial, sans-serif; margin: 0; padding: 40px 20px; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin-top: 0; margin-bottom: 24px; font-size: 24px; font-weight: 600;">
                <span style="color: #ffffff;">Boise</span> <span style="color: #38bdf8;">Automation</span>
              </h2>
              
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Hi ${userName},
              </p>
              
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We have received your technical consultation request. 
              </p>
              
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                Our engineering team is currently reviewing your project overview. We will reach out shortly to schedule a discussion regarding your architectural requirements and potential implementations.
              </p>
              
              <div style="padding-top: 24px; border-top: 1px solid #334155;">
                <p style="color: #94a3b8; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">
                  Boise Automation LLC
                </p>
                <p style="color: #64748b; font-size: 12px; margin: 0;">
                  Enterprise-Grade Systems &bull; Trailhead Member<br>
                  408 S 8th St, Boise, ID
                </p>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `;

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