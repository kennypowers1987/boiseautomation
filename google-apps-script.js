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
    
    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({"success": true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}