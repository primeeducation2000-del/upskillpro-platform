const CONFIG = {
  SPREADSHEET_ID: '',
  SHEET_NAME: 'ESOL Initial Assessment Submissions',
  DASHBOARD_SHEET_NAME: 'Admin Dashboard',
  HEADERS: [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone',
    'Nationality',
    'First Language',
    'Reading Score',
    'Estimated CEFR Level',
    'Placement Recommendation',
    'All Reading Responses',
    'Writing Task 1',
    'Writing Task 2',
    'Writing Task 3',
  ],
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const spreadsheet = getSpreadsheet_();
    const sheet = getOrCreateSheet_(spreadsheet, CONFIG.SHEET_NAME, CONFIG.HEADERS);
    const dashboard = getOrCreateSheet_(spreadsheet, CONFIG.DASHBOARD_SHEET_NAME, [
      'Submission Date',
      'Full Name',
      'Email',
      'Reading Score',
      'CEFR Estimate',
      'Recommended Course Level',
    ]);

    const row = [
      payload.timestamp || new Date().toISOString(),
      payload.fullName || '',
      payload.email || '',
      payload.phone || '',
      payload.nationality || '',
      payload.firstLanguage || '',
      payload.readingScore || 0,
      payload.estimatedCefrLevel || '',
      payload.placementRecommendation || '',
      JSON.stringify(payload.allReadingResponses || []),
      payload.writingTask1 || '',
      payload.writingTask2 || '',
      payload.writingTask3 || '',
    ];

    sheet.appendRow(row);
    dashboard.appendRow([
      row[0],
      row[1],
      row[2],
      row[6],
      row[7],
      row[8],
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: 'UpSkillPro ESOL assessment endpoint is active.' });
}

function getSpreadsheet_() {
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateSheet_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
