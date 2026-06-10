import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Clock3, Send, ShieldCheck } from 'lucide-react';
import { ESOL_ASSESSMENT_CONFIG } from './esolAssessmentConfig.js';

const ASSESSMENT_DURATION_SECONDS = 75 * 60;
const TIMER_STORAGE_KEY = 'upskillpro-esol-assessment-started-at';

const readingQuestions = [
  { id: 'q1', level: 'Pre-A1/A1', type: 'Multiple choice', prompt: 'My name is Sara. I am from Spain. Where is Sara from?', options: ['Spain', 'France', 'Italy', 'Brazil'], answer: 'Spain' },
  { id: 'q2', level: 'Pre-A1/A1', type: 'Multiple choice', prompt: 'Choose the correct sentence.', options: ['I am a student.', 'I is a student.', 'I are student.', 'I be student.'], answer: 'I am a student.' },
  { id: 'q3', level: 'Pre-A1/A1', type: 'Short answer', prompt: "Read: Tom works in a hotel. He starts at 8 o'clock. What time does Tom start?", answer: '8' },
  { id: 'q4', level: 'Pre-A1/A1', type: 'Multiple choice', prompt: 'Which word means the opposite of "big"?', options: ['small', 'fast', 'new', 'cold'], answer: 'small' },
  { id: 'q5', level: 'A1', type: 'Reading comprehension', passage: 'Amina lives in Manchester. She works in a cafe from Monday to Friday. On Saturday, she visits her sister.', prompt: 'When does Amina visit her sister?', options: ['Monday', 'Friday', 'Saturday', 'Sunday'], answer: 'Saturday' },
  { id: 'q6', level: 'A1', type: 'Short answer', prompt: 'Read: The train leaves at half past nine. Write the time in numbers.', answer: '9:30' },
  { id: 'q7', level: 'A2', type: 'Multiple choice', prompt: 'Choose the best word: "I have worked here ___ two years."', options: ['since', 'for', 'during', 'from'], answer: 'for' },
  { id: 'q8', level: 'A2', type: 'Reading comprehension', passage: 'Please arrive 10 minutes before your appointment. Bring photo ID and a copy of your confirmation email. If you are late, you may need to book another appointment.', prompt: 'What should you bring?', options: ['Only money', 'Photo ID and confirmation email', 'A train ticket', 'A passport photo only'], answer: 'Photo ID and confirmation email' },
  { id: 'q9', level: 'A2', type: 'Multiple choice', prompt: 'What does "appointment" mean?', options: ['A planned meeting', 'A type of food', 'A holiday', 'A mistake'], answer: 'A planned meeting' },
  { id: 'q10', level: 'A2', type: 'Short answer', prompt: 'Read: "If you are late, you may need to book another appointment." What may happen if you are late?', answer: 'book another appointment' },
  { id: 'q11', level: 'B1', type: 'Multiple choice', prompt: 'Choose the best sentence.', options: ['Although it was raining, we continued the training.', 'Although it was raining, but we continued the training.', 'It was raining although we continued the training.', 'Although raining we training continued.'], answer: 'Although it was raining, we continued the training.' },
  { id: 'q12', level: 'B1', type: 'Reading comprehension', passage: 'Many new employees feel nervous during their first week. A clear induction programme can reduce stress by explaining workplace rules, introducing key staff, and giving employees time to practise common tasks.', prompt: 'What is the main purpose of an induction programme?', options: ['To increase stress', 'To reduce stress and explain the workplace', 'To replace managers', 'To test advanced grammar'], answer: 'To reduce stress and explain the workplace' },
  { id: 'q13', level: 'B1', type: 'Short answer', prompt: 'In the passage about induction, name one thing an induction programme can explain.', answer: 'workplace rules' },
  { id: 'q14', level: 'B1', type: 'Multiple choice', prompt: 'What does "reduce" mean?', options: ['make less', 'make bigger', 'begin again', 'choose quickly'], answer: 'make less' },
  { id: 'q15', level: 'B2', type: 'Reading comprehension', passage: 'Customer complaints are often viewed negatively, but they can provide valuable information. When organisations analyse complaints carefully, they can identify repeated problems and improve staff training, communication, and service quality.', prompt: "What is the writer's attitude to customer complaints?", options: ['They are always useless.', 'They can help organisations improve.', 'They should be ignored.', 'They only matter in large companies.'], answer: 'They can help organisations improve.' },
  { id: 'q16', level: 'B2', type: 'Multiple choice', prompt: 'Choose the closest meaning of "identify repeated problems".', options: ['Find problems that happen more than once', 'Create new problems', 'Hide serious problems', 'Complain about customers'], answer: 'Find problems that happen more than once' },
  { id: 'q17', level: 'B2', type: 'Short answer', prompt: 'According to the complaints passage, name one area organisations can improve.', answer: 'staff training' },
  { id: 'q18', level: 'B2', type: 'Multiple choice', prompt: 'Choose the best linking phrase: "The course was demanding; ___, it helped me gain confidence."', options: ['however', 'because', 'unless', 'while'], answer: 'however' },
  { id: 'q19', level: 'C1', type: 'Reading comprehension', passage: 'Workplace communication is rarely limited to vocabulary knowledge. Employees must interpret tone, implied meaning, cultural expectations, and the purpose behind a message. This is why effective language training often combines linguistic accuracy with interpersonal awareness.', prompt: 'What is the main point of the passage?', options: ['Vocabulary is the only important skill.', 'Communication includes language and social understanding.', 'Tone is not important at work.', 'Language training should avoid workplace context.'], answer: 'Communication includes language and social understanding.' },
  { id: 'q20', level: 'C1', type: 'Multiple choice', prompt: 'What does "implied meaning" refer to?', options: ['Meaning that is suggested but not stated directly', 'A spelling mistake', 'A word list', 'A public announcement'], answer: 'Meaning that is suggested but not stated directly' },
  { id: 'q21', level: 'C1', type: 'Short answer', prompt: 'Why might language training include interpersonal awareness?', answer: 'communication includes tone and cultural expectations' },
  { id: 'q22', level: 'C2', type: 'Reading comprehension', passage: 'Although automation can streamline routine communication, it cannot fully replace human judgement. In high-stakes settings, professionals must evaluate nuance, risk, emotion, and context before deciding how to respond. The most effective organisations therefore treat technology as an aid to communication rather than a substitute for it.', prompt: "Which statement best reflects the writer's argument?", options: ['Technology should replace all communication training.', 'Human judgement remains essential even when technology is useful.', 'Automation makes context unnecessary.', 'High-stakes settings require fewer communication skills.'], answer: 'Human judgement remains essential even when technology is useful.' },
  { id: 'q23', level: 'C2', type: 'Multiple choice', prompt: 'In the final passage, "streamline" most nearly means:', options: ['make more efficient', 'make more emotional', 'make less accurate', 'make more expensive'], answer: 'make more efficient' },
  { id: 'q24', level: 'C2', type: 'Short answer', prompt: 'According to the final passage, what should technology be treated as?', answer: 'an aid to communication' },
];

const recommendations = {
  'Pre-A1': 'Starter ESOL / Pre-entry support with basic literacy and survival English.',
  A1: 'Beginner ESOL course focusing on everyday communication and core grammar.',
  A2: 'Elementary ESOL course with workplace vocabulary and controlled writing practice.',
  B1: 'Intermediate ESOL course with workplace communication, reading, and structured writing.',
  B2: 'Upper-intermediate ESOL or vocational English programme with fluency development.',
  C1: 'Advanced professional English programme with academic/workplace accuracy.',
  C2: 'Proficiency-level placement, advanced communication coaching, or specialist ESP training.',
};

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9: ]/g, '').trim();
}

function scoreShortAnswer(response, answer) {
  const normalizedResponse = normalize(response);
  const normalizedAnswer = normalize(answer);
  if (!normalizedResponse) return 0;
  if (normalizedResponse.includes(normalizedAnswer)) return 1;
  const answerWords = normalizedAnswer.split(' ').filter(Boolean);
  return answerWords.length > 1 && answerWords.every((word) => normalizedResponse.includes(word)) ? 1 : 0;
}

function scoreAssessment(responses) {
  const details = readingQuestions.map((question) => {
    const response = responses[question.id] || '';
    const correct = question.options ? response === question.answer : scoreShortAnswer(response, question.answer) === 1;
    return { id: question.id, level: question.level, prompt: question.prompt, response, correct };
  });
  const score = details.filter((item) => item.correct).length;
  let cefr = 'Pre-A1';
  if (score >= 23) cefr = 'C2';
  else if (score >= 20) cefr = 'C1';
  else if (score >= 16) cefr = 'B2';
  else if (score >= 12) cefr = 'B1';
  else if (score >= 8) cefr = 'A2';
  else if (score >= 4) cefr = 'A1';

  return { score, cefr, recommendation: recommendations[cefr], details };
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function EsolInitialAssessment() {
  const [candidate, setCandidate] = useState({ fullName: '', email: '', phone: '', nationality: '', firstLanguage: '' });
  const [readingResponses, setReadingResponses] = useState({});
  const [writing, setWriting] = useState({ task1: '', task2: '', task3: '' });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(ASSESSMENT_DURATION_SECONDS);
  const [access, setAccess] = useState({ code: '', email: '', granted: false, checking: false, message: '' });
  const result = useMemo(() => scoreAssessment(readingResponses), [readingResponses]);
  const timerState = secondsRemaining <= 0 ? 'expired' : secondsRemaining <= 5 * 60 ? 'warning' : 'active';

  useEffect(() => {
    if (!access.granted) return undefined;

    const storedStartedAt = Number(sessionStorage.getItem(TIMER_STORAGE_KEY));
    const startedAt = storedStartedAt || Date.now();
    if (!storedStartedAt) {
      sessionStorage.setItem(TIMER_STORAGE_KEY, String(startedAt));
    }

    const tick = () => {
      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      setSecondsRemaining(Math.max(ASSESSMENT_DURATION_SECONDS - elapsedSeconds, 0));
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [access.granted]);

  useEffect(() => {
    if (!access.granted) return;

    if (secondsRemaining === 0 && status.type !== 'submitting' && status.type !== 'success') {
      setStatus({
        type: 'error',
        message: 'The recommended assessment time has ended. Please submit your current answers for review.',
      });
    }
  }, [access.granted, secondsRemaining, status.type]);

  const updateCandidate = (field, value) => setCandidate((current) => ({ ...current, [field]: value }));
  const updateReading = (id, value) => setReadingResponses((current) => ({ ...current, [id]: value }));
  const updateWriting = (field, value) => setWriting((current) => ({ ...current, [field]: value }));

  const validateAccess = async (event) => {
    event.preventDefault();
    if (access.checking) return;

    if (!access.code.trim() || !access.email.trim()) {
      setAccess((current) => ({ ...current, message: 'Enter your access code and email address.' }));
      return;
    }

    setAccess((current) => ({ ...current, checking: true, message: 'Checking access code...' }));

    try {
      const response = await fetch('/api/esol-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'validateAccessCode',
          accessCode: access.code,
          email: access.email,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Access code could not be verified.');
      }

      setCandidate((current) => ({
        ...current,
        fullName: current.fullName || result.learnerName || '',
        email: current.email || access.email.trim().toLowerCase(),
      }));
      sessionStorage.removeItem(TIMER_STORAGE_KEY);
      setSecondsRemaining(ASSESSMENT_DURATION_SECONDS);
      setAccess((current) => ({
        ...current,
        code: result.accessCode || current.code,
        granted: true,
        checking: false,
        message: '',
      }));
    } catch (error) {
      setAccess((current) => ({
        ...current,
        checking: false,
        message: error.message || 'This access code could not be verified.',
      }));
    }
  };

  const validate = () => {
    if (!access.granted) return 'Please enter a valid access code before starting the assessment.';
    if (!candidate.fullName.trim() || !candidate.email.trim()) return 'Full name and email address are required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email.trim())) return 'Please enter a valid email address.';
    return '';
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submitted || status.type === 'submitting') return;

    const validationError = validate();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    const email = candidate.email.trim().toLowerCase();
    const duplicateKey = `${ESOL_ASSESSMENT_CONFIG.localStorageKey}:${email}`;
    const previous = Number(localStorage.getItem(duplicateKey) || 0);
    const duplicateWindow = ESOL_ASSESSMENT_CONFIG.duplicateWindowHours * 60 * 60 * 1000;
    if (previous && Date.now() - previous < duplicateWindow) {
      setStatus({ type: 'error', message: 'This email address has already submitted an assessment recently.' });
      return;
    }

    const timestamp = new Date().toISOString();
    const payload = {
      timestamp,
      fullName: candidate.fullName.trim(),
      email,
      phone: candidate.phone.trim(),
      nationality: candidate.nationality.trim(),
      firstLanguage: candidate.firstLanguage.trim(),
      accessCode: access.code.trim(),
      readingScore: result.score,
      estimatedCefrLevel: result.cefr,
      placementRecommendation: result.recommendation,
      allReadingResponses: result.details,
      writingTask1: writing.task1,
      writingTask2: writing.task2,
      writingTask3: writing.task3,
    };

    setStatus({ type: 'submitting', message: 'Submitting assessment...' });

    try {
      const response = await fetch('/api/esol-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submitAssessment', payload }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'The assessment could not be submitted.');
      }
      localStorage.setItem(duplicateKey, String(Date.now()));
      localStorage.setItem('upskillpro-last-esol-assessment', JSON.stringify(payload));
      sessionStorage.removeItem(TIMER_STORAGE_KEY);
      setSubmittedAt(timestamp);
      setSubmitted(true);
      setStatus({ type: 'success', message: 'Assessment submitted successfully. Thank you.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'The assessment could not be submitted. Please try again.' });
    }
  };

  if (submitted) {
    return (
      <main className="assessment-page">
        <section className="assessment-confirmation">
          <CheckCircle2 size={46} />
          <p className="assessment-kicker">ESOL Initial Assessment</p>
          <h1>Submission received</h1>
          <p>Your assessment has been submitted. The estimated level below is based primarily on the reading score and will be reviewed alongside your writing tasks.</p>
          <div className="assessment-result-card">
            <span>Reading Score</span>
            <strong>{result.score} / {readingQuestions.length}</strong>
            <span>Estimated CEFR Level</span>
            <strong>{result.cefr}</strong>
            <span>Placement Recommendation</span>
            <strong>{result.recommendation}</strong>
            <span>Submission Date</span>
            <strong>{new Date(submittedAt).toLocaleString()}</strong>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="assessment-page">
      <section className="assessment-shell">
        <div className="assessment-hero">
          <div>
            <p className="assessment-kicker">UpSkillPro Placement Tool</p>
            <h1>ESOL Initial Assessment</h1>
            <p>This assessment helps determine your current English level against the CEFR framework and supports appropriate course placement from Pre-A1 to C2.</p>
          </div>
          <div className="assessment-hero-card">
            <ClipboardCheck size={30} />
            <span>Estimated level</span>
            <strong>{result.cefr}</strong>
            <small>{result.score} / {readingQuestions.length} reading score</small>
          </div>
        </div>

        {!access.granted && (
          <AssessmentAccessGate access={access} setAccess={setAccess} onSubmit={validateAccess} />
        )}

        {access.granted && (
          <>
        <AssessmentTimer secondsRemaining={secondsRemaining} timerState={timerState} />

        <form className="assessment-form" onSubmit={submit}>
          <AssessmentSection title="Candidate Information" intro="Please complete your details before starting the assessment.">
            <div className="assessment-grid">
              <AssessmentInput label="Full Name" value={candidate.fullName} onChange={(value) => updateCandidate('fullName', value)} required />
              <AssessmentInput label="Email Address" type="email" value={candidate.email} onChange={(value) => updateCandidate('email', value)} required />
              <AssessmentInput label="Phone Number" value={candidate.phone} onChange={(value) => updateCandidate('phone', value)} />
              <AssessmentInput label="Nationality" value={candidate.nationality} onChange={(value) => updateCandidate('nationality', value)} />
              <AssessmentInput label="First Language" value={candidate.firstLanguage} onChange={(value) => updateCandidate('firstLanguage', value)} />
            </div>
          </AssessmentSection>

          <AssessmentSection title="Reading Assessment" intro="Answer the questions in order. They gradually become more difficult.">
            <div className="reading-list">
              {readingQuestions.map((question, index) => (
                <article className="reading-question" key={question.id}>
                  <div className="question-meta">
                    <span>Question {index + 1}</span>
                    <span>{question.level}</span>
                    <span>{question.type}</span>
                  </div>
                  {question.passage && <p className="reading-passage">{question.passage}</p>}
                  <h3>{question.prompt}</h3>
                  {question.options ? (
                    <div className="assessment-options">
                      {question.options.map((option) => (
                        <label key={option}>
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={readingResponses[question.id] === option}
                            onChange={(event) => updateReading(question.id, event.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      className="assessment-short-answer"
                      value={readingResponses[question.id] || ''}
                      onChange={(event) => updateReading(question.id, event.target.value)}
                      placeholder="Type your answer"
                    />
                  )}
                </article>
              ))}
            </div>
          </AssessmentSection>

          <AssessmentSection title="Writing Assessment" intro="Complete all three writing tasks. These are reviewed with the reading score for placement.">
            <AssessmentTextarea label="Task 1 (A1/A2): Write 50-75 words introducing yourself." value={writing.task1} onChange={(value) => updateWriting('task1', value)} rows={5} />
            <AssessmentTextarea label="Task 2 (B1/B2): Write 100-150 words describing a challenge you have overcome or an important experience." value={writing.task2} onChange={(value) => updateWriting('task2', value)} rows={7} />
            <AssessmentTextarea label="Task 3 (C1/C2): Write 200-250 words expressing your opinion on whether technology has improved modern life." value={writing.task3} onChange={(value) => updateWriting('task3', value)} rows={9} />
          </AssessmentSection>

          <aside className="assessment-admin-summary">
            <ShieldCheck size={24} />
            <div><span>Reading Score</span><strong>{result.score} / {readingQuestions.length}</strong></div>
            <div><span>CEFR Estimate</span><strong>{result.cefr}</strong></div>
            <div><span>Recommended Course Level</span><strong>{result.recommendation}</strong></div>
            <div><span>Submission Date</span><strong>{new Date().toLocaleDateString()}</strong></div>
          </aside>

          {status.message && <p className={`assessment-status ${status.type}`}>{status.message}</p>}
          <button className="assessment-submit" type="submit" disabled={status.type === 'submitting'}>
            <Send size={18} />
            Submit Assessment
          </button>
        </form>
          </>
        )}
      </section>
    </main>
  );
}

function AssessmentAccessGate({ access, setAccess, onSubmit }) {
  return (
    <form className="assessment-access-card" onSubmit={onSubmit}>
      <p className="assessment-kicker">Learner access</p>
      <h2>Enter your assessment access code</h2>
      <p>Your training provider will give you a unique code. Each code can only be used once.</p>
      <div className="assessment-access-grid">
        <label className="assessment-field">
          <span>Access Code *</span>
          <input
            value={access.code}
            onChange={(event) => setAccess((current) => ({ ...current, code: event.target.value.toUpperCase(), message: '' }))}
            placeholder="USP-XXXX-XXXX"
            required
          />
        </label>
        <label className="assessment-field">
          <span>Email Address *</span>
          <input
            type="email"
            value={access.email}
            onChange={(event) => setAccess((current) => ({ ...current, email: event.target.value, message: '' }))}
            placeholder="name@example.com"
            required
          />
        </label>
      </div>
      {access.message && <p className={`assessment-status ${access.checking ? 'submitting' : 'error'}`}>{access.message}</p>}
      <button className="assessment-submit" type="submit" disabled={access.checking}>
        <ShieldCheck size={18} />
        {access.checking ? 'Checking Code...' : 'Start Assessment'}
      </button>
    </form>
  );
}

function AssessmentTimer({ secondsRemaining, timerState }) {
  const progress = Math.max(0, Math.min(1, secondsRemaining / ASSESSMENT_DURATION_SECONDS));

  return (
    <aside className={`assessment-timer ${timerState}`} aria-live="polite">
      <div className="assessment-timer-icon">
        <Clock3 size={22} />
      </div>
      <div>
        <span>Assessment timer</span>
        <strong>{formatTime(secondsRemaining)}</strong>
      </div>
      <div className="assessment-timer-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <p>{timerState === 'expired' ? 'Time ended. Submit your current answers.' : '75 minutes recommended'}</p>
    </aside>
  );
}

function AssessmentSection({ title, intro, children }) {
  return (
    <section className="assessment-section">
      <div className="assessment-section-heading">
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      {children}
    </section>
  );
}

function AssessmentInput({ label, type = 'text', value, onChange, required = false }) {
  return (
    <label className="assessment-field">
      <span>{label}{required ? ' *' : ''}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  );
}

function AssessmentTextarea({ label, value, onChange, rows }) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  return (
    <label className="assessment-field assessment-writing">
      <span>{label}</span>
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      <small>{wordCount} words</small>
    </label>
  );
}
