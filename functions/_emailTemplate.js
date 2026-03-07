export function getEmailTemplate(userName, type = "consultation") {
  let messageContent = "";

  if (type === "developer_application") {
    messageContent = `
        <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thanks for applying to partner with us!
        </p>
        <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
          We have received your application and GitHub link. Our lead engineering team will review your profile and reach out soon with next steps. We're excited about the potential of building together.
        </p>
    `;
  } else {
    messageContent = `
        <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          We have received your technical consultation request. 
        </p>
        <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
          Our engineering team is currently reviewing your project overview. We will reach out shortly to schedule a discussion regarding your architectural requirements and potential implementations.
        </p>
    `;
  }

  return `
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
        
        ${messageContent}
        
        <div style="padding-top: 24px; border-top: 1px solid #334155;">
          <p style="color: #94a3b8; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">
            Boise Automation LLC
          </p>
          <p style="color: #64748b; font-size: 12px; margin: 0;">
            Empowering Boise Businesses with Local Enterprise Solutions &bull; Trailhead Member<br>
            408 S 8th St, Boise, ID
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}