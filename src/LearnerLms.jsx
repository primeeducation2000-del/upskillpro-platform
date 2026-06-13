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
const EMPTY_PROGRESS = { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {} };

function progressStorageKey(learner) {
  return learner?.username ? `${LMS_PROGRESS_KEY}-${learner.username}` : LMS_PROGRESS_KEY;
}

function readProgress(learner = null) {
  try {
    return { ...EMPTY_PROGRESS, ...(JSON.parse(localStorage.getItem(progressStorageKey(learner))) || {}) };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function saveProgress(progress, learner = null) {
  localStorage.setItem(progressStorageKey(learner), JSON.stringify(progress));
}

export default function LearnerLms() {
  const [isAuthed, setIsAuthed] = useState(() => Boolean(localStorage.getItem(LMS_SESSION_KEY)));
  const [learner, setLearner] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LMS_SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });
  const [loginError, setLoginError] = useState('');
  const [loadingSession, setLoadingSession] = useState(true);
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

  useEffect(() => {
    if (learner) saveProgress(progress, learner);
  }, [learner, progress]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/lms-learner-auth', { credentials: 'include' })
      .then((response) => response.json())
      .then(async (data) => {
        if (cancelled) return;
        if (data.ok && data.learner) {
          setLearner(data.learner);
          localStorage.setItem(LMS_SESSION_KEY, JSON.stringify(data.learner));
          setIsAuthed(true);
          const progressResponse = await fetch('/api/lms-progress', { credentials: 'include' }).then((response) => response.json()).catch(() => null);
          if (!cancelled) setProgress({ ...EMPTY_PROGRESS, ...(progressResponse?.progress || readProgress(data.learner)) });
        } else {
          localStorage.removeItem(LMS_SESSION_KEY);
          setIsAuthed(false);
          setLearner(null);
        }
      })
      .catch(() => {
        if (!cancelled) setIsAuthed(Boolean(localStorage.getItem(LMS_SESSION_KEY)));
      })
      .finally(() => {
        if (!cancelled) setLoadingSession(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const login = async (event) => {
    event.preventDefault();
    setLoginError('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/lms-learner-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.get('username'),
        accessCode: form.get('accessCode'),
      }),
    }).then((item) => item.json()).catch(() => ({ ok: false, error: 'Login service is not available.' }));

    if (!response.ok) {
      setLoginError(response.error || 'Invalid username or access code.');
      return;
    }
    setLearner(response.learner);
    localStorage.setItem(LMS_SESSION_KEY, JSON.stringify(response.learner));
    setIsAuthed(true);
    const progressResponse = await fetch('/api/lms-progress', { credentials: 'include' }).then((item) => item.json()).catch(() => null);
    setProgress({ ...EMPTY_PROGRESS, ...(progressResponse?.progress || readProgress(response.learner)) });
  };

  const logout = async () => {
    await fetch('/api/lms-learner-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    }).catch(() => null);
    localStorage.removeItem(LMS_SESSION_KEY);
    setIsAuthed(false);
    setLearner(null);
    setProgress(EMPTY_PROGRESS);
  };

  const persistProgress = (nextProgress, attempt = null) => {
    fetch('/api/lms-progress', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: nextProgress, attempt }),
    }).catch(() => null);
  };

  const updateProgress = (updater, attempt = null) => setProgress((current) => {
    const next = updater(current);
    saveProgress(next, learner);
    persistProgress(next, attempt);
    return next;
  });

  if (loadingSession) return <div className="admin-loading">Loading learner portal...</div>;
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
            <span>Welcome, {learner?.username || learner?.fullName || 'learner'}. {espCourse.subtitle}</span>
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
          <LmsKpi icon={Award} label="Assessments Submitted" value={countSubmittedAssessments(progress)} />
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
              level={selectedLevel}
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

function StepContent({ step, unit, level, progress, updateProgress, onNext }) {
  if (step.kind === 'vocabulary') {
    return (
      <VocabularyCard
        level={level}
        unit={unit}
        saved={progress.vocabulary[unit.vocabulary.id]}
        onSave={(result) => updateProgress((current) => ({ ...current, vocabulary: { ...current.vocabulary, [unit.vocabulary.id]: result } }))}
      />
    );
  }

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
        level={level}
        unit={unit}
        assessment={unit.formative}
        saved={progress.formative[unit.formative.id]}
        onSave={(result, attempt) => updateProgress((current) => ({ ...current, formative: { ...current.formative, [unit.formative.id]: result } }), attempt)}
        onPassed={onNext}
      />
    );
  }

  return (
    <QuizCard
      type="Final Summative Assessment"
      icon={GraduationCap}
      level={level}
      unit={unit}
      assessment={unit.summative}
      saved={progress.summative[unit.summative.id]}
      writingValue={progress.writing[unit.summative.id] || ''}
      onWriting={(value) => updateProgress((current) => ({ ...current, writing: { ...current.writing, [unit.summative.id]: value } }))}
      onSave={(result, attempt) => updateProgress((current) => ({ ...current, summative: { ...current.summative, [unit.summative.id]: result } }), attempt)}
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
          <span>Username</span>
          <input name="username" required autoComplete="username" placeholder="learner001" />
        </label>
        <label>
          <span>Access code</span>
          <input name="accessCode" type="password" required autoComplete="current-password" placeholder="Learner001!" />
        </label>
        {error && <div className="lms-login-error">{error}</div>}
        <button type="submit">Enter LMS <ChevronRight size={18} /></button>
        <small>Use the unique username and access code issued by your assessor.</small>
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

function QuizCard({ type, icon: Icon, level, unit, assessment, saved, onSave, onPassed, summative = false, writingValue = '', onWriting }) {
  const [answers, setAnswers] = useState({});
  const score = saved?.score ?? null;
  const submitted = score !== null;
  const passed = submitted && score >= (summative ? 70 : 60);

  useEffect(() => {
    if (!saved?.answers) {
      setAnswers({});
      return;
    }
    setAnswers(Object.fromEntries(saved.answers.map((answer, index) => [index, answer.selectedIndex]).filter(([, value]) => value !== null && value !== undefined)));
  }, [assessment.id, saved]);

  const submit = () => {
    if (submitted) return;
    const correct = assessment.questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
    const nextScore = Math.round((correct / assessment.questions.length) * 100);
    const answerDetails = assessment.questions.map((question, index) => ({
      question: question.prompt,
      selectedIndex: answers[index] ?? null,
      selectedAnswer: answers[index] === undefined ? '' : question.options[answers[index]],
      correctIndex: question.answer,
      correctAnswer: question.options[question.answer],
      isCorrect: answers[index] === question.answer,
    }));
    const result = { score: nextScore, correct, total: assessment.questions.length, submittedAt: new Date().toISOString(), answers: answerDetails };
    onSave(result, {
      assessmentId: assessment.id,
      assessmentType: summative ? 'summative' : 'formative',
      levelId: level.id,
      unitId: unit.id,
      score: nextScore,
      correct,
      total: assessment.questions.length,
      answers: answerDetails,
      writingResponse: summative ? writingValue : '',
    });
    window.setTimeout(() => onPassed?.(), 160);
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
              <label className={submitted && answers[index] === optionIndex ? 'selected-answer' : ''} key={option}>
                <input
                  type="radio"
                  name={`${assessment.id}-${index}`}
                  checked={answers[index] === optionIndex}
                  disabled={submitted}
                  onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                />
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
          <textarea value={writingValue} disabled={submitted} onChange={(event) => onWriting(event.target.value)} rows="7" placeholder="Write your answer here..." />
          <small>{writingValue.trim().split(/\s+/).filter(Boolean).length} words saved</small>
        </label>
      )}
      <button type="button" disabled={submitted} onClick={submit}>{submitted ? 'Assessment Submitted' : `Submit ${summative ? 'Summative' : 'Formative'} Assessment`}</button>
      {submitted && <p className={passed ? 'lms-pass-note' : 'lms-review-note'}>{passed ? 'Submitted and passed. The evidence has been saved.' : 'Submitted for assessor feedback. The evidence has been saved.'}</p>}
    </article>
  );
}

function VocabularyCard({ level, unit, saved, onSave }) {
  const activity = unit.vocabulary;
  const [storyAnswers, setStoryAnswers] = useState(saved?.storyAnswers || {});
  const [matchingAnswers, setMatchingAnswers] = useState(saved?.matchingAnswers || {});
  const [sentences, setSentences] = useState(saved?.sentences || {});
  const submitted = Boolean(saved?.submittedAt);

  useEffect(() => {
    setStoryAnswers(saved?.storyAnswers || {});
    setMatchingAnswers(saved?.matchingAnswers || {});
    setSentences(saved?.sentences || {});
  }, [activity.id, saved]);

  const gaps = activity.story.filter((item) => item.type === 'gap');
  const submit = () => {
    if (submitted) return;
    const storyCorrect = gaps.reduce((total, gapItem, index) => total + (storyAnswers[index] === gapItem.answer ? 1 : 0), 0);
    const matchingCorrect = activity.match.reduce((total, item, index) => total + (matchingAnswers[index] === item.word ? 1 : 0), 0);
    const total = gaps.length + activity.match.length;
    const score = Math.round(((storyCorrect + matchingCorrect) / total) * 100);
    onSave({
      storyAnswers,
      matchingAnswers,
      sentences,
      score,
      correct: storyCorrect + matchingCorrect,
      total,
      submittedAt: new Date().toISOString(),
    });
  };

  return (
    <article className={`lms-step-card vocabulary-card ${submitted ? 'complete' : ''}`}>
      <div className="lms-step-card-head">
        <BookOpenCheck size={24} />
        <div>
          <p>{level.cefr} Vocabulary</p>
          <h3>{activity.title}</h3>
        </div>
      </div>
      <p>Use the ten pre-taught words below to complete the vocabulary practice before moving on.</p>
      <div className="vocabulary-word-bank">
        {activity.words.map((word) => <span key={word}>{word}</span>)}
      </div>

      <section className="vocabulary-exercise">
        <h4>1. Gap-fill story</h4>
        <p className="vocabulary-story">
          {activity.story.map((part, index) => {
            if (part.type === 'text') return <span key={`${part.value}-${index}`}>{part.value}</span>;
            const gapIndex = activity.story.slice(0, index).filter((item) => item.type === 'gap').length;
            return (
              <select
                key={`${part.answer}-${index}`}
                value={storyAnswers[gapIndex] || ''}
                disabled={submitted}
                onChange={(event) => setStoryAnswers((current) => ({ ...current, [gapIndex]: event.target.value }))}
              >
                <option value="">Choose</option>
                {part.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            );
          })}
        </p>
      </section>

      <section className="vocabulary-exercise">
        <h4>2. Match words to definitions</h4>
        <div className="vocabulary-match-grid">
          {activity.match.map((item, index) => (
            <label key={item.definition}>
              <span>{item.definition}</span>
              <select
                value={matchingAnswers[index] || ''}
                disabled={submitted}
                onChange={(event) => setMatchingAnswers((current) => ({ ...current, [index]: event.target.value }))}
              >
                <option value="">Choose word</option>
                {activity.match.map((option) => <option key={option.word} value={option.word}>{option.word}</option>)}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className="vocabulary-exercise">
        <h4>3. Write your own sentences</h4>
        <div className="vocabulary-sentence-grid">
          {activity.writingWords.map((word) => (
            <label key={word}>
              <span>{word}</span>
              <input
                value={sentences[word] || ''}
                disabled={submitted}
                placeholder={`Write one sentence using "${word}"`}
                onChange={(event) => setSentences((current) => ({ ...current, [word]: capitaliseSentence(event.target.value) }))}
              />
            </label>
          ))}
        </div>
      </section>

      <button type="button" disabled={submitted} onClick={submit}>{submitted ? `Vocabulary Submitted (${saved.score}%)` : 'Submit Vocabulary Practice'}</button>
      {submitted && <p className={saved.score >= 60 ? 'lms-pass-note' : 'lms-review-note'}>Vocabulary evidence saved. Score: {saved.score}%.</p>}
    </article>
  );
}

function countUnits() {
  return espCourse.levels.reduce((total, level) => total + level.units.length, 0);
}

function getUnitSteps(unit) {
  if (unit.vocabulary) return [{ id: unit.vocabulary.id, kind: 'vocabulary', label: 'Vocabulary Practice' }];

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
  if (step.kind === 'vocabulary') return progress.vocabulary[step.id]?.score !== undefined;
  if (step.kind === 'lesson') return Boolean(progress.lessons[step.id]);
  if (step.kind === 'formative') return progress.formative[step.id]?.score !== undefined;
  return progress.summative[step.id]?.score !== undefined;
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
  if (unit.vocabulary) return 1;
  return unit.lessons.length + 2;
}

function getUnitCompleteItems(unit, progress) {
  if (unit.vocabulary) return progress.vocabulary[unit.vocabulary.id]?.score !== undefined ? 1 : 0;
  const lessons = unit.lessons.filter((lesson) => progress.lessons[lesson.id]).length;
  const formative = progress.formative[unit.formative.id]?.score !== undefined ? 1 : 0;
  const summative = progress.summative[unit.summative.id]?.score !== undefined ? 1 : 0;
  return lessons + formative + summative;
}

function countSubmittedAssessments(progress) {
  const formative = Object.values(progress.formative).filter((item) => item.score !== undefined).length;
  const summative = Object.values(progress.summative).filter((item) => item.score !== undefined).length;
  return formative + summative;
}

function capitaliseSentence(value) {
  const trimmedStart = value.match(/^\s*/)?.[0] || '';
  const rest = value.slice(trimmedStart.length);
  if (!rest) return value;
  return `${trimmedStart}${rest.charAt(0).toUpperCase()}${rest.slice(1)}`;
}
