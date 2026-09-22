export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  badge: string;
}

export const QUOTES: QuoteItem[] = [
  // --- Indian Special Forces (Para SF 4, 9, 21, MARCOS, GARUD, NSG) ---
  {
    id: 'parasf-9-1',
    quote: 'Men apart, every man an emperor.',
    author: '9 PARA (Special Forces)',
    badge: '9 PARA SF',
  },
  {
    id: 'parasf-balidan',
    quote: 'Balidan Param Dharma — Sacrifice before self. Stand firm when others falter.',
    author: 'Para (Special Forces)',
    badge: 'PARA SF',
  },
  {
    id: 'parasf-4-1',
    quote: 'Born to dare, trained to conquer. The mind gives up before the body.',
    author: '4 PARA (Special Forces)',
    badge: '4 PARA SF',
  },
  {
    id: 'parasf-21-1',
    quote: 'Find a way or make one. Excuses do not exist beyond this line.',
    author: '21 PARA (Special Forces)',
    badge: '21 PARA SF',
  },
  {
    id: 'marcos-1',
    quote: 'The Few, The Fearless. Silence before the strike, precision in execution.',
    author: 'Marine Commandos',
    badge: 'MARCOS',
  },
  {
    id: 'marcos-2',
    quote: 'Victory is not an option; it is our only standard.',
    author: 'Marine Commandos',
    badge: 'MARCOS',
  },
  {
    id: 'nsg-1',
    quote: 'Sarvatra Sarvottam Suraksha — Omnipresent, Omnipotent. Zero margin for error.',
    author: 'National Security Guard',
    badge: 'NSG BLACK CATS',
  },
  {
    id: 'nsg-2',
    quote: 'Speed, surprise, and lethal precision. Do the work quietly.',
    author: 'National Security Guard',
    badge: 'NSG',
  },
  {
    id: 'garud-1',
    quote: 'Prahar Se Pehle — Strike before they know, endure beyond the limit.',
    author: 'Garud Commando Force',
    badge: 'IAF GARUD',
  },

  // --- US Special Forces (Navy SEALs, Rangers, Delta Force) ---
  {
    id: 'seals-1',
    quote: 'The only easy day was yesterday.',
    author: 'US Navy SEALs',
    badge: 'NAVY SEALS',
  },
  {
    id: 'seals-2',
    quote: 'Under pressure, you do not rise to the occasion. You sink to the level of your training.',
    author: 'US Navy SEALs',
    badge: 'NAVY SEALS',
  },
  {
    id: 'seals-3',
    quote: 'It pays to be a winner. Give everything you have right now.',
    author: 'BUD/S Selection Creed',
    badge: 'BUD/S',
  },
  {
    id: 'seals-4',
    quote: 'Slow is smooth, smooth is fast.',
    author: 'Special Warfare Principle',
    badge: 'NAVY SEALS',
  },
  {
    id: 'seals-5',
    quote: 'If you want to change the world, start off by conquering yourself each morning.',
    author: 'Adm. William H. McRaven (Navy SEAL)',
    badge: 'SPECIAL OPERATIONS',
  },
  {
    id: 'rangers-1',
    quote: 'Rangers lead the way! Move further, faster, and fight harder.',
    author: '75th Ranger Regiment',
    badge: 'US ARMY RANGERS',
  },
  {
    id: 'rangers-2',
    quote: 'Surrender is not a Ranger word. Never quit when the task gets demanding.',
    author: 'Ranger Creed',
    badge: 'US ARMY RANGERS',
  },
  {
    id: 'delta-1',
    quote: 'Sine Pari — Without Equal. The quiet professionals who never announce their presence.',
    author: '1st SFOD-Delta',
    badge: 'DELTA FORCE',
  },
  {
    id: 'delta-2',
    quote: 'Discipline in the dark is what creates legends in the light.',
    author: 'Delta Force Operator Creed',
    badge: 'DELTA FORCE',
  },

  // --- British Special Forces (SAS & SBS) ---
  {
    id: 'sas-1',
    quote: 'Who Dares Wins.',
    author: 'Special Air Service',
    badge: 'SAS',
  },
  {
    id: 'sas-2',
    quote: 'Always a little further. When your legs want to stop, walk with your heart.',
    author: 'Special Air Service',
    badge: 'SAS',
  },
  {
    id: 'sbs-1',
    quote: 'By Strength and Guile. Outthink, outlast, and overcome.',
    author: 'Special Boat Service',
    badge: 'SBS',
  },

  // --- David Goggins ---
  {
    id: 'goggins-1',
    quote: 'You are in danger of living a life so comfortable and soft that you will die without ever realizing your true potential.',
    author: 'David Goggins',
    badge: 'DAVID GOGGINS',
  },
  {
    id: 'goggins-2',
    quote: 'Don’t stop when you’re tired. Stop when you’re done.',
    author: 'David Goggins',
    badge: 'DAVID GOGGINS',
  },
  {
    id: 'goggins-3',
    quote: 'The most important conversation is the one you have with yourself every day.',
    author: 'David Goggins',
    badge: 'DAVID GOGGINS',
  },
  {
    id: 'goggins-4',
    quote: 'When your mind tells you you are done, you are really only at 40 percent of your actual capacity.',
    author: 'David Goggins',
    badge: 'DAVID GOGGINS',
  },
  {
    id: 'goggins-5',
    quote: 'Be uncommon amongst uncommon people. Set a standard that scares normal minds.',
    author: 'David Goggins',
    badge: 'DAVID GOGGINS',
  },
  {
    id: 'goggins-6',
    quote: 'Suffering is the true crucible of life. It reveals who you truly are.',
    author: 'David Goggins',
    badge: 'DAVID GOGGINS',
  },
  {
    id: 'goggins-7',
    quote: 'Nobody is coming to save you. No one is coming to do the pushups for you. Win this battle.',
    author: 'David Goggins',
    badge: 'DAVID GOGGINS',
  },

  // --- Stoicism (Marcus Aurelius, Seneca, Epictetus) ---
  {
    id: 'stoic-marcus-1',
    quote: 'You have power over your mind — not outside events. Realize this, and you will find unmatched strength.',
    author: 'Marcus Aurelius',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-marcus-2',
    quote: 'Waste no more time arguing about what a good man should be. Be one.',
    author: 'Marcus Aurelius',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-marcus-3',
    quote: 'The impediment to action advances action. What stands in the way becomes the way.',
    author: 'Marcus Aurelius',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-marcus-4',
    quote: 'At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work — as a human being.',
    author: 'Marcus Aurelius',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-seneca-1',
    quote: 'We suffer more often in imagination than in reality.',
    author: 'Seneca',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-seneca-2',
    quote: 'Difficulties strengthen the mind, as labor does the body.',
    author: 'Seneca',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-seneca-3',
    quote: 'It is not that we have a short time to live, but that we waste a lot of it.',
    author: 'Seneca',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-epictetus-1',
    quote: 'No man is free who is not master of himself.',
    author: 'Epictetus',
    badge: 'STOICISM',
  },
  {
    id: 'stoic-epictetus-2',
    quote: 'First say to yourself what you would be; and then do what you have to do.',
    author: 'Epictetus',
    badge: 'STOICISM',
  },

  // --- Robert Greene ---
  {
    id: 'greene-1',
    quote: 'Mastery is not a function of genius or talent. It is a function of time and intense focus.',
    author: 'Robert Greene',
    badge: 'ROBERT GREENE',
  },
  {
    id: 'greene-2',
    quote: 'The future belongs to those who learn more skills and combine them in creative ways.',
    author: 'Robert Greene',
    badge: 'ROBERT GREENE',
  },
  {
    id: 'greene-3',
    quote: 'Do not wait for a reputation to be given to you; create it by ruthless self-discipline.',
    author: 'Robert Greene',
    badge: 'ROBERT GREENE',
  },
  {
    id: 'greene-4',
    quote: 'Embrace the boredom of deep practice. That is precisely where all competitors quit.',
    author: 'Robert Greene',
    badge: 'ROBERT GREENE',
  },
  {
    id: 'greene-5',
    quote: 'The more obstacles you encounter and overcome, the more friction makes you resilient.',
    author: 'Robert Greene',
    badge: 'ROBERT GREENE',
  },
  {
    id: 'greene-6',
    quote: 'Daily practice and patient observation beat sporadic flashes of brilliance every single time.',
    author: 'Robert Greene',
    badge: 'ROBERT GREENE',
  },

  // --- Psychology of Becoming Better & Continuous Mastery ---
  {
    id: 'psych-james-1',
    quote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    author: 'James Clear',
    badge: 'PSYCHOLOGY',
  },
  {
    id: 'psych-james-2',
    quote: 'Every action you take is a vote for the type of person you wish to become.',
    author: 'James Clear',
    badge: 'PSYCHOLOGY',
  },
  {
    id: 'psych-newport-1',
    quote: 'Deep work is the superpower of the 21st century. The ability to focus without distraction is rare and valuable.',
    author: 'Cal Newport',
    badge: 'DEEP WORK',
  },
  {
    id: 'psych-flow-1',
    quote: 'The best moments in our lives are when a person’s body or mind is stretched to its limits in a voluntary effort.',
    author: 'Mihaly Csikszentmihalyi',
    badge: 'FLOW STATE',
  },
  {
    id: 'psych-grit-1',
    quote: 'Enthusiasm is common. Endurance is rare. Grit is sustained passion over time.',
    author: 'Angela Duckworth',
    badge: 'PSYCHOLOGY',
  },
  {
    id: 'psych-kaizen-1',
    quote: '1% better every day. Small, relentless improvements compound into monumental mastery.',
    author: 'Kaizen Principle',
    badge: 'MASTERY',
  },
];
