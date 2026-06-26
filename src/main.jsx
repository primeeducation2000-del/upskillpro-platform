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
  { label: 'Courses', path: '/courses' },
  { label: 'Services', path: '/services' },
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

const academyProfiles = {
  hospitality: {
    title: 'Hospitality Academy',
    status: 'Academy open',
    summary: 'Hospitality English, guest service, front office, food and beverage, supervision, and management development.',
    path: '/sectors/hospitality/hospitality-academy',
    pathways: ['Hospitality Management Diploma', 'Hospitality English', 'Guest Service', 'Front Office'],
    tone: 'hospitality',
  },
  healthcare: {
    title: 'Healthcare Academy',
    status: 'Academy framework',
    summary: 'Patient communication, healthcare English, reception, administration, empathy, and professional communication.',
    path: '/sectors/healthcare',
    pathways: ['Healthcare English', 'Patient Communication', 'Care Communication', 'Reception Skills'],
    tone: 'healthcare',
  },
  workforce: {
    title: 'Business & Workforce Academy',
    status: 'Academy framework',
    summary: 'Workplace English, leadership, workforce readiness, AI and human skills, onboarding, and retention.',
    path: '/sectors/workforce',
    pathways: ['Workplace English', 'Leadership', 'AI + Human Skills', 'Workforce Readiness'],
    tone: 'workforce',
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
  '/courses': {
    title: 'Courses & Learning Pathways | UpSkillPro',
    description: 'Explore UpSkillPro sector academies, professional courses, ESP English, soft skills and workforce learning pathways.',
    keywords: 'UpSkillPro courses, sector academies, hospitality courses, ESP English courses, soft skills courses, workforce training pathways',
  },
  '/programmes': {
    title: 'ESP English, ESOL & Soft Skills Programmes | UpSkillPro',
    description: 'Explore UpSkillPro programmes including ESP English, soft skills, workforce readiness, AI human skills, and recruitment retention training.',
    keywords: 'ESP English programmes, ESOL programmes, soft skills programmes, workforce readiness programme',
  },
  '/hospitality-management-guest-service-excellence-diploma': {
    title: 'Hospitality Management & Guest Service Excellence Diploma | UpSkillPro',
    description: 'Instructor-led hospitality training for hotels, restaurants, resorts and hospitality teams. Download the workbook, trainer guide, slide deck, assessments and certificates.',
    keywords: 'Hospitality Training UK, Hotel Staff Training, Hospitality Management Diploma, Customer Service for Hotels, Hotel Reception Training, Hotel Customer Service, Hospitality Courses, UpskillPro Hospitality',
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

  if (clean === '/sectors/hospitality/hospitality-academy') {
    return {
      title: 'Hospitality Academy | UpSkillPro',
      description: 'Hospitality Academy structure for hospitality English, guest service, front office, food and beverage, supervision, assessment evidence and future qualifications.',
      keywords: 'Hospitality Academy, hospitality courses, hospitality English, guest service training, hospitality qualifications',
      canonical: canonicalForPath(clean),
      robots: 'index,follow',
    };
  }

  if (clean === '/sectors/hospitality/hospitality-academy/courses') {
    return {
      title: 'Hospitality Courses & Qualifications | UpSkillPro',
      description: 'Explore Hospitality Academy courses and qualification pathways including Hospitality English, customer service, front office and Hospitality Management Diploma.',
      keywords: 'hospitality courses, hospitality qualifications, hospitality management diploma, hotel training courses',
      canonical: canonicalForPath(clean),
      robots: 'index,follow',
    };
  }

  if (clean === '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma' || clean === '/hospitality-management-guest-service-excellence-diploma') {
    return {
      title: 'Hospitality Management Diploma | UpSkillPro',
      description: 'Hospitality Management and Guest Service Excellence Diploma pathway with modules, lessons, trainer guide, learner workbook, assessments and certificates.',
      keywords: 'hospitality management diploma, guest service training, hospitality academy, hotel management training',
      canonical: canonicalForPath('/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma'),
      robots: 'index,follow',
    };
  }

  if (clean === '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules') {
    return {
      title: 'Hospitality Management Diploma Modules | UpSkillPro',
      description: 'Module structure for the Hospitality Management Diploma, covering hospitality introduction, front office, guest communication, complaints, housekeeping, F&B and supervision.',
      keywords: 'hospitality diploma modules, hotel training modules, guest service modules, hospitality assessment evidence',
      canonical: canonicalForPath(clean),
      robots: 'index,follow',
    };
  }

  if (clean === '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules/lessons') {
    return {
      title: 'Introduction to Hospitality Lessons | UpSkillPro',
      description: 'Lesson-level structure for the Introduction to Hospitality module, including sector overview, guest experience, departments, knowledge check and practical evidence.',
      keywords: 'hospitality lessons, introduction to hospitality, hospitality training lessons, guest experience lessons',
      canonical: canonicalForPath(clean),
      robots: 'index,follow',
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

  if (path.startsWith('/programmes/') || path.startsWith('/sectors/') || path === '/hospitality-management-guest-service-excellence-diploma/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: seo.title.replace(' | UpSkillPro', ''),
      description: seo.description,
      provider: {
        '@id': `${siteUrl}/#organization`,
        name: 'UpSkillPro',
      },
      educationalLevel: path === '/hospitality-management-guest-service-excellence-diploma/' ? 'Professional development' : 'Pre-A1 to Advanced',
      teaches: path === '/hospitality-management-guest-service-excellence-diploma/'
        ? ['Hospitality management', 'Guest service excellence', 'Hotel reception', 'Service recovery', 'Housekeeping standards', 'Food and beverage service', 'Teamwork']
        : ['ESOL', 'ESP English', 'Workplace English', 'Communication Skills', 'Customer Service', 'Teamwork'],
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
  if (clean === '/sectors/hospitality/hospitality-academy') return <HospitalityAcademyPage />;
  if (clean === '/sectors/hospitality/hospitality-academy/courses') return <HospitalityAcademyCoursesPage />;
  if (clean === '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma') return <HospitalityDiplomaPage />;
  if (clean === '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules') return <HospitalityModulesPage />;
  if (clean === '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules/lessons') return <HospitalityLessonsPage />;
  if (clean.startsWith('/sectors/')) return <SectorPage sectorKey={clean.split('/').pop()} />;
  if (clean === '/courses') return <CoursesIndex />;
  if (clean === '/programmes') return <ProgrammesIndex />;
  if (clean.startsWith('/programmes/')) return <ProgrammePage programmeKey={clean.split('/').pop()} />;
  if (clean === '/hospitality-management-guest-service-excellence-diploma') return <HospitalityDiplomaPage />;
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

const hospitalityDownloads = [
  ['Learner Workbook PDF', '/downloads/hospitality-academy/upskillpro-hospitality-module-1-learner-workbook.pdf', 'Module 1 workbook with activities, notes, reflections, glossary, and action plan.'],
  ['Learner Workbook Word', '/downloads/hospitality-academy/upskillpro-hospitality-module-1-learner-workbook.docx', 'Editable A4 workbook for future course expansion.'],
  ['Trainer Guide PDF', '/downloads/hospitality-academy/upskillpro-hospitality-module-1-trainer-guide.pdf', 'Delivery notes, timings, facilitation prompts, misconceptions, and answer guide.'],
  ['Trainer Guide Word', '/downloads/hospitality-academy/upskillpro-hospitality-module-1-trainer-guide.docx', 'Editable trainer manual for instructor-led delivery.'],
  ['PowerPoint Deck', '/downloads/hospitality-academy/upskillpro-hospitality-diploma-slide-deck-320-slides.pptx', '320-slide instructor deck with speaker notes and interactive training prompts.'],
  ['Assessment Pack PDF', '/downloads/hospitality-academy/upskillpro-hospitality-module-1-assessment-pack.pdf', 'Observation checklist, practical assessment, final exam, answer guide, and rubric.'],
  ['Assessment Pack Word', '/downloads/hospitality-academy/upskillpro-hospitality-module-1-assessment-pack.docx', 'Editable assessment templates for centres and employers.'],
  ['Attendance Certificate', '/downloads/hospitality-academy/upskillpro-certificate-attendance.pdf', 'Printable certificate of attendance.'],
  ['Achievement Certificate', '/downloads/hospitality-academy/upskillpro-certificate-achievement.pdf', 'Printable certificate of achievement.'],
  ['Editable Certificates', '/downloads/hospitality-academy/upskillpro-certificate-achievement-editable.docx', 'Word certificate template for learner names, dates, and trainer signatures.'],
];

const hospitalityCourses = [
  'Hospitality Management & Guest Service Excellence Diploma',
  'Front Office Excellence',
  'Housekeeping Operations',
  'Food & Beverage Service',
  'Hotel Supervisory Skills',
  'Hospitality English',
  'Complaint Handling & Service Recovery',
  'Luxury Guest Experience',
  'Leadership in Hospitality',
];

const hospitalityModules = [
  ['01', 'Introduction to Hospitality', 'Sectors, classifications, guest expectations, departments, teamwork, and professional behaviour.'],
  ['02', 'Front Office Excellence', 'Reception, reservations, check-in, upselling, local knowledge, and arrival standards.'],
  ['03', 'Guest Communication', 'Service language, tone, listening, clarification, cultural awareness, and hospitality English.'],
  ['04', 'Complaint Handling', 'Service recovery, escalation, empathy, documentation, and follow-up.'],
  ['05', 'Housekeeping Operations', 'Room standards, inspections, amenities, safety, maintenance reporting, and guest privacy.'],
  ['06', 'Food & Beverage Service', 'Restaurant sequence, menu knowledge, allergens, table service, and guest confidence.'],
  ['07', 'Supervisory Skills', 'Briefings, handovers, coaching, quality checks, and operational leadership.'],
  ['08', 'Luxury Guest Experience', 'Personalisation, discretion, anticipation, emotional intelligence, and brand standards.'],
];

const hospitalityFaqs = [
  ['Is this an online course?', 'No. It is designed as instructor-led corporate training with downloadable materials, trainer notes, practical assessments, and workplace activities.'],
  ['Can the diploma be delivered onsite?', 'Yes. UpskillPro can deliver onsite, online, or hybrid cohorts for hotels, restaurants, resorts, and hospitality businesses.'],
  ['Who should attend?', 'Front office, housekeeping, food and beverage, concierge, supervisors, new starters, and staff moving into guest-facing roles.'],
  ['Can the content be customised?', 'Yes. The academy structure is reusable, so modules can be adapted for a property, brand standard, department, or learner English level.'],
];

function HospitalityDiplomaPage() {
  return (
    <>
      <section className="hospitality-hero">
        <div className="hospitality-hero-content">
          <p className="eyebrow">UpskillPro Hospitality Academy</p>
          <h1>Train Your Hospitality Teams to Deliver Exceptional Guest Experiences</h1>
          <p className="hero-copy">Instructor-led hospitality training developed by UpskillPro for hotels, restaurants, resorts and hospitality businesses.</p>
          <div className="button-row">
            <ActionLink path="/contact" label="Book Training" icon={CalendarCheck} primary />
            <a className="secondary-button" href="/downloads/hospitality-academy/upskillpro-hospitality-module-1-learner-workbook.pdf"><FileText size={18} /> Download Brochure</a>
            <ActionLink path="/workforce-training-request" label="Request a Quote" icon={ClipboardList} variant="accent" />
          </div>
        </div>
        <div className="hospitality-hero-panel" aria-label="Hospitality training highlights">
          <span><Star size={18} /> Premium training package</span>
          <strong>Workbook + trainer guide + 320-slide deck + assessments</strong>
          <small>Built as a multi-course academy from day one.</small>
        </div>
      </section>

      <section className="hospitality-proof">
        {[
          ['9', 'academy pathways'],
          ['320', 'trainer slides'],
          ['25+', 'workbook pages'],
          ['100%', 'workplace-focused'],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section academy-context-section">
        <AcademyBreadcrumbs items={[...hospitalityHierarchy, { label: 'Courses', path: '/sectors/hospitality/hospitality-academy/courses' }, { label: 'Hospitality Management Diploma', path: '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma' }]} />
        <div className="academy-next-step-card">
          <div>
            <p className="eyebrow">Course hierarchy</p>
            <h2>Hospitality Sector / Hospitality Academy / Courses / Diploma / Modules / Lessons</h2>
            <p>This page now sits inside the sector academy model, while keeping the existing standalone diploma page available for direct marketing links.</p>
          </div>
          <ActionLink path="/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules" label="View Modules" icon={ArrowRight} primary />
        </div>
      </section>

      <section className="section hospitality-section">
        <div className="section-heading">
          <p className="eyebrow">Why Choose UpskillPro</p>
          <h2>A practical academy for service quality, communication, and operational consistency.</h2>
          <p>Hospitality teams need more than generic customer service. The programme combines hotel standards, realistic scenarios, service recovery, department collaboration, and confidence-building communication practice.</p>
        </div>
        <div className="three-grid">
          {[
            [Hotel, 'Hotel-specific design', 'Examples and activities are grounded in reception, concierge, housekeeping, F&B, and guest service moments.'],
            [Users, 'Instructor-led delivery', 'Trainer notes, timings, discussion questions, and observation rubrics support confident live facilitation.'],
            [BarChart3, 'Corporate-ready evidence', 'Knowledge checks, practical assessments, certificates, and action plans help employers track outcomes.'],
          ].map(([Icon, title, text]) => (
            <FeatureCard key={title} icon={Icon} title={title} text={text} />
          ))}
        </div>
      </section>

      <section className="hospitality-band">
        <div>
          <p className="eyebrow">Course Overview</p>
          <h2>Hospitality Management & Guest Service Excellence Diploma</h2>
          <p>Module 1 is complete and ready to deliver. The page is structured as a full academy, so future hospitality courses can share the same design system, downloads, enquiry flow, and reusable course components.</p>
        </div>
        <div className="academy-list">
          {hospitalityCourses.map((course) => <span key={course}><CheckCircle2 size={16} /> {course}</span>)}
        </div>
      </section>

      <section className="section hospitality-section">
        <div className="section-heading">
          <p className="eyebrow">Modules</p>
          <h2>A scalable training pathway for frontline staff and supervisors.</h2>
        </div>
        <div className="hospitality-module-grid">
          {hospitalityModules.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              {number === '01' && (
                <ActionLink
                  path="/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules/lessons"
                  label="View Lessons"
                  icon={ArrowRight}
                />
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section hospitality-split">
        <div>
          <p className="eyebrow">Who Should Attend</p>
          <h2>Designed for staff who shape the guest journey.</h2>
          <ul>
            <li>Hotel reception, reservations, concierge, and guest relations teams</li>
            <li>Housekeeping, food and beverage, restaurant, and events staff</li>
            <li>New starters, supervisors, team leaders, and service recovery champions</li>
            <li>Hospitality businesses needing consistent service language and brand standards</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Learning Outcomes</p>
          <h2>By the end, learners can act with more confidence and consistency.</h2>
          <ul>
            <li>Explain hospitality sectors, hotel types, departments, and classifications</li>
            <li>Map the guest journey and recognise moments that shape satisfaction</li>
            <li>Use professional behaviour, tone, and ownership under pressure</li>
            <li>Apply service recovery, escalation, and teamwork standards</li>
          </ul>
        </div>
      </section>

      <section className="hospitality-delivery">
        <div className="section-heading">
          <p className="eyebrow">Duration and Delivery</p>
          <h2>Flexible corporate training for operational teams.</h2>
        </div>
        <div className="process">
          {['Needs analysis', 'Instructor-led session', 'Scenario practice', 'Assessment', 'Action plan'].map((step, index) => (
            <div className="process-step" key={step}>
              <span>0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section hospitality-section">
        <div className="section-heading">
          <p className="eyebrow">Downloads</p>
          <h2>Commercial training assets generated for immediate review.</h2>
        </div>
        <div className="download-grid">
          {hospitalityDownloads.map(([title, href, text]) => (
            <a href={href} className="download-card" key={href}>
              <FileText size={24} />
              <strong>{title}</strong>
              <span>{text}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="hospitality-testimonials">
        {[
          ['General Manager, Business Hotel', 'The structure feels like a premium in-house academy, not a generic customer-service workshop.'],
          ['Front Office Trainer', 'The scenarios give learners language, judgement, and confidence they can use on shift immediately.'],
          ['Hospitality Group HR Lead', 'A strong base for standardising guest service expectations across multiple properties.'],
        ].map(([name, quote]) => (
          <blockquote key={name}>
            <Star size={22} />
            <p>{quote}</p>
            <cite>{name}</cite>
          </blockquote>
        ))}
      </section>

      <section className="section hospitality-section">
        <div className="section-heading">
          <p className="eyebrow">Frequently Asked Questions</p>
          <h2>Common questions from hospitality employers.</h2>
        </div>
        <div className="faq-list">
          {hospitalityFaqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="hospitality-contact" id="quote">
        <div>
          <p className="eyebrow">Corporate Training</p>
          <h2>Build a tailored hospitality academy for your team.</h2>
          <p>Use the form to start a conversation about group size, departments, delivery model, assessment requirements, and custom branding.</p>
        </div>
        <form className="lead-form hospitality-mini-form" onSubmit={(event) => { event.preventDefault(); navigate('/workforce-training-request'); }}>
          <Input label="Company name" required onChange={() => {}} />
          <Input label="Email" type="email" required onChange={() => {}} />
          <Select label="Delivery method" required options={['Onsite', 'Online', 'Hybrid']} onChange={() => {}} />
          <Select label="Team size" required options={['1-15', '16-50', '51-150', '150+']} onChange={() => {}} />
          <button className="primary-button" type="submit"><Send size={18} /> Request a Quote</button>
        </form>
      </section>
    </>
  );
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
      <AcademyDirectory
        eyebrow="Sector academies"
        title="Enter through your industry. Progress through a structured academy."
        intro="Each academy brings courses, qualification pathways, employer training, resources, and future LMS delivery into one clear sector home."
      />
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
    <PageShell eyebrow="Sectors" title="Choose your sector. Enter its academy." intro="Employers can begin with their industry, then move into relevant courses, qualification pathways, resources, and corporate training.">
      <AcademyDirectory embedded />
      <div className="sector-structure-note">
        <div>
          <p className="eyebrow">How the structure works</p>
          <h2>Sector to academy to learning.</h2>
        </div>
        <ol>
          <li><span>01</span><strong>Choose a sector</strong></li>
          <li><span>02</span><strong>Enter its academy</strong></li>
          <li><span>03</span><strong>Select a course or qualification</strong></li>
          <li><span>04</span><strong>Progress through modules and lessons</strong></li>
        </ol>
      </div>
    </PageShell>
  );
}

function SectorPage({ sectorKey }) {
  const sector = sectors[sectorKey] || sectors.hospitality;
  const isHospitality = sectorKey === 'hospitality';
  const academy = academyProfiles[sectorKey] || academyProfiles.hospitality;
  return (
    <PageShell eyebrow={`${academy.title} sector`} title={`${sector.title} workforce training`} intro={sector.subtitle}>
      <SectorAcademyHeader academy={academy} isHospitality={isHospitality} />
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
      {isHospitality && <HospitalityAcademyGateway />}
      <CTASection />
    </PageShell>
  );
}

function AcademyDirectory({ eyebrow = '', title = '', intro = '', embedded = false }) {
  const content = (
    <div className="academy-directory">
      {Object.entries(academyProfiles).map(([key, academy]) => {
        const Icon = sectors[key].icon;
        return (
          <article className={`academy-directory-card ${academy.tone}`} key={key}>
            <div className="academy-card-heading">
              <Icon size={28} />
              <span>{academy.status}</span>
            </div>
            <h3>{academy.title}</h3>
            <p>{academy.summary}</p>
            <ul>{academy.pathways.map((pathway) => <li key={pathway}>{pathway}</li>)}</ul>
            <ActionLink path={academy.path} label={key === 'hospitality' ? 'Open Academy' : 'View Sector Framework'} icon={ArrowRight} />
          </article>
        );
      })}
    </div>
  );

  if (embedded) return content;
  return <Section eyebrow={eyebrow} title={title}><p className="section-intro">{intro}</p>{content}</Section>;
}

function SectorAcademyHeader({ academy, isHospitality }) {
  return (
    <section className={`sector-academy-header ${academy.tone}`}>
      <div>
        <span className="academy-status">{academy.status}</span>
        <h2>{academy.title}</h2>
        <p>{academy.summary}</p>
      </div>
      <div>
        <span>Academy areas</span>
        <strong>Overview</strong>
        <strong>Courses</strong>
        <strong>Qualifications</strong>
        <strong>Resources</strong>
        <strong>Corporate Training</strong>
        <strong>Downloads</strong>
      </div>
      <ActionLink path={isHospitality ? academy.path : '/courses'} label={isHospitality ? 'Enter Hospitality Academy' : 'Explore Available Pathways'} icon={ArrowRight} primary />
    </section>
  );
}

function HospitalityAcademyGateway() {
  return (
    <section className="sector-academy-gateway">
      <div>
        <p className="eyebrow">Hospitality Academy</p>
        <h2>Sector-specific academy structure for courses, qualifications, modules, lessons, and assessment evidence.</h2>
        <p>
          The Hospitality Academy is the first sector academy skeleton. It organises hospitality training into a clear awarding-body-ready pathway from sector needs through to courses, modules, lessons, assessment, and learner evidence.
        </p>
      </div>
      <div className="academy-pathway">
        {[
          ['1', 'Hospitality Sector', '/sectors/hospitality'],
          ['2', 'Hospitality Academy', '/sectors/hospitality/hospitality-academy'],
          ['3', 'Courses', '/sectors/hospitality/hospitality-academy/courses'],
          ['4', 'Hospitality Management Diploma', '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma'],
          ['5', 'Modules', '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules'],
          ['6', 'Lessons', '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules/lessons'],
        ].map(([number, label, path]) => (
          <a key={path} href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>
            <span>{number}</span>
            <strong>{label}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}

function AcademyBreadcrumbs({ items }) {
  return (
    <nav className="academy-breadcrumbs" aria-label="Academy hierarchy">
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <a href={item.path} onClick={(event) => { event.preventDefault(); navigate(item.path); }}>{item.label}</a>
          {index < items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

const hospitalityHierarchy = [
  { label: 'Sectors', path: '/sectors' },
  { label: 'Hospitality', path: '/sectors/hospitality' },
  { label: 'Hospitality Academy', path: '/sectors/hospitality/hospitality-academy' },
];

function HospitalityAcademyPage() {
  return (
    <PageShell
      title="Hospitality Academy"
      intro="A sector-specific training academy for hospitality English, guest service, front office, food and beverage, supervision, and future regulated qualifications."
      variant="academy"
    >
      <AcademyBreadcrumbs items={hospitalityHierarchy} />
      <nav className="academy-section-nav" aria-label="Hospitality Academy sections">
        {['Overview', 'Courses', 'Qualifications', 'Resources', 'Corporate Training', 'Downloads'].map((label) => (
          <a key={label} href={`#${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
        ))}
      </nav>
      <section className="academy-lead" id="overview">
        <div>
          <p className="eyebrow">Academy overview</p>
          <h2>A complete sector home for employers, learners, and future qualification delivery.</h2>
          <p>The academy connects hospitality needs to structured learning, assessment evidence, learner resources, employer delivery, and quality-assurance planning.</p>
          <div className="button-row">
            <ActionLink path="/sectors/hospitality/hospitality-academy/courses" label="Explore Courses" icon={ArrowRight} primary />
            <ActionLink path="/workforce-training-request" label="Corporate Training" icon={BriefcaseBusiness} />
          </div>
        </div>
        <ol className="academy-progression" aria-label="Academy learning hierarchy">
          {['Sector', 'Academy', 'Course or qualification', 'Modules', 'Lessons', 'Assessment and evidence'].map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>
          ))}
        </ol>
      </section>
      <div className="academy-sections-grid">
        <article id="courses">
          <BookOpenCheck size={28} />
          <p className="eyebrow">Courses</p>
          <h3>Professional hospitality learning</h3>
          <p>Short courses, role-specific English, guest service, front office, supervision, and management pathways.</p>
          <ActionLink path="/sectors/hospitality/hospitality-academy/courses" label="View Course Catalogue" icon={ArrowRight} />
        </article>
        <article id="qualifications">
          <ShieldCheck size={28} />
          <p className="eyebrow">Qualifications</p>
          <h3>Qualification-ready structure</h3>
          <p>Course aims, units, learning outcomes, assessment methods, learner evidence, and internal quality-assurance planning.</p>
          <ActionLink path="/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma" label="View Diploma Pathway" icon={ArrowRight} />
        </article>
        <article id="resources">
          <FileText size={28} />
          <p className="eyebrow">Resources</p>
          <h3>Sector knowledge and language</h3>
          <p>Hospitality English guidance, workplace phrases, learner workbooks, practical activities, and employer resources.</p>
          <ActionLink path="/resources/hospitality-english-phrases" label="Open Hospitality Resources" icon={ArrowRight} />
        </article>
        <article id="corporate-training">
          <BriefcaseBusiness size={28} />
          <p className="eyebrow">Corporate Training</p>
          <h3>Academies built around your operation</h3>
          <p>Onsite, online, or hybrid training aligned to departments, standards, service priorities, and reporting needs.</p>
          <ActionLink path="/workforce-training-request" label="Request a Training Plan" icon={ArrowRight} />
        </article>
      </div>
      <section className="academy-downloads" id="downloads">
        <div>
          <p className="eyebrow">Downloads</p>
          <h2>Review the academy's learning and assessment materials.</h2>
          <p>These materials demonstrate how the academy can support consistent delivery, assessment, learner evidence, and centre review.</p>
        </div>
        <div>
          {hospitalityDownloads.slice(0, 4).map(([title, href]) => (
            <a href={href} key={href}><FileText size={20} /><span>{title}</span><ArrowRight size={18} /></a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function CoursesIndex() {
  return (
    <PageShell eyebrow="Courses & pathways" title="Find learning by sector or by skill." intro="Employers can begin with a sector academy. Learners and training teams can also explore reusable learning pathways that work across industries.">
      <AcademyDirectory embedded />
      <section className="pathway-catalogue">
        <div className="section-heading">
          <p className="eyebrow">Cross-sector pathways</p>
          <h2>Learning themes used across the academies.</h2>
          <p>These established programme pages remain available and now act as reusable pathways within the relevant sector academies.</p>
        </div>
        <div className="card-grid">
          {Object.entries(programmes).map(([key, programme]) => (
            <FeatureCard key={key} icon={Target} title={programme.title} text={programme.problem} path={`/programmes/${key}`} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function HospitalityAcademyCoursesPage() {
  return (
    <PageShell
      eyebrow="Hospitality Academy Courses"
      title="Hospitality Courses & Qualifications"
      intro="A catalogue-ready view of hospitality academy courses, including short professional courses and the flagship Hospitality Management Diploma pathway."
    >
      <AcademyBreadcrumbs items={[...hospitalityHierarchy, { label: 'Courses', path: '/sectors/hospitality/hospitality-academy/courses' }]} />
      <div className="card-grid">
        {hospitalityCourses.map((course, index) => (
          <article className="info-card" key={course}>
            <BookOpenCheck size={26} />
            <h3>{course}</h3>
            <p>{index === 0 ? 'Flagship diploma pathway with modules, lessons, assessment pack, trainer guide, workbook, and certificates.' : 'Planned hospitality academy course ready to be populated with outcomes, modules, lessons, and assessment evidence.'}</p>
            {index === 0 && (
              <ActionLink
                path="/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma"
                label="Open Diploma"
                icon={ArrowRight}
              />
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function HospitalityModulesPage() {
  return (
    <PageShell
      eyebrow="Hospitality Management Diploma"
      title="Diploma Modules"
      intro="The module skeleton shows how the hospitality diploma can scale into teachable units, assessment evidence, and future awarding-body mapping."
    >
      <AcademyBreadcrumbs items={[...hospitalityHierarchy, { label: 'Courses', path: '/sectors/hospitality/hospitality-academy/courses' }, { label: 'Hospitality Management Diploma', path: '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma' }, { label: 'Modules', path: '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules' }]} />
      <div className="hospitality-module-grid">
        {hospitalityModules.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            {number === '01' && (
              <ActionLink
                path="/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules/lessons"
                label="View Lessons"
                icon={ArrowRight}
              />
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function HospitalityLessonsPage() {
  const lessons = [
    ['1.1', 'Welcome to Hospitality', 'Sector purpose, service mindset, professionalism, and guest expectations.'],
    ['1.2', 'Hospitality Sectors and Settings', 'Hotels, restaurants, resorts, events, front office, housekeeping, food and beverage.'],
    ['1.3', 'Guest Experience Basics', 'Moments of truth, tone, body language, first impressions, and consistency.'],
    ['1.4', 'Departments and Teamwork', 'How front office, housekeeping, F&B, maintenance, and management work together.'],
    ['1.5', 'Module 1 Knowledge Check', 'Short formative assessment to confirm core understanding before progression.'],
    ['1.6', 'Practical Evidence Task', 'Learner demonstrates professional communication and reflects on workplace application.'],
  ];

  return (
    <PageShell
      eyebrow="Module 1 Lessons"
      title="Introduction to Hospitality Lessons"
      intro="A lesson-level skeleton showing how each module can become teachable content inside the future LMS, with assessment and evidence attached."
    >
      <AcademyBreadcrumbs items={[...hospitalityHierarchy, { label: 'Courses', path: '/sectors/hospitality/hospitality-academy/courses' }, { label: 'Diploma', path: '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma' }, { label: 'Modules', path: '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules' }, { label: 'Lessons', path: '/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules/lessons' }]} />
      <div className="lesson-roadmap">
        {lessons.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ProgrammesIndex() {
  return (
    <PageShell eyebrow="Learning pathways" title="ESP English, soft skills, and workforce development pathways." intro="These established pathways are retained and can be used across the sector academies, delivered onsite, online, or hybrid.">
      <div className="legacy-programme-note"><strong>Looking for the full catalogue?</strong><span>Browse by sector academy or compare every learning pathway in one place.</span><ActionLink path="/courses" label="View Courses" icon={ArrowRight} /></div>
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

function PageShell({ eyebrow, title, intro, children, variant = '' }) {
  const isAcademy = variant === 'academy';
  return (
    <>
      <section className={`page-hero ${isAcademy ? 'academy-page-hero' : ''}`}>
        {isAcademy ? (
          <h1 className="academy-page-title">{title}</h1>
        ) : (
          <>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </>
        )}
        <p>{intro}</p>
      </section>
      <section className={`section page-content ${isAcademy ? 'academy-page-content' : ''}`}>{children}</section>
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
        <a href="/sectors" onClick={(event) => onNav(event, '/sectors')}>Sector Academies</a>
        <a href="/courses" onClick={(event) => onNav(event, '/courses')}>Courses & Pathways</a>
        <a href="/case-studies" onClick={(event) => onNav(event, '/case-studies')}>Case Studies</a>
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
