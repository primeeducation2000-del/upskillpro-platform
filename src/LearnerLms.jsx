import React, { useEffect, useState } from 'react';
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
  const [activeStepId, setActiveStepId] = useState(espCourse.levels[0].units[0].lessons[0].id);

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
  const unitSteps = getUnitSteps(selectedUnit);
  const activeStep = unitSteps.find((step) => step.id === activeStepId) || getFirstAvailableStep(selectedUnit, progress);

  useEffect(() => {
    if (!isStepAvailable(selectedUnit, activeStepId, progress)) {
      setActiveStepId(getFirstAvailableStep(selectedUnit, progress).id);
    }
  }, [activeStepId, progress, selectedUnit]);

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
          {espCourse.levels.map((level, levelIndex) => {
            const levelProgress = getLevelProgress(level, progress);
            const unlocked = isLevelUnlocked(levelIndex, progress);
            return (
              <button
                key={level.id}
                type="button"
                disabled={!unlocked}
                className={`${level.id === selectedLevel.id ? 'active' : ''} ${unlocked ? '' : 'locked'}`}
                onClick={() => {
                  if (!unlocked) return;
                  setSelectedLevelId(level.id);
                  setSelectedUnitId(level.units[0].id);
                  setActiveStepId(getFirstAvailableStep(level.units[0], progress).id);
                }}
              >
                <span>
                  <strong>{level.level}</strong>
                  <small>{unlocked ? level.cefr : `Locked until previous level is complete`}</small>
                </span>
                <em>{unlocked ? `${levelProgress}%` : 'Locked'}</em>
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
            {selectedLevel.units.map((unit, unitIndex) => {
              const unlocked = isUnitUnlocked(selectedLevel, unitIndex, progress);
              return (
              <button
                key={unit.id}
                disabled={!unlocked}
                className={`${unit.id === selectedUnit.id ? 'active' : ''} ${unlocked ? '' : 'locked'}`}
                type="button"
                onClick={() => {
                  if (!unlocked) return;
                  setSelectedUnitId(unit.id);
                  setActiveStepId(getFirstAvailableStep(unit, progress).id);
                }}
              >
                {unit.title}
                <small>{unlocked ? `${getUnitProgress(unit, progress)}%` : 'Locked'}</small>
              </button>
              );
            })}
          </div>
        </section>

        <section className="lms-unit-detail">
          <div className="lms-unit-summary">
            <p>Unit outcome</p>
            <h2>{selectedUnit.title}</h2>
            <span>{selectedUnit.outcome}</span>
            <ProgressBar value={unitProgress} />
          </div>

          <div className="lms-step-shell">
            <StepNavigator unit={selectedUnit} activeStepId={activeStep.id} progress={progress} onSelect={setActiveStepId} />
            <StepContent
              step={activeStep}
              unit={selectedUnit}
              progress={progress}
              updateProgress={updateProgress}
              onNext={() => setActiveStepId(getNextAvailableStep(selectedUnit, activeStep.id, progress).id)}
            />
          </div>
        </section>
      </section>
    </main>
  );
}

function StepNavigator({ unit, activeStepId, progress, onSelect }) {
  return (
    <div className="lms-step-nav">
      {getUnitSteps(unit).map((step, index) => {
        const available = isStepAvailable(unit, step.id, progress);
        const complete = isStepComplete(step, progress);
        return (
          <button
            key={step.id}
            type="button"
            disabled={!available}
            className={`${step.id === activeStepId ? 'active' : ''} ${complete ? 'complete' : ''} ${available ? '' : 'locked'}`}
            onClick={() => available && onSelect(step.id)}
          >
            <span>{index + 1}</span>
            <strong>{step.label}</strong>
            <small>{complete ? 'Complete' : available ? 'Available' : 'Locked'}</small>
          </button>
        );
      })}
    </div>
  );
}

function StepContent({ step, unit, progress, updateProgress, onNext }) {
  if (step.kind === 'lesson') {
    const lesson = step.lesson;
    const complete = Boolean(progress.lessons[lesson.id]);

    return (
      <article className={`lms-step-card ${complete ? 'complete' : ''}`}>
        <div className="lms-step-card-head">
          <PlayCircle size={24} />
          <div>
            <p>Knowledge Lesson</p>
            <h3>{lesson.title}</h3>
          </div>
        </div>
        <p>{lesson.objective}</p>
        <div className="lms-language-box">
          <strong>Useful language</strong>
          <ul>{lesson.language.map((phrase) => <li key={phrase}>{phrase}</li>)}</ul>
        </div>
        <div className="lms-practice-box">
          <strong>Practice task</strong>
          <p>{lesson.task}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            updateProgress((current) => ({ ...current, lessons: { ...current.lessons, [lesson.id]: true } }));
            window.setTimeout(onNext, 120);
          }}
        >
          <CheckCircle2 size={17} />
          {complete ? 'Lesson Complete - Continue' : 'Mark Lesson Complete'}
        </button>
      </article>
    );
  }

  if (step.kind === 'formative') {
    return (
      <QuizCard
        type="Formative Assessment"
        icon={ClipboardCheck}
        assessment={unit.formative}
        saved={progress.formative[unit.formative.id]}
        onSave={(result) => updateProgress((current) => ({ ...current, formative: { ...current.formative, [unit.formative.id]: result } }))}
        onPassed={onNext}
      />
    );
  }

  return (
    <QuizCard
      type="Final Summative Assessment"
      icon={GraduationCap}
      assessment={unit.summative}
      saved={progress.summative[unit.summative.id]}
      writingValue={progress.writing[unit.summative.id] || ''}
      onWriting={(value) => updateProgress((current) => ({ ...current, writing: { ...current.writing, [unit.summative.id]: value } }))}
      onSave={(result) => updateProgress((current) => ({ ...current, summative: { ...current.summative, [unit.summative.id]: result } }))}
      summative
    />
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

function QuizCard({ type, icon: Icon, assessment, saved, onSave, onPassed, summative = false, writingValue = '', onWriting }) {
  const [answers, setAnswers] = useState({});
  const score = saved?.score ?? null;
  const passed = score !== null && score >= (summative ? 70 : 60);

  const submit = () => {
    const correct = assessment.questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
    const nextScore = Math.round((correct / assessment.questions.length) * 100);
    onSave({ score: nextScore, correct, total: assessment.questions.length, submittedAt: new Date().toISOString() });
    if (nextScore >= (summative ? 70 : 60)) window.setTimeout(() => onPassed?.(), 160);
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

function getUnitSteps(unit) {
  return [
    ...unit.lessons.map((lesson, index) => ({ id: lesson.id, kind: 'lesson', lesson, label: `Lesson ${index + 1}` })),
    { id: unit.formative.id, kind: 'formative', label: 'Formative Check' },
    { id: unit.summative.id, kind: 'summative', label: 'Final Assessment' },
  ];
}

function getFirstAvailableStep(unit, progress) {
  const steps = getUnitSteps(unit);
  return steps.find((step) => isStepAvailable(unit, step.id, progress) && !isStepComplete(step, progress)) || steps[steps.length - 1];
}

function getNextAvailableStep(unit, currentStepId, progress, assumedCompleteStepId = currentStepId) {
  const steps = getUnitSteps(unit);
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);
  return steps.slice(currentIndex + 1).find((step) => isStepAvailable(unit, step.id, progress, assumedCompleteStepId)) || steps[currentIndex] || steps[0];
}

function isStepAvailable(unit, stepId, progress, assumedCompleteStepId = '') {
  const steps = getUnitSteps(unit);
  const stepIndex = steps.findIndex((step) => step.id === stepId);
  if (stepIndex <= 0) return true;
  return steps.slice(0, stepIndex).every((step) => step.id === assumedCompleteStepId || isStepComplete(step, progress));
}

function isStepComplete(step, progress) {
  if (step.kind === 'lesson') return Boolean(progress.lessons[step.id]);
  if (step.kind === 'formative') return progress.formative[step.id]?.score >= 60;
  return progress.summative[step.id]?.score >= 70;
}

function isLevelUnlocked(levelIndex, progress) {
  if (levelIndex === 0) return true;
  return getLevelProgress(espCourse.levels[levelIndex - 1], progress) === 100;
}

function isUnitUnlocked(level, unitIndex, progress) {
  if (unitIndex === 0) return true;
  return getUnitProgress(level.units[unitIndex - 1], progress) === 100;
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
