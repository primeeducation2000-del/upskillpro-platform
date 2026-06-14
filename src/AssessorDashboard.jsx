import React, { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, ClipboardCheck, GraduationCap, LockKeyhole, LogOut, Plus, UserRoundCheck, XCircle } from 'lucide-react';
import { espCourse } from './espLmsCourse.js';

const EMPTY_PROGRESS = { lessons: {}, formative: {}, summative: {}, writing: {}, vocabulary: {}, placement: {} };
const LEVEL_OPTIONS = espCourse.levels.map((level) => ({ id: level.id, label: `${level.level} (${level.cefr})` }));

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
        startLevelId: form.get('startLevelId'),
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

  const setLearnerStartLevel = async (learnerId, startLevelId) => {
    setMarkingStatus((current) => ({ ...current, [`placement:${learnerId}`]: 'Saving placement...' }));
    const result = await fetch('/api/assessor-lms-data', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'setLearnerStartLevel',
        learnerId,
        startLevelId,
      }),
    }).then((response) => response.json()).catch(() => ({ ok: false, error: 'Could not update learner placement.' }));

    if (result.ok) {
      setMarkingStatus((current) => ({ ...current, [`placement:${learnerId}`]: 'Placement saved' }));
      await loadData();
    } else {
      setMarkingStatus((current) => ({ ...current, [`placement:${learnerId}`]: result.error || 'Could not save placement' }));
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

  const saveVocabularySentenceMark = async (evidence, mark) => {
    const statusKey = `${evidence.learnerId}:${evidence.id}`;
    setMarkingStatus((current) => ({ ...current, [statusKey]: 'Saving...' }));
    const result = await fetch('/api/assessor-lms-data', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'markVocabularySentences',
        learnerId: evidence.learnerId,
        activityId: evidence.id,
        ...mark,
      }),
    }).then((response) => response.json()).catch(() => ({ ok: false, error: 'Could not save vocabulary sentence mark.' }));

    if (result.ok) {
      setMarkingStatus((current) => ({ ...current, [statusKey]: 'Saved' }));
      await loadData();
    } else {
      setMarkingStatus((current) => ({ ...current, [statusKey]: result.error || 'Could not save' }));
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
            <label>
              <span>Start level</span>
              <select name="startLevelId" defaultValue="beginner">
                {LEVEL_OPTIONS.map((level) => <option key={level.id} value={level.id}>{level.label}</option>)}
              </select>
            </label>
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
                    <span>{learner.username} | {learner.email || 'No email'} | Starts at {labelFor(getStartLevelId(progress))}</span>
                  </div>
                  <ProgressMeter value={getCourseProgress(progress)} />
                  <span>{Object.values(progress.lessons || {}).filter(Boolean).length} lessons</span>
                  <span>{countSubmittedAssessments(progress)} submitted</span>
                  <div className="assessor-reset-controls">
                    <select
                      value={getStartLevelId(progress)}
                      onChange={(event) => setLearnerStartLevel(learner.id, event.target.value)}
                      title="Set the learner's starting level"
                    >
                      {LEVEL_OPTIONS.map((level) => <option key={level.id} value={level.id}>{level.label}</option>)}
                    </select>
                    <small>{markingStatus[`placement:${learner.id}`] || 'Placement'}</small>
                  </div>
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
            const vocabularyEvidence = getVocabularyEvidence(learner.id, learner.progress || EMPTY_PROGRESS);
            return (
              <article key={learner.id} className="assessor-learner-attempts">
                <div className="assessor-attempt-head">
                  <div>
                    <strong>{learner.full_name}</strong>
                    <span>
                      {learner.username} | {learnerAttempts.length} submitted assessment{learnerAttempts.length === 1 ? '' : 's'} |
                      {' '}{vocabularyEvidence.length} vocabulary response{vocabularyEvidence.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
                {!learnerAttempts.length && !vocabularyEvidence.length && <p className="assessor-muted">No submissions yet for this learner.</p>}
                {vocabularyEvidence.map((evidence) => (
                  <VocabularyEvidenceCard
                    key={evidence.id}
                    evidence={evidence}
                    status={markingStatus[`${evidence.learnerId}:${evidence.id}`]}
                    onSave={saveVocabularySentenceMark}
                  />
                ))}
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
                  {unit.lessons ? (
                    <>
                      {[unit.formative, unit.summative].map((assessment) => (
                        <ul key={assessment.id}>
                          {assessment.questions.map((question) => (
                            <li key={question.prompt}>{question.prompt} <span>Correct: {question.options[question.answer]}</span></li>
                          ))}
                        </ul>
                      ))}
                      {unit.vocabulary && (
                        <>
                          <p>{unit.vocabulary.title}</p>
                          <ul>
                            {unit.vocabulary.words.map((word) => <li key={word}>{word}</li>)}
                          </ul>
                        </>
                      )}
                      {unit.summative.writingPrompt && <p>Writing: {unit.summative.writingPrompt}</p>}
                    </>
                  ) : unit.vocabulary ? (
                    <>
                      <p>{unit.vocabulary.title}</p>
                      <ul>
                        {unit.vocabulary.words.map((word) => <li key={word}>{word}</li>)}
                      </ul>
                    </>
                  ) : null}
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

function VocabularyEvidenceCard({ evidence, status, onSave }) {
  return (
    <div className="assessor-attempt assessor-vocabulary-evidence">
      <div className="assessor-attempt-head">
        <div>
          <strong>{evidence.level} | Vocabulary</strong>
          <span>{evidence.title} | {new Date(evidence.submittedAt).toLocaleString()}</span>
        </div>
        <b>{evidence.score}%</b>
      </div>

      <div className="assessor-vocab-section">
        <strong>Gap-fill story answers</strong>
        <div className="assessor-answer-list">
          {evidence.story.map((item, index) => (
            <div className={item.isCorrect ? 'correct' : 'incorrect'} key={`story-${evidence.id}-${index}`}>
              {item.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>
                <strong>Gap {index + 1}</strong>
                Learner: {item.selectedAnswer || 'No answer'} | Correct: {item.correctAnswer}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="assessor-vocab-section">
        <strong>Matching answers</strong>
        <div className="assessor-answer-list">
          {evidence.matching.map((item, index) => (
            <div className={item.isCorrect ? 'correct' : 'incorrect'} key={`match-${evidence.id}-${index}`}>
              {item.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>
                <strong>{item.definition}</strong>
                Learner: {item.selectedAnswer || 'No answer'} | Correct: {item.correctAnswer}
              </span>
            </div>
          ))}
        </div>
      </div>

      <blockquote>
        <strong>Sentence writing responses</strong>
        {evidence.sentences.map((item) => (
          <span key={item.word}><b>{item.word}:</b> {item.sentence || 'No sentence submitted'}</span>
        ))}
      </blockquote>
      <VocabularySentenceMarking evidence={evidence} status={status} onSave={onSave} />
    </div>
  );
}

function VocabularySentenceMarking({ evidence, status, onSave }) {
  const [ratings, setRatings] = useState(() => Object.fromEntries(evidence.sentences.map((item) => [item.word, item.rating || ''])));
  const [feedback, setFeedback] = useState(evidence.sentenceMarks?.feedback || '');
  const [markedBy, setMarkedBy] = useState(evidence.sentenceMarks?.markedBy || 'Assessor');

  useEffect(() => {
    setRatings(Object.fromEntries(evidence.sentences.map((item) => [item.word, item.rating || ''])));
    setFeedback(evidence.sentenceMarks?.feedback || '');
    setMarkedBy(evidence.sentenceMarks?.markedBy || 'Assessor');
  }, [evidence]);

  const submit = (event) => {
    event.preventDefault();
    onSave(evidence, { ratings, feedback, markedBy });
  };

  const generateFeedback = () => {
    const weak = evidence.sentences.filter((item) => Number(ratings[item.word]) <= 2).map((item) => item.word);
    const strong = evidence.sentences.filter((item) => Number(ratings[item.word]) >= 4).map((item) => item.word);
    setFeedback([
      `Vocabulary Sentence Feedback: The learner used ${evidence.sentences.length} target words from ${evidence.title}.`,
      strong.length ? `Strong sentence use: ${strong.join(', ')}.` : 'Strength: the learner attempted the sentence-writing task.',
      weak.length ? `Development needed: improve sentence accuracy or context for ${weak.join(', ')}.` : 'Development point: continue extending sentences with clearer workplace context and accurate punctuation.',
      'Next step: rewrite any weaker sentence using a full subject, verb, and workplace detail.',
    ].join('\n'));
  };

  return (
    <form className="vocab-sentence-marking" onSubmit={submit}>
      <div className="writing-marking-head">
        <div>
          <strong>Sentence-writing marking</strong>
          <span>Rate each target-word sentence. This does not change the learner response.</span>
        </div>
        {evidence.sentenceMarks?.markedAt && <em>Marked {new Date(evidence.sentenceMarks.markedAt).toLocaleString()}</em>}
      </div>

      <div className="vocab-sentence-mark-grid">
        {evidence.sentences.map((item) => (
          <label key={item.word}>
            <span>{item.word}</span>
            <small>{item.sentence || 'No sentence submitted'}</small>
            <select value={ratings[item.word] || ''} onChange={(event) => setRatings((current) => ({ ...current, [item.word]: event.target.value }))}>
              <option value="">Select mark</option>
              {sentenceMarkScale.map((mark) => <option key={mark.value} value={mark.value}>{mark.label}</option>)}
            </select>
          </label>
        ))}
      </div>

      <div className="writing-marking-fields">
        <label>
          <span>Marked by</span>
          <input value={markedBy} onChange={(event) => setMarkedBy(event.target.value)} />
        </label>
      </div>

      <label className="writing-feedback">
        <span>Vocabulary sentence feedback</span>
        <textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} rows="4" placeholder="Give feedback on accuracy, word use, and sentence control..." />
      </label>

      <div className="writing-marking-actions">
        <button type="button" onClick={generateFeedback}>Generate Sentence Feedback</button>
        <button type="submit">Save Sentence Marks</button>
      </div>
      {status && <p className="assessor-mark-status">{status}</p>}
    </form>
  );
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

  const generateFeedback = () => {
    const estimatedGrade = grade || estimateWritingGrade(attempt, criteria);
    setGrade(estimatedGrade);
    setFeedback(buildAutomaticWritingFeedback(attempt, estimatedGrade, criteria));
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

      <div className="writing-marking-actions">
        <button type="button" onClick={generateFeedback}>Generate Automatic Feedback</button>
        <button type="submit">Save Writing Mark</button>
      </div>
      {status && <p className="assessor-mark-status">{status}</p>}
    </form>
  );
}

function getCourseProgress(progress) {
  const startIndex = getStartLevelIndex(progress);
  const allUnits = espCourse.levels.slice(startIndex).flatMap((level) => level.units);
  const total = allUnits.reduce((sum, unit) => sum + getUnitTotalItems(unit), 0);
  const complete = allUnits.reduce((sum, unit) => {
    if (unit.vocabulary && !unit.lessons) return sum + (progress.vocabulary?.[unit.vocabulary.id]?.score !== undefined ? 1 : 0);
    const lessons = unit.lessons.filter((lesson) => progress.lessons?.[lesson.id]).length;
    const vocabulary = unit.vocabulary && progress.vocabulary?.[unit.vocabulary.id]?.score !== undefined ? 1 : 0;
    const formative = progress.formative?.[unit.formative.id]?.score !== undefined ? 1 : 0;
    const summative = progress.summative?.[unit.summative.id]?.score !== undefined ? 1 : 0;
    return sum + lessons + vocabulary + formative + summative;
  }, 0);
  return Math.round((complete / total) * 100);
}

function getStartLevelId(progress) {
  return progress?.placement?.startLevelId || 'beginner';
}

function getStartLevelIndex(progress) {
  return Math.max(0, espCourse.levels.findIndex((level) => level.id === getStartLevelId(progress)));
}

function getUnitTotalItems(unit) {
  if (unit.vocabulary && !unit.lessons) return 1;
  return unit.lessons.length + (unit.vocabulary ? 1 : 0) + 2;
}

function countSubmittedAssessments(progress) {
  const formative = Object.values(progress.formative || {}).filter((item) => item.score !== undefined).length;
  const summative = Object.values(progress.summative || {}).filter((item) => item.score !== undefined).length;
  return formative + summative;
}

function getVocabularyEvidence(learnerId, progress) {
  return espCourse.levels.flatMap((level) => level.units
    .filter((unit) => unit.vocabulary)
    .map((unit) => {
      const activity = unit.vocabulary;
      const saved = progress.vocabulary?.[activity.id];
      if (!saved?.submittedAt) return null;
      const gaps = activity.story.filter((item) => item.type === 'gap');
      return {
        id: activity.id,
        learnerId,
        level: level.level,
        title: activity.title,
        score: saved.score ?? 0,
        submittedAt: saved.submittedAt,
        story: gaps.map((gapItem, index) => ({
          selectedAnswer: saved.storyAnswers?.[index] || '',
          correctAnswer: gapItem.answer,
          isCorrect: saved.storyAnswers?.[index] === gapItem.answer,
        })),
        matching: activity.match.map((item, index) => ({
          definition: item.definition,
          selectedAnswer: saved.matchingAnswers?.[index] || '',
          correctAnswer: item.word,
          isCorrect: saved.matchingAnswers?.[index] === item.word,
        })),
        sentences: activity.writingWords.map((word) => ({
          word,
          sentence: saved.sentences?.[word] || '',
          rating: saved.sentenceMarks?.ratings?.[word] || '',
        })),
        sentenceMarks: saved.sentenceMarks || null,
      };
    })
    .filter(Boolean));
}

const sentenceMarkScale = [
  { value: '1', label: '1 - Not yet accurate' },
  { value: '2', label: '2 - Partly correct' },
  { value: '3', label: '3 - Clear sentence' },
  { value: '4', label: '4 - Strong sentence' },
  { value: '5', label: '5 - Excellent use' },
];

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

function buildAutomaticWritingFeedback(attempt, grade, criteria) {
  const writing = String(attempt.writing_response || '').trim();
  const words = writing ? writing.split(/\s+/).filter(Boolean).length : 0;
  const selectedGrade = grade || estimateWritingGrade(attempt, criteria);
  const strengths = [];
  const improvements = [];

  Object.entries(criteria).forEach(([criterionId, value]) => {
    const criterion = writingCriteria.find((item) => item.id === criterionId);
    if (!criterion || !value) return;
    const rating = Number(value);
    if (rating >= 4) strengths.push(`${criterion.label}: secure evidence for ${selectedGrade}.`);
    if (rating <= 2) improvements.push(`${criterion.label}: needs further development before this can be considered secure at ${selectedGrade}.`);
  });

  if (words < 50) improvements.push('The response is short, so the learner should add more detail, examples, and complete sentence development.');
  if (words >= 50 && words <= 160) strengths.push('The response provides a workable amount of evidence for assessor review.');
  if (words > 160) strengths.push('The learner has produced an extended response, giving more evidence of organisation and language control.');

  const hasConnectors = /\b(first|next|because|however|therefore|also|finally|although|for example)\b/i.test(writing);
  if (hasConnectors) strengths.push('There is some useful linking language to connect ideas.');
  else improvements.push('The learner should use more linking words such as because, however, for example, next, and finally.');

  const sentenceCount = writing.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean).length;
  if (sentenceCount <= 2 && words > 40) improvements.push('The writing would be clearer if it was divided into more complete sentences or short paragraphs.');

  return [
    `Automatic Feedback: The writing has been reviewed against the UpskillPro ESP writing criteria. Overall provisional grade: ${selectedGrade}. Word count: ${words}.`,
    '',
    `Strengths: ${strengths.length ? strengths.join(' ') : 'The learner has attempted the task and provided evidence that can be developed through assessor feedback.'}`,
    '',
    `Development points: ${improvements.length ? improvements.join(' ') : 'To improve further, the learner should continue developing accuracy, range, and professional clarity.'}`,
    '',
    'Recommended next step: Review the feedback, correct key errors, and complete the next writing task with clearer organisation, more precise vocabulary, and examples linked to the workplace context.',
  ].join('\n');
}

function estimateWritingGrade(attempt, criteria) {
  const levelGrades = {
    beginner: 'A1',
    elementary: 'A2',
    intermediate: 'B1',
    'upper-intermediate': 'B2',
    advanced: 'C1',
  };
  const gradeOrder = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const baseGrade = levelGrades[attempt.level_id] || 'A1';
  const ratings = Object.values(criteria).map((value) => Number(value)).filter(Boolean);
  const average = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : 3;
  let offset = 0;

  if (average < 1.8) offset = -2;
  else if (average < 2.6) offset = -1;
  else if (average >= 4.7) offset = 1;

  const words = String(attempt.writing_response || '').trim().split(/\s+/).filter(Boolean).length;
  if (words > 220 && attempt.level_id === 'advanced' && average >= 4.6) offset = 1;
  if (words < 35 && offset > -1) offset = -1;

  const index = Math.max(0, Math.min(gradeOrder.length - 1, gradeOrder.indexOf(baseGrade) + offset));
  return gradeOrder[index];
}

const resetOptions = buildResetOptions();

function buildResetOptions() {
  const allLessons = [];
  const allFormative = [];
  const allSummative = [];
  const allVocabulary = [];
  const options = [];

  espCourse.levels.forEach((level) => {
    const levelLessons = [];
    const levelFormative = [];
    const levelSummative = [];
    const levelVocabulary = [];

    level.units.forEach((unit) => {
      if (unit.vocabulary && !unit.lessons) {
        levelVocabulary.push(unit.vocabulary.id);
        allVocabulary.push(unit.vocabulary.id);
        options.push({
          id: `vocabulary:${unit.vocabulary.id}`,
          label: `Vocabulary - ${level.level}`,
          reset: { vocabularyIds: [unit.vocabulary.id] },
        });
        return;
      }

      const unitLessons = unit.lessons.map((lesson) => lesson.id);
      const unitFormative = [unit.formative.id];
      const unitSummative = [unit.summative.id];
      const unitVocabulary = unit.vocabulary ? [unit.vocabulary.id] : [];
      levelLessons.push(...unitLessons);
      levelFormative.push(...unitFormative);
      levelSummative.push(...unitSummative);
      levelVocabulary.push(...unitVocabulary);
      allLessons.push(...unitLessons);
      allFormative.push(...unitFormative);
      allSummative.push(...unitSummative);
      allVocabulary.push(...unitVocabulary);

      options.push({
        id: `unit:${unit.id}`,
        label: `Unit - ${level.level}: ${unit.title}`,
        reset: { lessonIds: unitLessons, formativeIds: unitFormative, summativeIds: unitSummative, vocabularyIds: unitVocabulary },
      });
      unit.lessons.forEach((lesson) => {
        options.push({ id: `lesson:${lesson.id}`, label: `Lesson - ${lesson.title}`, reset: { lessonIds: [lesson.id] } });
      });
      if (unit.vocabulary) options.push({ id: `vocabulary:${unit.vocabulary.id}`, label: `Vocabulary - ${unit.title}`, reset: { vocabularyIds: unitVocabulary } });
      options.push({ id: `formative:${unit.formative.id}`, label: `Formative - ${unit.title}`, reset: { formativeIds: unitFormative } });
      options.push({ id: `summative:${unit.summative.id}`, label: `Final - ${unit.title}`, reset: { summativeIds: unitSummative } });
    });

    options.push({
      id: `level:${level.id}`,
      label: `Level - ${level.level}`,
      reset: { lessonIds: levelLessons, formativeIds: levelFormative, summativeIds: levelSummative, vocabularyIds: levelVocabulary },
    });
  });

  return [
    { id: 'all', label: 'Entire pathway', reset: { clearAll: true, lessonIds: allLessons, formativeIds: allFormative, summativeIds: allSummative, vocabularyIds: allVocabulary } },
    ...options,
  ];
}

function labelFor(levelId) {
  return espCourse.levels.find((level) => level.id === levelId)?.level || levelId;
}

function unitLabelFor(unitId) {
  return espCourse.levels.flatMap((level) => level.units).find((unit) => unit.id === unitId)?.title || unitId;
}
