import { useEffect, useRef } from 'react';

const SESSION_KEY = 'upskillpro-analytics-session';
const ENTRY_KEY = 'upskillpro-analytics-entry';

function getSessionId() {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const next = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, next);
  return next;
}

function getEntryPage(path) {
  const existing = sessionStorage.getItem(ENTRY_KEY);
  if (existing) return existing;
  sessionStorage.setItem(ENTRY_KEY, path);
  return path;
}

function getCourse(path) {
  const clean = path.toLowerCase();
  if (clean.includes('aws')) return 'AWS Training';
  if (clean.includes('ccna')) return 'CCNA';
  if (clean.includes('cyber')) return 'Cyber Security';
  if (clean.includes('ai')) return 'AI Courses';
  if (clean.includes('digital')) return 'Digital Skills';
  if (clean.includes('esol') || clean.includes('english')) return 'ESOL';
  if (clean.includes('childcare')) return 'Childcare';
  if (clean.includes('retail')) return 'Retail Courses';
  return 'General UpSkillPro';
}

function sendAnalyticsEvent(eventType, startedAt) {
  const durationSeconds = Math.round((Date.now() - startedAt.current) / 1000);
  if (eventType === 'page_exit' && durationSeconds < 5) return;

  const path = window.location.pathname;
  const payload = {
    eventType,
    sessionId: getSessionId(),
    path,
    pageUrl: window.location.href,
    referrer: document.referrer,
    course: getCourse(path),
    entryPage: getEntryPage(path),
    exitPage: eventType === 'page_exit' ? path : '',
    durationSeconds,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics-track', new Blob([body], { type: 'application/json' }));
    return;
  }

  fetch('/api/analytics-track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function AnalyticsTracker({ path }) {
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (path.startsWith('/admin-analytics') || path.startsWith('/esol-initial-assessment')) return undefined;
    startedAt.current = Date.now();
    sendAnalyticsEvent('page_view', startedAt);
    const heartbeat = window.setInterval(() => sendAnalyticsEvent('heartbeat', startedAt), 60000);
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') sendAnalyticsEvent('page_exit', startedAt);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      sendAnalyticsEvent('page_exit', startedAt);
      window.clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [path]);

  return null;
}
