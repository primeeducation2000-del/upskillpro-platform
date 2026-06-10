const CONFIG = {
  SPREADSHEET_ID: '1yfCLgUy5nVq79wZr729AHuWkTgkuoHCONfLdDM5ZXTE',
  SHEET_NAME: 'ESOL Initial Assessment Submissions',
  DASHBOARD_SHEET_NAME: 'Admin Dashboard',
  OPENAI_API_KEY_PROPERTY: 'OPENAI_API_KEY',
  OPENAI_MODEL: 'gpt-4.1-mini',
  OPENAI_RESPONSES_URL: 'https://api.openai.com/v1/responses',
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
    'Writing Task 1 CEFR',
    'Writing Task 2 CEFR',
    'Writing Task 3 CEFR',
    'Writing Grammar Score',
    'Writing Vocabulary Score',
    'Writing Coherence Score',
    'Writing Task Achievement Score',
    'Writing Feedback',
    'Final CEFR Recommendation',
    'Human Review Needed',
    'AI Marking Status',
  ],
  DASHBOARD_HEADERS: [
    'Submission Date',
    'Full Name',
    'Email',
    'Reading Score',
    'Reading CEFR Estimate',
    'Writing CEFR Estimate',
    'Final CEFR Recommendation',
    'Recommended Course Level',
    'AI Marking Status',
    'Human Review Needed',
  ],
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const spreadsheet = getSpreadsheet_();
    const sheet = getOrCreateSheet_(spreadsheet, CONFIG.SHEET_NAME, CONFIG.HEADERS);
    const dashboard = getOrCreateSheet_(spreadsheet, CONFIG.DASHBOARD_SHEET_NAME, CONFIG.DASHBOARD_HEADERS);
    const writingAssessment = assessWriting_(payload);

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
      writingAssessment.task1Cefr || '',
      writingAssessment.task2Cefr || '',
      writingAssessment.task3Cefr || '',
      writingAssessment.grammarScore || '',
      writingAssessment.vocabularyScore || '',
      writingAssessment.coherenceScore || '',
      writingAssessment.taskAchievementScore || '',
      writingAssessment.feedback || '',
      writingAssessment.finalCefrRecommendation || payload.estimatedCefrLevel || '',
      writingAssessment.humanReviewNeeded ? 'Yes' : 'No',
      writingAssessment.status || '',
    ];

    sheet.appendRow(row);
    dashboard.appendRow([
      row[0],
      row[1],
      row[2],
      row[6],
      row[7],
      writingAssessment.writingCefrEstimate || '',
      row[21],
      buildCourseRecommendation_(row[21] || row[7]),
      row[23],
      row[22],
    ]);

    return json_({
      ok: true,
      aiMarkingStatus: writingAssessment.status,
      finalCefrRecommendation: writingAssessment.finalCefrRecommendation,
      humanReviewNeeded: writingAssessment.humanReviewNeeded,
    });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: 'UpSkillPro ESOL assessment endpoint is active.' });
}

function assessWriting_(payload) {
  const task1 = String(payload.writingTask1 || '').trim();
  const task2 = String(payload.writingTask2 || '').trim();
  const task3 = String(payload.writingTask3 || '').trim();
  const hasWriting = Boolean(task1 || task2 || task3);
  if (!hasWriting) {
    return {
      status: 'No writing submitted',
      humanReviewNeeded: true,
      finalCefrRecommendation: payload.estimatedCefrLevel || '',
      feedback: 'No writing tasks were submitted. Human review is required.',
    };
  }

  const apiKey = PropertiesService.getScriptProperties().getProperty(CONFIG.OPENAI_API_KEY_PROPERTY);
  if (!apiKey) {
    return {
      status: 'OpenAI API key not configured',
      humanReviewNeeded: true,
      finalCefrRecommendation: payload.estimatedCefrLevel || '',
      feedback: 'Writing was saved but not AI marked because OPENAI_API_KEY is not set in Apps Script properties.',
    };
  }

  try {
    const result = callOpenAiWritingMarker_(apiKey, payload);
    return normalizeWritingResult_(result, payload);
  } catch (error) {
    return {
      status: `AI marking failed: ${String(error).slice(0, 180)}`,
      humanReviewNeeded: true,
      finalCefrRecommendation: payload.estimatedCefrLevel || '',
      feedback: 'Writing was saved, but AI marking failed. Please review manually.',
    };
  }
}

function callOpenAiWritingMarker_(apiKey, payload) {
  const request = {
    model: CONFIG.OPENAI_MODEL,
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: [
              'You are an experienced UK ESOL initial assessment marker.',
              'Assess writing against CEFR levels Pre-A1, A1, A2, B1, B2, C1, C2.',
              'Use reading score as context only. Mark writing independently and conservatively.',
              'Return only valid JSON matching the requested schema.',
              'Scores are 0-5 where 0 is absent and 5 is excellent for the estimated level.',
              'Set humanReviewNeeded true when writing is too short, copied, incoherent, inconsistent across tasks, or borderline.',
            ].join(' '),
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: JSON.stringify({
              candidate: {
                firstLanguage: payload.firstLanguage || '',
                nationality: payload.nationality || '',
              },
              reading: {
                score: payload.readingScore || 0,
                cefrEstimate: payload.estimatedCefrLevel || '',
                placementRecommendation: payload.placementRecommendation || '',
              },
              writingTasks: {
                task1Prompt: 'Write 50-75 words introducing yourself.',
                task1: payload.writingTask1 || '',
                task2Prompt: 'Write 100-150 words describing a challenge you have overcome or an important experience.',
                task2: payload.writingTask2 || '',
                task3Prompt: 'Write 200-250 words expressing your opinion on whether technology has improved modern life.',
                task3: payload.writingTask3 || '',
              },
              requiredJsonShape: {
                task1Cefr: 'Pre-A1|A1|A2|B1|B2|C1|C2',
                task2Cefr: 'Pre-A1|A1|A2|B1|B2|C1|C2',
                task3Cefr: 'Pre-A1|A1|A2|B1|B2|C1|C2',
                writingCefrEstimate: 'Pre-A1|A1|A2|B1|B2|C1|C2',
                grammarScore: 0,
                vocabularyScore: 0,
                coherenceScore: 0,
                taskAchievementScore: 0,
                feedback: 'Brief tutor-style feedback, max 120 words.',
                finalCefrRecommendation: 'Pre-A1|A1|A2|B1|B2|C1|C2',
                humanReviewNeeded: true,
              },
            }),
          },
        ],
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'esol_writing_assessment',
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            task1Cefr: { type: 'string', enum: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
            task2Cefr: { type: 'string', enum: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
            task3Cefr: { type: 'string', enum: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
            writingCefrEstimate: { type: 'string', enum: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
            grammarScore: { type: 'integer', minimum: 0, maximum: 5 },
            vocabularyScore: { type: 'integer', minimum: 0, maximum: 5 },
            coherenceScore: { type: 'integer', minimum: 0, maximum: 5 },
            taskAchievementScore: { type: 'integer', minimum: 0, maximum: 5 },
            feedback: { type: 'string' },
            finalCefrRecommendation: { type: 'string', enum: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
            humanReviewNeeded: { type: 'boolean' },
          },
          required: [
            'task1Cefr',
            'task2Cefr',
            'task3Cefr',
            'writingCefrEstimate',
            'grammarScore',
            'vocabularyScore',
            'coherenceScore',
            'taskAchievementScore',
            'feedback',
            'finalCefrRecommendation',
            'humanReviewNeeded',
          ],
        },
      },
    },
  };

  const response = UrlFetchApp.fetch(CONFIG.OPENAI_RESPONSES_URL, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    payload: JSON.stringify(request),
    muteHttpExceptions: true,
  });

  const status = response.getResponseCode();
  const body = response.getContentText();
  if (status < 200 || status >= 300) {
    throw new Error(`OpenAI API returned ${status}: ${body}`);
  }

  const parsed = JSON.parse(body);
  const outputText = extractOpenAiOutputText_(parsed);
  if (!outputText) {
    throw new Error('OpenAI response did not include output text.');
  }
  return JSON.parse(outputText);
}

function extractOpenAiOutputText_(response) {
  if (response.output_text) return response.output_text;
  const output = response.output || [];
  for (let i = 0; i < output.length; i += 1) {
    const content = output[i].content || [];
    for (let j = 0; j < content.length; j += 1) {
      if (content[j].type === 'output_text' && content[j].text) {
        return content[j].text;
      }
    }
  }
  return '';
}

function normalizeWritingResult_(result, payload) {
  return {
    task1Cefr: result.task1Cefr || '',
    task2Cefr: result.task2Cefr || '',
    task3Cefr: result.task3Cefr || '',
    writingCefrEstimate: result.writingCefrEstimate || '',
    grammarScore: result.grammarScore,
    vocabularyScore: result.vocabularyScore,
    coherenceScore: result.coherenceScore,
    taskAchievementScore: result.taskAchievementScore,
    feedback: result.feedback || '',
    finalCefrRecommendation: result.finalCefrRecommendation || payload.estimatedCefrLevel || '',
    humanReviewNeeded: Boolean(result.humanReviewNeeded),
    status: 'AI marked',
  };
}

function buildCourseRecommendation_(cefr) {
  const recommendations = {
    'Pre-A1': 'Starter ESOL / Pre-entry support',
    A1: 'Beginner ESOL / Entry Level 1',
    A2: 'Elementary ESOL / Entry Level 2',
    B1: 'Intermediate ESOL / Entry Level 3',
    B2: 'Upper-intermediate ESOL / Level 1',
    C1: 'Advanced ESOL / Level 2 professional English',
    C2: 'Proficiency-level English or specialist ESP pathway',
  };
  return recommendations[cefr] || 'Human review required';
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

  ensureHeaders_(sheet, headers);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  const existingHeaderRange = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length));
  const existingHeaders = existingHeaderRange.getValues()[0];
  let changed = false;

  for (let index = 0; index < headers.length; index += 1) {
    if (existingHeaders[index] !== headers[index]) {
      existingHeaders[index] = headers[index];
      changed = true;
    }
  }

  if (changed || sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
