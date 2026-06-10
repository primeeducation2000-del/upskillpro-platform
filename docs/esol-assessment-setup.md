# ESOL Initial Assessment Setup

## Page URL

The hidden standalone assessment page is:

```text
https://upskillpro.co.uk/esol-initial-assessment
```

It does not show the main website header, navigation, footer, sidebar, or website links.

## Google Sheet Structure

Create a Google Sheet with these columns on the first tab:

1. Timestamp
2. Full Name
3. Email
4. Phone
5. Nationality
6. First Language
7. Reading Score
8. Estimated CEFR Level
9. Placement Recommendation
10. All Reading Responses
11. Writing Task 1
12. Writing Task 2
13. Writing Task 3

The Apps Script also creates an `Admin Dashboard` tab with:

1. Submission Date
2. Full Name
3. Email
4. Reading Score
5. CEFR Estimate
6. Recommended Course Level

## Apps Script Setup

1. Open the Google Sheet.
2. Go to `Extensions > Apps Script`.
3. Copy the code from:

```text
google-apps-script/esol-assessment-web-app.gs
```

4. Paste it into Apps Script.
5. Optional: paste your Sheet ID into `CONFIG.SPREADSHEET_ID`. If you create the Apps Script from inside the Sheet, you can leave this blank.
6. Save the project.
7. Click `Deploy > New deployment`.
8. Choose `Web app`.
9. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
10. Deploy and copy the Web App URL.

## Website Configuration

Paste the Web App URL into:

```text
src/esolAssessmentConfig.js
```

Use:

```js
export const ESOL_ASSESSMENT_CONFIG = {
  googleAppsScriptUrl: 'PASTE_WEB_APP_URL_HERE',
  localStorageKey: 'upskillpro-esol-initial-assessment-submitted',
  duplicateWindowHours: 24,
};
```

Commit and push the change. Cloudflare Pages will redeploy automatically.

## CEFR Scoring

The page uses 24 progressive reading questions.

- 0-3: Pre-A1
- 4-7: A1
- 8-11: A2
- 12-15: B1
- 16-19: B2
- 20-22: C1
- 23-24: C2

Writing tasks are saved for review and placement confirmation.
