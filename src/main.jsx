import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Activity,
  BarChart3,
  BrainCircuit,
  BookOpenCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gauge,
  Handshake,
  HeartPulse,
  Hotel,
  Instagram,
  Mail,
  Menu,
  MonitorCheck,
  Phone,
  PieChart,
  ScanLine,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from 'lucide-react';
import EsolInitialAssessment from './EsolInitialAssessment.jsx';
import FloatingWhatsAppButton from './FloatingWhatsAppButton.jsx';
import AnalyticsTracker from './AnalyticsTracker.jsx';
import './styles.css';

const EspCoursebookWidget = React.lazy(() => import('./EspCoursebookWidget.jsx'));
const AdminAnalyticsDashboard = React.lazy(() => import('./AdminAnalyticsDashboard.jsx'));
const LearnerLms = React.lazy(() => import('./LearnerLms.jsx'));
const AssessorDashboard = React.lazy(() => import('./AssessorDashboard.jsx'));

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || String(error || 'Unknown route error') };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="admin-loading">
          <strong>Route failed to load.</strong>
          <span>Please refresh the page. If it continues, clear the browser cache and reopen this link.</span>
          <small>{this.state.message}</small>
        </main>
      );
    }

    return this.props.children;
  }
}

const positioning =
  'UpSkillPro delivers ESP English and Soft Skills training to improve workforce performance, communication, and customer service across hospitality, healthcare, and business sectors.';

const siteUrl = 'https://upskillpro.co.uk';
const canonicalForPath = (path) => `${siteUrl}${path === '/' ? '/' : `${path.replace(/\/$/, '')}/`}`;

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

const resources = {
  'what-is-esp-english': {
    title: 'What Is ESP English?',
    intro: 'English for Specific Purposes focuses on the language people need for a particular job, sector, task, or professional situation.',
    description: 'Learn what ESP English means, how it differs from general English, and how job-specific language training supports workplace performance.',
    sections: [
      ['ESP English explained', ['ESP stands for English for Specific Purposes.', 'Lessons focus on real communication from a defined job or sector.', 'Vocabulary, listening, speaking, reading, and writing are taught through relevant workplace situations.']],
      ['ESP compared with general English', ['General English builds broad everyday ability.', 'ESP English targets specific conversations, documents, vocabulary, and communication standards.', 'A learner can study general English and ESP together, but ESP makes learning immediately relevant to work.']],
      ['Examples of ESP training', ['Hospitality English for reception, reservations, guest service, and complaints.', 'Healthcare English for patient communication, appointments, reception, and support.', 'Workplace English for instructions, teamwork, meetings, customer service, and professional writing.']],
      ['Who benefits', ['Employees who need confidence in English at work.', 'Employers experiencing communication or onboarding challenges.', 'Jobseekers preparing for interviews and workplace expectations.', 'Teams that need consistent professional language and customer service.']],
    ],
  },
  'hospitality-english-phrases': {
    title: 'Hospitality English Phrases for Work',
    intro: 'Hospitality staff need clear, polite English for welcoming guests, confirming information, solving problems, and protecting the guest experience.',
    description: 'Practise useful hospitality English phrases for hotel reception, reservations, guest service, restaurants, and complaint handling.',
    sections: [
      ['Welcoming guests', ['Good morning. Welcome to the hotel. How can I help you?', 'May I have your name and booking reference, please?', 'Let me confirm your reservation details.']],
      ['Providing information', ['Breakfast is served from 7:00 until 10:00.', 'The lift is on your right, next to reception.', 'I will arrange that for you now.']],
      ['Handling a complaint', ['I am sorry you have experienced this problem.', 'Thank you for letting us know.', 'Let me check what we can do to resolve this quickly.']],
      ['Training focus', ['Polite tone and clear pronunciation.', 'Listening, clarification, and checking understanding.', 'Service recovery and confident professional responses.', 'Role-play based on real hotel and restaurant situations.']],
    ],
  },
  'healthcare-communication-english': {
    title: 'Healthcare Communication English',
    intro: 'Clear healthcare English helps reception, administration, and support staff communicate accurately while showing empathy and professionalism.',
    description: 'Explore practical healthcare English for patient communication, reception, appointments, clarification, and professional support.',
    sections: [
      ['Checking patient information', ['Can I confirm your full name and date of birth?', 'Could you spell your surname for me, please?', 'Do you have your appointment letter or reference number?']],
      ['Appointments and waiting', ['Please take a seat. A member of the team will call you shortly.', 'Your appointment is scheduled for 10:30.', 'If you need to change the appointment, please contact reception.']],
      ['Supporting understanding', ['Would you like me to repeat that more slowly?', 'Do you need an interpreter or any additional support?', 'Let me check that I have understood you correctly.']],
      ['Training focus', ['Accuracy when confirming information.', 'Professional, calm, and empathetic tone.', 'Clarification without causing embarrassment.', 'Communication practice based on healthcare scenarios.']],
    ],
  },
  'workplace-soft-skills': {
    title: 'Workplace Soft Skills Guide',
    intro: 'Soft skills shape how people communicate, cooperate, solve problems, serve customers, and respond under pressure.',
    description: 'Understand the communication, teamwork, customer service, professional behaviour, and conflict-handling skills employers value.',
    sections: [
      ['Communication', ['Listen actively before responding.', 'Use clear language and check understanding.', 'Adapt tone and detail to the person and situation.']],
      ['Teamwork', ['Share information reliably.', 'Ask for help early when needed.', 'Respect roles, deadlines, and different perspectives.']],
      ['Customer service', ['Remain calm and professional.', 'Show empathy before offering a solution.', 'Take ownership or explain the correct next step.']],
      ['Conflict and feedback', ['Focus on the issue rather than the person.', 'Use specific examples and constructive language.', 'Agree an action and confirm what happens next.']],
    ],
  },
};

const seoPages = {
  '/': {
    title: 'UpSkillPro | ESP English, ESOL & Soft Skills Training for Workforce Performance',
    description: 'UpSkillPro delivers ESP English, ESOL, soft skills, customer service and workforce training for hospitality, healthcare, recruitment and business teams.',
    keywords: 'UpSkillPro, ESP English training, ESOL courses, soft skills training, workforce training, business English, hospitality English, healthcare English',
  },
  '/about': {
    title: 'About UpSkillPro | Workforce Performance Training',
    description: 'Learn how UpSkillPro combines ESP English, ESOL, soft skills and workforce consultancy to improve communication, confidence and service performance.',
    keywords: 'about UpSkillPro, workforce performance company, English training provider, soft skills provider',
  },
  '/sectors': {
    title: 'Sector Training | Hospitality, Healthcare & Workforce English | UpSkillPro',
    description: 'Sector-specific ESP English and soft skills training for hospitality, healthcare, recruitment and workforce development teams.',
    keywords: 'sector training, hospitality English, healthcare English, workplace English, recruitment training',
  },
  '/programmes': {
    title: 'ESP English, ESOL & Soft Skills Programmes | UpSkillPro',
    description: 'Explore UpSkillPro programmes including ESP English, soft skills, workforce readiness, AI human skills, and recruitment retention training.',
    keywords: 'ESP English programmes, ESOL programmes, soft skills programmes, workforce readiness programme',
  },
  '/services': {
    title: 'Workforce Training Services | ESP English, ESOL, Soft Skills | UpSkillPro',
    description: 'UpSkillPro services include ESP English training, soft skills training, AI training, recruitment services and workforce consultancy.',
    keywords: 'workforce training services, ESP English services, ESOL training, soft skills consultancy',
  },
  '/workforce-training-request': {
    title: 'Request a Workforce Training Plan | UpSkillPro',
    description: 'Request a tailored ESP English, ESOL, soft skills or workforce training proposal for your organisation.',
    keywords: 'workforce training request, training proposal, staff English training, corporate ESOL training',
  },
  '/case-studies': {
    title: 'Workforce Training Case Studies | UpSkillPro',
    description: 'See example outcomes from ESP English, ESOL, soft skills and workforce performance training across operational teams.',
    keywords: 'training case studies, workforce training outcomes, communication training results',
  },
  '/resources': {
    title: 'English, ESOL & Workforce Training Resources | UpSkillPro',
    description: 'Practical guides covering ESP English, hospitality English, healthcare communication, workplace English and soft skills.',
    keywords: 'ESOL resources, ESP English resources, workforce training resources, soft skills resources',
  },
  '/contact': {
    title: 'Contact UpSkillPro | ESP English, ESOL & Soft Skills Training',
    description: 'Contact UpSkillPro to discuss ESP English, ESOL, soft skills, hospitality English, healthcare English and workforce training plans.',
    keywords: 'contact UpSkillPro, English training provider contact, ESOL courses contact',
  },
};

function getSeoData(path) {
  const clean = path.replace(/\/$/, '') || '/';
  const hidden = ['/admin', '/admin-hub', '/admin-analytics', '/learner-login', '/assessor-login', '/esol-initial-assessment'];

  if (hidden.some((item) => clean === item || clean.startsWith(`${item}/`))) {
    return {
      title: 'Private Area | UpSkillPro',
      description: 'Private UpSkillPro access area.',
      canonical: canonicalForPath(clean),
      robots: 'noindex,nofollow,noarchive',
      structuredData: [],
    };
  }

  if (clean.startsWith('/sectors/')) {
    const sector = sectors[clean.split('/').pop()] || sectors.hospitality;
    return {
      title: `${sector.title} English & Soft Skills Training | UpSkillPro`,
      description: `${sector.title} ESP English and soft skills training for workforce communication, customer service, confidence and performance improvement.`,
      keywords: `${sector.title} English training, ${sector.title} soft skills, ESP English, workforce communication training`,
      canonical: canonicalForPath(clean),
      robots: 'index,follow',
    };
  }

  if (clean.startsWith('/programmes/')) {
    const programme = programmes[clean.split('/').pop()] || programmes['workforce-readiness-programme'];
    return {
      title: `${programme.title} | UpSkillPro`,
      description: `${programme.title} for employers who need ESP English, ESOL, soft skills and workforce performance improvement.`,
      keywords: `${programme.title}, ESP English, ESOL, soft skills, workforce training`,
      canonical: canonicalForPath(clean),
      robots: 'index,follow',
    };
  }

  if (clean.startsWith('/services/')) {
    const [title, text] = services[clean.split('/').pop()] || services['esp-english-training'];
    return {
      title: `${title} | UpSkillPro`,
      description: `${text} Delivered for businesses, employers and workforce teams.`,
      keywords: `${title}, UpSkillPro, ESP English, ESOL, workforce training`,
      canonical: canonicalForPath(clean),
      robots: 'index,follow',
    };
  }

  if (clean.startsWith('/resources/')) {
    const resource = resources[clean.split('/').pop()];
    if (resource) {
      return {
        title: `${resource.title} | UpSkillPro`,
        description: resource.description,
        keywords: `${resource.title}, ESP English, English for work, ESOL, workplace communication, UpSkillPro`,
        canonical: canonicalForPath(clean),
        robots: 'index,follow',
        pageType: 'Article',
      };
    }
  }

  const page = seoPages[clean] || seoPages['/'];
  return {
    ...page,
    canonical: canonicalForPath(clean),
    robots: clean === '/confirmation' || clean === '/client-portal' ? 'noindex,follow' : 'index,follow',
  };
}

function setMetaAttribute(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function buildStructuredData(seo) {
  if (seo.robots?.startsWith('noindex')) return [];
  const path = new URL(seo.canonical).pathname;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'EducationalOrganization'],
      '@id': `${siteUrl}/#organization`,
      name: 'UpSkillPro',
      url: siteUrl,
      logo: `${siteUrl}/assets/upskillpro-logo.png`,
      email: 'info@upskillpro.co.uk',
      telephone: '+447436830626',
      description: positioning,
      areaServed: ['United Kingdom', 'Saudi Arabia', 'International'],
      knowsAbout: ['ESP English', 'ESOL', 'Workplace English', 'Soft Skills', 'Hospitality English', 'Healthcare English', 'Workforce Development'],
      sameAs: ['https://www.instagram.com/up_skillpro/'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'UpSkillPro',
      url: siteUrl,
    },
  ];

  if (path.startsWith('/programmes/') || path.startsWith('/sectors/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: seo.title.replace(' | UpSkillPro', ''),
      description: seo.description,
      provider: {
        '@id': `${siteUrl}/#organization`,
        name: 'UpSkillPro',
      },
      educationalLevel: 'Pre-A1 to Advanced',
      teaches: ['ESOL', 'ESP English', 'Workplace English', 'Communication Skills', 'Customer Service', 'Teamwork'],
    });
  }

  if (path.startsWith('/services/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: seo.title.replace(' | UpSkillPro', ''),
      description: seo.description,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: ['United Kingdom', 'Saudi Arabia', 'International'],
    });
  }

  if (seo.pageType === 'Article') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.title.replace(' | UpSkillPro', ''),
      description: seo.description,
      mainEntityOfPage: seo.canonical,
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
      datePublished: '2026-06-25',
      dateModified: '2026-06-25',
    });
  }

  if (path !== '/') {
    const segments = path.split('/').filter(Boolean);
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        ...segments.map((segment, index) => ({
          '@type': 'ListItem',
          position: index + 2,
          name: segment.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          item: `${siteUrl}/${segments.slice(0, index + 1).join('/')}`,
        })),
      ],
    });
  }

  return schemas;
}

function applySeo(path) {
  const seo = getSeoData(path);
  document.title = seo.title;
  setMetaAttribute('name', 'description', seo.description);
  setMetaAttribute('name', 'keywords', seo.keywords || seoPages['/'].keywords);
  setMetaAttribute('name', 'robots', seo.robots || 'index,follow');
  setMetaAttribute('property', 'og:title', seo.title);
  setMetaAttribute('property', 'og:description', seo.description);
  setMetaAttribute('property', 'og:type', 'website');
  setMetaAttribute('property', 'og:url', seo.canonical);
  setMetaAttribute('property', 'og:site_name', 'UpSkillPro');
  setMetaAttribute('property', 'og:image', `${siteUrl}/assets/hero-future-training-men.png`);
  setMetaAttribute('property', 'og:image:alt', 'UpSkillPro professional English and workforce training');
  setMetaAttribute('name', 'twitter:card', 'summary_large_image');
  setMetaAttribute('name', 'twitter:title', seo.title);
  setMetaAttribute('name', 'twitter:description', seo.description);
  setMetaAttribute('name', 'twitter:image', `${siteUrl}/assets/hero-future-training-men.png`);
  setCanonical(seo.canonical);

  let script = document.head.querySelector('#upskillpro-structured-data');
  if (!script) {
    script = document.createElement('script');
    script.id = 'upskillpro-structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(seo.structuredData || buildStructuredData(seo));
}

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

const intelligenceMetrics = [
  {
    title: 'Hospitality',
    Icon: Hotel,
    tone: 'gold',
    score: 86,
    metrics: [
      ['Guest satisfaction', '72%', '89%', '+17%', [18, 32, 35, 48, 45, 58, 64, 65]],
      ['Positive reviews', '3.8', '4.6', '+21%', [24, 26, 38, 45, 43, 55, 62, 66]],
      ['Staff retention', '65%', '81%', '+16%', [22, 30, 38, 37, 46, 51, 55, 62]],
    ],
  },
  {
    title: 'Healthcare',
    Icon: HeartPulse,
    tone: 'teal',
    score: 90,
    metrics: [
      ['Patient understanding', '58%', '87%', '+29%', [20, 30, 42, 38, 54, 52, 63, 72]],
      ['Appointment compliance', '61%', '84%', '+23%', [21, 28, 40, 36, 46, 58, 62, 68]],
      ['Communication confidence', '45%', '82%', '+37%', [18, 30, 28, 42, 38, 54, 49, 60]],
    ],
  },
  {
    title: 'Recruitment & Workforce',
    Icon: BriefcaseBusiness,
    tone: 'violet',
    score: 88,
    metrics: [
      ['Interview success', '40%', '78%', '+38%', [19, 27, 24, 36, 33, 45, 50, 61]],
      ['Workplace communication', '52%', '86%', '+34%', [18, 28, 26, 41, 39, 50, 58, 67]],
      ['Staff productivity', '63%', '88%', '+25%', [20, 24, 34, 31, 43, 42, 53, 61]],
    ],
  },
];

const adminHubTools = [
  {
    title: 'Analytics Dashboard',
    path: '/admin-analytics',
    icon: BarChart3,
    access: 'Admin session',
    description: 'Private traffic, page-performance tracking, live visitor activity, sources, and reporting.',
    signal: 'Website intelligence',
  },
  {
    title: 'Assessor Portal',
    path: '/assessor-login',
    icon: ClipboardList,
    access: 'Assessor login',
    description: 'Learner creation, placement, marking, evidence review, writing feedback, and pathway resets.',
    signal: 'Training operations',
  },
  {
    title: 'Learner LMS',
    path: '/learner-login',
    icon: BookOpenCheck,
    access: 'Unique learner login',
    description: 'Full ESP course pathway from Beginner to Advanced with lessons, vocabulary, assessments, and progress.',
    signal: 'Learner experience',
  },
  {
    title: 'ESOL Initial Assessment',
    path: '/esol-initial-assessment',
    icon: ScanLine,
    access: 'Assessment access code',
    description: 'Controlled CEFR placement assessment with reading score, writing evidence, and Google Sheet recording.',
    signal: 'Placement gateway',
  },
];

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function AdminAccessHub() {
  const [session, setSession] = useState({ loading: true, ok: false });
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'UpSkillPro Admin Hub';
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

  const login = async (event) => {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/admin-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, mfaCode }),
    });
    const data = await response.json();
    if (!data.ok) {
      setError(data.error || 'Login failed.');
      return;
    }
    setSession({ loading: false, ok: true, expiresAt: Date.now() + 30 * 60 * 1000 });
    setPassword('');
    setMfaCode('');
  };

  const logout = async () => {
    await fetch('/api/admin-auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    }).catch(() => {});
    setSession({ loading: false, ok: false });
  };

  if (session.loading) {
    return <main className="admin-loading">Securing admin workspace...</main>;
  }

  if (!session.ok) {
    return (
      <main className="admin-login">
        <form onSubmit={login}>
          <span className="admin-login-mark"><ShieldCheck size={30} /></span>
          <div>
            <p>Private Admin Hub</p>
            <h1>Admin access</h1>
            <small>Sign in once to open the hidden UpskillPro systems from one private control room.</small>
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <label>
            <span>Admin password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" />
          </label>
          <label>
            <span>MFA code</span>
            <input value={mfaCode} onChange={(event) => setMfaCode(event.target.value)} placeholder="Optional if enabled" autoComplete="one-time-code" />
          </label>
          <button type="submit">Open Admin Hub <ArrowRight size={18} /></button>
          <small>Child systems keep their own access rules for assessors, learners, and assessment candidates.</small>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-hub">
      <section className="admin-hub-shell">
        <div className="admin-hub-hero">
          <div>
            <p className="admin-hub-kicker">Private UpskillPro Control Room</p>
            <h1>One roof for every hidden system.</h1>
            <p>
              Manage analytics, learner delivery, assessor workflows, and ESOL placement access without exposing these tools in the public website navigation.
            </p>
          </div>
          <div className="admin-hub-status">
            <span><ShieldCheck size={18} /> Admin session active</span>
            <strong>30 min timeout</strong>
            <button type="button" onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="admin-hub-strip" aria-label="Admin access model">
          <span><strong>Hub</strong> admin session</span>
          <span><strong>Analytics</strong> private dashboard</span>
          <span><strong>Assessor</strong> staff controls</span>
          <span><strong>LMS</strong> learner credentials</span>
          <span><strong>Assessment</strong> candidate access codes</span>
        </div>

        <div className="admin-hub-grid">
          {adminHubTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <article className="admin-hub-card" key={tool.path}>
                <div className="admin-hub-card-top">
                  <span className="admin-hub-icon"><Icon size={24} /></span>
                  <span className="admin-hub-tag">{tool.access}</span>
                </div>
                <p>{tool.signal}</p>
                <h2>{tool.title}</h2>
                <span>{tool.description}</span>
                <a href={tool.path}>Open {tool.title} <ArrowRight size={18} /></a>
              </article>
            );
          })}
        </div>

        <div className="admin-hub-note">
          <BrainCircuit size={24} />
          <div>
            <strong>How this is protected</strong>
            <p>
              This hub is hidden from public navigation and search indexing. The analytics admin session protects the launchpad, while the assessor portal, learner LMS, and ESOL assessment keep their own role-specific access controls.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadCoursebook, setLoadCoursebook] = useState(false);
  const [coursebookOpened, setCoursebookOpened] = useState(() => localStorage.getItem('upskillpro-coursebook-opened') === 'true');

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const page = useMemo(() => resolvePage(path), [path]);

  useEffect(() => {
    applySeo(path);
  }, [path]);

  if (path.replace(/\/$/, '') === '/esol-initial-assessment') {
    return <EsolInitialAssessment />;
  }

  if (path.replace(/\/$/, '') === '/admin-analytics') {
    return (
      <React.Suspense fallback={<div className="admin-loading">Loading secure analytics...</div>}>
        <AdminAnalyticsDashboard />
      </React.Suspense>
    );
  }

  if (path.replace(/\/$/, '') === '/admin' || path.replace(/\/$/, '') === '/admin-hub') {
    return <AdminAccessHub />;
  }

  if (path.startsWith('/learner-login') || path.startsWith('/learner')) {
    return (
      <React.Suspense fallback={<div className="admin-loading">Loading LMS...</div>}>
        <LearnerLms />
      </React.Suspense>
    );
  }

  if (path.startsWith('/assessor-login') || path.startsWith('/assessor')) {
    return (
      <RouteErrorBoundary>
        <React.Suspense fallback={<div className="admin-loading">Loading assessor portal...</div>}>
          <AssessorDashboard />
        </React.Suspense>
      </RouteErrorBoundary>
    );
  }

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
      <AnalyticsTracker path={path} />
      <Footer onNav={onNav} />
      <FloatingWhatsAppButton />
      {!loadCoursebook && (
        <button
          className="coursebook-launcher"
          type="button"
          onClick={() => {
            localStorage.setItem('upskillpro-coursebook-opened', 'true');
            setCoursebookOpened(true);
            setLoadCoursebook(true);
          }}
          aria-label="Open ESP coursebook"
        >
          <span className="coursebook-launcher-pulse" aria-hidden="true" />
          <BookOpen size={26} />
          <small>{coursebookOpened ? 'Resume' : 'ESP Book'}</small>
        </button>
      )}
      {loadCoursebook && (
        <React.Suspense fallback={null}>
          <EspCoursebookWidget startOpen onClosed={() => setLoadCoursebook(false)} />
        </React.Suspense>
      )}
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
  if (clean.startsWith('/resources/')) return <ResourceDetail resourceKey={clean.split('/').pop()} />;
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
            <ActionLink path="/esol-initial-assessment" label="Initial English Assessment" icon={ScanLine} variant="accent" />
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
      <IntelligenceDashboard />
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

    fetch('/api/analytics-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'training_request',
        path: window.location.pathname,
        pageUrl: window.location.href,
        referrer: document.referrer,
        course: form.industry || 'Workforce Training',
        metadata: {
          industry: form.industry,
          deliveryPreference: form.deliveryPreference,
          urgency: form.urgency,
        },
      }),
      keepalive: true,
    }).catch(() => {});

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
    <PageShell eyebrow="Resources" title="Practical English for work and soft skills guidance." intro="Clear, useful guidance for learners, employers, and teams developing English, communication, and workplace confidence.">
      <div className="card-grid">
        {Object.entries(resources).map(([key, resource]) => (
          <FeatureCard
            key={key}
            icon={BookOpenCheck}
            title={resource.title}
            text={resource.description}
            path={`/resources/${key}`}
          />
        ))}
      </div>
    </PageShell>
  );
}

function ResourceDetail({ resourceKey }) {
  const resource = resources[resourceKey] || resources['what-is-esp-english'];
  return (
    <PageShell eyebrow="English for work resource" title={resource.title} intro={resource.intro}>
      <DetailGrid blocks={resource.sections} />
      <div className="cta-band">
        <div>
          <h2>Turn guidance into practical training.</h2>
          <p>UpSkillPro can assess learner needs and build an ESP English or soft skills programme around real workplace communication.</p>
        </div>
        <ActionLink path="/workforce-training-request" label="Request Training Plan" icon={ClipboardList} primary />
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Book a consultation with UpSkillPro." intro="Tell us about your workforce challenge and we will help shape the right ESP English and soft skills training plan.">
      <div className="contact-panel">
        <a href="mailto:info@upskillpro.co.uk"><Mail size={20} /> info@upskillpro.co.uk</a>
        <a href="tel:+447436830626"><Phone size={20} /> +44 7436 830626</a>
        <a href="https://www.instagram.com/up_skillpro/" target="_blank" rel="noreferrer"><Instagram size={20} /> @up_skillpro</a>
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

function IntelligenceDashboard() {
  const sectionRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState(() => new Date());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reveal = () => setIsLive(true);
    if (!('IntersectionObserver' in window)) {
      reveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.28 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLive) return undefined;
    const timer = window.setInterval(() => setRefreshedAt(new Date()), 45000);
    return () => window.clearInterval(timer);
  }, [isLive]);

  return (
    <section ref={sectionRef} className="intelligence-section" aria-label="Live intelligence dashboard for UpSkillPro training impact">
      <div className={`intelligence-shell ${isLive ? 'is-live' : ''}`}>
        <div className="intelligence-topline">
          <div>
            <p className="eyebrow">Live Intelligence Dashboard</p>
            <h2>Language, communication, and soft skills translated into workforce performance.</h2>
          </div>
          <div className="live-status-wrap">
            <div className="live-indicator">
              <span />
              Real-time impact overview
            </div>
            <small>Data refreshed {formatRefreshTime(refreshedAt)}</small>
          </div>
        </div>
        <div className="intelligence-grid">
          <aside className="engine-card">
            <BrainCircuit size={34} />
            <strong>UpSkillPro</strong>
            <span>Intelligence Engine</span>
            <div>
              <small>System status</small>
              <b><i /> Active</b>
            </div>
            <div>
              <small>Data stream</small>
              <b>Live</b>
            </div>
            <div>
              <small>Analysis mode</small>
              <b>Performance impact</b>
            </div>
            <div className="confidence-meter">
              <span>Confidence level</span>
              <strong><AnimatedValue from="0%" to="98%" active={isLive} /></strong>
            </div>
          </aside>
          {intelligenceMetrics.map((sector) => (
            <ImpactPanel key={sector.title} sector={sector} active={isLive} />
          ))}
          <aside className="executive-card">
            <div className="impact-ring" style={{ '--impact-angle': isLive ? '320deg' : '0deg' }}>
              <span>High</span>
            </div>
            <h3>Executive Summary</h3>
            <p>Training impact index shows stronger communication, engagement, and service readiness across key performance indicators.</p>
            <ul>
              <li><ShieldCheck size={16} /> Engagement level <strong>Strong</strong></li>
              <li><Gauge size={16} /> Organisational readiness <strong>Improving</strong></li>
              <li><Activity size={16} /> Communication health <strong>Excellent</strong></li>
            </ul>
          </aside>
        </div>
        <div className="intelligence-footer">
          <span><Users size={18} /> Communication, ESOL, customer service, and workforce training drive measurable business outcomes.</span>
          <small>Illustrative outcomes from training programmes</small>
        </div>
      </div>
    </section>
  );
}

function ImpactPanel({ sector, active }) {
  const Icon = sector.Icon;

  return (
    <article className={`impact-panel ${sector.tone}`}>
      <div className="impact-panel-head">
        <Icon size={28} />
        <h3>{sector.title}</h3>
      </div>
      <div className="impact-list">
        {sector.metrics.map(([label, start, end, lift, points]) => (
          <div className="impact-row" key={label}>
            <Star size={20} />
            <div>
              <span>{label}</span>
              <strong>{start} <em>-></em> <AnimatedValue from={start} to={end} active={active} /></strong>
            </div>
            <b>{lift}</b>
            <Sparkline points={points} />
          </div>
        ))}
      </div>
      <div className="impact-score">
        <span>Overall impact score</span>
        <div className="score-ring" style={{ '--score-angle': active ? `${sector.score * 3.6}deg` : '0deg' }}>
          <strong><AnimatedValue from="0" to={`${sector.score}`} active={active} /></strong>
          <small>/100</small>
        </div>
      </div>
    </article>
  );
}

function Sparkline({ points }) {
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${index * 10} ${72 - point}`).join(' ');
  return (
    <svg className="sparkline" viewBox="0 0 70 62" aria-hidden="true" focusable="false">
      <path d={path} pathLength="1" />
      {points.map((point, index) => <circle key={`${point}-${index}`} cx={index * 10} cy={72 - point} r={index === points.length - 1 ? 3.2 : 2.2} />)}
    </svg>
  );
}

function AnimatedValue({ from, to, active }) {
  const [value, setValue] = useState(() => parseMetricValue(from));
  const target = parseMetricValue(to);
  const decimals = to.includes('.') ? 1 : 0;
  const suffix = to.includes('%') ? '%' : '';

  useEffect(() => {
    const start = parseMetricValue(from);
    const end = parseMetricValue(to);
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let frame;

    if (!active || prefersReducedMotion) {
      setValue(active ? end : start);
      return undefined;
    }

    const startedAt = performance.now();
    const duration = 1100;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(start + (end - start) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, from, to]);

  return `${value.toFixed(decimals)}${suffix}`;
}

function parseMetricValue(value) {
  const parsed = Number.parseFloat(String(value).replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatRefreshTime(date) {
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  return '1m ago';
}

function ActionLink({ path, label, icon: Icon, primary = false, variant = '' }) {
  return (
    <a className={primary ? 'primary-button' : variant === 'accent' ? 'accent-button' : 'secondary-button'} href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>
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
        <a href="/resources/what-is-esp-english" onClick={(event) => onNav(event, '/resources/what-is-esp-english')}>What is ESP English?</a>
        <a href="/resources/hospitality-english-phrases" onClick={(event) => onNav(event, '/resources/hospitality-english-phrases')}>Hospitality English</a>
        <a href="/resources/healthcare-communication-english" onClick={(event) => onNav(event, '/resources/healthcare-communication-english')}>Healthcare English</a>
        <a href="/resources/workplace-soft-skills" onClick={(event) => onNav(event, '/resources/workplace-soft-skills')}>Soft Skills Guide</a>
        <a href="/workforce-training-request" onClick={(event) => onNav(event, '/workforce-training-request')}>Workforce Training Form</a>
        <a href="/client-portal/dashboard" onClick={(event) => onNav(event, '/client-portal/dashboard')}>Client Portal</a>
        <a href="/contact" onClick={(event) => onNav(event, '/contact')}>Book Consultation</a>
        <a href="https://www.instagram.com/up_skillpro/" target="_blank" rel="noreferrer">Instagram @up_skillpro</a>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
