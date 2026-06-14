# ESOL Initial Assessment Setup

## Page URL

The hidden standalone assessment page is:

```text
https://upskillpro.co.uk/esol-initial-assessment
```

It does not show the main website header, navigation, footer, sidebar, or website links.

## Google Sheet Structure

Created Sheet:

```text
https://docs.google.com/spreadsheets/d/1yfCLgUy5nVq79wZr729AHuWkTgkuoHCONfLdDM5ZXTE/edit
```

The script creates an `ESOL Initial Assessment Submissions` tab with these columns:

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
14. Writing Task 1 CEFR
15. Writing Task 2 CEFR
16. Writing Task 3 CEFR
17. Writing Grammar Score
18. Writing Vocabulary Score
19. Writing Coherence Score
20. Writing Task Achievement Score
21. Writing Feedback
22. Final CEFR Recommendation
23. Human Review Needed
24. AI Marking Status

The Apps Script also creates an `Admin Dashboard` tab with:

1. Submission Date
2. Full Name
3. Email
4. Reading Score
5. Reading CEFR Estimate
6. Writing CEFR Estimate
7. Final CEFR Recommendation
8. Recommended Course Level
9. AI Marking Status
10. Human Review Needed

The Apps Script also creates an `Access Codes` tab with:

1. Access Code
2. Learner Name
3. Email
4. Status
5. Date Created
6. Date Used
7. Submission Email
8. Notes

Access code statuses:

- `Unused`: learner can start the assessment.
- `Used`: code has already been submitted and cannot be reused.
- `Expired`, `Cancelled`, or `Canceled`: code is blocked.

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

## AI Writing Marking Setup

The script can mark writing tasks with OpenAI from inside Apps Script. The API key is not stored in the public website.

1. Open the Apps Script project.
2. Go to `Project Settings`.
3. Under `Script properties`, add:

```text
OPENAI_API_KEY = your OpenAI API key
```

4. Save the property.
5. Deploy a new Web App version after updating the script.

When configured, each submission writes:

- Writing CEFR estimate per task
- Grammar, vocabulary, coherence, and task achievement scores from 0-5
- Tutor-style feedback
- Final CEFR recommendation
- Human review flag
- AI marking status

If the key is missing or AI marking fails, the submission is still saved and `AI Marking Status` explains what happened.

## Learner Access Codes

The public assessment page requires a unique learner access code before the form appears.

To create access codes:

1. Open the Apps Script project.
2. Make sure the latest script code is saved and deployed.
3. In the function dropdown, choose `createAccessCodes`.
4. Click `Run`.
5. The script adds 20 new unused codes to the `Access Codes` tab.

You can optionally assign a code to a learner by filling:

- `Learner Name`
- `Email`

If `Email` is filled, the learner must enter that same email with the code. If it is blank, any learner email can use the code once.

After a successful assessment submission, the script changes the code status to `Used`, records `Date Used`, and records the submission email.

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

## Historical Assessor Portal Import

The assessor portal can show previous ESOL initial assessment submissions from the Google Sheet as well as new D1-captured submissions.

1. Open the Apps Script project.
2. Go to `Project Settings`.
3. Under `Script properties`, add a private shared token:

```text
ESOL_EXPORT_TOKEN = choose-a-long-private-token
```

4. Add the same token in Cloudflare Pages as an environment variable:

```text
ESOL_EXPORT_TOKEN = choose-a-long-private-token
```

5. Redeploy the Apps Script Web App after pasting the latest `google-apps-script/esol-assessment-web-app.gs`.
6. Redeploy Cloudflare Pages.

After this is configured, the assessor portal `Initial Assessments` tab merges:

- Existing Google Sheet rows
- New D1 assessment records

Duplicate records are removed by email, timestamp, and reading score.

## CEFR Scoring

The page uses 24 progressive reading questions.

- 0-3: Pre-A1
- 4-7: A1
- 8-11: A2
- 12-15: B1
- 16-19: B2
- 20-22: C1
- 23-24: C2

Writing tasks are AI marked when `OPENAI_API_KEY` is configured. Human review is still recommended for borderline, unusually short, or inconsistent writing.
