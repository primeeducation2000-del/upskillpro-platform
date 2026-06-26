import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const siteUrl = 'https://upskillpro.co.uk';

const seoRoutes = [
  ['/', 'UpSkillPro | ESP English, ESOL & Soft Skills Training', 'ESP English, ESOL, workplace communication and soft skills training for learners, employers and workforce teams.', ['ESP English and soft skills training', 'Hospitality, healthcare and workplace English', 'Initial assessment and CEFR placement', 'Online, onsite and hybrid workforce training']],
  ['/about', 'About UpSkillPro | English & Workforce Training', 'UpSkillPro combines English for Specific Purposes, ESOL, communication and soft skills training for real workplace performance.', ['Practical workplace learning', 'Sector-specific training', 'Learner assessment and progression', 'Employer-focused delivery']],
  ['/sectors', 'Sector English Training | UpSkillPro', 'Explore sector-specific English and soft skills training for hospitality, healthcare, recruitment and workforce teams.', ['Hospitality English', 'Healthcare English', 'Workplace English', 'Customer service communication']],
  ['/sectors/hospitality', 'Hospitality English Training | UpSkillPro', 'Hospitality English training for hotels, restaurants, reception, housekeeping, guest service and operational teams.', ['Front desk communication', 'Reservations and restaurant English', 'Guest complaints and service recovery', 'Team confidence and customer service']],
  ['/sectors/hospitality/hospitality-academy', 'Hospitality Academy | UpSkillPro', 'Hospitality Academy structure for hospitality English, guest service, front office, food and beverage, supervision, assessment evidence and future qualifications.', ['Hospitality courses', 'Hospitality Management Diploma', 'Modules and lessons', 'Assessment evidence']],
  ['/sectors/hospitality/hospitality-academy/courses', 'Hospitality Courses & Qualifications | UpSkillPro', 'Explore Hospitality Academy courses and qualification pathways including Hospitality English, customer service, front office and Hospitality Management Diploma.', ['Hospitality English', 'Customer service', 'Front office', 'Hospitality Management Diploma']],
  ['/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma', 'Hospitality Management Diploma | UpSkillPro', 'Hospitality Management and Guest Service Excellence Diploma pathway with modules, lessons, trainer guide, learner workbook, assessments and certificates.', ['Guest service excellence', 'Trainer guide', 'Learner workbook', 'Assessments and certificates']],
  ['/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules', 'Hospitality Management Diploma Modules | UpSkillPro', 'Module structure for the Hospitality Management Diploma, covering hospitality introduction, front office, guest communication, complaints, housekeeping, F&B and supervision.', ['Introduction to hospitality', 'Front office excellence', 'Guest communication', 'Service recovery']],
  ['/sectors/hospitality/hospitality-academy/courses/hospitality-management-diploma/modules/lessons', 'Introduction to Hospitality Lessons | UpSkillPro', 'Lesson-level structure for the Introduction to Hospitality module, including sector overview, guest experience, departments, knowledge check and practical evidence.', ['Welcome to hospitality', 'Guest experience basics', 'Departments and teamwork', 'Practical evidence task']],
  ['/sectors/healthcare', 'Healthcare English Training | UpSkillPro', 'Healthcare English for patient communication, reception, administration, appointments and professional workplace interaction.', ['Patient-facing English', 'Reception and appointment language', 'Empathy and professional tone', 'Clear workplace communication']],
  ['/sectors/workforce', 'Workplace English & Workforce Readiness | UpSkillPro', 'Workplace English, interview communication, onboarding and soft skills training for employees, employers and recruitment teams.', ['Interview English', 'Workplace instructions', 'Team communication', 'Recruitment and retention support']],
  ['/programmes', 'English & Soft Skills Programmes | UpSkillPro', 'ESP English, ESOL, workforce readiness, soft skills and AI human skills programmes from beginner to advanced.', ['ESP English programmes', 'Soft skills programmes', 'Workforce readiness', 'Recruitment and retention']],
  ['/programmes/esp-english-programmes', 'ESP English Programmes | UpSkillPro', 'English for Specific Purposes programmes covering hospitality, healthcare and workplace communication.', ['Job-specific English', 'Role-play and real scenarios', 'Vocabulary and communication practice', 'Assessment and progression']],
  ['/programmes/soft-skills-programmes', 'Soft Skills Training Programmes | UpSkillPro', 'Communication, teamwork, customer service, conflict handling and leadership basics for workplace performance.', ['Communication confidence', 'Customer service', 'Teamwork', 'Conflict management']],
  ['/programmes/workforce-readiness-programme', 'Workforce Readiness Programme | UpSkillPro', 'Workplace English, interview skills, behaviour, communication and onboarding preparation for new and returning workers.', ['Interview preparation', 'Workplace behaviour', 'English confidence', 'Faster onboarding']],
  ['/programmes/ai-human-skills-programme', 'AI & Human Skills Training | UpSkillPro', 'Practical AI productivity, digital communication and human judgement skills for modern workplaces.', ['AI productivity tools', 'Digital workplace English', 'Professional writing', 'Human review and judgement']],
  ['/programmes/recruitment-retention-programme', 'Recruitment & Retention Training | UpSkillPro', 'Communication-led recruitment, onboarding and retention support for employers and workforce teams.', ['Candidate readiness', 'Interview communication', 'Manager feedback', 'Team integration']],
  ['/services', 'English, Soft Skills & Workforce Services | UpSkillPro', 'Training and consultancy services covering ESP English, ESOL, soft skills, AI and workforce development.', ['English training', 'Soft skills workshops', 'AI training', 'Workforce consultancy']],
  ['/services/esp-english-training', 'ESP English Training Service | UpSkillPro', 'Job-specific English training for hospitality, healthcare, customer service and workplace teams.', ['Needs analysis', 'Sector vocabulary', 'Scenario practice', 'Progress reporting']],
  ['/services/soft-skills-training', 'Soft Skills Training Service | UpSkillPro', 'Practical communication, customer service, teamwork and conflict-handling workshops.', ['Communication skills', 'Customer service', 'Teamwork', 'Professional confidence']],
  ['/services/ai-training', 'Workplace AI Training | UpSkillPro', 'AI productivity training combined with communication, writing, judgement and responsible workplace use.', ['AI tools', 'Prompting', 'Review skills', 'Digital communication']],
  ['/services/recruitment-services', 'Recruitment Readiness Services | UpSkillPro', 'Candidate communication, interview preparation, onboarding and retention-aligned workforce support.', ['Candidate preparation', 'Interview English', 'Onboarding support', 'Retention']],
  ['/services/consultancy', 'Workforce Training Consultancy | UpSkillPro', 'Workforce communication diagnostics, programme design and performance improvement consultancy.', ['Needs analysis', 'Programme design', 'Delivery planning', 'Employer reporting']],
  ['/workforce-training-request', 'Request a Workforce Training Plan | UpSkillPro', 'Request a tailored English, soft skills or workforce development proposal for your organisation.', ['Company and staff needs', 'Communication challenges', 'Delivery preferences', 'Tailored proposal']],
  ['/case-studies', 'English & Workforce Training Outcomes | UpSkillPro', 'Explore how role-specific English and soft skills training can improve communication, confidence and service performance.', ['Hospitality outcomes', 'Healthcare communication', 'Workforce readiness', 'Measurable improvement']],
  ['/resources', 'English for Work & Soft Skills Resources | UpSkillPro', 'Practical guidance about ESP English, workplace communication, healthcare English, hospitality English and soft skills.', ['What is ESP English?', 'Hospitality English phrases', 'Healthcare communication', 'Workplace soft skills']],
  ['/resources/what-is-esp-english', 'What Is ESP English? | UpSkillPro', 'Learn how English for Specific Purposes teaches the language learners need for a particular job, sector or workplace situation.', ['Meaning of ESP English', 'ESP compared with general English', 'Workplace examples', 'Who ESP training helps']],
  ['/resources/hospitality-english-phrases', 'Hospitality English Phrases for Work | UpSkillPro', 'Useful English phrases for hotel reception, reservations, guest service, restaurants and complaint handling.', ['Welcoming guests', 'Confirming bookings', 'Giving information', 'Handling complaints']],
  ['/resources/healthcare-communication-english', 'Healthcare Communication English | UpSkillPro', 'Practical English for healthcare reception, patient communication, appointments and professional support.', ['Checking patient details', 'Explaining appointments', 'Offering support', 'Professional tone']],
  ['/resources/workplace-soft-skills', 'Workplace Soft Skills Guide | UpSkillPro', 'Understand the communication, teamwork, customer service and conflict-handling skills employers value.', ['Clear communication', 'Teamwork', 'Customer service', 'Professional behaviour']],
  ['/contact', 'Contact UpSkillPro | English & Soft Skills Training', 'Contact UpSkillPro about ESP English, ESOL, workplace communication, soft skills and workforce training.', ['Email UpSkillPro', 'Call UpSkillPro', 'Request a training plan', 'Follow UpSkillPro on Instagram']],
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function prerenderPublicRoutes() {
  return {
    name: 'upskillpro-prerender-public-routes',
    apply: 'build',
    async closeBundle() {
      const dist = resolve('dist');
      const template = await readFile(resolve(dist, 'index.html'), 'utf8');

      await Promise.all(seoRoutes.map(async ([route, title, description, points]) => {
        const canonical = `${siteUrl}${route === '/' ? '/' : `${route}/`}`;
        const structuredData = {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': ['Organization', 'EducationalOrganization'],
              '@id': `${siteUrl}/#organization`,
              name: 'UpSkillPro',
              url: `${siteUrl}/`,
              logo: `${siteUrl}/assets/upskillpro-logo.png`,
              email: 'info@upskillpro.co.uk',
              telephone: '+447436830626',
              description: 'ESP English, ESOL, soft skills and workforce performance training.',
              areaServed: ['United Kingdom', 'Saudi Arabia', 'International'],
              sameAs: ['https://www.instagram.com/up_skillpro/'],
            },
            {
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              name: 'UpSkillPro',
              url: `${siteUrl}/`,
              publisher: { '@id': `${siteUrl}/#organization` },
            },
            {
              '@type': 'WebPage',
              '@id': `${canonical}#webpage`,
              url: canonical,
              name: title,
              description,
              isPartOf: { '@id': `${siteUrl}/#website` },
              about: { '@id': `${siteUrl}/#organization` },
            },
          ],
        };
        const content = `
          <main class="seo-prerender">
            <header><a href="/">UpSkillPro</a><nav><a href="/programmes">Programmes</a><a href="/sectors">Sectors</a><a href="/resources">Resources</a><a href="/contact">Contact</a></nav></header>
            <article>
              <p>ESP English | ESOL | Soft Skills</p>
              <h1>${escapeHtml(title.replace(' | UpSkillPro', '').replace('UpSkillPro | ', ''))}</h1>
              <p>${escapeHtml(description)}</p>
              <ul>${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>
              <p><a href="/workforce-training-request">Request a Training Plan</a> <a href="/contact">Book a Consultation</a></p>
            </article>
          </main>`;

        let html = template
          .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
          .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
          .replace(/<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
          .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
          .replace(/<meta\s+property="og:url"[\s\S]*?\/>/, `<meta property="og:url" content="${canonical}" />`)
          .replace(/<link\s+rel="canonical"[\s\S]*?\/>/, `<link rel="canonical" href="${canonical}" />`)
          .replace(/<script\s+type="application\/ld\+json"\s+id="upskillpro-structured-data">[\s\S]*?<\/script>/, `<script type="application/ld+json" id="upskillpro-structured-data">${JSON.stringify(structuredData)}</script>`)
          .replace('<div id="root"></div>', `<div id="root">${content}</div>`);

        html = html.replace('</head>', `<style>.seo-prerender{font-family:Arial,sans-serif;color:#10232b;max-width:1100px;margin:auto;padding:24px}.seo-prerender header{display:flex;justify-content:space-between;gap:24px}.seo-prerender nav{display:flex;gap:16px;flex-wrap:wrap}.seo-prerender article{padding:80px 0}.seo-prerender h1{font-size:clamp(2.2rem,6vw,4.8rem);max-width:900px}.seo-prerender p,.seo-prerender li{font-size:1.1rem;line-height:1.7}.seo-prerender a{color:#087f78;font-weight:700}</style></head>`);

        const output = route === '/' ? resolve(dist, 'index.html') : resolve(dist, route.slice(1), 'index.html');
        await mkdir(dirname(output), { recursive: true });
        await writeFile(output, html);
      }));
    },
  };
}

export default defineConfig({
  plugins: [react(), prerenderPublicRoutes()],
});
