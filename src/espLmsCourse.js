export const espCourse = {
  id: 'esp-workplace-english',
  title: 'ESP English Pathway',
  subtitle: 'Workplace English from Beginner to Advanced',
  levels: [
    {
      id: 'beginner',
      level: 'Beginner',
      cefr: 'Pre-A1/A1',
      goal: 'Build survival workplace English for basic introductions, instructions, and routines.',
      units: beginnerUnits(),
    },
    {
      id: 'elementary',
      level: 'Elementary',
      cefr: 'A2',
      goal: 'Develop practical customer, colleague, and basic written communication.',
      units: [
        {
          id: 'a2-u1',
          title: 'Customer and Guest Communication',
          outcome: 'Learners can greet customers, offer help, and give simple information.',
          lessons: [
            lesson('a2-u1-l1', 'Welcoming customers professionally', 'Use polite opening phrases and helpful tone.', ['Good afternoon, how can I help?', 'Welcome to the clinic.', 'Please take a seat.'], 'Write a short welcome script for your workplace.'),
            lesson('a2-u1-l2', 'Giving simple information', 'Explain times, places, prices, and next steps.', ['Breakfast is from 7 am.', 'The office is on the second floor.', 'Your appointment is at 10:30.'], 'Write three useful information sentences.'),
            lesson('a2-u1-l3', 'Checking understanding', 'Confirm that customers and colleagues understand.', ['Is that clear?', 'Would you like me to explain again?', 'Do you have any questions?'], 'Write two questions to check understanding.'),
          ],
          formative: quiz('a2-u1-f', [
            q('Which phrase is professional?', ['What you want?', 'How can I help you today?', 'Say fast.'], 1),
            q('Which sentence gives time information?', ['The appointment is at 10:30.', 'The appointment is nice.', 'The appointment is blue.'], 0),
            q('Which checks understanding?', ['Is that clear?', 'Go there.', 'Finished.'], 0),
          ]),
          summative: summative('a2-u1-s', [
            q('Choose the best customer greeting.', ['Yes?', 'How can I help you today?', 'Speak.'], 1),
            q('Which sentence gives directions?', ['Please go to reception.', 'I am tired.', 'The bag is black.'], 0),
            q('Which is polite?', ['Wait there please.', 'Wait!', 'You wait now.'], 0),
            q('Which phrase offers help?', ['Can I help you?', 'You help me.', 'I helped yesterday.'], 0),
          ], 'Write 70-90 words describing how you welcome and help a customer, guest, or patient.'),
        },
        {
          id: 'a2-u2',
          title: 'Simple Workplace Messages',
          outcome: 'Learners can write short messages to colleagues, supervisors, or customers.',
          lessons: [
            lesson('a2-u2-l1', 'Short emails and messages', 'Write clear basic workplace messages.', ['I am running late.', 'The room is ready.', 'Please call the customer.'], 'Write a short message to your supervisor.'),
            lesson('a2-u2-l2', 'Explaining a problem simply', 'Describe common workplace problems.', ['The printer is not working.', 'The guest is waiting.', 'We need more towels.'], 'Write two workplace problems.'),
            lesson('a2-u2-l3', 'Requesting action', 'Ask someone to do something politely.', ['Could you check this, please?', 'Please send the form.', 'Can you update the booking?'], 'Write three polite requests.'),
          ],
          formative: quiz('a2-u2-f', [
            q('Which is a clear problem?', ['The printer is not working.', 'Printer good.', 'I printer.'], 0),
            q('Which is a polite request?', ['Send it now.', 'Could you send it, please?', 'You send.'], 1),
            q('A good work message should be...', ['clear and short', 'unclear and long', 'only one word'], 0),
          ]),
          summative: summative('a2-u2-s', [
            q('Choose the clearest message.', ['I late.', 'I am running late today.', 'Late me.'], 1),
            q('Which phrase asks for action?', ['Could you check this?', 'I checked yesterday.', 'The check is blue.'], 0),
            q('Which describes a problem?', ['The guest is waiting.', 'The guest happy yesterday.', 'Guest table.'], 0),
            q('Which ending is polite?', ['Thanks', 'Now', 'No'], 0),
          ], 'Write a 70-90 word workplace message explaining a problem and asking for help.'),
        },
      ],
    },
    {
      id: 'intermediate',
      level: 'Intermediate',
      cefr: 'B1',
      goal: 'Handle routine workplace situations, explain processes, and communicate with more confidence.',
      units: [
        {
          id: 'b1-u1',
          title: 'Handling Problems and Complaints',
          outcome: 'Learners can respond to complaints calmly and explain next steps.',
          lessons: [
            lesson('b1-u1-l1', 'Acknowledging concerns', 'Use language that shows listening and respect.', ['I am sorry to hear that.', 'I understand your concern.', 'Thank you for telling us.'], 'Write three acknowledgement phrases.'),
            lesson('b1-u1-l2', 'Clarifying the issue', 'Ask questions to understand the problem.', ['When did this happen?', 'Can you explain what you noticed?', 'Which room was this in?'], 'Write three clarifying questions.'),
            lesson('b1-u1-l3', 'Offering solutions', 'Explain what you can do now and what will happen next.', ['I can arrange that for you.', 'I will speak to my manager.', 'We can offer another appointment.'], 'Write a short solution to a customer problem.'),
          ],
          formative: quiz('b1-u1-f', [
            q('Which phrase acknowledges a concern?', ['That is not my problem.', 'I understand your concern.', 'Wait outside.'], 1),
            q('Which question clarifies?', ['When did this happen?', 'Are you happy?', 'Is blue your colour?'], 0),
            q('Which is solution language?', ['I can arrange that for you.', 'No.', 'Maybe nothing.'], 0),
          ]),
          summative: summative('b1-u1-s', [
            q('Best response to a complaint:', ['Calm down.', 'I am sorry to hear that. Let me check what happened.', 'Go away.'], 1),
            q('Which is professional?', ['I will follow this up today.', 'Not my job.', 'You are wrong.'], 0),
            q('Which is a clarifying question?', ['Can you tell me when it happened?', 'Do you like coffee?', 'Is it raining?'], 0),
            q('Which phrase gives a next step?', ['I will update you in 20 minutes.', 'Yesterday was busy.', 'I like my job.'], 0),
          ], 'Write 100-130 words responding to a customer or patient complaint. Include acknowledgement, clarification, solution, and follow-up.'),
        },
        {
          id: 'b1-u2',
          title: 'Explaining Workplace Processes',
          outcome: 'Learners can explain a routine process step by step.',
          lessons: [
            lesson('b1-u2-l1', 'Sequencing language', 'Use sequence markers to organise information.', ['First', 'Next', 'After that', 'Finally'], 'Write a four-step process using sequence words.'),
            lesson('b1-u2-l2', 'Giving reasons', 'Explain why actions are required.', ['This is required for safety.', 'We need this information to confirm your booking.', 'This helps us avoid delays.'], 'Write two reasons for a workplace rule.'),
            lesson('b1-u2-l3', 'Confirming completion', 'Report that a task or process is complete.', ['The form has been submitted.', 'The room has been checked.', 'The patient has arrived.'], 'Write three completion updates.'),
          ],
          formative: quiz('b1-u2-f', [
            q('Which is a sequence word?', ['Finally', 'Maybe', 'Blue'], 0),
            q('Which gives a reason?', ['This helps us avoid delays.', 'I went home.', 'It is on the table.'], 0),
            q('Which reports completion?', ['The report has been sent.', 'Send report now?', 'Report nice.'], 0),
          ]),
          summative: summative('b1-u2-s', [
            q('Choose the best sequence:', ['First, next, finally', 'Blue, table, manager', 'Maybe, always, late'], 0),
            q('Which sentence explains why?', ['This is required for safety.', 'Safety is a word.', 'I like safety.'], 0),
            q('Which is a completion update?', ['The booking has been confirmed.', 'Please confirm?', 'Booking maybe.'], 0),
            q('Which sentence is clearest?', ['After that, send the confirmation email.', 'Email after that send confirmation.', 'Confirmation after email that.'], 0),
          ], 'Write 100-130 words explaining an important workplace process step by step.'),
        },
      ],
    },
    {
      id: 'upper-intermediate',
      level: 'Upper Intermediate',
      cefr: 'B2',
      goal: 'Strengthen professional discussions, written accuracy, and service improvement communication.',
      units: [
        {
          id: 'b2-u1',
          title: 'Meetings and Professional Discussions',
          outcome: 'Learners can contribute opinions, agree/disagree politely, and summarise decisions.',
          lessons: [
            lesson('b2-u1-l1', 'Giving opinions professionally', 'Use balanced opinion phrases in workplace discussions.', ['In my view...', 'From my experience...', 'One possible solution is...'], 'Write three professional opinion sentences.'),
            lesson('b2-u1-l2', 'Agreeing and disagreeing politely', 'Respond to ideas without sounding rude.', ['I see your point, but...', 'I agree with that because...', 'Could we also consider...?'], 'Write one agreement and one polite disagreement.'),
            lesson('b2-u1-l3', 'Summarising decisions', 'Summarise meeting outcomes and next actions.', ['We agreed to...', 'The next step is...', 'I will follow up by Friday.'], 'Write a short meeting summary.'),
          ],
          formative: quiz('b2-u1-f', [
            q('Which phrase gives an opinion professionally?', ['You are wrong.', 'In my view...', 'No way.'], 1),
            q('Which phrase disagrees politely?', ['I see your point, but...', 'Bad idea.', 'Never.'], 0),
            q('Which summarises an action?', ['I will follow up by Friday.', 'Friday is nice.', 'I like meetings.'], 0),
          ]),
          summative: summative('b2-u1-s', [
            q('Best professional disagreement:', ['I see your point, but we may need more data.', 'No, impossible.', 'That is stupid.'], 0),
            q('Which is a meeting outcome?', ['We agreed to update the process.', 'We spoke a lot.', 'The meeting was in a room.'], 0),
            q('Which phrase adds another idea?', ['Could we also consider training new staff?', 'No.', 'You forgot.'], 0),
            q('Which is concise and professional?', ['The next step is to contact the supplier.', 'Supplier next contact step is.', 'I think maybe supplier something.'], 0),
          ], 'Write 140-170 words summarising a workplace meeting, including opinions, decisions, and next actions.'),
        },
        {
          id: 'b2-u2',
          title: 'Reports and Service Improvement',
          outcome: 'Learners can describe performance issues and recommend improvements.',
          lessons: [
            lesson('b2-u2-l1', 'Describing trends', 'Use data language to describe changes.', ['Customer satisfaction increased.', 'Complaints decreased slightly.', 'Response times remained stable.'], 'Write three trend sentences.'),
            lesson('b2-u2-l2', 'Explaining causes', 'Connect problems with likely causes.', ['This may be due to...', 'One reason could be...', 'The main cause appears to be...'], 'Write two cause sentences.'),
            lesson('b2-u2-l3', 'Making recommendations', 'Suggest practical improvements.', ['I recommend introducing a checklist.', 'We should review the process.', 'It would be useful to provide refresher training.'], 'Write three recommendations.'),
          ],
          formative: quiz('b2-u2-f', [
            q('Which sentence describes a trend?', ['Complaints decreased slightly.', 'Complaint is a noun.', 'I like reports.'], 0),
            q('Which phrase explains a cause?', ['This may be due to...', 'Thank you very much.', 'See you soon.'], 0),
            q('Which is a recommendation?', ['We should review the process.', 'The process was old.', 'Review was yesterday.'], 0),
          ]),
          summative: summative('b2-u2-s', [
            q('Which sentence is most report-like?', ['Response times increased by 12%.', 'Things got bad.', 'People waited loads.'], 0),
            q('Which phrase introduces a recommendation?', ['I recommend...', 'I remember...', 'I repeat...'], 0),
            q('Which explains cause?', ['This may be due to staff shortages.', 'This is staff.', 'Shortages are words.'], 0),
            q('Which is precise?', ['Customer complaints fell from 18 to 10.', 'Complaints went down a bit maybe.', 'Customers not happy sometimes.'], 0),
          ], 'Write 140-170 words describing a workplace issue, possible causes, and recommendations for improvement.'),
        },
      ],
    },
    {
      id: 'advanced',
      level: 'Advanced',
      cefr: 'C1/C2',
      goal: 'Develop leadership-level communication, persuasive writing, and high-stakes workplace English.',
      units: [
        {
          id: 'c1-u1',
          title: 'Leadership Communication',
          outcome: 'Learners can communicate expectations, feedback, and strategic priorities clearly.',
          lessons: [
            lesson('c1-u1-l1', 'Setting expectations', 'Frame expectations clearly and professionally.', ['The priority for this quarter is...', 'The expected standard is...', 'Success will be measured by...'], 'Write a short message setting team expectations.'),
            lesson('c1-u1-l2', 'Giving developmental feedback', 'Balance recognition, evidence, and improvement points.', ['One strength I noticed was...', 'The area to develop is...', 'A practical next step would be...'], 'Write feedback for a colleague or team member.'),
            lesson('c1-u1-l3', 'Influencing stakeholders', 'Use persuasive and diplomatic language.', ['The evidence suggests...', 'This approach would allow us to...', 'A key benefit would be...'], 'Write three persuasive stakeholder sentences.'),
          ],
          formative: quiz('c1-u1-f', [
            q('Which phrase sets a measurable standard?', ['Success will be measured by...', 'Try your best maybe.', 'Just do it.'], 0),
            q('Which is developmental feedback?', ['A practical next step would be...', 'You failed.', 'Not good.'], 0),
            q('Which is persuasive?', ['The evidence suggests this would reduce delays.', 'I want it.', 'Because I said so.'], 0),
          ]),
          summative: summative('c1-u1-s', [
            q('Best leadership phrase:', ['The expected standard is consistent response within 24 hours.', 'Answer quickly or else.', 'Do better.'], 0),
            q('Which balances feedback?', ['One strength was clarity; one area to develop is evidence.', 'Bad work.', 'Fine.'], 0),
            q('Which influences stakeholders?', ['This approach would reduce risk and improve consistency.', 'I like this.', 'This is my idea.'], 0),
            q('Which is most strategic?', ['The priority is improving retention through clearer onboarding.', 'Onboarding good.', 'People leave sometimes.'], 0),
          ], 'Write 180-220 words giving a team update that sets priorities, gives feedback, and persuades stakeholders.'),
        },
        {
          id: 'c1-u2',
          title: 'Advanced Professional Writing',
          outcome: 'Learners can write clear, nuanced, and persuasive workplace texts.',
          lessons: [
            lesson('c1-u2-l1', 'Tone and register', 'Adjust language for formal, neutral, and supportive contexts.', ['I would appreciate your input.', 'Please find attached...', 'I understand the concern raised.'], 'Rewrite a direct message in a more diplomatic tone.'),
            lesson('c1-u2-l2', 'Argument and evidence', 'Use claims, evidence, and implications.', ['The data indicates...', 'This suggests that...', 'The implication is...'], 'Write one claim with evidence and implication.'),
            lesson('c1-u2-l3', 'Executive summaries', 'Condense complex information into concise summaries.', ['Key issue', 'Evidence', 'Recommendation', 'Next step'], 'Write a four-sentence executive summary.'),
          ],
          formative: quiz('c1-u2-f', [
            q('Which phrase is formal?', ['Please find attached...', 'Here is the thing.', 'Look at this.'], 0),
            q('Which phrase introduces evidence?', ['The data indicates...', 'I feel like...', 'Maybe.'], 0),
            q('An executive summary should be...', ['concise and decision-focused', 'very long and vague', 'only informal opinion'], 0),
          ]),
          summative: summative('c1-u2-s', [
            q('Which is the most diplomatic?', ['I would appreciate your input on this proposal.', 'Tell me now.', 'You need to reply.'], 0),
            q('Which links evidence to meaning?', ['This suggests that demand is increasing.', 'Demand maybe.', 'Numbers exist.'], 0),
            q('Which belongs in an executive summary?', ['Recommendation', 'Joke', 'Unrelated story'], 0),
            q('Which is most precise?', ['The proposal reduces onboarding time by two weeks.', 'It makes things better.', 'It is nice.'], 0),
          ], 'Write 200-250 words giving an opinion on whether technology has improved modern working life. Use evidence and a clear recommendation.'),
        },
      ],
    },
  ],
};

const vocabularyUnits = {
  beginner: vocabularyUnit('a1-vocab', 'Beginner Workplace Vocabulary', [
    'role', 'team', 'shift', 'manager', 'uniform', 'clean', 'repeat', 'caution', 'booking', 'customer',
  ], {
    story: [
      text('My '), gap('role', ['role', 'caution', 'booking']), text(' is assistant. I start my '), gap('shift', ['uniform', 'shift', 'team']), text(' at 8 o clock. If I do not understand, I ask my manager to '), gap('repeat', ['repeat', 'clean', 'customer']), text(' the instruction.'),
    ],
    match: [
      match('shift', 'The time when you work.'),
      match('uniform', 'Clothes you wear for work.'),
      match('booking', 'A reservation or appointment.'),
    ],
    writingWords: ['team', 'manager', 'customer', 'clean'],
  }),
  elementary: vocabularyUnit('a2-vocab', 'Customer Communication Vocabulary', [
    'welcome', 'appointment', 'message', 'request', 'delay', 'available', 'confirm', 'explain', 'problem', 'support',
  ], {
    story: [
      text('Good morning, I would like to '), gap('confirm', ['confirm', 'delay', 'support']), text(' your appointment. If there is a '), gap('delay', ['request', 'delay', 'welcome']), text(', I will send a clear '), gap('message', ['message', 'problem', 'available']), text(' to the customer.'),
    ],
    match: [
      match('request', 'To ask for something politely.'),
      match('available', 'Free or ready to use.'),
      match('support', 'Help given to someone.'),
    ],
    writingWords: ['welcome', 'explain', 'problem', 'appointment'],
  }),
  intermediate: vocabularyUnit('b1-vocab', 'Problem Solving Vocabulary', [
    'concern', 'clarify', 'solution', 'process', 'reason', 'update', 'complaint', 'arrange', 'follow-up', 'confirm',
  ], {
    story: [
      text('When a customer makes a '), gap('complaint', ['process', 'complaint', 'reason']), text(', I listen carefully and '), gap('clarify', ['arrange', 'clarify', 'confirm']), text(' the details. Then I offer a practical '), gap('solution', ['solution', 'concern', 'update']), text(' and explain the next step.'),
    ],
    match: [
      match('concern', 'A worry or problem someone has.'),
      match('follow-up', 'An action after the first contact.'),
      match('process', 'A set of steps for doing something.'),
    ],
    writingWords: ['arrange', 'reason', 'update', 'confirm'],
  }),
  'upper-intermediate': vocabularyUnit('b2-vocab', 'Performance and Meetings Vocabulary', [
    'recommendation', 'trend', 'evidence', 'outcome', 'stakeholder', 'summary', 'priority', 'improvement', 'decrease', 'increase',
  ], {
    story: [
      text('The report shows an '), gap('increase', ['increase', 'summary', 'priority']), text(' in customer satisfaction. The main '), gap('recommendation', ['recommendation', 'decrease', 'stakeholder']), text(' is to improve response times. This decision should create a better '), gap('outcome', ['evidence', 'outcome', 'trend']), text(' for the team.'),
    ],
    match: [
      match('trend', 'A pattern of change over time.'),
      match('evidence', 'Information that supports a point.'),
      match('stakeholder', 'A person or group affected by a decision.'),
    ],
    writingWords: ['priority', 'summary', 'improvement', 'decrease'],
  }),
  advanced: vocabularyUnit('c1-vocab', 'Leadership and Strategy Vocabulary', [
    'strategy', 'implementation', 'accountability', 'perspective', 'evidence-based', 'mitigate', 'objective', 'stakeholder', 'priority', 'impact',
  ], {
    story: [
      text('A strong '), gap('strategy', ['strategy', 'impact', 'perspective']), text(' needs clear objectives and careful '), gap('implementation', ['stakeholder', 'implementation', 'mitigate']), text('. Leaders should use an '), gap('evidence-based', ['evidence-based', 'accountability', 'priority']), text(' approach when making decisions.'),
    ],
    match: [
      match('mitigate', 'To reduce a risk or negative effect.'),
      match('accountability', 'Responsibility for actions and results.'),
      match('perspective', 'A way of seeing or understanding a situation.'),
    ],
    writingWords: ['objective', 'stakeholder', 'priority', 'impact'],
  }),
};

espCourse.levels.forEach((level) => {
  if (level.id !== 'beginner') level.units.push(vocabularyUnits[level.id]);
});

function beginnerUnits() {
  return [
    {
      id: 'a1-u1',
      title: 'Introducing Yourself at Work',
      outcome: 'Learners can introduce themselves, share role information, and ask simple questions.',
      lessons: [
        lesson('a1-u1-l1', 'My name, role, and team', 'Use simple sentences to introduce yourself at work.', ['My name is Sara.', 'I work in housekeeping.', 'I am part of the front desk team.'], 'Write three sentences introducing yourself and your job role.'),
        lesson('a1-u1-l2', 'Simple workplace questions', 'Ask and answer basic questions politely.', ['What is your name?', 'Where do you work?', 'Can you help me, please?'], 'Practise asking a colleague two polite questions.'),
        lesson('a1-u1-l3', 'Numbers, times, and dates', 'Understand times, shifts, room numbers, and dates.', ['Room 204', 'My shift starts at 8 o clock.', 'The appointment is on Monday.'], 'Write your work start time, finish time, and one important date.'),
      ],
      vocabulary: vocabularyActivity('a1-u1-vocab', 'Introductions Vocabulary', ['name', 'role', 'team', 'shift', 'manager', 'department', 'colleague', 'start', 'finish', 'help'], {
        story: [text('My '), gap('name', ['name', 'shift', 'help']), text(' is Ali. I work in the front desk '), gap('department', ['department', 'manager', 'finish']), text('. My '), gap('shift', ['team', 'shift', 'colleague']), text(' starts at 8 o clock.')],
        match: [match('role', 'Your job or position.'), match('colleague', 'A person you work with.'), match('manager', 'The person who leads a team.')],
        writingWords: ['team', 'role', 'manager', 'help'],
      }),
      formative: quiz('a1-u1-f', [
        q('Which sentence is a good introduction?', ['I name Ali.', 'My name is Ali.', 'Name me Ali.'], 1),
        q('Which question is polite?', ['Help me now.', 'Can you help me, please?', 'You help?'], 1),
        q('Room 315 is a...', ['date', 'room number', 'job title'], 1),
      ]),
      summative: summative('a1-u1-s', [
        q('Choose the correct sentence.', ['I work in reception.', 'I working reception.', 'I work reception in.'], 0),
        q('Which is a time?', ['Monday', '8:30', 'Room 12'], 1),
        q('Which phrase asks for help politely?', ['Can you help me, please?', 'You help now.', 'Give help.'], 0),
        q('What do you say when you meet someone?', ['Good morning.', 'No problem.', 'Finished.'], 0),
      ], 'Write 40-60 words introducing yourself, your role, your work time, and one thing you do at work.'),
    },
    {
      id: 'a1-u2',
      title: 'Basic Workplace Instructions',
      outcome: 'Learners can understand and follow simple workplace instructions.',
      lessons: [
        lesson('a1-u2-l1', 'Action verbs at work', 'Recognise common verbs used in instructions.', ['clean the table', 'check the booking', 'call the manager'], 'Write five actions you do at work.'),
        lesson('a1-u2-l2', 'Asking for repetition', 'Use simple phrases when instructions are unclear.', ['Sorry, can you repeat that?', 'Can you say that again?', 'I do not understand.'], 'Practise asking for repetition politely.'),
        lesson('a1-u2-l3', 'Safety and basic signs', 'Understand simple signs and safety language.', ['Stop', 'Caution', 'Staff only', 'Wash your hands'], 'List three signs you see at work.'),
      ],
      vocabulary: vocabularyActivity('a1-u2-vocab', 'Instruction Vocabulary', ['clean', 'check', 'call', 'repeat', 'caution', 'sign', 'safe', 'staff', 'booking', 'wash'], {
        story: [text('Please '), gap('check', ['check', 'sign', 'safe']), text(' the booking and '), gap('call', ['wash', 'call', 'caution']), text(' the manager. If you do not understand, ask them to '), gap('repeat', ['repeat', 'staff', 'clean']), text(' it.')],
        match: [match('caution', 'Be careful.'), match('staff', 'People who work in a place.'), match('booking', 'A reservation or appointment.')],
        writingWords: ['clean', 'check', 'repeat', 'safe'],
      }),
      formative: quiz('a1-u2-f', [
        q('Which phrase asks someone to repeat?', ['I am ready.', 'Can you say that again?', 'Thank you.'], 1),
        q('Which word is an action?', ['clean', 'Monday', 'blue'], 0),
        q('Staff only means...', ['customers can enter', 'only workers can enter', 'the room is closed forever'], 1),
      ]),
      summative: summative('a1-u2-s', [
        q('Choose the instruction.', ['Please clean the table.', 'The table is red.', 'I like the table.'], 0),
        q('Which phrase is best if you do not understand?', ['Repeat!', 'Sorry, can you repeat that?', 'No.'], 1),
        q('Caution means...', ['be careful', 'sit down', 'speak loudly'], 0),
        q('Which is workplace language?', ['Check the booking.', 'The sky is blue.', 'I like music.'], 0),
      ], 'Write 40-60 words explaining three simple instructions in your workplace.'),
    },
    beginnerUnit('a1-u3', 'Workplace Places and Departments', 'Learners can name common workplace places and say where people or items are.', [
      lesson('a1-u3-l1', 'Places in a building', 'Name simple workplace areas.', ['The office is upstairs.', 'Reception is near the entrance.', 'The storeroom is at the back.'], 'Write five places in your workplace.'),
      lesson('a1-u3-l2', 'Where things are', 'Use simple position words.', ['The form is on the desk.', 'The lift is next to reception.', 'The keys are in the drawer.'], 'Write three sentences saying where things are.'),
      lesson('a1-u3-l3', 'Giving simple directions', 'Give short directions inside a workplace.', ['Go straight ahead.', 'Turn left.', 'It is on your right.'], 'Write directions from reception to one place.'),
    ], vocabularyActivity('a1-u3-vocab', 'Places Vocabulary', ['reception', 'office', 'storeroom', 'entrance', 'lift', 'desk', 'drawer', 'left', 'right', 'upstairs'], {
      story: [text('The visitor is at '), gap('reception', ['reception', 'drawer', 'left']), text('. The office is '), gap('upstairs', ['desk', 'upstairs', 'entrance']), text('. Turn '), gap('right', ['right', 'storeroom', 'lift']), text(' after the lift.')],
      match: [match('entrance', 'The place where you go in.'), match('storeroom', 'A room for keeping supplies.'), match('drawer', 'A small box in a desk.')],
      writingWords: ['office', 'desk', 'left', 'lift'],
    }), quiz('a1-u3-f', [
      q('Where do visitors usually arrive?', ['Reception', 'Drawer', 'Uniform'], 0),
      q('Which phrase gives direction?', ['Turn left.', 'I am tired.', 'Blue pen.'], 0),
      q('The keys are in the drawer means...', ['inside the drawer', 'under the building', 'after Monday'], 0),
    ]), summative('a1-u3-s', [
      q('Choose the place word.', ['office', 'happy', 'quickly'], 0),
      q('Which direction is clear?', ['Go straight ahead.', 'Straight go ahead.', 'Go ahead straightly.'], 0),
      q('The lift is next to reception means it is...', ['near reception', 'a job role', 'a date'], 0),
      q('Which sentence is correct?', ['The form is on the desk.', 'The form on desk is.', 'Desk form is the.'], 0),
    ], 'Write 40-60 words describing three important places in your workplace and how to find one of them.')),
    beginnerUnit('a1-u4', 'Time, Shifts, and Attendance', 'Learners can talk about work times, breaks, lateness, and attendance.', [
      lesson('a1-u4-l1', 'Start and finish times', 'Say when work starts and finishes.', ['I start at 9 am.', 'I finish at 5 pm.', 'My shift is on Monday.'], 'Write your start and finish time.'),
      lesson('a1-u4-l2', 'Breaks and days off', 'Talk about breaks and simple schedules.', ['My break is at 12.', 'I am off on Friday.', 'I work on weekends.'], 'Write three schedule sentences.'),
      lesson('a1-u4-l3', 'Saying you are late', 'Use simple messages about attendance.', ['I am running late.', 'I will arrive at 9:15.', 'Sorry for the delay.'], 'Write a short message if you are late.'),
    ], vocabularyActivity('a1-u4-vocab', 'Time Vocabulary', ['start', 'finish', 'shift', 'break', 'late', 'early', 'arrive', 'weekend', 'delay', 'schedule'], {
      story: [text('My '), gap('shift', ['shift', 'delay', 'break']), text(' starts at 9. I have a '), gap('break', ['early', 'break', 'schedule']), text(' at 12. If I am '), gap('late', ['late', 'weekend', 'finish']), text(', I send a message.')],
      match: [match('arrive', 'To get to a place.'), match('schedule', 'A plan of times.'), match('delay', 'When something is late.')],
      writingWords: ['start', 'finish', 'break', 'arrive'],
    }), quiz('a1-u4-f', [
      q('Which sentence says a start time?', ['I start at 8.', 'I table at 8.', 'I blue at 8.'], 0),
      q('If you are not on time, you are...', ['late', 'left', 'clean'], 0),
      q('A break is...', ['rest time', 'a manager', 'a room number'], 0),
    ]), summative('a1-u4-s', [
      q('Choose the correct sentence.', ['I finish at 6 pm.', 'I finish 6 pm at.', 'Finish I at 6 pm.'], 0),
      q('Which is an attendance message?', ['I am running late.', 'The table is clean.', 'Reception is upstairs.'], 0),
      q('Weekend means...', ['Saturday and Sunday', 'morning only', 'a job title'], 0),
      q('Which phrase is polite?', ['Sorry for the delay.', 'Late. Bye.', 'I no come.'], 0),
    ], 'Write 40-60 words about your weekly work schedule, break time, and what you say if you are late.')),
    beginnerUnit('a1-u5', 'Customer Greetings and Polite Service', 'Learners can greet customers, offer help, and use polite service phrases.', [
      lesson('a1-u5-l1', 'Greeting customers', 'Use friendly opening language.', ['Good morning.', 'Welcome.', 'How can I help you?'], 'Write a short greeting for your workplace.'),
      lesson('a1-u5-l2', 'Offering help', 'Offer simple help politely.', ['Can I help you?', 'Please take a seat.', 'I can check for you.'], 'Write three help phrases.'),
      lesson('a1-u5-l3', 'Thanking and closing', 'End simple conversations politely.', ['Thank you for waiting.', 'Have a good day.', 'You are welcome.'], 'Practise closing a customer conversation.'),
    ], vocabularyActivity('a1-u5-vocab', 'Service Vocabulary', ['welcome', 'customer', 'please', 'thank', 'wait', 'seat', 'help', 'check', 'morning', 'goodbye'], {
      story: [text('Good '), gap('morning', ['morning', 'seat', 'check']), text(', '), gap('welcome', ['welcome', 'wait', 'thank']), text(' to our office. Please take a '), gap('seat', ['customer', 'seat', 'goodbye']), text(' and I will help you.')],
      match: [match('customer', 'A person who uses a service.'), match('please', 'A polite word for requests.'), match('goodbye', 'A word used when leaving.')],
      writingWords: ['welcome', 'help', 'thank', 'wait'],
    }), quiz('a1-u5-f', [
      q('Which is a good greeting?', ['Good morning.', 'Go away.', 'What?'], 0),
      q('Which offers help?', ['Can I help you?', 'I am help.', 'You help me now.'], 0),
      q('Which is polite?', ['Please take a seat.', 'Sit.', 'Seat now.'], 0),
    ]), summative('a1-u5-s', [
      q('Choose the best phrase.', ['How can I help you?', 'What you want?', 'Speak now.'], 0),
      q('Which thanks a customer?', ['Thank you for waiting.', 'Wait there.', 'Waiting bad.'], 0),
      q('Which phrase closes politely?', ['Have a good day.', 'Finish.', 'No more.'], 0),
      q('Which sentence is correct?', ['I can check for you.', 'I check can for you.', 'Can check I you.'], 0),
    ], 'Write 40-60 words showing how you greet, help, and say goodbye to a customer or visitor.')),
    beginnerUnit('a1-u6', 'Simple Requests and Asking for Help', 'Learners can make simple requests and ask colleagues for support.', [
      lesson('a1-u6-l1', 'Can I and could you', 'Use simple request forms.', ['Can I use the phone?', 'Could you help me, please?', 'Can I ask a question?'], 'Write three requests using can or could.'),
      lesson('a1-u6-l2', 'Need and want', 'Say what you need at work.', ['I need more towels.', 'We need a form.', 'The customer wants water.'], 'Write three needs in your workplace.'),
      lesson('a1-u6-l3', 'Responding to requests', 'Give simple positive and negative replies.', ['Yes, of course.', 'One moment, please.', 'Sorry, I cannot do that.'], 'Practise replying to two requests.'),
    ], vocabularyActivity('a1-u6-vocab', 'Request Vocabulary', ['request', 'need', 'want', 'phone', 'form', 'question', 'answer', 'moment', 'possible', 'sorry'], {
      story: [text('I have a '), gap('question', ['question', 'phone', 'sorry']), text('. Could you help me for one '), gap('moment', ['answer', 'moment', 'need']), text(', please? I '), gap('need', ['possible', 'need', 'request']), text(' a new form.')],
      match: [match('request', 'A polite thing you ask for.'), match('possible', 'Something that can happen.'), match('answer', 'A reply to a question.')],
      writingWords: ['need', 'question', 'sorry', 'form'],
    }), quiz('a1-u6-f', [
      q('Which is a polite request?', ['Could you help me, please?', 'Help now.', 'You help.'], 0),
      q('I need more towels means...', ['I require more towels', 'I dislike towels', 'I finished towels'], 0),
      q('One moment, please means...', ['wait a short time', 'go home', 'speak loudly'], 0),
    ]), summative('a1-u6-s', [
      q('Choose the polite sentence.', ['Can I ask a question?', 'Question now.', 'I question you.'], 0),
      q('Which is a reply?', ['Yes, of course.', 'Phone form.', 'Need want.'], 0),
      q('Which word means a reply?', ['answer', 'table', 'morning'], 0),
      q('Which sentence is correct?', ['The customer wants water.', 'Customer water wants the.', 'Wants customer water.'], 0),
    ], 'Write 40-60 words asking a colleague for help with a simple workplace problem.')),
    beginnerUnit('a1-u7', 'Workplace Tools, Equipment, and Supplies', 'Learners can name basic tools, equipment, and supplies and request items.', [
      lesson('a1-u7-l1', 'Common workplace items', 'Name everyday work items.', ['pen', 'form', 'computer', 'trolley'], 'Write five items you use at work.'),
      lesson('a1-u7-l2', 'Describing items simply', 'Use colours, sizes, and numbers.', ['two clean towels', 'a small box', 'the red folder'], 'Write three item descriptions.'),
      lesson('a1-u7-l3', 'Reporting missing supplies', 'Say when something is missing or finished.', ['We need more soap.', 'The paper is finished.', 'The folder is missing.'], 'Write a message about missing supplies.'),
    ], vocabularyActivity('a1-u7-vocab', 'Equipment Vocabulary', ['pen', 'form', 'computer', 'trolley', 'soap', 'paper', 'folder', 'missing', 'finished', 'supply'], {
      story: [text('The red '), gap('folder', ['folder', 'soap', 'pen']), text(' is missing. We need more '), gap('paper', ['paper', 'computer', 'trolley']), text(' for the office. The soap is '), gap('finished', ['supply', 'finished', 'form']), text('.')],
      match: [match('trolley', 'A small cart for moving items.'), match('supply', 'Something needed for work.'), match('missing', 'Not in the correct place or lost.')],
      writingWords: ['computer', 'paper', 'missing', 'supply'],
    }), quiz('a1-u7-f', [
      q('Which is equipment?', ['computer', 'Monday', 'happy'], 0),
      q('Missing means...', ['not there', 'very early', 'polite'], 0),
      q('Which asks for supplies?', ['We need more soap.', 'Soap is blue.', 'I like soap.'], 0),
    ]), summative('a1-u7-s', [
      q('Choose the item word.', ['folder', 'quickly', 'under'], 0),
      q('Which sentence reports a problem?', ['The paper is finished.', 'The paper is white.', 'Paper word.'], 0),
      q('Which description is correct?', ['two clean towels', 'two towels cleanly', 'clean two towel'], 0),
      q('Which phrase is workplace language?', ['We need more supplies.', 'I music more.', 'Blue go now.'], 0),
    ], 'Write 40-60 words listing items you use at work and explaining one item that is missing or finished.')),
    beginnerUnit('a1-u8', 'Daily Routines and Simple Reports', 'Learners can describe daily workplace tasks and give simple task updates.', [
      lesson('a1-u8-l1', 'Daily routine verbs', 'Use common verbs for routine tasks.', ['I open the office.', 'I prepare the room.', 'I close the door.'], 'Write five tasks you do every day.'),
      lesson('a1-u8-l2', 'Before, after, and then', 'Sequence short routine steps.', ['First, I check the list.', 'Then I prepare the room.', 'After that, I update the manager.'], 'Write three steps in your daily routine.'),
      lesson('a1-u8-l3', 'Simple task updates', 'Say if a task is done or not done.', ['The room is ready.', 'The list is finished.', 'The task is not complete.'], 'Write three task updates.'),
    ], vocabularyActivity('a1-u8-vocab', 'Routine Vocabulary', ['open', 'prepare', 'close', 'first', 'then', 'after', 'ready', 'complete', 'list', 'update'], {
      story: [text('First, I '), gap('open', ['open', 'after', 'ready']), text(' the office. Then I check the '), gap('list', ['list', 'close', 'complete']), text('. After that, I '), gap('update', ['prepare', 'update', 'first']), text(' my manager.')],
      match: [match('prepare', 'To make something ready.'), match('complete', 'Finished.'), match('update', 'To give new information.')],
      writingWords: ['first', 'then', 'ready', 'complete'],
    }), quiz('a1-u8-f', [
      q('Which is a sequence word?', ['First', 'Folder', 'Customer'], 0),
      q('Ready means...', ['prepared', 'missing', 'late'], 0),
      q('Which is a task update?', ['The room is ready.', 'Good morning.', 'I am Ali.'], 0),
    ]), summative('a1-u8-s', [
      q('Choose the correct sequence.', ['First, then, after that', 'After, first, then maybe', 'Ready, office, blue'], 0),
      q('Which sentence is correct?', ['The task is complete.', 'Task complete is the.', 'Complete task the is.'], 0),
      q('Which word is a routine verb?', ['prepare', 'Saturday', 'right'], 0),
      q('Which gives an update?', ['The list is finished.', 'The lift is near reception.', 'My name is Ali.'], 0),
    ], 'Write 40-60 words describing your daily routine at work using first, then, and after that.')),
    beginnerUnit('a1-u9', 'Simple Problems and Emergencies', 'Learners can report simple problems and ask for urgent support.', [
      lesson('a1-u9-l1', 'Common problems', 'Name simple workplace problems.', ['The printer is not working.', 'The customer is waiting.', 'The floor is wet.'], 'Write three workplace problems.'),
      lesson('a1-u9-l2', 'Basic emergency language', 'Use clear urgent phrases.', ['Please call the manager.', 'This is urgent.', 'Please help now.'], 'Practise one urgent message.'),
      lesson('a1-u9-l3', 'Reporting what happened', 'Use simple past-like reports with time.', ['The guest arrived at 10.', 'The machine stopped.', 'I called reception.'], 'Write a short report about a problem.'),
    ], vocabularyActivity('a1-u9-vocab', 'Problem Vocabulary', ['problem', 'urgent', 'wet', 'broken', 'waiting', 'stopped', 'called', 'arrived', 'help', 'manager'], {
      story: [text('There is a '), gap('problem', ['problem', 'called', 'arrived']), text('. The floor is '), gap('wet', ['waiting', 'wet', 'urgent']), text(' and a customer is '), gap('waiting', ['waiting', 'broken', 'stopped']), text('. Please call the manager.')],
      match: [match('urgent', 'Needs action now.'), match('broken', 'Not working.'), match('arrived', 'Came to a place.')],
      writingWords: ['problem', 'urgent', 'help', 'manager'],
    }), quiz('a1-u9-f', [
      q('Which is a problem?', ['The printer is not working.', 'The printer is new.', 'The printer is black.'], 0),
      q('Urgent means...', ['needs action now', 'very polite', 'on the desk'], 0),
      q('Which phrase asks for immediate help?', ['Please help now.', 'Have a good day.', 'I finish at 5.'], 0),
    ]), summative('a1-u9-s', [
      q('Choose the urgent sentence.', ['This is urgent.', 'This is blue.', 'This is Friday.'], 0),
      q('Which reports what happened?', ['The machine stopped.', 'The machine nice.', 'Machine stop now maybe.'], 0),
      q('Wet floor means...', ['the floor has water', 'the floor is upstairs', 'the floor is a person'], 0),
      q('Which is professional?', ['Please call the manager.', 'Manager call now!', 'Call boss fast.'], 0),
    ], 'Write 40-60 words reporting a simple workplace problem and asking for help.')),
    beginnerUnit('a1-u10', 'Beginner Review and Workplace Confidence', 'Learners review Beginner workplace English and prepare for the final level assessment.', [
      lesson('a1-u10-l1', 'Reviewing key phrases', 'Review introductions, requests, directions, and updates.', ['My name is...', 'Could you help me, please?', 'The task is complete.'], 'Write ten useful phrases from the course.'),
      lesson('a1-u10-l2', 'Choosing the right phrase', 'Select language for common workplace situations.', ['Greeting a customer', 'Reporting a problem', 'Asking for repetition'], 'Match three phrases to three workplace situations.'),
      lesson('a1-u10-l3', 'Preparing your final writing', 'Plan a short workplace paragraph.', ['Who you are', 'What you do', 'How you ask for help', 'How you report a problem'], 'Make a four-point plan for your final writing.'),
    ], vocabularyActivity('a1-u10-vocab', 'Review Vocabulary', ['introduce', 'request', 'direction', 'routine', 'report', 'customer', 'colleague', 'complete', 'polite', 'confidence'], {
      story: [text('I can '), gap('introduce', ['introduce', 'routine', 'direction']), text(' myself at work. I can make a polite '), gap('request', ['report', 'request', 'customer']), text(' and give a simple '), gap('report', ['confidence', 'report', 'colleague']), text(' about a problem.')],
      match: [match('direction', 'Information about where to go.'), match('routine', 'Things you do regularly.'), match('confidence', 'Feeling able to do something.')],
      writingWords: ['polite', 'customer', 'colleague', 'complete'],
    }), quiz('a1-u10-f', [
      q('Which is a polite request?', ['Could you help me, please?', 'Help now.', 'I want.'], 0),
      q('Which is a task update?', ['The task is complete.', 'Good morning.', 'My role is assistant.'], 0),
      q('Which phrase reports a problem?', ['The machine is broken.', 'Welcome to the clinic.', 'Turn left.'], 0),
    ]), summative('a1-u10-s', [
      q('Choose the correct introduction.', ['My name is Sara.', 'Name Sara me.', 'I name Sara.'], 0),
      q('Choose the direction.', ['Turn right after reception.', 'I am late today.', 'The folder is missing.'], 0),
      q('Choose the update.', ['The room is ready.', 'Can I ask a question?', 'Goodbye.'], 0),
      q('Choose the problem report.', ['The floor is wet.', 'Please take a seat.', 'I work in reception.'], 0),
      q('Choose the polite closing.', ['Have a good day.', 'Finished now.', 'Go.'], 0),
    ], 'Write 70-90 words about yourself at work. Include your role, routine, one customer phrase, one request, and one problem report.')),
  ];
}

function beginnerUnit(id, title, outcome, lessons, vocabulary, formative, summativeAssessment) {
  return { id, title, outcome, lessons, vocabulary, formative, summative: summativeAssessment };
}

function lesson(id, title, objective, language, task) {
  return { id, title, objective, language, task };
}

function q(prompt, options, answer) {
  return { prompt, options, answer };
}

function quiz(id, questions) {
  return { id, questions };
}

function summative(id, questions, writingPrompt) {
  return { id, questions, writingPrompt };
}

function vocabularyUnit(id, title, words, activities) {
  return {
    id,
    title: 'Vocabulary',
    outcome: `${title}: practise ten pre-taught words through a gap-fill story, matching task, and sentence writing.`,
    vocabulary: vocabularyActivity(id, title, words, activities),
  };
}

function vocabularyActivity(id, title, words, activities) {
  return {
    id: `${id}-activity`,
    title,
    words,
    ...activities,
  };
}

function text(value) {
  return { type: 'text', value };
}

function gap(answer, options) {
  return { type: 'gap', answer, options };
}

function match(word, definition) {
  return { word, definition };
}
