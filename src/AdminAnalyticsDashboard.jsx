import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileSpreadsheet,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Map,
  MonitorSmartphone,
  PieChart,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const sessionKey = 'upskillpro-admin-activity';

const navItems = [
  ['Overview', LayoutDashboard],
  ['Live Visitors', Radio],
  ['Analytics', BarChart3],
  ['Geography', Globe2],
  ['Traffic Sources', PieChart],
  ['Course Performance', TrendingUp],
  ['Leads', Users],
  ['Reports', FileSpreadsheet],
  ['AI Insights', Bot],
  ['Settings', Settings],
];

const courses = ['AWS Training', 'CCNA', 'Cyber Security', 'AI Courses', 'Digital Skills', 'ESOL', 'Childcare', 'Retail Courses'];
const sources = ['Google Search', 'Direct', 'LinkedIn', 'Instagram', 'Facebook', 'Bing', 'YouTube', 'Email', 'Referral'];
const cities = [
  ['United Kingdom', 'London', 51.5072, -0.1276],
  ['United Kingdom', 'Birmingham', 52.4862, -1.8904],
  ['United Arab Emirates', 'Dubai', 25.2048, 55.2708],
  ['Saudi Arabia', 'Riyadh', 24.7136, 46.6753],
  ['Qatar', 'Doha', 25.2854, 51.531],
  ['India', 'Mumbai', 19.076, 72.8777],
  ['Nigeria', 'Lagos', 6.5244, 3.3792],
  ['United States', 'New York', 40.7128, -74.006],
];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createVisitor(index = 0) {
  const [country, city, lat, lon] = randomItem(cities);
  const course = randomItem(courses);
  const source = randomItem(sources);
  const devices = ['Desktop', 'Mobile', 'Tablet'];
  const browsers = ['Chrome', 'Safari', 'Edge', 'Firefox'];
  const systems = ['Windows', 'iOS', 'Android', 'macOS'];
  const duration = Math.floor(40 + Math.random() * 760);
  return {
    id: `UP-${Date.now().toString(36).slice(-5).toUpperCase()}-${index}`,
    page: `/${course.toLowerCase().replaceAll(' ', '-')}`,
    country,
    city,
    lat,
    lon,
    device: randomItem(devices),
    browser: randomItem(browsers),
    os: randomItem(systems),
    duration,
    source,
    entry: source === 'Direct' ? '/' : '/programmes',
    exit: Math.random() > 0.72 ? '/contact' : 'Active',
    pages: Math.floor(1 + Math.random() * 8),
    timezone: country === 'United Kingdom' ? 'Europe/London' : 'Local visitor time',
    lastActivity: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    course,
  };
}

const initialVisitors = Array.from({ length: 7 }, (_, index) => createVisitor(index));

export default function AdminAnalyticsDashboard() {
  const [session, setSession] = useState({ loading: true, ok: false });
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState('Overview');
  const [visitors, setVisitors] = useState(initialVisitors);
  const [tick, setTick] = useState(0);
  const [logs, setLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(sessionKey)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.title = 'UpSkillPro Admin Analytics';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex,nofollow,noarchive');

    fetch('/api/admin-auth', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setSession({ loading: false, ok: data.ok, expiresAt: data.expiresAt }))
      .catch(() => setSession({ loading: false, ok: false }));
  }, []);

  useEffect(() => {
    if (!session.ok) return undefined;
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
      setVisitors((current) => [createVisitor(current.length), ...current.slice(0, 11)]);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [session.ok]);

  useEffect(() => {
    if (!session.ok) return undefined;
    const timeout = window.setTimeout(() => logout(), 30 * 60 * 1000);
    return () => window.clearTimeout(timeout);
  }, [session.ok]);

  const metrics = useMemo(() => buildMetrics(visitors, tick), [visitors, tick]);
  const notifications = useMemo(() => buildNotifications(visitors), [visitors]);
  const countryRows = useMemo(() => summarise(visitors, 'country'), [visitors]);
  const cityRows = useMemo(() => summarise(visitors, 'city'), [visitors]);

  const logEvent = (message) => {
    const entry = { timestamp: new Date().toISOString(), message };
    const next = [entry, ...logs].slice(0, 30);
    setLogs(next);
    localStorage.setItem(sessionKey, JSON.stringify(next));
  };

  const login = async (event) => {
    event.preventDefault();
    setLoginError('');
    const response = await fetch('/api/admin-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, mfaCode }),
    });
    const data = await response.json();
    if (!data.ok) {
      setLoginError(data.error || 'Login failed.');
      return;
    }
    setSession({ loading: false, ok: true });
    logEvent('Admin signed in to analytics dashboard');
  };

  const logout = async () => {
    await fetch('/api/admin-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    }).catch(() => {});
    logEvent('Admin signed out');
    setSession({ loading: false, ok: false });
    setPassword('');
  };

  const exportCsv = () => {
    const rows = [
      ['Metric', 'Value'],
      ...metrics.map((metric) => [metric.label, metric.value]),
      [],
      ['Session ID', 'Country', 'City', 'Device', 'Browser', 'OS', 'Source', 'Page', 'Duration'],
      ...visitors.map((visitor) => [visitor.id, visitor.country, visitor.city, visitor.device, visitor.browser, visitor.os, visitor.source, visitor.page, `${visitor.duration}s`]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `upskillpro-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    logEvent('Admin exported analytics CSV report');
  };

  if (session.loading) {
    return <div className="admin-loading">Securing analytics workspace...</div>;
  }

  if (!session.ok) {
    return <AdminLogin password={password} setPassword={setPassword} mfaCode={mfaCode} setMfaCode={setMfaCode} error={loginError} onSubmit={login} />;
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>UP</span>
          <div>
            <strong>UpSkillPro</strong>
            <small>Elite Analytics</small>
          </div>
        </div>
        <nav>
          {navItems.map(([label, Icon]) => (
            <button key={label} type="button" className={activeSection === label ? 'active' : ''} onClick={() => setActiveSection(label)}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="security-card">
          <ShieldCheck size={22} />
          <strong>Secure admin session</strong>
          <span>RBAC: Administrator</span>
          <span>Timeout: 30 minutes</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>Private dashboard</p>
            <h1>{activeSection}</h1>
          </div>
          <div className="admin-actions">
            <button type="button" onClick={exportCsv}><Download size={17} /> Export CSV</button>
            <button type="button" onClick={() => window.print()}><FileSpreadsheet size={17} /> PDF / Print</button>
            <button type="button" onClick={logout}><LogOut size={17} /> Logout</button>
          </div>
        </header>

        <section className="admin-kpis">
          {metrics.map((metric) => {
            const Icon = metric.Icon;
            return (
              <article key={metric.label}>
                <Icon size={20} />
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.delta}</small>
              </article>
            );
          })}
        </section>

        <section className="admin-layout">
          <div className="admin-panel wide">
            <PanelTitle icon={Activity} title="Real-time visitor graph" subtitle="Updates every few seconds without page refresh" />
            <LineChart data={metrics[0].trend} />
          </div>
          <div className="admin-panel">
            <PanelTitle icon={Bell} title="Live notifications" subtitle="High-value events" />
            <div className="notification-list">
              {notifications.map((item) => <div key={item}>{item}</div>)}
            </div>
          </div>
        </section>

        <section className="admin-layout three">
          <div className="admin-panel">
            <PanelTitle icon={Map} title="Geographic intelligence" subtitle="Live visitor concentration" />
            <WorldMap visitors={visitors} />
            <DataTable title="Top countries" rows={countryRows} />
            <DataTable title="Top cities" rows={cityRows} />
          </div>
          <div className="admin-panel">
            <PanelTitle icon={PieChart} title="Traffic sources" subtitle="Channel performance" />
            <BarList rows={sources.map((source, index) => [source, 32 + ((index * 11 + tick * 3) % 58)])} />
          </div>
          <div className="admin-panel">
            <PanelTitle icon={TrendingUp} title="Course performance" subtitle="Demand and conversion signals" />
            <BarList rows={courses.map((course, index) => [course, 24 + ((index * 9 + tick * 5) % 64)])} />
          </div>
        </section>

        <section className="admin-layout">
          <div className="admin-panel wide">
            <PanelTitle icon={Radio} title="Live visitor feed" subtitle="Anonymous intelligence only" />
            <div className="visitor-feed">
              {visitors.map((visitor) => <VisitorCard key={visitor.id} visitor={visitor} />)}
            </div>
          </div>
          <div className="admin-panel">
            <PanelTitle icon={Bot} title="AI insights" subtitle="Automatic recommendations" />
            <ul className="insight-list">
              <li><Sparkles size={16} /> ESOL and Digital Skills are showing the strongest course demand this week.</li>
              <li><Zap size={16} /> LinkedIn visitors are spending longer on workforce pages than direct traffic.</li>
              <li><CheckCircle2 size={16} /> Add a clearer consultation CTA to high-intent course pages.</li>
              <li><AlertTriangle size={16} /> Monitor bounce rate from mobile visitors on course pages.</li>
            </ul>
            <PanelTitle icon={Clock3} title="Admin activity logs" subtitle="Local audit trail" />
            <div className="admin-log-list">
              {logs.length ? logs.map((log) => <span key={log.timestamp}>{new Date(log.timestamp).toLocaleString()} - {log.message}</span>) : <span>No activity yet.</span>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function AdminLogin({ password, setPassword, mfaCode, setMfaCode, error, onSubmit }) {
  return (
    <main className="admin-login">
      <form onSubmit={onSubmit}>
        <div className="admin-login-mark"><LockKeyhole size={30} /></div>
        <p>Secure admin access</p>
        <h1>UpSkillPro Analytics</h1>
        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </label>
        <label>
          <span>MFA code optional</span>
          <input type="text" value={mfaCode} onChange={(event) => setMfaCode(event.target.value)} inputMode="numeric" />
        </label>
        {error && <div className="admin-login-error">{error}</div>}
        <button type="submit">Enter Dashboard</button>
        <small>Hidden route. No public navigation. Sessions expire automatically.</small>
      </form>
    </main>
  );
}

function buildMetrics(visitors, tick) {
  const live = visitors.length + (tick % 4);
  return [
    { label: 'Live Visitors Right Now', value: live, delta: '+12% live', Icon: Radio, trend: makeTrend(10 + tick) },
    { label: 'Visitors Today', value: 248 + tick * 3, delta: '+18% vs yesterday', Icon: Eye },
    { label: 'Visitors This Week', value: '1,842', delta: '+22% this week', Icon: BarChart3 },
    { label: 'Visitors This Month', value: '7,930', delta: '+31% monthly', Icon: TrendingUp },
    { label: 'Total Visitors', value: '42,608', delta: 'all time', Icon: Globe2 },
    { label: 'Unique Visitors', value: '29,406', delta: '69% unique', Icon: Users },
    { label: 'Returning Visitors', value: '7,412', delta: '+8% returning', Icon: Activity },
    { label: 'Conversion Rate', value: '6.8%', delta: '+1.4 pts', Icon: Zap },
    { label: 'Form Submissions', value: 36 + (tick % 5), delta: 'today', Icon: FileSpreadsheet },
    { label: 'Course Enquiries', value: 58 + (tick % 7), delta: 'active demand', Icon: Search },
  ];
}

function makeTrend(seed) {
  return Array.from({ length: 18 }, (_, index) => 20 + Math.round(Math.sin((index + seed) / 2) * 12 + index * 2 + ((seed + index) % 7)));
}

function buildNotifications(visitors) {
  return visitors.slice(0, 5).map((visitor) => {
    if (visitor.exit === '/contact') return `Visitor from ${visitor.city} submitted enquiry`;
    if (visitor.duration > 500) return `Visitor from ${visitor.city} spent ${Math.round(visitor.duration / 60)} minutes on ${visitor.course}`;
    return `Visitor from ${visitor.city} viewed ${visitor.course}`;
  });
}

function summarise(rows, key) {
  const counts = rows.reduce((acc, row) => ({ ...acc, [row[key]]: (acc[row[key]] || 0) + 1 }), {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([label, count]) => [label, count, `${Math.round((count / rows.length) * 100)}%`]);
}

function PanelTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="admin-panel-title">
      <Icon size={19} />
      <div>
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

function LineChart({ data }) {
  const max = Math.max(...data);
  const points = data.map((value, index) => `${(index / (data.length - 1)) * 100},${100 - (value / max) * 82}`).join(' ');
  return (
    <svg className="admin-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points={points} />
      <path d={`M ${points} L 100 100 L 0 100 Z`} />
    </svg>
  );
}

function WorldMap({ visitors }) {
  return (
    <div className="admin-world-map">
      {visitors.slice(0, 10).map((visitor) => (
        <span
          key={visitor.id}
          style={{
            left: `${((visitor.lon + 180) / 360) * 100}%`,
            top: `${((90 - visitor.lat) / 180) * 100}%`,
          }}
          title={`${visitor.city}, ${visitor.country}`}
        />
      ))}
    </div>
  );
}

function DataTable({ title, rows }) {
  return (
    <div className="admin-data-table">
      <strong>{title}</strong>
      {rows.map(([label, count, percentage]) => (
        <div key={label}><span>{label}</span><b>{count}</b><em>{percentage}</em></div>
      ))}
    </div>
  );
}

function BarList({ rows }) {
  return (
    <div className="admin-bar-list">
      {rows.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}%</strong>
          <i><b style={{ width: `${value}%` }} /></i>
        </div>
      ))}
    </div>
  );
}

function VisitorCard({ visitor }) {
  return (
    <article className="visitor-card">
      <div>
        <strong>{visitor.id}</strong>
        <span>{visitor.city}, {visitor.country}</span>
      </div>
      <div><MonitorSmartphone size={15} /> {visitor.device} · {visitor.browser} · {visitor.os}</div>
      <div><Globe2 size={15} /> {visitor.source} · Entry {visitor.entry}</div>
      <div><Clock3 size={15} /> {Math.round(visitor.duration / 60)}m session · {visitor.pages} pages</div>
      <div><Activity size={15} /> {visitor.page} · {visitor.lastActivity}</div>
    </article>
  );
}
