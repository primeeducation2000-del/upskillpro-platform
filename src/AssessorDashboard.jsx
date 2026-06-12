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
                  <span>{countPassedAssessments(progress)} passed</span>
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
          {data.attempts.map((attempt) => (
            <article key={attempt.id} className="assessor-attempt">
              <div className="assessor-attempt-head">
                <div>
                  <strong>{attempt.full_name || attempt.username}</strong>
                  <span>{labelFor(attempt.level_id)} | {unitLabelFor(attempt.unit_id)} | {attempt.assessment_type}</span>
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
                <blockquote>
                  <strong>Writing response</strong>
                  {attempt.writing_response}
                </blockquote>
              )}
            </article>
          ))}
          {!data.attempts.length && <p className="assessor-muted">No assessment attempts submitted yet.</p>}
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

function getCourseProgress(progress) {
  const allUnits = espCourse.levels.flatMap((level) => level.units);
  const total = allUnits.reduce((sum, unit) => sum + unit.lessons.length + 2, 0);
  const complete = allUnits.reduce((sum, unit) => {
    const lessons = unit.lessons.filter((lesson) => progress.lessons?.[lesson.id]).length;
    const formative = progress.formative?.[unit.formative.id]?.score >= 60 ? 1 : 0;
    const summative = progress.summative?.[unit.summative.id]?.score >= 70 ? 1 : 0;
    return sum + lessons + formative + summative;
  }, 0);
  return Math.round((complete / total) * 100);
}

function countPassedAssessments(progress) {
  const formative = Object.values(progress.formative || {}).filter((item) => item.score >= 60).length;
  const summative = Object.values(progress.summative || {}).filter((item) => item.score >= 70).length;
  return formative + summative;
}

function labelFor(levelId) {
  return espCourse.levels.find((level) => level.id === levelId)?.level || levelId;
}

function unitLabelFor(unitId) {
  return espCourse.levels.flatMap((level) => level.units).find((unit) => unit.id === unitId)?.title || unitId;
}
