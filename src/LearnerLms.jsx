import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  PenLine,
  PlayCircle,
  Target,
} from 'lucide-react';
import { espCourse } from './espLmsCourse.js';

const LMS_SESSION_KEY = 'upskillpro-lms-session';
const LMS_PROGRESS_KEY = 'upskillpro-esp-progress';
const LMS_PASSWORD = 'ESP2026';

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(LMS_PROGRESS_KEY)) || {
      lessons: {},
      formative: {},
      summative: {},
      writing: {},
    };
  } catch {
    return { lessons: {}, formative: {}, summative: {}, writing: {} };
  }
}

function saveProgress(progress) {
  localStorage.setItem(LMS_PROGRESS_KEY, JSON.stringify(progress));
}

export default function LearnerLms() {
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem(LMS_SESSION_KEY) === 'active');
  const [loginError, setLoginError] = useState('');
  const [progress, setProgress] = useState(readProgress);
  const [selectedLevelId, setSelectedLevelId] = useState(espCourse.levels[0].id);
  const [selectedUnitId, setSelectedUnitId] = useState(espCourse.levels[0].units[0].id);

  useEffect(() => {
    document.title = 'UpSkillPro LMS';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex,nofollow,noarchive');
  }, []);

  useEffect(() => saveProgress(progress), [progress]);

  const selectedLevel = espCourse.levels.find((level) => level.id === selectedLevelId) || espCourse.levels[0];
  const selectedUnit = selectedLevel.units.find((unit) => unit.id === selectedUnitId) || selectedLevel.units[0];
  const courseProgress = getCourseProgress(progress);
  const unitProgress = getUnitProgress(selectedUnit, progress);

  const login = (event) => {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');
    if (password !== LMS_PASSWORD) {
      setLoginError('Invalid learner access code.');
      return;
    }
    localStorage.setItem(LMS_SESSION_KEY, 'active');
    setIsAuthed(true);
  };

  const logout = () => {
    localStorage.removeItem(LMS_SESSION_KEY);
    setIsAuthed(false);
  };

  const updateProgress = (updater) => setProgress((current) => {
    const next = updater(current);
    saveProgress(next);
    return next;
  });

  if (!isAuthed) return <LearnerLogin onSubmit={login} error={loginError} />;

  return (
    <main className="lms-app">
      <aside className="lms-sidebar">
        <div className="lms-brand">
          <span>UP</span>
          <div>
            <strong>UpSkillPro LMS</strong>
            <small>ESP English Pathway</small>
          </div>
        </div>
        <nav>
          {espCourse.levels.map((level) => {
            const levelProgress = getLevelProgress(level, progress);
            return (
              <button
                key={level.id}
                type="button"
                className={level.id === selectedLevel.id ? 'active' : ''}
                onClick={() => {
                  setSelectedLevelId(level.id);
                  setSelectedUnitId(level.units[0].id);
                }}
              >
                <span>
                  <strong>{level.level}</strong>
                  <small>{level.cefr}</small>
                </span>
                <em>{levelProgress}%</em>
              </button>
            );
          })}
        </nav>
        <button className="lms-logout" type="button" onClick={logout}><LogOut size={17} /> Logout</button>
      </aside>

      <section className="lms-main">
        <header className="lms-hero">
          <div>
            <p>Private learner portal</p>
            <h1>{espCourse.title}</h1>
            <span>{espCourse.subtitle}</span>
          </div>
          <div className="lms-progress-orb" style={{ '--course-progress': `${courseProgress * 3.6}deg` }}>
            <strong>{courseProgress}%</strong>
            <span>Pathway progress</span>
          </div>
        </header>

        <section className="lms-kpis">
          <LmsKpi icon={LayoutDashboard} label="Levels" value={espCourse.levels.length} />
          <LmsKpi icon={BookOpenCheck} label="Units" value={countUnits()} />
          <LmsKpi icon={CheckCircle2} label="Lessons Complete" value={Object.values(progress.lessons).filter(Boolean).length} />
          <LmsKpi icon={Award} label="Assessments Passed" value={countPassedAssessments(progress)} />
        </section>

        <section className="lms-level-panel">
          <div className="lms-level-head">
            <div>
              <p>{selectedLevel.cefr}</p>
              <h2>{selectedLevel.level} ESP English</h2>
              <span>{selectedLevel.goal}</span>
            </div>
            <ProgressBar value={getLevelProgress(selectedLevel, progress)} />
          </div>
          <div className="lms-unit-tabs">
            {selectedLevel.units.map((unit) => (
              <button key={unit.id} className={unit.id === selectedUnit.id ? 'active' : ''} type="button" onClick={() => setSelectedUnitId(unit.id)}>
                {unit.title}
                <small>{getUnitProgress(unit, progress)}%</small>
              </button>
            ))}
          </div>
        </section>

        <section className="lms-unit-detail">
          <div className="lms-unit-summary">
            <p>Unit outcome</p>
            <h2>{selectedUnit.title}</h2>
            <span>{selectedUnit.outcome}</span>
            <ProgressBar value={unitProgress} />
          </div>

          <div className="lms-lessons">
            {selectedUnit.lessons.map((lesson, index) => (
              <article className={progress.lessons[lesson.id] ? 'complete' : ''} key={lesson.id}>
                <div>
                  <PlayCircle size={22} />
                  <span>Lesson {index + 1}</span>
                </div>
                <h3>{lesson.title}</h3>
                <p>{lesson.objective}</p>
                <ul>{lesson.language.map((phrase) => <li key={phrase}>{phrase}</li>)}</ul>
                <strong>Practice task</strong>
                <p>{lesson.task}</p>
                <button type="button" onClick={() => updateProgress((current) => ({ ...current, lessons: { ...current.lessons, [lesson.id]: true } }))}>
                  <CheckCircle2 size={17} />
                  {progress.lessons[lesson.id] ? 'Completed' : 'Mark Lesson Complete'}
                </button>
              </article>
            ))}
          </div>

          <div className="lms-assessment-grid">
            <QuizCard
              type="Formative Assessment"
              icon={ClipboardCheck}
              assessment={selectedUnit.formative}
              saved={progress.formative[selectedUnit.formative.id]}
              onSave={(result) => updateProgress((current) => ({ ...current, formative: { ...current.formative, [selectedUnit.formative.id]: result } }))}
            />
            <QuizCard
              type="Final Summative Assessment"
              icon={GraduationCap}
              assessment={selectedUnit.summative}
              saved={progress.summative[selectedUnit.summative.id]}
              writingValue={progress.writing[selectedUnit.summative.id] || ''}
              onWriting={(value) => updateProgress((current) => ({ ...current, writing: { ...current.writing, [selectedUnit.summative.id]: value } }))}
              onSave={(result) => updateProgress((current) => ({ ...current, summative: { ...current.summative, [selectedUnit.summative.id]: result } }))}
              summative
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function LearnerLogin({ onSubmit, error }) {
  return (
    <main className="lms-login">
      <form onSubmit={onSubmit}>
        <div className="lms-login-mark"><LockKeyhole size={30} /></div>
        <p>Private learner portal</p>
        <h1>UpSkillPro LMS</h1>
        <span>Access the ESP English pathway from Beginner to Advanced.</span>
        <label>
          <span>Learner access code</span>
          <input name="password" type="password" required autoComplete="current-password" />
        </label>
        {error && <div className="lms-login-error">{error}</div>}
        <button type="submit">Enter LMS <ChevronRight size={18} /></button>
        <small>Initial access code: ESP2026</small>
      </form>
    </main>
  );
}

function LmsKpi({ icon: Icon, label, value }) {
  return (
    <article>
      <Icon size={22} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="lms-progress-bar" aria-label={`${value}% complete`}>
      <span style={{ width: `${value}%` }} />
      <strong>{value}% complete</strong>
    </div>
  );
}

function QuizCard({ type, icon: Icon, assessment, saved, onSave, summative = false, writingValue = '', onWriting }) {
  const [answers, setAnswers] = useState({});
  const score = saved?.score ?? null;
  const passed = score !== null && score >= (summative ? 70 : 60);

  const submit = () => {
    const correct = assessment.questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
    const nextScore = Math.round((correct / assessment.questions.length) * 100);
    onSave({ score: nextScore, correct, total: assessment.questions.length, submittedAt: new Date().toISOString() });
  };

  return (
    <article className="lms-quiz-card">
      <div className="lms-quiz-head">
        <Icon size={24} />
        <div>
          <p>{type}</p>
          <h3>{summative ? 'Unit Final Assessment' : 'Knowledge Check'}</h3>
        </div>
        {score !== null && <strong className={passed ? 'pass' : 'review'}>{score}%</strong>}
      </div>
      <div className="lms-question-list">
        {assessment.questions.map((question, index) => (
          <fieldset key={question.prompt}>
            <legend>{index + 1}. {question.prompt}</legend>
            {question.options.map((option, optionIndex) => (
              <label key={option}>
                <input type="radio" name={`${assessment.id}-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>
      {summative && (
        <label className="lms-writing-task">
          <span><PenLine size={16} /> Writing task</span>
          <p>{assessment.writingPrompt}</p>
          <textarea value={writingValue} onChange={(event) => onWriting(event.target.value)} rows="7" placeholder="Write your answer here..." />
          <small>{writingValue.trim().split(/\s+/).filter(Boolean).length} words saved</small>
        </label>
      )}
      <button type="button" onClick={submit}>Submit {summative ? 'Summative' : 'Formative'} Assessment</button>
      {score !== null && <p className={passed ? 'lms-pass-note' : 'lms-review-note'}>{passed ? 'Passed. Progress has been saved.' : 'Review recommended. You can retake this assessment.'}</p>}
    </article>
  );
}

function countUnits() {
  return espCourse.levels.reduce((total, level) => total + level.units.length, 0);
}

function getCourseProgress(progress) {
  const allUnits = espCourse.levels.flatMap((level) => level.units);
  const total = allUnits.reduce((sum, unit) => sum + getUnitTotalItems(unit), 0);
  const complete = allUnits.reduce((sum, unit) => sum + getUnitCompleteItems(unit, progress), 0);
  return Math.round((complete / total) * 100);
}

function getLevelProgress(level, progress) {
  const total = level.units.reduce((sum, unit) => sum + getUnitTotalItems(unit), 0);
  const complete = level.units.reduce((sum, unit) => sum + getUnitCompleteItems(unit, progress), 0);
  return Math.round((complete / total) * 100);
}

function getUnitProgress(unit, progress) {
  return Math.round((getUnitCompleteItems(unit, progress) / getUnitTotalItems(unit)) * 100);
}

function getUnitTotalItems(unit) {
  return unit.lessons.length + 2;
}

function getUnitCompleteItems(unit, progress) {
  const lessons = unit.lessons.filter((lesson) => progress.lessons[lesson.id]).length;
  const formative = progress.formative[unit.formative.id]?.score >= 60 ? 1 : 0;
  const summative = progress.summative[unit.summative.id]?.score >= 70 ? 1 : 0;
  return lessons + formative + summative;
}

function countPassedAssessments(progress) {
  const formative = Object.values(progress.formative).filter((item) => item.score >= 60).length;
  const summative = Object.values(progress.summative).filter((item) => item.score >= 70).length;
  return formative + summative;
}
