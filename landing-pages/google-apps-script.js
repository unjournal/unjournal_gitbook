// Google Apps Script — paste this into Extensions > Apps Script in your Google Sheet
// Then Deploy > New deployment > Web app > Anyone can access

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;

  // Handle multiple checkbox values
  var interests = [];
  if (data.interest) {
    // Single value comes as string, multiple as array
    interests = Array.isArray(data.interest) ? data.interest : [data.interest];
  }

  sheet.appendRow([
    new Date().toISOString(),
    data.email || '',
    data.name || '',
    interests.join(', ')
  ]);

  // Return JSON for the fetch request
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
