// ============================================================
// GOOGLE APPS SCRIPT — Paste this into your Google Sheet
// ============================================================
//
// SETUP STEPS:
//
// 1. Create a new Google Sheet (or use an existing one)
//    - Name it something like "Rental Tracker"
//    - You do NOT need to create tabs or headers manually —
//      the script automatically creates tabs:
//      - "Hours 2026", "Hours 2027", etc. for time entries
//      - "Expenses 2026", "Expenses 2027", etc. for expenses
//
// 2. Open the script editor:
//    - Click Extensions > Apps Script
//    - Delete any code already there
//    - Paste ALL of the code below
//    - Click the Save icon (or Ctrl+S)
//
// 3. Deploy as a Web App:
//    - Click Deploy > New deployment
//    - Click the gear icon next to "Select type" and choose "Web app"
//    - Description: "Rental Tracker"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
//    - Click Deploy
//    - Authorize when prompted (click through "Advanced" > "Go to..." if it warns about unverified)
//    - COPY the Web App URL it gives you
//
// 4. Paste that URL into the tracker app:
//    - Open the tracker in your phone browser
//    - Tap "Setup" and paste the URL
//    - Done!
//
// If you update this script later, you must create a NEW deployment
// (Deploy > New deployment) for changes to take effect.
//
// ============================================================

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    // Determine the year from the entry date, fallback to current year
    var year;
    try {
      year = new Date(data.date).getFullYear();
    } catch (err) {
      year = new Date().getFullYear();
    }
    if (!year || isNaN(year)) {
      year = new Date().getFullYear();
    }

    if (data.type === 'expense') {
      var sheetName = 'Expenses ' + year;
      var headers = ['Date', 'Person', 'Property', 'Amount', 'Description', 'Raw Text'];
      var sheet = getOrCreateSheet(spreadsheet, sheetName, headers);
      sheet.appendRow([
        data.date,
        data.person,
        data.llc,
        data.amount,
        data.description,
        data.rawText
      ]);
    } else {
      var sheetName = 'Hours ' + year;
      var headers = ['Date', 'Person', 'Property', 'Hours', 'Activity', 'Raw Text'];
      var sheet = getOrCreateSheet(spreadsheet, sheetName, headers);
      sheet.appendRow([
        data.date,
        data.person,
        data.llc,
        data.hours,
        data.description,
        data.rawText
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test function to verify it works from the script editor
function testAppend() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreateSheet(spreadsheet, 'Hours ' + new Date().getFullYear(),
    ['Date', 'Person', 'Property', 'Hours', 'Activity', 'Raw Text']);
  sheet.appendRow([
    new Date().toLocaleDateString('en-US'),
    'Test',
    'The Schmidt Home',
    1,
    'Testing',
    'test entry'
  ]);
}
