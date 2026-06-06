import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  Handshake,
  HeartPulse,
  Hotel,
  Mail,
  Menu,
  MonitorCheck,
  Phone,
  PieChart,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';
import './styles.css';

const positioning =
  'UpSkillPro delivers ESP English and Soft Skills training to improve workforce performance, communication, and customer service across hospitality, healthcare, and business sectors.';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Sectors', path: '/sectors' },
  { label: 'Programmes', path: '/programmes' },
  { label: 'Services', path: '/services' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

const sectors = {
  hospitality: {
    icon: Hotel,
    title: 'Hospitality',
    subtitle: 'Hotels, restaurants, front desk, guest services, and operational teams.',
    challenges: ['Guest communication gaps', 'Slow onboarding', 'Inconsistent service language', 'Confidence issues in guest-facing roles'],
    esp: ['Front desk communication', 'Guest interaction', 'Reservations language', 'Complaint handling', 'Restaurant service English'],
    soft: ['Customer service confidence', 'Team communication', 'Professional tone', 'Conflict handling under pressure'],
    solutions: ['Hospitality English workshops', 'Scenario-based role play', 'Service recovery practice', 'Manager reporting'],
    programmes: ['ESP English Programme', 'Soft Skills Programme', 'Workforce Readiness Programme', 'Recruitment & Retention Programme'],
    outcomes: ['Better guest experience', 'Higher reviews', 'Faster onboarding', 'More consistent service standards'],
  },
  healthcare: {
    icon: HeartPulse,
    title: 'Healthcare',
    subtitle: 'Hospitals, clinics, reception teams, care providers, and healthcare support staff.',
    challenges: ['Patient communication risk', 'Reception bottlenecks', 'Stressful interactions', 'Low confidence in professional English'],
    esp: ['Patient communication', 'Basic clinical communication', 'Reception and admin language', 'Appointment and referral language'],
    soft: ['Empathy', 'Professional communication', 'Stress management', 'Clear handover habits'],
    solutions: ['Healthcare English training', 'Patient scenario practice', 'Empathy and tone coaching', 'Progress reporting by department'],
    programmes: ['ESP English Programme', 'Soft Skills Programme', 'AI + Human Skills Programme', 'Workforce Readiness Programme'],
    outcomes: ['Clearer patient interactions', 'More confident reception teams', 'Reduced communication friction', 'Improved service consistency'],
  },
  workforce: {
    icon: BriefcaseBusiness,
    title: 'Recruitment & Workforce',
    subtitle: 'Employers, recruiters, onboarding teams, and general workforce development programmes.',
    challenges: ['Recruitment challenges', 'Retention pressure', 'Low workplace readiness', 'Weak interview and onboarding communication'],
    esp: ['Workplace English', 'Interview communication', 'Workplace instructions', 'Role-specific vocabulary'],
    soft: ['Workplace behaviour', 'Teamwork', 'Reliability and ownership', 'Communication confidence'],
    solutions: ['Workforce readiness cohorts', 'Interview and onboarding support', 'Retention-focused development plans', 'Employer reporting'],
    programmes: ['Workforce Readiness Programme', 'Recruitment & Retention Programme', 'ESP English Programme', 'Soft Skills Programme'],
    outcomes: ['Stronger candidate readiness', 'Faster onboarding', 'Improved retention', 'Better team performance'],
  },
};

const programmes = {
  'esp-english-programmes': {
    title: 'ESP English Programmes',
    audience: 'Teams who need role-specific English for daily workplace performance.',
    problem: 'Generic English training does not prepare staff for the exact conversations they face at work.',
    esp: ['Hospitality English', 'Healthcare English', 'Workplace English', 'Job-specific communication practice'],
    soft: ['Confidence building', 'Professional tone', 'Listening and clarification', 'Service communication'],
    delivery: 'Onsite, online, or hybrid sessions with needs analysis and role-play materials.',
    outcomes: ['Higher English confidence', 'Fewer workplace misunderstandings', 'More consistent customer and patient communication'],
  },
  'soft-skills-programmes': {
    title: 'Soft Skills Programmes',
    audience: 'Operational teams, supervisors, and frontline staff in service-heavy environments.',
    problem: 'Performance suffers when teams lack communication habits, service judgement, and conflict confidence.',
    esp: ['Workplace phrases for service recovery', 'Clear handover language', 'Customer and patient-facing expressions'],
    soft: ['Customer service', 'Conflict handling', 'Teamwork', 'Leadership basics'],
    delivery: 'Practical workshops using workplace scenarios, coaching prompts, and team exercises.',
    outcomes: ['Improved service quality', 'Better team collaboration', 'More confident supervisors and staff'],
  },
  'workforce-readiness-programme': {
    title: 'Workforce Readiness Programme',
    audience: 'Employers preparing new hires, return-to-work groups, and entry-level workforce cohorts.',
    problem: 'Candidates and new employees often need communication confidence and workplace behaviour before they can perform reliably.',
    esp: ['ESP English basics', 'Interview language', 'Workplace instructions', 'Role-specific vocabulary'],
    soft: ['Interview skills', 'Workplace behaviour', 'Communication confidence', 'Team expectations'],
    delivery: 'Cohort-based training with employer-aligned modules and progress summaries.',
    outcomes: ['Faster readiness', 'Better interview performance', 'Smoother onboarding', 'Improved retention'],
  },
  'ai-human-skills-programme': {
    title: 'AI + Human Skills Programme',
    audience: 'Businesses preparing teams for digital productivity without losing human communication quality.',
    problem: 'AI tools improve productivity only when staff know how to use them responsibly and communicate clearly around them.',
    esp: ['Digital workplace language', 'Prompting and review vocabulary', 'Clear written communication'],
    soft: ['AI tools for productivity', 'Communication enhancement', 'Digital workplace skills', 'Judgement and review habits'],
    delivery: 'Practical sessions combining guided AI tool use with workplace communication tasks.',
    outcomes: ['Improved productivity', 'Clearer written work', 'More confident digital adoption'],
  },
  'recruitment-retention-programme': {
    title: 'Recruitment & Retention Programme',
    audience: 'Employers and recruitment teams facing staff shortages, turnover, or slow onboarding.',
    problem: 'Hiring alone does not solve performance if candidates are not supported into confident workplace communication.',
    esp: ['Interview English', 'Role expectation language', 'Workplace English for new starters'],
    soft: ['Retention conversations', 'Manager communication', 'Feedback habits', 'Team integration'],
    delivery: 'Consultancy, training cohorts, and retention-focused workforce development plans.',
    outcomes: ['Reduced early attrition', 'Improved candidate readiness', 'More effective onboarding'],
  },
};

const services = {
  'esp-english-training': ['ESP English Training', 'Job-specific English for hospitality, healthcare, and workplace communication.'],
  'soft-skills-training': ['Soft Skills Training', 'Communication, customer service, teamwork, and conflict handling workshops.'],
  'ai-training': ['AI Training', 'Practical AI productivity training paired with judgement, writing, and workplace communication.'],
  'recruitment-services': ['Recruitment Services', 'Recruitment readiness, candidate communication support, and retention-aligned onboarding.'],
  consultancy: ['Consultancy', 'Workforce diagnostics, programme design, and performance improvement reporting.'],
};

const challenges = [
  'Poor workplace communication',
  'Low English confidence',
  'Customer service issues',
  'Staff turnover',
  'Recruitment challenges',
  'Slow onboarding',
  'Lack of soft skills',
];

const portalStats = [
  ['Staff progress', '78%', BarChart3],
  ['Department performance', '4.2/5', PieChart],
  ['Training completion', '64%', MonitorCheck],
  ['Reports ready', '12', FileText],
];

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const page = useMemo(() => resolvePage(path), [path]);

  const onNav = (event, targetPath) => {
    event.preventDefault();
    setMenuOpen(false);
    navigate(targetPath);
  };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" onClick={(event) => onNav(event, '/')}>
          <span className="brand-mark">UP</span>
          <span>
            <strong>UpSkillPro</strong>
            <small>Workforce Performance Training</small>
          </span>
        </a>
        <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <a key={item.path} href={item.path} onClick={(event) => onNav(event, item.path)}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="/workforce-training-request" onClick={(event) => onNav(event, '/workforce-training-request')}>
            Training Form
          </a>
        </nav>
      </header>
      <main>{page}</main>
      <Footer onNav={onNav} />
    </>
  );
}

function resolvePage(path) {
  const clean = path.replace(/\/$/, '') || '/';
  if (clean === '/') return <HomePage />;
  if (clean === '/about') return <AboutPage />;
  if (clean === '/sectors') return <SectorsIndex />;
  if (clean.startsWith('/sectors/')) return <SectorPage sectorKey={clean.split('/').pop()} />;
  if (clean === '/programmes') return <ProgrammesIndex />;
  if (clean.startsWith('/programmes/')) return <ProgrammePage programmeKey={clean.split('/').pop()} />;
  if (clean === '/services') return <ServicesPage />;
  if (clean.startsWith('/services/')) return <ServiceDetail serviceKey={clean.split('/').pop()} />;
  if (clean === '/workforce-training-request') return <TrainingRequestPage />;
  if (clean === '/confirmation') return <ConfirmationPage />;
  if (clean === '/case-studies') return <CaseStudiesPage />;
  if (clean === '/resources') return <ResourcesPage />;
  if (clean === '/contact') return <ContactPage />;
  if (clean.startsWith('/client-portal')) return <ClientPortalPage />;
  return <NotFoundPage />;
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <div className="hero-panel panel-a">
            <Users size={28} />
            <span>Hospitality cohort</span>
            <strong>Service English + confidence</strong>
          </div>
          <div className="hero-panel panel-b">
            <HeartPulse size={28} />
            <span>Healthcare team</span>
            <strong>Patient communication</strong>
          </div>
          <div className="hero-panel panel-c">
            <BarChart3 size={28} />
            <span>Client reporting</span>
            <strong>Progress tracked</strong>
          </div>
        </div>
        <div className="hero-content">
          <p className="eyebrow">ESP English + Soft Skills Training</p>
          <h1>ESP English & Soft Skills Training for Workforce Performance</h1>
          <p className="hero-copy">Helping hospitality, healthcare, and businesses improve communication, service quality, and staff performance.</p>
          <div className="button-row">
            <ActionLink path="/contact" label="Book Consultation" icon={CalendarCheck} primary />
            <ActionLink path="/workforce-training-request" label="Request Training Plan" icon={ClipboardList} />
          </div>
          <div className="hero-proof" aria-label="UpSkillPro delivery proof points">
            <span><strong>3</strong> priority sectors</span>
            <span><strong>ESP + soft skills</strong> combined delivery</span>
            <span><strong>Hybrid</strong> onsite and online training</span>
          </div>
        </div>
      </section>
      <section className="credibility-band" aria-label="Workforce performance outcomes">
        <div>
          <span>Communication confidence</span>
          <strong>Role-specific language practice for frontline teams</strong>
        </div>
        <div>
          <span>Service consistency</span>
          <strong>Practical soft skills mapped to real customer moments</strong>
        </div>
        <div>
          <span>Employer visibility</span>
          <strong>Progress reporting and improvement tracking planned in</strong>
        </div>
      </section>
      <Section eyebrow="Who we help" title="Built for operational teams where communication affects performance.">
        <div className="three-grid">
          {Object.entries(sectors).map(([key, sector]) => (
            <FeatureCard key={key} icon={sector.icon} title={sector.title} text={sector.subtitle} path={`/sectors/${key}`} />
          ))}
        </div>
      </Section>
      <Section eyebrow="What we solve" title="Practical training for the barriers that slow teams down.">
        <div className="challenge-grid">
          {challenges.map((item) => (
            <span key={item}><CheckCircle2 size={18} />{item}</span>
          ))}
        </div>
      </Section>
      <Section eyebrow="Core solutions" title="A clear product structure for workforce improvement.">
        <div className="solution-list">
          <SolutionBlock number="1" title="ESP English Training" items={['Hospitality English', 'Healthcare English', 'Workplace English']} />
          <SolutionBlock number="2" title="Soft Skills Training" items={['Communication skills', 'Customer service', 'Teamwork', 'Conflict handling']} />
          <SolutionBlock number="3" title="Workforce Programmes" items={['Workforce Readiness Programme', 'AI + Human Skills Programme', 'Recruitment & Retention Programme']} />
        </div>
      </Section>
      <Section eyebrow="Process" title="From workforce request to measurable improvement.">
        <div className="process">
          {['Workforce Training Request Form', 'Consultation', 'Programme Design', 'Training Delivery', 'Reporting & Improvement Tracking'].map((step, index) => (
            <div className="process-step" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </Section>
      <PortalPreview />
    </>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="About UpSkillPro" title="A workforce performance company, not a course marketplace." intro={positioning}>
      <div className="two-column">
        <div>
          <h2>Our approach</h2>
          <p>We combine job-specific English, soft skills, and workforce consultancy so training maps directly to the conversations, service moments, and performance standards employers need.</p>
        </div>
        <div className="quote-panel">
          <ShieldCheck size={30} />
          <p>Designed for B2B workforce improvement across frontline, operational, and management teams.</p>
        </div>
      </div>
    </PageShell>
  );
}

function SectorsIndex() {
  return (
    <PageShell eyebrow="Sectors" title="Sector-specific ESP and soft skills training." intro="Each sector has different communication pressure points, so UpSkillPro designs practical training around real workplace scenarios.">
      <div className="three-grid">
        {Object.entries(sectors).map(([key, sector]) => (
          <FeatureCard key={key} icon={sector.icon} title={sector.title} text={sector.subtitle} path={`/sectors/${key}`} />
        ))}
      </div>
    </PageShell>
  );
}

function SectorPage({ sectorKey }) {
  const sector = sectors[sectorKey] || sectors.hospitality;
  return (
    <PageShell eyebrow="Sector training" title={`${sector.title} workforce training`} intro={sector.subtitle}>
      <DetailGrid
        blocks={[
          ['Industry Challenges', sector.challenges],
          ['Communication (ESP) Needs', sector.esp],
          ['Soft Skills Needs', sector.soft],
          ['Training Solutions', sector.solutions],
          ['Programmes Offered', sector.programmes],
          ['Outcomes', sector.outcomes],
        ]}
      />
      <CTASection />
    </PageShell>
  );
}

function ProgrammesIndex() {
  return (
    <PageShell eyebrow="Programmes" title="ESP English, soft skills, and workforce development programmes." intro="Programmes can be delivered onsite, online, or hybrid, with reporting for employers and practical materials for teams.">
      <div className="card-grid">
        {Object.entries(programmes).map(([key, programme]) => (
          <FeatureCard key={key} icon={Target} title={programme.title} text={programme.problem} path={`/programmes/${key}`} />
        ))}
      </div>
    </PageShell>
  );
}

function ProgrammePage({ programmeKey }) {
  const programme = programmes[programmeKey] || programmes['workforce-readiness-programme'];
  return (
    <PageShell eyebrow="Programme" title={programme.title} intro={programme.problem}>
      <DetailGrid
        blocks={[
          ['Who it is for', [programme.audience]],
          ['Problem it solves', [programme.problem]],
          ['ESP English modules', programme.esp],
          ['Soft skills modules', programme.soft],
          ['Delivery method', [programme.delivery]],
          ['Outcomes', programme.outcomes],
        ]}
      />
      <CTASection />
    </PageShell>
  );
}

function ServicesPage() {
  return (
    <PageShell eyebrow="Services" title="Training and consultancy for workforce performance." intro="Choose a focused service or combine services into a workforce programme.">
      <div className="card-grid">
        {Object.entries(services).map(([key, [title, text]]) => (
          <FeatureCard key={key} icon={Handshake} title={title} text={text} path={`/services/${key}`} />
        ))}
      </div>
    </PageShell>
  );
}

function ServiceDetail({ serviceKey }) {
  const [title, text] = services[serviceKey] || services['esp-english-training'];
  return (
    <PageShell eyebrow="Service" title={title} intro={text}>
      <div className="two-column">
        <div>
          <h2>How it works</h2>
          <p>We start with your workforce challenge, identify the ESP and soft skills needs, then design training that fits your sector, staff level, delivery preference, and reporting requirements.</p>
        </div>
        <div className="quote-panel">
          <ClipboardList size={30} />
          <p>Use the Workforce Training Request Form to prepare a clear proposal for your team.</p>
          <ActionLink path="/workforce-training-request" label="Workforce Training Form" icon={Send} primary />
        </div>
      </div>
    </PageShell>
  );
}

function TrainingRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ challenges: [], departments: [] });

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const toggle = (field, value) => {
    setForm((current) => {
      const list = current[field] || [];
      return { ...current, [field]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value] };
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    const lead = { ...form, submittedAt: new Date().toISOString() };
    localStorage.setItem('upskillpro-last-lead', JSON.stringify(lead));

    try {
      const response = await fetch('/api/training-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        throw new Error('Training request endpoint returned an error.');
      }
    } catch (error) {
      console.info('Training request saved locally until the Cloudflare backend is available.', error);
    }

    setSubmitted(true);
    navigate('/confirmation');
  };

  if (submitted) return <ConfirmationPage />;

  return (
    <PageShell eyebrow="Workforce Training Request Form" title="Request a workforce training plan." intro="Share your team needs so UpSkillPro can prepare a tailored ESP English and soft skills proposal.">
      <form className="lead-form" onSubmit={submit}>
        <Fieldset title="Company Information">
          <Input label="Company name" onChange={(value) => update('companyName', value)} required />
          <Select label="Industry" options={['Hospitality', 'Healthcare', 'Other']} onChange={(value) => update('industry', value)} required />
          <Input label="Number of staff" type="number" onChange={(value) => update('staffCount', value)} required />
          <Input label="Location" onChange={(value) => update('location', value)} required />
        </Fieldset>
        <Fieldset title="Contact Details">
          <Input label="Name" onChange={(value) => update('name', value)} required />
          <Input label="Job title" onChange={(value) => update('jobTitle', value)} required />
          <Input label="Email" type="email" onChange={(value) => update('email', value)} required />
          <Input label="Phone" type="tel" onChange={(value) => update('phone', value)} />
        </Fieldset>
        <CheckboxGroup title="Workforce Challenges" items={['Low English communication skills', 'Customer service issues', 'Staff turnover', 'Recruitment challenges', 'Slow onboarding', 'Low confidence in speaking English', 'Poor teamwork', 'Lack of soft skills']} values={form.challenges} onToggle={(value) => toggle('challenges', value)} />
        <CheckboxGroup title="Departments" items={['Front desk', 'Housekeeping', 'Restaurant', 'Healthcare staff', 'Admin', 'Management']} values={form.departments} onToggle={(value) => toggle('departments', value)} />
        <Fieldset title="Goals">
          <label className="full-field">
            <span>What goals should training support?</span>
            <textarea rows="5" onChange={(event) => update('goals', event.target.value)} />
          </label>
        </Fieldset>
        <Fieldset title="Programme Details">
          <Select label="Urgency" options={['Immediate', '1 month', '1-3 months', 'Exploring']} onChange={(value) => update('urgency', value)} required />
          <Select label="Delivery Preference" options={['Onsite', 'Online', 'Hybrid']} onChange={(value) => update('deliveryPreference', value)} required />
          <Select label="Budget Range" options={['GBP 5k-10k', 'GBP 10k-25k', 'GBP 25k-50k']} onChange={(value) => update('budgetRange', value)} required />
          <label className="full-field">
            <span>What is your biggest workforce challenge?</span>
            <textarea rows="4" onChange={(event) => update('biggestChallenge', event.target.value)} required />
          </label>
        </Fieldset>
        <button className="primary-button" type="submit"><Send size={18} /> Submit Training Request</button>
      </form>
    </PageShell>
  );
}

function ConfirmationPage() {
  return (
    <PageShell eyebrow="Request received" title="We will prepare your workforce training proposal." intro="Your answers have been captured for proposal preparation. The next step is to book a consultation so the programme can be scoped around your team and sector.">
      <div className="confirmation-actions">
        <ActionLink path="/contact" label="Book Consultation" icon={CalendarCheck} primary />
        <ActionLink path="/client-portal/dashboard" label="Preview Client Portal" icon={MonitorCheck} />
      </div>
    </PageShell>
  );
}

function CaseStudiesPage() {
  return (
    <PageShell eyebrow="Case Studies" title="Workforce improvement stories ready for client proof." intro="Use this section for hospitality, healthcare, and recruitment outcomes as client projects are completed.">
      <div className="card-grid">
        {['Hospitality guest communication uplift', 'Healthcare reception confidence', 'Workforce readiness cohort'].map((title) => (
          <article className="info-card" key={title}>
            <Sparkles size={26} />
            <h3>{title}</h3>
            <p>Challenge, programme design, delivery model, and measurable outcomes can be published here.</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ResourcesPage() {
  return (
    <PageShell eyebrow="Resources" title="Training materials and employer guidance." intro="A light LMS-ready resource area for PDFs, videos, guides, and sector materials.">
      <div className="card-grid">
        {['Hospitality English checklist', 'Healthcare communication scenarios', 'Soft skills manager guide', 'AI workplace prompt guide'].map((title) => (
          <article className="info-card" key={title}>
            <BookOpenCheck size={26} />
            <h3>{title}</h3>
            <p>Resource placeholder for downloadable PDFs, short videos, and training support materials.</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Book a consultation with UpSkillPro." intro="Tell us about your workforce challenge and we will help shape the right ESP English and soft skills training plan.">
      <div className="contact-panel">
        <a href="mailto:hello@upskillpro.co.uk"><Mail size={20} /> hello@upskillpro.co.uk</a>
        <a href="tel:+440000000000"><Phone size={20} /> +44 0000 000000</a>
        <ActionLink path="/workforce-training-request" label="Request Training Plan" icon={ClipboardList} primary />
      </div>
    </PageShell>
  );
}

function ClientPortalPage() {
  return (
    <PageShell eyebrow="Client Portal" title="Future LMS and performance dashboard architecture." intro="A planned client workspace for staff tracking, training assignment, progress reports, and department performance.">
      <div className="portal-shell">
        <aside>
          {['Dashboard', 'Staff', 'Training', 'Progress', 'Reports'].map((item) => (
            <a key={item} href={`/client-portal/${item.toLowerCase()}`} onClick={(event) => { event.preventDefault(); navigate(`/client-portal/${item.toLowerCase()}`); }}>{item}</a>
          ))}
        </aside>
        <div className="portal-main">
          <div className="portal-stats">
            {portalStats.map(([label, value, Icon]) => (
              <div className="stat-card" key={label}>
                <Icon size={22} />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="portal-table">
            <div><strong>Department</strong><strong>Assigned</strong><strong>Completion</strong><strong>Focus</strong></div>
            <div><span>Front desk</span><span>18 staff</span><span>72%</span><span>Guest interaction</span></div>
            <div><span>Healthcare admin</span><span>12 staff</span><span>61%</span><span>Patient communication</span></div>
            <div><span>Management</span><span>7 staff</span><span>83%</span><span>Team communication</span></div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function NotFoundPage() {
  return <PageShell eyebrow="404" title="Page not found" intro="This page is not available yet."><ActionLink path="/" label="Return Home" icon={ArrowRight} primary /></PageShell>;
}

function Section({ eyebrow, title, children }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function PageShell({ eyebrow, title, intro, children }) {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="section">{children}</section>
    </>
  );
}

function FeatureCard({ icon: Icon, title, text, path }) {
  return (
    <article className="info-card">
      <Icon size={28} />
      <h3>{title}</h3>
      <p>{text}</p>
      {path && <ActionLink path={path} label="View details" icon={ArrowRight} />}
    </article>
  );
}

function SolutionBlock({ number, title, items }) {
  return (
    <article className="solution-block">
      <span>{number}</span>
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  );
}

function DetailGrid({ blocks }) {
  return (
    <div className="detail-grid">
      {blocks.map(([title, items]) => (
        <article className="info-card" key={title}>
          <h3>{title}</h3>
          <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      ))}
    </div>
  );
}

function CTASection() {
  return (
    <div className="cta-band">
      <div>
        <h2>Ready to scope your workforce training plan?</h2>
        <p>Submit the request form and we will prepare a proposal around your sector, staff groups, and communication goals.</p>
      </div>
      <ActionLink path="/workforce-training-request" label="Workforce Training Form" icon={ClipboardList} primary />
    </div>
  );
}

function PortalPreview() {
  return (
    <section className="portal-preview">
      <div>
        <p className="eyebrow">Future client portal</p>
        <h2>LMS and performance dashboard architecture is already planned.</h2>
        <p>Clients will be able to track staff progress, assign training, review department performance, and export reports from a secure portal layer.</p>
        <ActionLink path="/client-portal/dashboard" label="Preview Portal" icon={MonitorCheck} primary />
      </div>
      <div className="portal-mini">
        {portalStats.map(([label, value, Icon]) => (
          <div key={label}><Icon size={20} /><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>
    </section>
  );
}

function ActionLink({ path, label, icon: Icon, primary = false }) {
  return (
    <a className={primary ? 'primary-button' : 'secondary-button'} href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>
      <Icon size={18} />
      {label}
    </a>
  );
}

function Fieldset({ title, children }) {
  return (
    <fieldset>
      <legend>{title}</legend>
      <div className="field-grid">{children}</div>
    </fieldset>
  );
}

function Input({ label, type = 'text', onChange, required = false }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} required={required} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Select({ label, options, onChange, required = false }) {
  return (
    <label>
      <span>{label}</span>
      <select required={required} defaultValue="" onChange={(event) => onChange(event.target.value)}>
        <option value="" disabled>Select option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function CheckboxGroup({ title, items, values, onToggle }) {
  return (
    <fieldset>
      <legend>{title}</legend>
      <div className="checkbox-grid">
        {items.map((item) => (
          <label className="check-field" key={item}>
            <input type="checkbox" checked={values.includes(item)} onChange={() => onToggle(item)} />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Footer({ onNav }) {
  return (
    <footer>
      <div>
        <strong>UpSkillPro</strong>
        <p>{positioning}</p>
      </div>
      <div className="footer-links">
        <a href="/workforce-training-request" onClick={(event) => onNav(event, '/workforce-training-request')}>Workforce Training Form</a>
        <a href="/client-portal/dashboard" onClick={(event) => onNav(event, '/client-portal/dashboard')}>Client Portal</a>
        <a href="/contact" onClick={(event) => onNav(event, '/contact')}>Book Consultation</a>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
