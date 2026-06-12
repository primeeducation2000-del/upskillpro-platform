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
      units: [
        {
          id: 'a1-u1',
          title: 'Introducing Yourself at Work',
          outcome: 'Learners can introduce themselves, share role information, and ask simple questions.',
          lessons: [
            lesson('a1-u1-l1', 'My name, role, and team', 'Use simple sentences to introduce yourself at work.', ['My name is Sara.', 'I work in housekeeping.', 'I am part of the front desk team.'], 'Write three sentences introducing yourself and your job role.'),
            lesson('a1-u1-l2', 'Simple workplace questions', 'Ask and answer basic questions politely.', ['What is your name?', 'Where do you work?', 'Can you help me, please?'], 'Practise asking a colleague two polite questions.'),
            lesson('a1-u1-l3', 'Numbers, times, and dates', 'Understand times, shifts, room numbers, and dates.', ['Room 204', 'My shift starts at 8 o clock.', 'The appointment is on Monday.'], 'Write your work start time, finish time, and one important date.'),
          ],
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
      ],
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
