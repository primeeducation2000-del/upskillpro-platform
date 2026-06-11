export const coursebookLibrary = [
  {
    id: 'hospitality-foundations',
    pathway: 'Hospitality English',
    title: 'ESP Hospitality English Foundations',
    level: 'A2-B1',
    description: 'Front desk, guest service, complaint handling, and confidence-building activities for hospitality teams.',
    chapters: [
      {
        id: 'guest-welcome',
        title: 'Guest Welcome',
        pages: [
          {
            id: 'welcome-language',
            title: 'Professional First Contact',
            cefr: 'A2',
            type: 'lesson',
            duration: '8 min',
            body: [
              'A strong welcome is short, clear, and warm. Front desk staff should confirm the guest name, explain the next step, and offer help without sounding rushed.',
              'Useful phrases: Good afternoon, welcome to the hotel. May I take your name, please? I will check that for you now. Your room is ready. Breakfast is served from 7 am.'
            ],
            practice: 'Write two welcome sentences for a guest arriving before check-in time.'
          },
          {
            id: 'listening-check-in',
            title: 'Listening Practice: Check-in Flow',
            cefr: 'A2',
            type: 'audio',
            duration: '6 min',
            transcript: 'Good evening. Welcome to UpSkill Hotel. May I have your booking reference, please? Thank you. I can see you are staying for three nights.',
            prompt: 'Play the spoken model, then practise saying the check-in sequence clearly.'
          },
          {
            id: 'welcome-quiz',
            title: 'Quick Check: Guest Welcome',
            cefr: 'A2',
            type: 'quiz',
            duration: '5 min',
            question: 'Which phrase is the most professional at reception?',
            options: [
              'What do you want?',
              'May I take your name, please?',
              'Give me your passport now.',
              'Wait there.'
            ],
            answer: 1,
            feedback: 'Polite question forms sound more professional and reduce tension.'
          },
          {
            id: 'front-desk-flashcards',
            title: 'Vocabulary Flashcards',
            cefr: 'A2',
            type: 'flashcards',
            duration: '7 min',
            cards: [
              ['reservation', 'A booking made before arrival.'],
              ['availability', 'Rooms or services that can be used or booked.'],
              ['complimentary', 'Provided free of charge.'],
              ['upgrade', 'A better room or service than originally booked.']
            ]
          }
        ]
      },
      {
        id: 'service-recovery',
        title: 'Service Recovery',
        pages: [
          {
            id: 'complaint-framework',
            title: 'Handling Complaints Calmly',
            cefr: 'B1',
            type: 'lesson',
            duration: '9 min',
            body: [
              'When a guest complains, the aim is to acknowledge, clarify, solve, and follow up. Avoid blaming other teams. Use calm language and show ownership.',
              'Framework: I am sorry to hear that. Let me check the details. Here is what I can do now. I will follow up with you in twenty minutes.'
            ],
            practice: 'Write one sentence that acknowledges a noisy-room complaint.'
          },
          {
            id: 'complaint-video',
            title: 'Scenario Video: Service Recovery',
            cefr: 'B1',
            type: 'video',
            duration: '6 min',
            summary: 'A manager models calm complaint handling, including acknowledgement, clarification, and next steps.',
            videoUrl: 'https://www.youtube-nocookie.com/embed/1Evwgu369Jw'
          },
          {
            id: 'drag-complaints',
            title: 'Put the Response in Order',
            cefr: 'B1',
            type: 'drag',
            duration: '6 min',
            instruction: 'Arrange the steps into the most professional complaint-handling order.',
            items: [
              'Acknowledge the issue',
              'Ask one clarifying question',
              'Offer a practical solution',
              'Confirm the follow-up time'
            ]
          },
          {
            id: 'writing-complaint',
            title: 'Writing Exercise: Guest Email',
            cefr: 'B1',
            type: 'writing',
            duration: '12 min',
            prompt: 'Write a short email reply to a guest who says their room was not cleaned on time. Include an apology, a solution, and a follow-up action.'
          }
        ]
      }
    ]
  },
  {
    id: 'healthcare-communication',
    pathway: 'Healthcare English',
    title: 'Healthcare Communication Essentials',
    level: 'B1-B2',
    description: 'Patient-facing English, empathy, admin language, and clear workplace communication for healthcare support teams.',
    chapters: [
      {
        id: 'patient-frontline',
        title: 'Patient Communication',
        pages: [
          {
            id: 'patient-greeting',
            title: 'Clear Patient Reception Language',
            cefr: 'B1',
            type: 'lesson',
            duration: '8 min',
            body: [
              'Healthcare communication must be clear, calm, and respectful. Patients may feel worried, so short instructions and checking understanding are important.',
              'Useful phrases: Please take a seat. The nurse will call you shortly. Can I confirm your date of birth? Let me check that information for you.'
            ],
            practice: 'Write one clear sentence asking a patient to confirm their details.'
          },
          {
            id: 'patient-empathy-quiz',
            title: 'Empathy Language Check',
            cefr: 'B1',
            type: 'quiz',
            duration: '5 min',
            question: 'Which response shows empathy and clarity?',
            options: [
              'That is not my problem.',
              'You must wait.',
              'I understand this is stressful. I will check the appointment status now.',
              'Come back later.'
            ],
            answer: 2,
            feedback: 'The best response acknowledges the feeling and explains the next action.'
          }
        ]
      }
    ]
  },
  {
    id: 'future-pathways',
    pathway: 'Multiple ESP pathways',
    title: 'Future ESP Pathways',
    level: 'A1-C1',
    description: 'A placeholder library structure for future sector books.',
    chapters: [
      {
        id: 'pathway-map',
        title: 'Pathway Map',
        pages: [
          {
            id: 'available-pathways',
            title: 'Expandable Coursebook Library',
            cefr: 'A1-C1',
            type: 'lesson',
            duration: '4 min',
            body: [
              'This widget is designed to support multiple ESP pathways: Business English, Healthcare English, Construction English, Hospitality English, Retail English, IT English, and Logistics English.',
              'New books can be added by placing another book object in the coursebook data file. The widget reads chapters, pages, and activity types automatically.'
            ],
            practice: 'Choose the next pathway your learners need and add it to the library data.'
          }
        ]
      }
    ]
  }
];
