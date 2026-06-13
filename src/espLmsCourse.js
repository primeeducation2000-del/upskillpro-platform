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
      units: elementaryUnits(),
    },
    {
      id: 'intermediate',
      level: 'Intermediate',
      cefr: 'B1',
      goal: 'Handle routine workplace situations, explain processes, and communicate with more confidence.',
      units: intermediateUnits(),
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
  if (!['beginner', 'elementary', 'intermediate'].includes(level.id)) level.units.push(vocabularyUnits[level.id]);
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

function intermediateUnits() {
  return [
    intermediateUnit('b1-u1', 'Handling Problems and Complaints', 'Learners can respond to complaints calmly and explain next steps.', [
      lesson('b1-u1-l1', 'Acknowledging concerns', 'Use language that shows listening and respect.', ['I am sorry to hear that.', 'I understand your concern.', 'Thank you for telling us.'], 'Write three acknowledgement phrases.'),
      lesson('b1-u1-l2', 'Clarifying the issue', 'Ask questions to understand the problem.', ['When did this happen?', 'Can you explain what you noticed?', 'Which room was this in?'], 'Write three clarifying questions.'),
      lesson('b1-u1-l3', 'Offering solutions', 'Explain what you can do now and what will happen next.', ['I can arrange that for you.', 'I will speak to my manager.', 'We can offer another appointment.'], 'Write a short solution to a customer problem.'),
    ], vocabularyActivity('b1-u1-vocab', 'Complaint Handling Vocabulary', ['concern', 'complaint', 'clarify', 'solution', 'arrange', 'follow-up', 'apologise', 'investigate', 'resolve', 'update'], {
      story: [text('When a customer makes a '), gap('complaint', ['complaint', 'arrange', 'update']), text(', I listen carefully and '), gap('clarify', ['resolve', 'clarify', 'follow-up']), text(' the details. Then I offer a practical '), gap('solution', ['solution', 'concern', 'investigate']), text('.')],
      match: [match('concern', 'A worry or problem someone has.'), match('investigate', 'To look into what happened.'), match('follow-up', 'An action or message after the first contact.')],
      writingWords: ['complaint', 'clarify', 'solution', 'update'],
    }), quiz('b1-u1-f', [
      q('Which phrase acknowledges a concern?', ['That is not my problem.', 'I understand your concern.', 'Wait outside.'], 1),
      q('Which question clarifies?', ['When did this happen?', 'Are you happy?', 'Is blue your colour?'], 0),
      q('Which is solution language?', ['I can arrange that for you.', 'No.', 'Maybe nothing.'], 0),
    ]), summative('b1-u1-s', [
      q('Best response to a complaint:', ['Calm down.', 'I am sorry to hear that. Let me check what happened.', 'Go away.'], 1),
      q('Which is professional?', ['I will follow this up today.', 'Not my job.', 'You are wrong.'], 0),
      q('Which is a clarifying question?', ['Can you tell me when it happened?', 'Do you like coffee?', 'Is it raining?'], 0),
      q('Which phrase gives a next step?', ['I will update you in 20 minutes.', 'Yesterday was busy.', 'I like my job.'], 0),
    ], 'Write 100-130 words responding to a customer or patient complaint. Include acknowledgement, clarification, solution, and follow-up.')),
    intermediateUnit('b1-u2', 'Explaining Workplace Processes', 'Learners can explain a routine process step by step.', [
      lesson('b1-u2-l1', 'Sequencing language', 'Use sequence markers to organise information.', ['First', 'Next', 'After that', 'Finally'], 'Write a four-step process using sequence words.'),
      lesson('b1-u2-l2', 'Giving reasons', 'Explain why actions are required.', ['This is required for safety.', 'We need this information to confirm your booking.', 'This helps us avoid delays.'], 'Write two reasons for a workplace rule.'),
      lesson('b1-u2-l3', 'Confirming completion', 'Report that a task or process is complete.', ['The form has been submitted.', 'The room has been checked.', 'The patient has arrived.'], 'Write three completion updates.'),
    ], vocabularyActivity('b1-u2-vocab', 'Process Vocabulary', ['process', 'step', 'required', 'confirm', 'submit', 'complete', 'delay', 'avoid', 'procedure', 'record'], {
      story: [text('This '), gap('process', ['process', 'delay', 'record']), text(' has four steps. First, we check the details. Next, we '), gap('confirm', ['submit', 'confirm', 'avoid']), text(' the booking. Finally, we update the '), gap('record', ['record', 'required', 'complete']), text('.')],
      match: [match('procedure', 'The official way to do a task.'), match('avoid', 'To stop something from happening.'), match('submit', 'To send or hand in a form.')],
      writingWords: ['process', 'required', 'complete', 'delay'],
    }), quiz('b1-u2-f', [
      q('Which is a sequence word?', ['Finally', 'Maybe', 'Blue'], 0),
      q('Which gives a reason?', ['This helps us avoid delays.', 'I went home.', 'It is on the table.'], 0),
      q('Which reports completion?', ['The report has been sent.', 'Send report now?', 'Report nice.'], 0),
    ]), summative('b1-u2-s', [
      q('Choose the best sequence:', ['First, next, finally', 'Blue, table, manager', 'Maybe, always, late'], 0),
      q('Which sentence explains why?', ['This is required for safety.', 'Safety is a word.', 'I like safety.'], 0),
      q('Which is a completion update?', ['The booking has been confirmed.', 'Please confirm?', 'Booking maybe.'], 0),
      q('Which sentence is clearest?', ['After that, send the confirmation email.', 'Email after that send confirmation.', 'Confirmation after email that.'], 0),
    ], 'Write 100-130 words explaining an important workplace process step by step.')),
    intermediateUnit('b1-u3', 'Incident Reports and Workplace Notes', 'Learners can describe what happened, when it happened, and what action was taken.', [
      lesson('b1-u3-l1', 'Describing events clearly', 'Use clear language to report an event.', ['The incident happened at 2 pm.', 'A customer slipped near the entrance.', 'No one was injured.'], 'Write three event-report sentences.'),
      lesson('b1-u3-l2', 'Time, sequence, and action', 'Connect events with time and action language.', ['After that, I called the supervisor.', 'Then we cleaned the area.', 'Finally, we completed the report.'], 'Write a short sequence of actions.'),
      lesson('b1-u3-l3', 'Neutral reporting tone', 'Write facts without blame.', ['According to the record...', 'The available information shows...', 'The issue was reported by staff.'], 'Rewrite an emotional report in a neutral tone.'),
    ], vocabularyActivity('b1-u3-vocab', 'Incident Vocabulary', ['incident', 'injured', 'slipped', 'entrance', 'supervisor', 'reported', 'record', 'available', 'neutral', 'action'], {
      story: [text('The '), gap('incident', ['incident', 'available', 'neutral']), text(' happened near the entrance. A customer '), gap('slipped', ['reported', 'slipped', 'record']), text(', but no one was '), gap('injured', ['action', 'injured', 'supervisor']), text('.')],
      match: [match('neutral', 'Fair and based on facts.'), match('record', 'Written information kept for reference.'), match('action', 'Something done to respond.')],
      writingWords: ['incident', 'reported', 'record', 'action'],
    }), quiz('b1-u3-f', [
      q('Which sentence reports an event?', ['The incident happened at 2 pm.', 'I like the entrance.', 'The entrance is blue.'], 0),
      q('Which phrase is neutral?', ['The available information shows...', 'He was careless.', 'They are always bad.'], 0),
      q('Which shows sequence?', ['After that, I called the supervisor.', 'Supervisor call.', 'I like calling.'], 0),
    ]), summative('b1-u3-s', [
      q('Choose the factual report.', ['A customer slipped near the entrance.', 'The customer was silly.', 'Bad thing happened.'], 0),
      q('Which phrase avoids blame?', ['According to the record...', 'It was his fault.', 'They caused it.'], 0),
      q('Which is an action taken?', ['We completed the report.', 'The report is white.', 'Reports are useful.'], 0),
      q('Which sentence is clearest?', ['No one was injured.', 'No injured was one.', 'Injured no one maybe.'], 0),
    ], 'Write 100-130 words describing a workplace incident, the sequence of actions, and the follow-up.')),
    intermediateUnit('b1-u4', 'Customer Follow-up and Updates', 'Learners can update customers, explain progress, and manage expectations.', [
      lesson('b1-u4-l1', 'Giving progress updates', 'Tell someone what has happened so far.', ['We have checked your request.', 'The team is reviewing the details.', 'Your case is still in progress.'], 'Write three progress updates.'),
      lesson('b1-u4-l2', 'Managing expectations', 'Explain realistic times and next steps.', ['We expect to reply by Friday.', 'This may take up to 48 hours.', 'I will contact you when I have an update.'], 'Write two expectation-setting sentences.'),
      lesson('b1-u4-l3', 'Closing the loop', 'Confirm when a problem has been completed or resolved.', ['This has now been resolved.', 'Thank you for your patience.', 'Please let us know if you need further support.'], 'Write a closing message.'),
    ], vocabularyActivity('b1-u4-vocab', 'Follow-up Vocabulary', ['progress', 'reviewing', 'expect', 'reply', 'resolved', 'patience', 'further', 'support', 'case', 'contact'], {
      story: [text('Your '), gap('case', ['case', 'reply', 'further']), text(' is in progress. The team is '), gap('reviewing', ['resolved', 'reviewing', 'patience']), text(' the details, and we expect to '), gap('reply', ['support', 'reply', 'contact']), text(' by Friday.')],
      match: [match('resolved', 'Fixed or completed.'), match('patience', 'Calm waiting.'), match('further', 'More or additional.')],
      writingWords: ['progress', 'expect', 'resolved', 'support'],
    }), quiz('b1-u4-f', [
      q('Which is a progress update?', ['The team is reviewing the details.', 'The team is friendly.', 'Details are blue.'], 0),
      q('Which manages expectations?', ['This may take up to 48 hours.', 'Wait.', 'Maybe later.'], 0),
      q('Which closes the loop?', ['This has now been resolved.', 'I am still checking.', 'The issue is open.'], 0),
    ]), summative('b1-u4-s', [
      q('Choose the best update.', ['We have checked your request.', 'Request checked we have.', 'Checked request maybe.'], 0),
      q('Which phrase gives a timeframe?', ['We expect to reply by Friday.', 'Friday is busy.', 'Reply is nice.'], 0),
      q('Which phrase offers further support?', ['Please let us know if you need further support.', 'No more contact.', 'Finished.'], 0),
      q('Which word means fixed?', ['resolved', 'reviewing', 'case'], 0),
    ], 'Write 100-130 words updating a customer about a problem, including progress, expected timing, and closing support.')),
    intermediateUnit('b1-u5', 'Team Briefings and Handover Notes', 'Learners can share priorities, risks, and next actions during team handovers.', [
      lesson('b1-u5-l1', 'Briefing a team', 'Summarise key information for colleagues.', ['The priority today is...', 'Please pay attention to...', 'The main risk is...'], 'Write a short team briefing.'),
      lesson('b1-u5-l2', 'Handover language', 'Explain what has been done and what is still needed.', ['I have completed the stock check.', 'The guest is still waiting.', 'Please follow up with maintenance.'], 'Write a handover note.'),
      lesson('b1-u5-l3', 'Highlighting risks and priorities', 'Make important information easy to notice.', ['This is urgent because...', 'Please check this before 3 pm.', 'The most important task is...'], 'Write three priority sentences.'),
    ], vocabularyActivity('b1-u5-vocab', 'Briefing Vocabulary', ['briefing', 'handover', 'priority', 'risk', 'urgent', 'completed', 'maintenance', 'attention', 'follow-up', 'task'], {
      story: [text('During the '), gap('handover', ['handover', 'risk', 'task']), text(', I explained the main '), gap('priority', ['priority', 'maintenance', 'attention']), text('. One issue is urgent, so please '), gap('follow-up', ['follow-up', 'completed', 'briefing']), text(' before 3 pm.')],
      match: [match('briefing', 'A short update to a team.'), match('risk', 'Something that could cause a problem.'), match('maintenance', 'People who repair things.')],
      writingWords: ['priority', 'urgent', 'handover', 'task'],
    }), quiz('b1-u5-f', [
      q('Which sentence gives a priority?', ['The priority today is checking rooms.', 'Rooms are upstairs.', 'I like rooms.'], 0),
      q('Which is handover language?', ['Please follow up with maintenance.', 'Maintenance is a department.', 'I went home.'], 0),
      q('Urgent means...', ['needs quick action', 'not important', 'already complete'], 0),
    ]), summative('b1-u5-s', [
      q('Choose the briefing sentence.', ['The main risk is a delay in cleaning.', 'Cleaning is nice.', 'Risk main cleaning delay.'], 0),
      q('Which shows something is completed?', ['I have completed the stock check.', 'Complete stock I.', 'Stock check maybe.'], 0),
      q('Which asks for action by a time?', ['Please check this before 3 pm.', '3 pm is Friday.', 'Check maybe later.'], 0),
      q('Which word means a short team update?', ['briefing', 'case', 'copy'], 0),
    ], 'Write 100-130 words for a team handover including completed work, priorities, risks, and next actions.')),
    intermediateUnit('b1-u6', 'Professional Emails and Written Requests', 'Learners can write clear workplace emails with purpose, detail, and polite action requests.', [
      lesson('b1-u6-l1', 'Email purpose and subject lines', 'Write clear subjects and opening sentences.', ['Subject: Booking update', 'I am writing to confirm...', 'I am contacting you about...'], 'Write three email subject lines.'),
      lesson('b1-u6-l2', 'Giving detail without being too long', 'Include enough information for action.', ['The reference number is...', 'The request was received on Monday.', 'The attached form includes the details.'], 'Write a short detail paragraph.'),
      lesson('b1-u6-l3', 'Polite action requests', 'Ask clearly for the next action.', ['Could you please review this by Friday?', 'Please let me know if you need more information.', 'I would appreciate your response.'], 'Write two polite email requests.'),
    ], vocabularyActivity('b1-u6-vocab', 'Email Vocabulary', ['subject', 'confirm', 'reference', 'attached', 'review', 'response', 'received', 'appreciate', 'details', 'request'], {
      story: [text('The email '), gap('subject', ['subject', 'attached', 'review']), text(' is Booking update. I am writing to '), gap('confirm', ['confirm', 'response', 'request']), text(' the details. Please '), gap('review', ['received', 'review', 'appreciate']), text(' the attached form.')],
      match: [match('reference', 'A number or code used to identify something.'), match('appreciate', 'To value or be grateful for something.'), match('response', 'A reply.')],
      writingWords: ['subject', 'confirm', 'request', 'response'],
    }), quiz('b1-u6-f', [
      q('Which is a clear email opening?', ['I am writing to confirm...', 'Confirm writing I...', 'Hello thing.'], 0),
      q('Which asks politely for action?', ['Could you please review this by Friday?', 'Review now.', 'You review.'], 0),
      q('Attached means...', ['included with the email', 'late', 'spoken'], 0),
    ]), summative('b1-u6-s', [
      q('Choose the best subject line.', ['Subject: Booking update', 'Hi', 'Important maybe'], 0),
      q('Which includes useful detail?', ['The reference number is USP104.', 'The number is nice.', 'Number maybe.'], 0),
      q('Which closing is professional?', ['Please let me know if you need more information.', 'Okay bye.', 'Done.'], 0),
      q('Which word means reply?', ['response', 'attached', 'subject'], 0),
    ], 'Write a 100-130 word workplace email confirming details and requesting an action.')),
    intermediateUnit('b1-u7', 'Interview and Recruitment Communication', 'Learners can describe experience, strengths, availability, and workplace expectations.', [
      lesson('b1-u7-l1', 'Talking about experience', 'Explain previous jobs and responsibilities.', ['I have experience in customer service.', 'My main responsibility was...', 'I worked with a small team.'], 'Write three sentences about your experience.'),
      lesson('b1-u7-l2', 'Explaining strengths and examples', 'Give simple evidence for a strength.', ['One of my strengths is...', 'For example, I helped...', 'This shows that I can...'], 'Write one strength with an example.'),
      lesson('b1-u7-l3', 'Availability and expectations', 'Discuss shifts, training, and workplace rules.', ['I am available on weekends.', 'I can attend training next week.', 'I understand the uniform policy.'], 'Write three availability sentences.'),
    ], vocabularyActivity('b1-u7-vocab', 'Recruitment Vocabulary', ['experience', 'responsibility', 'strength', 'example', 'available', 'training', 'policy', 'interview', 'reliable', 'teamwork'], {
      story: [text('In the interview, I explained my '), gap('experience', ['experience', 'policy', 'available']), text('. One of my strengths is '), gap('teamwork', ['reliable', 'teamwork', 'training']), text('. I am also '), gap('available', ['example', 'available', 'responsibility']), text(' on weekends.')],
      match: [match('responsibility', 'A duty or task you must do.'), match('reliable', 'Someone who can be trusted to do what they say.'), match('policy', 'A workplace rule or guideline.')],
      writingWords: ['experience', 'strength', 'training', 'reliable'],
    }), quiz('b1-u7-f', [
      q('Which describes experience?', ['I have experience in customer service.', 'I am upstairs.', 'I have a form.'], 0),
      q('Which introduces an example?', ['For example, I helped...', 'Maybe helped.', 'Help example.'], 0),
      q('Available means...', ['free to work or attend', 'not correct', 'already resolved'], 0),
    ]), summative('b1-u7-s', [
      q('Choose the best strength sentence.', ['One of my strengths is teamwork.', 'Teamwork strength one.', 'I teamwork.'], 0),
      q('Which sentence discusses availability?', ['I am available on weekends.', 'I like weekends.', 'Weekend is Saturday.'], 0),
      q('Which word means workplace rule?', ['policy', 'example', 'interview'], 0),
      q('Which sentence is professional?', ['I understand the uniform policy.', 'Uniform yes.', 'I know clothes.'], 0),
    ], 'Write 100-130 words for an interview answer about your experience, strengths, availability, and training needs.')),
    intermediateUnit('b1-u8', 'Workplace Meetings and Action Points', 'Learners can take part in routine meetings and record agreed actions.', [
      lesson('b1-u8-l1', 'Giving a short update in a meeting', 'Share progress and issues briefly.', ['Since the last meeting...', 'We have completed...', 'One issue is...'], 'Write a short meeting update.'),
      lesson('b1-u8-l2', 'Asking and answering meeting questions', 'Ask for clarification and respond with detail.', ['Could you explain that point?', 'What is the deadline?', 'The reason is...'], 'Write three meeting questions.'),
      lesson('b1-u8-l3', 'Recording action points', 'Write clear actions, owners, and deadlines.', ['Action: update the checklist.', 'Owner: front desk team.', 'Deadline: Friday.'], 'Write three action points.'),
    ], vocabularyActivity('b1-u8-vocab', 'Meeting Vocabulary', ['meeting', 'progress', 'issue', 'deadline', 'action', 'owner', 'agenda', 'clarify', 'decision', 'checklist'], {
      story: [text('In the '), gap('meeting', ['meeting', 'owner', 'agenda']), text(', we discussed one important '), gap('issue', ['deadline', 'issue', 'clarify']), text('. The action is to update the '), gap('checklist', ['decision', 'checklist', 'progress']), text(' by Friday.')],
      match: [match('agenda', 'A list of topics for a meeting.'), match('deadline', 'The date or time something must be finished.'), match('decision', 'A choice made after discussion.')],
      writingWords: ['progress', 'deadline', 'action', 'decision'],
    }), quiz('b1-u8-f', [
      q('Which phrase gives a meeting update?', ['Since the last meeting...', 'The meeting room is big.', 'Meeting maybe.'], 0),
      q('Which asks for clarification?', ['Could you explain that point?', 'What is your name?', 'Where is the lift?'], 0),
      q('An action point should include...', ['task, owner, and deadline', 'only a colour', 'no details'], 0),
    ]), summative('b1-u8-s', [
      q('Choose the action point.', ['Action: update the checklist.', 'Checklist is useful.', 'Update maybe.'], 0),
      q('Which word means final date?', ['deadline', 'agenda', 'owner'], 0),
      q('Which phrase asks about timing?', ['What is the deadline?', 'What is the colour?', 'Where is the table?'], 0),
      q('Which sentence gives a reason?', ['The reason is staff availability.', 'Reason staff is.', 'Staff reason maybe.'], 0),
    ], 'Write 100-130 words summarising a routine meeting, including progress, one issue, and three action points.')),
    intermediateUnit('b1-u9', 'Explaining Change and New Procedures', 'Learners can explain changes, reasons, and support for colleagues or customers.', [
      lesson('b1-u9-l1', 'Announcing a change', 'Use clear language to explain what is changing.', ['From Monday, the process will change.', 'We are introducing a new checklist.', 'The old form will no longer be used.'], 'Write three change announcement sentences.'),
      lesson('b1-u9-l2', 'Explaining reasons for change', 'Connect changes to benefits and reasons.', ['This will reduce delays.', 'The change is needed for safety.', 'It will help us keep better records.'], 'Write three reasons for change.'),
      lesson('b1-u9-l3', 'Supporting people through change', 'Offer guidance and reassurance.', ['Training will be provided.', 'Please ask if you need help.', 'We will review the process after two weeks.'], 'Write a support message.'),
    ], vocabularyActivity('b1-u9-vocab', 'Change Vocabulary', ['change', 'introduce', 'checklist', 'reduce', 'benefit', 'guidance', 'provided', 'review', 'records', 'reassurance'], {
      story: [text('From Monday, we will '), gap('introduce', ['introduce', 'records', 'benefit']), text(' a new checklist. This change will '), gap('reduce', ['provided', 'reduce', 'review']), text(' delays. Training will be '), gap('provided', ['guidance', 'provided', 'change']), text(' for all staff.')],
      match: [match('guidance', 'Advice or help on what to do.'), match('benefit', 'A positive result.'), match('reassurance', 'Words that help people feel less worried.')],
      writingWords: ['change', 'benefit', 'guidance', 'review'],
    }), quiz('b1-u9-f', [
      q('Which announces a change?', ['From Monday, the process will change.', 'Monday is busy.', 'Process Monday change maybe.'], 0),
      q('Which gives a reason?', ['This will reduce delays.', 'This is a checklist.', 'This is Monday.'], 0),
      q('Which offers support?', ['Please ask if you need help.', 'Do not ask.', 'No support.'], 0),
    ]), summative('b1-u9-s', [
      q('Choose the best change sentence.', ['We are introducing a new checklist.', 'Checklist new introduce we.', 'New checklist maybe.'], 0),
      q('Which phrase explains benefit?', ['It will help us keep better records.', 'Records are files.', 'I like records.'], 0),
      q('Which word means advice?', ['guidance', 'deadline', 'incident'], 0),
      q('Which reassures staff?', ['Training will be provided.', 'Good luck.', 'Learn alone.'], 0),
    ], 'Write 100-130 words explaining a workplace change, the reason for it, and how staff will be supported.')),
    intermediateUnit('b1-u10', 'Intermediate Review and Workplace Confidence', 'Learners combine B1 skills in a final workplace communication scenario.', [
      lesson('b1-u10-l1', 'Reviewing customer and team language', 'Review complaints, updates, handovers, meetings, and change language.', ['I understand your concern.', 'The priority today is...', 'From Monday, the process will change.'], 'Write ten useful B1 workplace phrases.'),
      lesson('b1-u10-l2', 'Organising a longer response', 'Use paragraphs for situation, action, and follow-up.', ['Situation', 'Action taken', 'Next step', 'Follow-up'], 'Plan a four-paragraph workplace response.'),
      lesson('b1-u10-l3', 'Checking tone and clarity', 'Improve accuracy, politeness, and organisation.', ['Is the tone professional?', 'Is the action clear?', 'Is the next step included?'], 'Edit a short response for clarity.'),
    ], vocabularyActivity('b1-u10-vocab', 'B1 Review Vocabulary', ['concern', 'process', 'incident', 'follow-up', 'handover', 'priority', 'response', 'deadline', 'procedure', 'confidence'], {
      story: [text('A confident B1 learner can explain a '), gap('concern', ['concern', 'deadline', 'handover']), text(', describe a workplace '), gap('incident', ['confidence', 'incident', 'procedure']), text(', and give a clear '), gap('follow-up', ['follow-up', 'response', 'process']), text('.')],
      match: [match('procedure', 'The official way to complete a task.'), match('priority', 'The most important task.'), match('confidence', 'Feeling able to communicate well.')],
      writingWords: ['process', 'priority', 'response', 'deadline'],
    }), quiz('b1-u10-f', [
      q('Which phrase acknowledges concern?', ['I understand your concern.', 'Concern okay.', 'No concern.'], 0),
      q('Which phrase gives a priority?', ['The priority today is...', 'Today is nice.', 'Priority maybe.'], 0),
      q('Which phrase gives a next step?', ['I will follow up by Friday.', 'Friday is a day.', 'I like Friday.'], 0),
    ]), summative('b1-u10-s', [
      q('Choose the best complaint response.', ['I am sorry to hear that. Let me check what happened.', 'Calm down.', 'Not my job.'], 0),
      q('Choose the best process sentence.', ['First, check the record; next, confirm the booking.', 'Record booking first confirm maybe.', 'Booking record.'], 0),
      q('Choose the best handover phrase.', ['Please follow up with maintenance before 3 pm.', 'Maintenance maybe.', 'Go maintenance.'], 0),
      q('Choose the best change explanation.', ['This change will reduce delays.', 'Change good.', 'New thing Monday.'], 0),
      q('Choose the clearest closing.', ['Please let me know if you need further support.', 'Bye.', 'Finished now.'], 0),
    ], 'Write 120-150 words responding to a workplace problem. Include the situation, action taken, reason, next step, and follow-up.')),
  ];
}

function intermediateUnit(id, title, outcome, lessons, vocabulary, formative, summativeAssessment) {
  return { id, title, outcome, lessons, vocabulary, formative, summative: summativeAssessment };
}

function elementaryUnits() {
  return [
    elementaryUnit('a2-u1', 'Customer and Guest Communication', 'Learners can greet customers, offer help, and give simple information.', [
      lesson('a2-u1-l1', 'Welcoming customers professionally', 'Use polite opening phrases and helpful tone.', ['Good afternoon, how can I help?', 'Welcome to the clinic.', 'Please take a seat.'], 'Write a short welcome script for your workplace.'),
      lesson('a2-u1-l2', 'Giving simple information', 'Explain times, places, prices, and next steps.', ['Breakfast is from 7 am.', 'The office is on the second floor.', 'Your appointment is at 10:30.'], 'Write three useful information sentences.'),
      lesson('a2-u1-l3', 'Checking understanding', 'Confirm that customers and colleagues understand.', ['Is that clear?', 'Would you like me to explain again?', 'Do you have any questions?'], 'Write two questions to check understanding.'),
    ], vocabularyActivity('a2-u1-vocab', 'Customer Communication Vocabulary', ['welcome', 'appointment', 'information', 'available', 'explain', 'clear', 'question', 'customer', 'service', 'support'], {
      story: [text('Welcome to our '), gap('service', ['service', 'question', 'available']), text('. Your '), gap('appointment', ['clear', 'appointment', 'support']), text(' is at 10:30. I can '), gap('explain', ['explain', 'customer', 'information']), text(' the next step.')],
      match: [match('available', 'Free or ready to use.'), match('support', 'Help given to someone.'), match('clear', 'Easy to understand.')],
      writingWords: ['welcome', 'customer', 'question', 'information'],
    }), quiz('a2-u1-f', [
      q('Which phrase is professional?', ['What you want?', 'How can I help you today?', 'Say fast.'], 1),
      q('Which sentence gives time information?', ['The appointment is at 10:30.', 'The appointment is nice.', 'The appointment is blue.'], 0),
      q('Which checks understanding?', ['Is that clear?', 'Go there.', 'Finished.'], 0),
    ]), summative('a2-u1-s', [
      q('Choose the best customer greeting.', ['Yes?', 'How can I help you today?', 'Speak.'], 1),
      q('Which sentence gives directions?', ['Please go to reception.', 'I am tired.', 'The bag is black.'], 0),
      q('Which is polite?', ['Wait there please.', 'Wait!', 'You wait now.'], 0),
      q('Which phrase offers help?', ['Can I help you?', 'You help me.', 'I helped yesterday.'], 0),
    ], 'Write 70-90 words describing how you welcome and help a customer, guest, or patient.')),
    elementaryUnit('a2-u2', 'Simple Workplace Messages', 'Learners can write short messages to colleagues, supervisors, or customers.', [
      lesson('a2-u2-l1', 'Short emails and messages', 'Write clear basic workplace messages.', ['I am running late.', 'The room is ready.', 'Please call the customer.'], 'Write a short message to your supervisor.'),
      lesson('a2-u2-l2', 'Explaining a problem simply', 'Describe common workplace problems.', ['The printer is not working.', 'The guest is waiting.', 'We need more towels.'], 'Write two workplace problems.'),
      lesson('a2-u2-l3', 'Requesting action', 'Ask someone to do something politely.', ['Could you check this, please?', 'Please send the form.', 'Can you update the booking?'], 'Write three polite requests.'),
    ], vocabularyActivity('a2-u2-vocab', 'Message Vocabulary', ['message', 'late', 'ready', 'problem', 'request', 'send', 'update', 'supervisor', 'customer', 'urgent'], {
      story: [text('Please send a '), gap('message', ['message', 'late', 'ready']), text(' to the supervisor. The customer has a '), gap('problem', ['request', 'problem', 'send']), text(', so this is '), gap('urgent', ['urgent', 'update', 'customer']), text('.')],
      match: [match('supervisor', 'A person who manages work.'), match('request', 'Something you ask for politely.'), match('update', 'New information about something.')],
      writingWords: ['message', 'problem', 'send', 'urgent'],
    }), quiz('a2-u2-f', [
      q('Which is a clear problem?', ['The printer is not working.', 'Printer good.', 'I printer.'], 0),
      q('Which is a polite request?', ['Send it now.', 'Could you send it, please?', 'You send.'], 1),
      q('A good work message should be...', ['clear and short', 'unclear and long', 'only one word'], 0),
    ]), summative('a2-u2-s', [
      q('Choose the clearest message.', ['I late.', 'I am running late today.', 'Late me.'], 1),
      q('Which phrase asks for action?', ['Could you check this?', 'I checked yesterday.', 'The check is blue.'], 0),
      q('Which describes a problem?', ['The guest is waiting.', 'The guest happy yesterday.', 'Guest table.'], 0),
      q('Which ending is polite?', ['Thanks', 'Now', 'No'], 0),
    ], 'Write a 70-90 word workplace message explaining a problem and asking for help.')),
    elementaryUnit('a2-u3', 'Appointments, Bookings, and Schedules', 'Learners can confirm bookings, explain availability, and talk about schedules.', [
      lesson('a2-u3-l1', 'Confirming appointments', 'Confirm times, names, and booking details.', ['Your appointment is confirmed.', 'The booking is under your name.', 'Could I confirm your phone number?'], 'Write three confirmation sentences.'),
      lesson('a2-u3-l2', 'Availability and changes', 'Explain when something is available or unavailable.', ['We have availability on Tuesday.', 'That time is not available.', 'I can offer 3 pm instead.'], 'Write two available times and one unavailable time.'),
      lesson('a2-u3-l3', 'Changing a booking', 'Use polite language to change times.', ['Would you like to change the booking?', 'The next available time is 11 am.', 'I can move it to Friday.'], 'Write a short booking-change message.'),
    ], vocabularyActivity('a2-u3-vocab', 'Booking Vocabulary', ['booking', 'confirm', 'schedule', 'available', 'unavailable', 'change', 'instead', 'details', 'offer', 'cancel'], {
      story: [text('I can '), gap('confirm', ['confirm', 'cancel', 'instead']), text(' your booking. The time is not '), gap('available', ['details', 'available', 'change']), text(', but I can '), gap('offer', ['offer', 'schedule', 'unavailable']), text(' 3 pm instead.')],
      match: [match('schedule', 'A plan of times.'), match('instead', 'In place of another option.'), match('cancel', 'To stop a booking or plan.')],
      writingWords: ['booking', 'confirm', 'available', 'change'],
    }), quiz('a2-u3-f', [
      q('Which confirms a booking?', ['Your appointment is confirmed.', 'Appointment nice.', 'You time.'], 0),
      q('Unavailable means...', ['not free', 'very clean', 'near reception'], 0),
      q('Which offers another time?', ['I can offer 3 pm instead.', 'I like 3 pm.', '3 pm blue.'], 0),
    ]), summative('a2-u3-s', [
      q('Choose the clearest booking sentence.', ['The booking is under your name.', 'Booking under name your.', 'Name booking under.'], 0),
      q('Which phrase changes a booking?', ['I can move it to Friday.', 'I moved yesterday home.', 'Move booking maybe.'], 0),
      q('Which word means not available?', ['unavailable', 'support', 'message'], 0),
      q('Which is polite?', ['Would you like to change the booking?', 'Change now?', 'You change it.'], 0),
    ], 'Write 70-90 words confirming an appointment and offering a different time if the first time is unavailable.')),
    elementaryUnit('a2-u4', 'Directions and Local Information', 'Learners can give directions, explain locations, and share simple local information.', [
      lesson('a2-u4-l1', 'Giving directions inside a building', 'Use clear direction phrases.', ['Go past reception.', 'Take the lift to the second floor.', 'It is opposite the waiting area.'], 'Write directions to one workplace location.'),
      lesson('a2-u4-l2', 'Local places and transport', 'Explain nearby places and transport options.', ['The bus stop is outside.', 'The pharmacy is next door.', 'The car park is behind the building.'], 'Write three local information sentences.'),
      lesson('a2-u4-l3', 'Checking if directions are understood', 'Check understanding after giving directions.', ['Would you like me to show you?', 'Do you know where that is?', 'I can write the address for you.'], 'Write two checking questions.'),
    ], vocabularyActivity('a2-u4-vocab', 'Directions Vocabulary', ['opposite', 'nearby', 'outside', 'behind', 'address', 'transport', 'pharmacy', 'lift', 'floor', 'entrance'], {
      story: [text('The pharmacy is '), gap('nearby', ['nearby', 'floor', 'lift']), text('. It is '), gap('opposite', ['address', 'opposite', 'transport']), text(' the entrance. The bus stop is '), gap('outside', ['outside', 'behind', 'pharmacy']), text('.')],
      match: [match('behind', 'At the back of something.'), match('address', 'The details of where a place is.'), match('transport', 'Ways to travel, such as bus or train.')],
      writingWords: ['opposite', 'outside', 'address', 'entrance'],
    }), quiz('a2-u4-f', [
      q('Which gives directions?', ['Take the lift to the second floor.', 'I am very busy.', 'The appointment is confirmed.'], 0),
      q('Opposite means...', ['across from', 'late', 'finished'], 0),
      q('Which checks understanding?', ['Do you know where that is?', 'The bus is outside.', 'I work here.'], 0),
    ]), summative('a2-u4-s', [
      q('Choose the direction phrase.', ['Go past reception.', 'Reception is friendly.', 'I called reception.'], 0),
      q('Which is local information?', ['The car park is behind the building.', 'The booking is cancelled.', 'The form is ready.'], 0),
      q('Which word is a place?', ['pharmacy', 'instead', 'confirm'], 0),
      q('Which is helpful?', ['Would you like me to show you?', 'Find it yourself.', 'You go.'], 0),
    ], 'Write 70-90 words giving directions to a workplace location and one nearby local place.')),
    elementaryUnit('a2-u5', 'Handling Simple Problems', 'Learners can describe routine problems and offer simple solutions.', [
      lesson('a2-u5-l1', 'Explaining what is wrong', 'Describe simple problems clearly.', ['The system is slow.', 'The order is missing.', 'The room is not ready yet.'], 'Write three common problems.'),
      lesson('a2-u5-l2', 'Apologising and reassuring', 'Use simple apology and reassurance language.', ['I am sorry about that.', 'I will check it now.', 'We will fix this as soon as possible.'], 'Write two apology phrases.'),
      lesson('a2-u5-l3', 'Offering a practical solution', 'Suggest simple next steps.', ['I can call maintenance.', 'We can replace the item.', 'I will ask my supervisor.'], 'Write three simple solutions.'),
    ], vocabularyActivity('a2-u5-vocab', 'Problem Solving Vocabulary', ['system', 'slow', 'missing', 'ready', 'apology', 'solution', 'replace', 'maintenance', 'fix', 'supervisor'], {
      story: [text('The order is '), gap('missing', ['missing', 'ready', 'slow']), text('. I am sorry about that. I will ask my '), gap('supervisor', ['system', 'supervisor', 'replace']), text(' and find a '), gap('solution', ['solution', 'fix', 'apology']), text('.')],
      match: [match('maintenance', 'People who repair things.'), match('replace', 'To give another item instead.'), match('apology', 'A polite way to say sorry.')],
      writingWords: ['missing', 'solution', 'fix', 'supervisor'],
    }), quiz('a2-u5-f', [
      q('Which describes a problem?', ['The room is not ready yet.', 'The room is on the left.', 'The room is large.'], 0),
      q('Which is an apology?', ['I am sorry about that.', 'I am here.', 'I am ready.'], 0),
      q('Which offers a solution?', ['I can call maintenance.', 'Maintenance is a word.', 'I called yesterday.'], 0),
    ]), summative('a2-u5-s', [
      q('Choose the best problem sentence.', ['The system is slow.', 'The system is Monday.', 'Slow system very.'], 0),
      q('Which reassures someone?', ['I will check it now.', 'No idea.', 'Wait.'], 0),
      q('Which word means repair?', ['fix', 'floor', 'form'], 0),
      q('Which is professional?', ['We will fix this as soon as possible.', 'Maybe later.', 'Problem not mine.'], 0),
    ], 'Write 70-90 words describing a simple workplace problem, apologising, and offering a solution.')),
    elementaryUnit('a2-u6', 'Teamwork and Colleague Communication', 'Learners can share updates, ask colleagues for help, and communicate respectfully in a team.', [
      lesson('a2-u6-l1', 'Sharing task updates', 'Tell colleagues what has been done and what is next.', ['I have finished the list.', 'I still need to call the customer.', 'The next task is checking the stock.'], 'Write three task updates.'),
      lesson('a2-u6-l2', 'Asking colleagues for support', 'Ask for help without sounding rude.', ['Could you help me with this task?', 'Can we do this together?', 'Do you have a moment?'], 'Write three colleague requests.'),
      lesson('a2-u6-l3', 'Respectful workplace tone', 'Use respectful phrases with colleagues.', ['Thanks for your help.', 'I appreciate it.', 'Let me know if you need anything.'], 'Write a short thank-you message.'),
    ], vocabularyActivity('a2-u6-vocab', 'Teamwork Vocabulary', ['colleague', 'task', 'update', 'support', 'together', 'moment', 'respectful', 'appreciate', 'stock', 'anything'], {
      story: [text('I gave my colleague an '), gap('update', ['update', 'stock', 'moment']), text('. We worked '), gap('together', ['support', 'together', 'anything']), text(' on the task. I said, I '), gap('appreciate', ['respectful', 'appreciate', 'colleague']), text(' your help.')],
      match: [match('colleague', 'A person you work with.'), match('support', 'Help.'), match('stock', 'Items kept for use or sale.')],
      writingWords: ['colleague', 'task', 'support', 'appreciate'],
    }), quiz('a2-u6-f', [
      q('Which is a task update?', ['I have finished the list.', 'The list is blue.', 'I like lists.'], 0),
      q('Which asks for support politely?', ['Could you help me with this task?', 'Do it.', 'You help now.'], 0),
      q('Which phrase is respectful?', ['Thanks for your help.', 'Move.', 'No.'], 0),
    ]), summative('a2-u6-s', [
      q('Choose the colleague request.', ['Do you have a moment?', 'You moment?', 'Moment now.'], 0),
      q('Which means working as a pair or group?', ['together', 'missing', 'opposite'], 0),
      q('Which phrase thanks someone?', ['I appreciate it.', 'I need it.', 'I send it.'], 0),
      q('Which is clear?', ['The next task is checking the stock.', 'Stock checking next task is.', 'Task stock next.'], 0),
    ], 'Write 70-90 words giving a team update and asking a colleague for support politely.')),
    elementaryUnit('a2-u7', 'Telephone and Front Desk Communication', 'Learners can answer calls, take simple messages, and transfer enquiries.', [
      lesson('a2-u7-l1', 'Answering the phone', 'Use simple professional phone openings.', ['Good morning, UpSkillPro, how can I help?', 'Can I take your name, please?', 'Could you repeat your number?'], 'Write a phone greeting.'),
      lesson('a2-u7-l2', 'Taking a message', 'Record names, numbers, and reasons for calling.', ['Can I take a message?', 'What is the best number to call back?', 'I will pass this to the team.'], 'Write a short phone message.'),
      lesson('a2-u7-l3', 'Transferring calls', 'Explain transfer and waiting language.', ['I will transfer you now.', 'Please hold for a moment.', 'The line is busy.'], 'Write three transfer phrases.'),
    ], vocabularyActivity('a2-u7-vocab', 'Telephone Vocabulary', ['caller', 'transfer', 'hold', 'line', 'busy', 'number', 'message', 'repeat', 'call back', 'enquiry'], {
      story: [text('The '), gap('caller', ['caller', 'line', 'busy']), text(' has an enquiry. I ask them to '), gap('hold', ['hold', 'number', 'message']), text(' for a moment, then I '), gap('transfer', ['repeat', 'transfer', 'call back']), text(' the call.')],
      match: [match('line', 'A phone connection.'), match('call back', 'Phone someone again later.'), match('enquiry', 'A request for information.')],
      writingWords: ['caller', 'message', 'repeat', 'transfer'],
    }), quiz('a2-u7-f', [
      q('Which is a phone greeting?', ['Good morning, how can I help?', 'Go there.', 'I am late.'], 0),
      q('Which asks for a phone number?', ['What is the best number to call back?', 'Where is reception?', 'What colour is it?'], 0),
      q('Please hold means...', ['wait on the phone', 'finish the call', 'walk upstairs'], 0),
    ]), summative('a2-u7-s', [
      q('Choose the best phone phrase.', ['Can I take your name, please?', 'Name now.', 'You name.'], 0),
      q('Which phrase transfers a call?', ['I will transfer you now.', 'I will start at 9.', 'I will clean the table.'], 0),
      q('Busy line means...', ['the phone connection is not free', 'the office is clean', 'the caller is early'], 0),
      q('Which is professional?', ['Could you repeat your number?', 'Say number again.', 'Number?'], 0),
    ], 'Write 70-90 words showing how you answer a call, take a message, and transfer the caller.')),
    elementaryUnit('a2-u8', 'Workplace Forms and Records', 'Learners can complete simple forms, check details, and explain missing information.', [
      lesson('a2-u8-l1', 'Personal and contact details', 'Ask for and record basic details.', ['Please write your full name.', 'Could I check your email address?', 'What is your postcode?'], 'Write three questions for a form.'),
      lesson('a2-u8-l2', 'Checking forms', 'Notice and explain missing information.', ['This section is missing.', 'Please sign here.', 'The date is incorrect.'], 'Write three form-checking sentences.'),
      lesson('a2-u8-l3', 'Explaining documents simply', 'Explain what a document or record is for.', ['This form is for registration.', 'We need this record for safety.', 'Please keep a copy.'], 'Write a short explanation of a form.'),
    ], vocabularyActivity('a2-u8-vocab', 'Forms Vocabulary', ['form', 'record', 'section', 'signature', 'date', 'incorrect', 'postcode', 'email', 'registration', 'copy'], {
      story: [text('Please complete this '), gap('form', ['form', 'copy', 'date']), text('. The email '), gap('section', ['record', 'section', 'postcode']), text(' is missing. Please add your '), gap('signature', ['incorrect', 'registration', 'signature']), text(' here.')],
      match: [match('record', 'Information kept for future use.'), match('incorrect', 'Not correct.'), match('copy', 'Another version of a document.')],
      writingWords: ['form', 'email', 'date', 'record'],
    }), quiz('a2-u8-f', [
      q('Which asks for contact details?', ['Could I check your email address?', 'Can I clean the table?', 'Where is the lift?'], 0),
      q('Missing information means...', ['information is not there', 'information is polite', 'information is early'], 0),
      q('Which asks someone to sign?', ['Please sign here.', 'Please sit here.', 'Please go here.'], 0),
    ]), summative('a2-u8-s', [
      q('Choose the form sentence.', ['This section is missing.', 'This section is happy.', 'Missing this section is.'], 0),
      q('Which word means not correct?', ['incorrect', 'available', 'nearby'], 0),
      q('Which is a document purpose?', ['This form is for registration.', 'This form is beside reception.', 'This form is blue.'], 0),
      q('Which is professional?', ['Please keep a copy.', 'Keep copy now.', 'Copy you keep.'], 0),
    ], 'Write 70-90 words explaining how to complete a simple workplace form and what to do if information is missing.')),
    elementaryUnit('a2-u9', 'Service Recovery and Follow-up', 'Learners can apologise, explain next steps, and follow up after a service problem.', [
      lesson('a2-u9-l1', 'Responding after a problem', 'Use calm service recovery language.', ['Thank you for your patience.', 'I am sorry for the inconvenience.', 'I will look into this for you.'], 'Write three recovery phrases.'),
      lesson('a2-u9-l2', 'Explaining next steps', 'Give simple next-step information.', ['First, I will check the record.', 'Then I will speak to the team.', 'I will update you by 3 pm.'], 'Write a three-step follow-up.'),
      lesson('a2-u9-l3', 'Following up in writing', 'Write a short follow-up message.', ['Thank you for contacting us.', 'We have now fixed the issue.', 'Please contact us if you need more help.'], 'Write a short follow-up message.'),
    ], vocabularyActivity('a2-u9-vocab', 'Follow-up Vocabulary', ['patience', 'inconvenience', 'issue', 'follow-up', 'resolved', 'contact', 'update', 'record', 'response', 'apologise'], {
      story: [text('Thank you for your '), gap('patience', ['patience', 'record', 'contact']), text('. I apologise for the '), gap('inconvenience', ['response', 'inconvenience', 'resolved']), text('. The issue is now '), gap('resolved', ['follow-up', 'update', 'resolved']), text('.')],
      match: [match('issue', 'A problem.'), match('follow-up', 'A later message or action.'), match('response', 'A reply.')],
      writingWords: ['apologise', 'issue', 'update', 'contact'],
    }), quiz('a2-u9-f', [
      q('Which phrase is service recovery?', ['I am sorry for the inconvenience.', 'I am on the second floor.', 'I start at 9.'], 0),
      q('Which gives a next step?', ['I will update you by 3 pm.', 'The form is ready.', 'The car park is behind.'], 0),
      q('Resolved means...', ['fixed or completed', 'missing', 'not available'], 0),
    ]), summative('a2-u9-s', [
      q('Choose the best apology.', ['I am sorry for the inconvenience.', 'Bad luck.', 'Not my problem.'], 0),
      q('Which is a follow-up phrase?', ['Thank you for contacting us.', 'Turn left.', 'Could I check your name?'], 0),
      q('Which word means a problem?', ['issue', 'copy', 'floor'], 0),
      q('Which sentence is clear?', ['We have now fixed the issue.', 'Issue fixed now have we.', 'Fixed issue maybe.'], 0),
    ], 'Write 70-90 words following up with a customer after a service problem has been resolved.')),
    elementaryUnit('a2-u10', 'Elementary Review and Workplace Communication', 'Learners review A2 communication across customers, messages, forms, calls, and follow-up.', [
      lesson('a2-u10-l1', 'Reviewing customer language', 'Review greetings, help, appointments, and directions.', ['How can I help you today?', 'Your appointment is confirmed.', 'Please go to reception.'], 'Write six customer phrases from this level.'),
      lesson('a2-u10-l2', 'Reviewing colleague language', 'Review messages, requests, updates, and teamwork.', ['Could you check this, please?', 'I have finished the list.', 'Thanks for your support.'], 'Write six colleague phrases from this level.'),
      lesson('a2-u10-l3', 'Planning an A2 workplace response', 'Plan a clear response to a common workplace situation.', ['Situation', 'Problem', 'Action', 'Follow-up'], 'Plan a workplace response using four headings.'),
    ], vocabularyActivity('a2-u10-vocab', 'A2 Review Vocabulary', ['communication', 'appointment', 'message', 'direction', 'problem', 'solution', 'teamwork', 'follow-up', 'details', 'professional'], {
      story: [text('Good workplace '), gap('communication', ['communication', 'details', 'direction']), text(' helps the team. If there is a '), gap('problem', ['teamwork', 'problem', 'appointment']), text(', we explain the '), gap('solution', ['solution', 'message', 'professional']), text(' and send a follow-up.')],
      match: [match('details', 'Specific information.'), match('professional', 'Suitable for work.'), match('teamwork', 'Working well with others.')],
      writingWords: ['communication', 'professional', 'solution', 'follow-up'],
    }), quiz('a2-u10-f', [
      q('Which is professional customer language?', ['How can I help you today?', 'What now?', 'Speak fast.'], 0),
      q('Which is a workplace update?', ['I have finished the list.', 'The list is blue.', 'I like lists.'], 0),
      q('Which is follow-up language?', ['I will update you by 3 pm.', 'I am upstairs.', 'This is a postcode.'], 0),
    ]), summative('a2-u10-s', [
      q('Choose the best request.', ['Could you check this, please?', 'Check this now.', 'You check.'], 0),
      q('Choose the best appointment phrase.', ['Your appointment is confirmed.', 'Appointment confirmed your is.', 'Confirmed appointment maybe.'], 0),
      q('Choose the best problem response.', ['I will look into this for you.', 'Not mine.', 'No.'], 0),
      q('Choose the best follow-up phrase.', ['Please contact us if you need more help.', 'Contact if help maybe.', 'More help contact.'], 0),
      q('Choose the most professional closing.', ['Thank you for your patience.', 'Finished.', 'Bye now.'], 0),
    ], 'Write 90-110 words responding to a customer or colleague. Include the situation, problem, action, and follow-up.')),
  ];
}

function elementaryUnit(id, title, outcome, lessons, vocabulary, formative, summativeAssessment) {
  return { id, title, outcome, lessons, vocabulary, formative, summative: summativeAssessment };
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
