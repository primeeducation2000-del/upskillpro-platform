import React, { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, ClipboardCheck, GraduationCap, LockKeyhole, LogOut, Plus, UserRoundCheck, XCircle } from 'lucide-react';
import { espCourse } from './espLmsCourse.js';

const EMPTY_PROGRESS = { lessons: {}, formative: {}, summative: {}, writing: {} };

export default function AssessorDashboard() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({ learners: [], attempts: [] });
  const [newLearner, setNewLearner] = useState(null);
  const [resetSelections, setResetSelections] = useState({});
  const [markingStatus, setMarkingStatus] = useState({});

  useEffect(() => {
    document.title = 'UpSkillPro Assessor LMS';
    fetch('/api/assessor-auth', { credentials: 'include' })
      .then((response) => response.json())
      .then((result) => {
        setIsAuthed(Boolean(result.ok));
        if (result.ok) loadData();
      })
      .finally(() => setLoading(false));
  }, []);

  const loadData = async () => {
    const result = await fetch('/api/assessor-lms-data', { credentials: 'include' }).then((response) => response.json()).catch(() => null);
    if (result?.ok) setData({ learners: result.learners || [], attempts: result.attempts || [], setupRequired: result.setupRequired });
  };

  const login = async (event) => {
    event.preventDefault();
    setError('');
    const password = new FormData(event.currentTarget).get('password');
    const result = await fetch('/api/assessor-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).then((response) => response.json()).catch(() => ({ ok: false, error: 'Assessor login is not available.' }));

    if (!result.ok) {
      setError(result.error || 'Invalid assessor password.');
      return;
    }
    setIsAuthed(true);
    await loadData();
  };

  const logout = async () => {
    await fetch('/api/assessor-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    }).catch(() => null);
    setIsAuthed(false);
  };

  const createLearner = async (event) => {
    event.preventDefault();
    setNewLearner(null);
    const form = new FormData(event.currentTarget);
    const result = await fetch('/api/assessor-lms-data', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'createLearner',
        fullName: form.get('fullName'),
        username: form.get('username'),
        email: form.get('email'),
      }),
    }).then((response) => response.json()).catch(() => ({ ok: false, error: 'Could not create learner.' }));

    if (result.ok) {
      setNewLearner(result.learner);
      event.currentTarget.reset();
      await loadData();
    } else {
      setError(result.error || 'Could not create learner.');
    }
  };

  const resetLearnerProgress = async (learnerId) => {
    const optionId = resetSelections[learnerId] || resetOptions[0].id;
    const option = resetOptions.find((item) => item.id === optionId) || resetOptions[0];
    const confirmed = window.confirm(`Reset ${option.label}? Previous submitted attempts will remain visible for assessor feedback.`);
    if (!confirmed) return;

    const result = await fetch('/api/assessor-lms-data', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'resetProgress',
        learnerId,
        reset: option.reset,
      }),
    }).then((response) => response.json()).catch(() => ({ ok: false, error: 'Could not reset learner progress.' }));

    if (result.ok) {
      await loadData();
    } else {
      setError(result.error || 'Could not reset learner progress.');
    }
  };

  const saveWritingMark = async (attemptId, mark) => {
    setMarkingStatus((current) => ({ ...current, [attemptId]: 'Saving...' }));
    const result = await fetch('/api/assessor-lms-data', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'markWriting',
        attemptId,
        ...mark,
      }),
    }).then((response) => response.json()).catch(() => ({ ok: false, error: 'Could not save writing mark.' }));

    if (result.ok) {
      setMarkingStatus((current) => ({ ...current, [attemptId]: 'Saved' }));
      await loadData();
    } else {
      setMarkingStatus((current) => ({ ...current, [attemptId]: result.error || 'Could not save' }));
    }
  };

  const stats = useMemo(() => {
    const completed = data.learners.filter((learner) => getCourseProgress(learner.progress || EMPTY_PROGRESS) === 100).length;
    return {
      learners: data.learners.length,
      completed,
      attempts: data.attempts.length,
      writing: data.attempts.filter((attempt) => attempt.writing_response).length,
    };
  }, [data]);

  if (loading) return <div className="admin-loading">Loading assessor portal...</div>;
  if (!isAuthed) return <AssessorLogin onSubmit={login} error={error} />;

  return (
    <main className="assessor-app">
      <header className="assessor-hero">
        <div>
          <p>Private assessor portal</p>
          <h1>ESP Learner Progress</h1>
          <span>Review learner progress, assessment answers, writing submissions, and course questions.</span>
        </div>
        <button type="button" onClick={logout}><LogOut size={18} /> Logout</button>
      </header>

      {data.setupRequired && (
        <div className="assessor-alert">D1 LMS tables are not ready yet. Run the updated `schema/analytics.sql` in Cloudflare D1.</div>
      )}

      <section className="assessor-kpis">
        <Kpi icon={UserRoundCheck} label="Learners" value={stats.learners} />
        <Kpi icon={CheckCircle2} label="Completed Pathway" value={stats.completed} />
        <Kpi icon={ClipboardCheck} label="Assessment Attempts" value={stats.attempts} />
        <Kpi icon={BookOpenCheck} label="Writing Responses" value={stats.writing} />
      </section>

      <section className="assessor-grid">
        <article className="assessor-card">
          <div className="assessor-card-head">
            <h2>Create unique learner login</h2>
            <Plus size={20} />
          </div>
          <form className="assessor-form" onSubmit={createLearner}>
            <label><span>Full name</span><input name="fullName" required /></label>
            <label><span>Username</span><input name="username" placeholder="e.g. ahmed.ali" /></label>
            <label><span>Email</span><input name="email" type="email" /></label>
            <button type="submit">Create Learner</button>
          </form>
          {newLearner && (
            <div className="assessor-credential">
              <strong>New learner login</strong>
              <span>Username: {newLearner.username}</span>
              <span>Access code: {newLearner.accessCode}</span>
            </div>
          )}
        </article>

        <article className="assessor-card">
          <div className="assessor-card-head">
            <h2>Learner progress</h2>
            <GraduationCap size={20} />
          </div>
          <div className="assessor-table">
            {data.learners.map((learner) => {
              const progress = learner.progress || EMPTY_PROGRESS;
              return (
                <div className="assessor-row" key={learner.id}>
                  <div>
                    <strong>{learner.full_name}</strong>
                    <span>{learner.username} | {learner.email || 'No email'}</span>
                  </div>
                  <ProgressMeter value={getCourseProgress(progress)} />
                  <span>{Object.values(progress.lessons || {}).filter(Boolean).length} lessons</span>
                  <span>{countSubmittedAssessments(progress)} submitted</span>
                  <div className="assessor-reset-controls">
                    <select
                      value={resetSelections[learner.id] || resetOptions[0].id}
                      onChange={(event) => setResetSelections((current) => ({ ...current, [learner.id]: event.target.value }))}
                    >
                      {resetOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                    </select>
                    <button type="button" onClick={() => resetLearnerProgress(learner.id)}>Reset</button>
                  </div>
                </div>
              );
            })}
            {!data.learners.length && <p className="assessor-muted">No learners created yet.</p>}
          </div>
        </article>
      </section>

      <section className="assessor-card">
        <div className="assessor-card-head">
          <h2>Assessment answers and writing</h2>
          <ClipboardCheck size={20} />
        </div>
        <div className="assessor-attempts">
          {data.learners.map((learner) => {
            const learnerAttempts = data.attempts.filter((attempt) => attempt.learner_id === learner.id);
            return (
              <article key={learner.id} className="assessor-learner-attempts">
                <div className="assessor-attempt-head">
                  <div>
                    <strong>{learner.full_name}</strong>
                    <span>{learner.username} | {learnerAttempts.length} submitted assessment{learnerAttempts.length === 1 ? '' : 's'}</span>
                  </div>
                </div>
                {!learnerAttempts.length && <p className="assessor-muted">No submissions yet for this learner.</p>}
                {learnerAttempts.map((attempt) => (
                  <div key={attempt.id} className="assessor-attempt">
                    <div className="assessor-attempt-head">
                      <div>
                        <strong>{labelFor(attempt.level_id)} | {unitLabelFor(attempt.unit_id)}</strong>
                        <span>{attempt.assessment_type} | {new Date(attempt.created_at).toLocaleString()}</span>
                      </div>
                      <b>{attempt.score}%</b>
                    </div>
                    <div className="assessor-answer-list">
                      {(attempt.answers || []).map((answer, index) => (
                        <div className={answer.isCorrect ? 'correct' : 'incorrect'} key={`${attempt.id}-${index}`}>
                          {answer.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                          <span>
                            <strong>{answer.question}</strong>
                            Learner: {answer.selectedAnswer || 'No answer'} | Correct: {answer.correctAnswer}
                          </span>
                        </div>
                      ))}
                    </div>
                    {attempt.writing_response && (
                      <>
                        <blockquote>
                          <strong>Writing response</strong>
                          {attempt.writing_response}
                        </blockquote>
                        <WritingMarkingForm attempt={attempt} status={markingStatus[attempt.id]} onSave={saveWritingMark} />
                      </>
                    )}
                  </div>
                ))}
              </article>
            );
          })}
          {!data.learners.length && <p className="assessor-muted">No learners created yet.</p>}
        </div>
      </section>

      <section className="assessor-card">
        <div className="assessor-card-head">
          <h2>Course levels and question bank</h2>
          <BookOpenCheck size={20} />
        </div>
        <div className="assessor-course-map">
          {espCourse.levels.map((level) => (
            <article key={level.id}>
              <h3>{level.level} <span>{level.cefr}</span></h3>
              {level.units.map((unit) => (
                <div key={unit.id}>
                  <strong>{unit.title}</strong>
                  {[unit.formative, unit.summative].map((assessment) => (
                    <ul key={assessment.id}>
                      {assessment.questions.map((question) => (
                        <li key={question.prompt}>{question.prompt} <span>Correct: {question.options[question.answer]}</span></li>
                      ))}
                    </ul>
                  ))}
                  {unit.summative.writingPrompt && <p>Writing: {unit.summative.writingPrompt}</p>}
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function AssessorLogin({ onSubmit, error }) {
  return (
    <main className="lms-login">
      <form onSubmit={onSubmit}>
        <div className="lms-login-mark"><LockKeyhole size={30} /></div>
        <p>Private assessor portal</p>
        <h1>Assessor Login</h1>
        <span>Review learner progress and ESP assessment evidence.</span>
        <label>
          <span>Assessor password</span>
          <input name="password" type="password" required autoComplete="current-password" />
        </label>
        {error && <div className="lms-login-error">{error}</div>}
        <button type="submit">Enter Assessor Portal</button>
        <small>Default password: UpskillProAssessor!2026</small>
      </form>
    </main>
  );
}

function Kpi({ icon: Icon, label, value }) {
  return <article><Icon size={22} /><span>{label}</span><strong>{value}</strong></article>;
}

function ProgressMeter({ value }) {
  return <div className="assessor-progress"><span style={{ width: `${value}%` }} /><strong>{value}%</strong></div>;
}

function WritingMarkingForm({ attempt, status, onSave }) {
  const [grade, setGrade] = useState(attempt.writing_grade || '');
  const [feedback, setFeedback] = useState(attempt.writing_feedback || '');
  const [markedBy, setMarkedBy] = useState(attempt.marked_by || 'Assessor');
  const [criteria, setCriteria] = useState(() => ({
    task: attempt.writingCriteria?.task || '',
    range: attempt.writingCriteria?.range || '',
    accuracy: attempt.writingCriteria?.accuracy || '',
    organisation: attempt.writingCriteria?.organisation || '',
    appropriacy: attempt.writingCriteria?.appropriacy || '',
  }));

  const submit = (event) => {
    event.preventDefault();
    onSave(attempt.id, { grade, feedback, markedBy, criteria });
  };

  return (
    <form className="writing-marking-form" onSubmit={submit}>
      <div className="writing-marking-head">
        <div>
          <strong>Assessor marking criteria</strong>
          <span>Use the criteria below to judge the writing evidence and award a CEFR grade.</span>
        </div>
        {attempt.marked_at && <em>Marked {new Date(attempt.marked_at).toLocaleString()}</em>}
      </div>

      <div className="writing-criteria-grid">
        {writingCriteria.map((criterion) => (
          <label key={criterion.id}>
            <span>{criterion.label}</span>
            <small>{criterion.description}</small>
            <select value={criteria[criterion.id]} onChange={(event) => setCriteria((current) => ({ ...current, [criterion.id]: event.target.value }))}>
              <option value="">Select rating</option>
              {criterionScale.map((rating) => <option key={rating.value} value={rating.value}>{rating.label}</option>)}
            </select>
          </label>
        ))}
      </div>

      <div className="writing-marking-fields">
        <label>
          <span>Overall writing grade</span>
          <select value={grade} onChange={(event) => setGrade(event.target.value)} required>
            <option value="">Select CEFR grade</option>
            {['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Marked by</span>
          <input value={markedBy} onChange={(event) => setMarkedBy(event.target.value)} />
        </label>
      </div>

      <label className="writing-feedback">
        <span>Assessor feedback</span>
        <textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} rows="5" placeholder="Write strengths, development points, and next steps..." />
      </label>

      <button type="submit">Save Writing Mark</button>
      {status && <p className="assessor-mark-status">{status}</p>}
    </form>
  );
}

function getCourseProgress(progress) {
  const allUnits = espCourse.levels.flatMap((level) => level.units);
  const total = allUnits.reduce((sum, unit) => sum + unit.lessons.length + 2, 0);
  const complete = allUnits.reduce((sum, unit) => {
    const lessons = unit.lessons.filter((lesson) => progress.lessons?.[lesson.id]).length;
    const formative = progress.formative?.[unit.formative.id]?.score !== undefined ? 1 : 0;
    const summative = progress.summative?.[unit.summative.id]?.score !== undefined ? 1 : 0;
    return sum + lessons + formative + summative;
  }, 0);
  return Math.round((complete / total) * 100);
}

function countSubmittedAssessments(progress) {
  const formative = Object.values(progress.formative || {}).filter((item) => item.score !== undefined).length;
  const summative = Object.values(progress.summative || {}).filter((item) => item.score !== undefined).length;
  return formative + summative;
}

const writingCriteria = [
  {
    id: 'task',
    label: 'Task achievement',
    description: 'Addresses the prompt, covers required points, and gives enough relevant detail.',
  },
  {
    id: 'range',
    label: 'Vocabulary and grammar range',
    description: 'Uses language appropriate to the CEFR level, including workplace or ESP vocabulary where relevant.',
  },
  {
    id: 'accuracy',
    label: 'Accuracy and control',
    description: 'Controls sentence structure, spelling, punctuation, and grammar without blocking meaning.',
  },
  {
    id: 'organisation',
    label: 'Organisation and coherence',
    description: 'Uses paragraphs, linking words, sequencing, and clear development of ideas.',
  },
  {
    id: 'appropriacy',
    label: 'Tone and appropriacy',
    description: 'Uses register, politeness, and professional tone suitable for the task and audience.',
  },
];

const criterionScale = [
  { value: '1', label: '1 - Below level' },
  { value: '2', label: '2 - Emerging' },
  { value: '3', label: '3 - Meets level' },
  { value: '4', label: '4 - Secure' },
  { value: '5', label: '5 - Strong' },
];

const resetOptions = buildResetOptions();

function buildResetOptions() {
  const allLessons = [];
  const allFormative = [];
  const allSummative = [];
  const options = [];

  espCourse.levels.forEach((level) => {
    const levelLessons = [];
    const levelFormative = [];
    const levelSummative = [];

    level.units.forEach((unit) => {
      const unitLessons = unit.lessons.map((lesson) => lesson.id);
      const unitFormative = [unit.formative.id];
      const unitSummative = [unit.summative.id];
      levelLessons.push(...unitLessons);
      levelFormative.push(...unitFormative);
      levelSummative.push(...unitSummative);
      allLessons.push(...unitLessons);
      allFormative.push(...unitFormative);
      allSummative.push(...unitSummative);

      options.push({
        id: `unit:${unit.id}`,
        label: `Unit - ${level.level}: ${unit.title}`,
        reset: { lessonIds: unitLessons, formativeIds: unitFormative, summativeIds: unitSummative },
      });
      unit.lessons.forEach((lesson) => {
        options.push({ id: `lesson:${lesson.id}`, label: `Lesson - ${lesson.title}`, reset: { lessonIds: [lesson.id] } });
      });
      options.push({ id: `formative:${unit.formative.id}`, label: `Formative - ${unit.title}`, reset: { formativeIds: unitFormative } });
      options.push({ id: `summative:${unit.summative.id}`, label: `Final - ${unit.title}`, reset: { summativeIds: unitSummative } });
    });

    options.push({
      id: `level:${level.id}`,
      label: `Level - ${level.level}`,
      reset: { lessonIds: levelLessons, formativeIds: levelFormative, summativeIds: levelSummative },
    });
  });

  return [
    { id: 'all', label: 'Entire pathway', reset: { lessonIds: allLessons, formativeIds: allFormative, summativeIds: allSummative } },
    ...options,
  ];
}

function labelFor(levelId) {
  return espCourse.levels.find((level) => level.id === levelId)?.level || levelId;
}

function unitLabelFor(unitId) {
  return espCourse.levels.flatMap((level) => level.units).find((unit) => unit.id === unitId)?.title || unitId;
}
