function doPost(e) {
  try {
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create a timestamp
    var timestamp = new Date();
    
    // Determine the form type
    var formType = data.form_type || 'consultation';
    
    // Append the row (adjust these columns based on your needs)
    sheet.appendRow([
      timestamp,
      formType,
      data.name || '',
      data.email || '',
      data.message || '',
      data.github_url || '' // This will be empty for regular consultation forms
    ]);

    // Send the branded HTML Auto-Reply Email
    if (data.email && data.email_html && data.email_subject) {
      // NOTE: Because you are using a different Google Workspace domain, 
      // you must first add 'yourname@boiseautomation.com' as an alias in your Gmail Settings -> Accounts -> "Send mail as".
      // Once verified in Gmail, you can pass it in the `from` property below using GmailApp.
      GmailApp.sendEmail(data.email, data.email_subject, "", {
        htmlBody: data.email_html,
        name: "Boise Automation",
        // Uncomment the line below and add your exact alias once it's verified in Gmail:
        // from: "hello@boiseautomation.com"
      });
    }
    
    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({"success": true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}