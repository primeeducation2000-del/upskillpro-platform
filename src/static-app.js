const sectors = {
  hospitality: {
    icon: '⌂',
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
    icon: '+',
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
    icon: '▣',
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
  esp: ['ESP English Programmes', 'Teams who need role-specific English for daily workplace performance.', ['Hospitality English', 'Healthcare English', 'Workplace English', 'Job-specific communication practice'], ['Confidence building', 'Professional tone', 'Listening and clarification', 'Service communication']],
  soft: ['Soft Skills Programmes', 'Operational teams, supervisors, and frontline staff in service-heavy environments.', ['Workplace phrases for service recovery', 'Clear handover language', 'Customer and patient-facing expressions'], ['Customer service', 'Conflict handling', 'Teamwork', 'Leadership basics']],
  readiness: ['Workforce Readiness Programme', 'Employers preparing new hires, return-to-work groups, and entry-level workforce cohorts.', ['ESP English basics', 'Interview language', 'Workplace instructions', 'Role-specific vocabulary'], ['Interview skills', 'Workplace behaviour', 'Communication confidence', 'Team expectations']],
  ai: ['AI + Human Skills Programme', 'Businesses preparing teams for digital productivity without losing human communication quality.', ['Digital workplace language', 'Prompting and review vocabulary', 'Clear written communication'], ['AI tools for productivity', 'Communication enhancement', 'Digital workplace skills', 'Judgement and review habits']],
  retention: ['Recruitment & Retention Programme', 'Employers and recruitment teams facing staff shortages, turnover, or slow onboarding.', ['Interview English', 'Role expectation language', 'Workplace English for new starters'], ['Retention conversations', 'Manager communication', 'Feedback habits', 'Team integration']],
};

const services = [
  ['ESP English Training', 'Job-specific English for hospitality, healthcare, and workplace communication.'],
  ['Soft Skills Training', 'Communication, customer service, teamwork, and conflict handling workshops.'],
  ['AI Training', 'Practical AI productivity training paired with judgement, writing, and workplace communication.'],
  ['Recruitment Services', 'Recruitment readiness, candidate communication support, and retention-aligned onboarding.'],
  ['Consultancy', 'Workforce diagnostics, programme design, and performance improvement reporting.'],
];

const app = document.querySelector('#app');
const nav = document.querySelector('nav');
document.querySelector('.menu-toggle').addEventListener('click', () => nav.classList.toggle('open'));
document.body.addEventListener('click', (event) => {
  const link = event.target.closest('[data-route]');
  if (!link) return;
  event.preventDefault();
  nav.classList.remove('open');
  location.hash = link.dataset.route;
});
window.addEventListener('hashchange', render);

function card(title, text, route = '') {
  return `<article class="info-card"><div class="card-icon">✓</div><h3>${title}</h3><p>${text}</p>${route ? `<a class="secondary-button" href="#${route}" data-route="${route}">View details →</a>` : ''}</article>`;
}

function section(eyebrow, title, body) {
  return `<section class="section"><div class="section-heading"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${body}</section>`;
}

function page(eyebrow, title, intro, body) {
  return `<section class="page-hero"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${intro}</p></section><section class="section">${body}</section>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function detailBlocks(blocks) {
  return `<div class="detail-grid">${blocks.map(([title, items]) => `<article class="info-card"><h3>${title}</h3>${list(items)}</article>`).join('')}</div>${cta()}`;
}

function cta() {
  return `<div class="cta-band"><div><h2>Ready to scope your workforce training plan?</h2><p>Submit the request form and we will prepare a proposal around your sector, staff groups, and communication goals.</p></div><a class="primary-button" href="#workforce-training-request" data-route="workforce-training-request">▣ Workforce Training Form</a></div>`;
}

function home() {
  return `
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">ESP English + Soft Skills Training</p>
        <h1>ESP English & Soft Skills Training for Workforce Performance</h1>
        <p class="hero-copy">Helping hospitality, healthcare, and businesses improve communication, service quality, and staff performance.</p>
        <div class="button-row">
          <a class="primary-button" href="#contact" data-route="contact">□ Book Consultation</a>
          <a class="secondary-button" href="#workforce-training-request" data-route="workforce-training-request">▣ Request Training Plan</a>
        </div>
      </div>
    </section>
    ${section('Who we help', 'Built for operational teams where communication affects performance.', `<div class="three-grid">${Object.entries(sectors).map(([key, sector]) => card(sector.title, sector.subtitle, `sector-${key}`)).join('')}</div>`)}
    ${section('What we solve', 'Practical training for the barriers that slow teams down.', `<div class="challenge-grid">${['Poor workplace communication', 'Low English confidence', 'Customer service issues', 'Staff turnover', 'Recruitment challenges', 'Slow onboarding', 'Lack of soft skills'].map((item) => `<span>✓ ${item}</span>`).join('')}</div>`)}
    ${section('Core solutions', 'A clear product structure for workforce improvement.', `<div class="solution-list"><article class="solution-block"><span>1</span><h3>ESP English Training</h3>${list(['Hospitality English', 'Healthcare English', 'Workplace English'])}</article><article class="solution-block"><span>2</span><h3>Soft Skills Training</h3>${list(['Communication skills', 'Customer service', 'Teamwork', 'Conflict handling'])}</article><article class="solution-block"><span>3</span><h3>Workforce Programmes</h3>${list(['Workforce Readiness Programme', 'AI + Human Skills Programme', 'Recruitment & Retention Programme'])}</article></div>`)}
    ${section('Process', 'From workforce request to measurable improvement.', `<div class="process">${['Workforce Training Request Form', 'Consultation', 'Programme Design', 'Training Delivery', 'Reporting & Improvement Tracking'].map((step, index) => `<div class="process-step"><span>${index + 1}</span><p>${step}</p></div>`).join('')}</div>`)}
    <section class="portal-preview"><div><p class="eyebrow">Future client portal</p><h2>LMS and performance dashboard architecture is already planned.</h2><p>Clients will track staff progress, assign training, review department performance, and export reports.</p><a class="primary-button" href="#client-portal" data-route="client-portal">▣ Preview Portal</a></div><div class="portal-mini">${['Staff progress|78%', 'Department performance|4.2/5', 'Training completion|64%', 'Reports ready|12'].map((item) => { const [a, b] = item.split('|'); return `<div><span>${a}</span><strong>${b}</strong></div>`; }).join('')}</div></section>
  `;
}

function formPage() {
  return page('Workforce Training Request Form', 'Request a workforce training plan.', 'Share your team needs so UpSkillPro can prepare a tailored ESP English and soft skills proposal.', `
    <form class="lead-form" id="lead-form">
      ${fieldset('Company Information', `${input('Company name', 'companyName', true)}${select('Industry', 'industry', ['Hospitality', 'Healthcare', 'Other'], true)}${input('Number of staff', 'staffCount', true, 'number')}${input('Location', 'location', true)}`)}
      ${fieldset('Contact Details', `${input('Name', 'name', true)}${input('Job title', 'jobTitle', true)}${input('Email', 'email', true, 'email')}${input('Phone', 'phone', false, 'tel')}`)}
      ${checks('Workforce Challenges', ['Low English communication skills', 'Customer service issues', 'Staff turnover', 'Recruitment challenges', 'Slow onboarding', 'Low confidence in speaking English', 'Poor teamwork', 'Lack of soft skills'])}
      ${checks('Departments', ['Front desk', 'Housekeeping', 'Restaurant', 'Healthcare staff', 'Admin', 'Management'])}
      ${fieldset('Goals', `<label class="full-field"><span>What goals should training support?</span><textarea name="goals" rows="5"></textarea></label>`)}
      ${fieldset('Programme Details', `${select('Urgency', 'urgency', ['Immediate', '1 month', '1-3 months', 'Exploring'], true)}${select('Delivery Preference', 'deliveryPreference', ['Onsite', 'Online', 'Hybrid'], true)}${select('Budget Range', 'budgetRange', ['£5k-£10k', '£10k-£25k', '£25k-£50k'], true)}<label class="full-field"><span>What is your biggest workforce challenge?</span><textarea name="biggestChallenge" rows="4" required></textarea></label>`)}
      <button class="primary-button" type="submit">Submit Training Request</button>
    </form>
  `);
}

function fieldset(title, fields) {
  return `<fieldset><legend>${title}</legend><div class="field-grid">${fields}</div></fieldset>`;
}

function input(label, name, required = false, type = 'text') {
  return `<label><span>${label}</span><input name="${name}" type="${type}" ${required ? 'required' : ''}></label>`;
}

function select(label, name, options, required = false) {
  return `<label><span>${label}</span><select name="${name}" ${required ? 'required' : ''}><option value="">Select option</option>${options.map((option) => `<option>${option}</option>`).join('')}</select></label>`;
}

function checks(title, items) {
  return `<fieldset><legend>${title}</legend><div class="checkbox-grid">${items.map((item) => `<label class="check-field"><input type="checkbox" name="${title}" value="${item}"><span>${item}</span></label>`).join('')}</div></fieldset>`;
}

function portal() {
  return page('Client Portal', 'Future LMS and performance dashboard architecture.', 'A planned client workspace for staff tracking, training assignment, progress reports, and department performance.', `
    <div class="portal-shell"><aside><a>Dashboard</a><a>Staff</a><a>Training</a><a>Progress</a><a>Reports</a></aside><div class="portal-main"><div class="portal-stats">${['Staff progress|78%', 'Department performance|4.2/5', 'Training completion|64%', 'Reports ready|12'].map((item) => { const [a, b] = item.split('|'); return `<div class="stat-card"><span>${a}</span><strong>${b}</strong></div>`; }).join('')}</div><div class="portal-table"><div><strong>Department</strong><strong>Assigned</strong><strong>Completion</strong><strong>Focus</strong></div><div><span>Front desk</span><span>18 staff</span><span>72%</span><span>Guest interaction</span></div><div><span>Healthcare admin</span><span>12 staff</span><span>61%</span><span>Patient communication</span></div><div><span>Management</span><span>7 staff</span><span>83%</span><span>Team communication</span></div></div></div></div>
  `);
}

function render() {
  const route = (location.hash || '#home').slice(1);
  if (route === 'home') app.innerHTML = home();
  else if (route === 'about') app.innerHTML = page('About UpSkillPro', 'A workforce performance company, not a course marketplace.', 'UpSkillPro combines ESP English, soft skills, and workforce consultancy so training maps directly to employer performance needs.', `<div class="two-column"><div><h2>Our approach</h2><p>We design practical training around workplace conversations, service moments, team confidence, and measurable workforce outcomes.</p></div><div class="quote-panel"><p>Designed for B2B workforce improvement across frontline, operational, and management teams.</p></div></div>`);
  else if (route === 'sectors') app.innerHTML = page('Sectors', 'Sector-specific ESP and soft skills training.', 'Each sector has different communication pressure points, so UpSkillPro designs practical training around real workplace scenarios.', `<div class="three-grid">${Object.entries(sectors).map(([key, sector]) => card(sector.title, sector.subtitle, `sector-${key}`)).join('')}</div>`);
  else if (route.startsWith('sector-')) {
    const sector = sectors[route.replace('sector-', '')] || sectors.hospitality;
    app.innerHTML = page('Sector training', `${sector.title} workforce training`, sector.subtitle, detailBlocks([['Industry Challenges', sector.challenges], ['Communication (ESP) Needs', sector.esp], ['Soft Skills Needs', sector.soft], ['Training Solutions', sector.solutions], ['Programmes Offered', sector.programmes], ['Outcomes', sector.outcomes]]));
  } else if (route === 'programmes') app.innerHTML = page('Programmes', 'ESP English, soft skills, and workforce development programmes.', 'Programmes can be delivered onsite, online, or hybrid, with reporting for employers.', `<div class="card-grid">${Object.entries(programmes).map(([key, p]) => card(p[0], p[1], `programme-${key}`)).join('')}</div>`);
  else if (route.startsWith('programme-')) {
    const p = programmes[route.replace('programme-', '')] || programmes.readiness;
    app.innerHTML = page('Programme', p[0], p[1], detailBlocks([['Who it is for', [p[1]]], ['Problem it solves', ['Training must connect directly to workplace performance and communication needs.']], ['ESP English modules', p[2]], ['Soft skills modules', p[3]], ['Delivery method', ['Onsite, online, or hybrid delivery with reporting.']], ['Outcomes', ['Higher confidence', 'Better communication', 'Improved service quality']]]));
  } else if (route === 'services') app.innerHTML = page('Services', 'Training and consultancy for workforce performance.', 'Choose a focused service or combine services into a workforce programme.', `<div class="card-grid">${services.map(([title, text]) => card(title, text)).join('')}</div>`);
  else if (route === 'workforce-training-request') app.innerHTML = formPage();
  else if (route === 'client-portal') app.innerHTML = portal();
  else if (route === 'case-studies') app.innerHTML = page('Case Studies', 'Workforce improvement stories ready for client proof.', 'Use this section for hospitality, healthcare, and recruitment outcomes as client projects are completed.', `<div class="card-grid">${['Hospitality guest communication uplift', 'Healthcare reception confidence', 'Workforce readiness cohort'].map((title) => card(title, 'Challenge, programme design, delivery model, and measurable outcomes can be published here.')).join('')}</div>`);
  else if (route === 'resources') app.innerHTML = page('Resources', 'Training materials and employer guidance.', 'A light LMS-ready resource area for PDFs, videos, guides, and sector materials.', `<div class="card-grid">${['Hospitality English checklist', 'Healthcare communication scenarios', 'Soft skills manager guide', 'AI workplace prompt guide'].map((title) => card(title, 'Resource placeholder for downloadable PDFs, short videos, and training support materials.')).join('')}</div>`);
  else if (route === 'contact') app.innerHTML = page('Contact', 'Book a consultation with UpSkillPro.', 'Tell us about your workforce challenge and we will help shape the right ESP English and soft skills training plan.', `<div class="contact-panel"><a href="mailto:info@upskillpro.co.uk">info@upskillpro.co.uk</a><a href="tel:+447436830626">+44 7436 830626</a><a class="primary-button" href="#workforce-training-request" data-route="workforce-training-request">Request Training Plan</a></div>`);
  else app.innerHTML = home();

  const form = document.querySelector('#lead-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const lead = {};
      for (const [key, value] of formData.entries()) {
        if (lead[key]) lead[key] = Array.isArray(lead[key]) ? [...lead[key], value] : [lead[key], value];
        else lead[key] = value;
      }
      lead.submittedAt = new Date().toISOString();
      localStorage.setItem('upskillpro-last-lead', JSON.stringify(lead));
      app.innerHTML = page('Request received', 'We will prepare your workforce training proposal.', 'Your answers have been captured for proposal preparation. The next step is to book a consultation so the programme can be scoped around your team and sector.', `<div class="confirmation-actions"><a class="primary-button" href="#contact" data-route="contact">Book Consultation</a><a class="secondary-button" href="#client-portal" data-route="client-portal">Preview Client Portal</a></div>`);
      scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  scrollTo({ top: 0, behavior: 'smooth' });
}

render();
