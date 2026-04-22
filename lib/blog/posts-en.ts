import type { BlogPost } from './types'
import { blogPostsEn2026 } from './posts-en-2026-batch'

export { blogPostsEn2026 }

const author = {
  author: 'Leon',
  authorRole: 'Personal trainer and owner of UnitLift',
} as const

export const postsEn: BlogPost[] = [
  ...blogPostsEn2026,
  {
    slug: 'how-to-grow-your-client-base',
    title: 'How to Grow Your Online Client Base',
    excerpt: 'Nine tactics online fitness coaches use to attract new clients without expensive ads.',
    category: 'Guide',
    categorySlug: 'guide',
    readTime: 6,
    publishedAt: 'March 14, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'Growing a client base is the hardest part of online coaching. You do not need expensive ads to do it.' },
      { type: 'paragraph', text: 'In this article we go through nine tactics that work. All are tested by coaches we follow on real businesses.' },

      { type: 'heading', text: '1. Define your ideal client' },
      { type: 'paragraph', text: 'Trying to work with everyone is the most common beginner mistake. A narrow niche converts better than a wide one.' },
      { type: 'paragraph', text: 'Example: women 35 to 45 who want to run their first half marathon. Clear group, clear goal.' },

      { type: 'heading', text: '2. Content that solves real problems' },
      { type: 'paragraph', text: 'Instagram and TikTok do not pay you, but they bring clients. Post content that answers real questions your ideal client asks.' },
      { type: 'paragraph', text: 'One short video a day beats ten long posts a week. Consistency matters more than volume.' },

      { type: 'heading', text: '3. Ask existing clients for referrals' },
      { type: 'paragraph', text: 'A happy client is your best marketing. Offer a small discount for every person they bring in.' },
      { type: 'paragraph', text: 'Referrals convert better than any ad. You just have to remember to ask.' },

      { type: 'heading', text: '4. Free trial period' },
      { type: 'paragraph', text: 'Offer one or two weeks of a trial. It lowers the fear of committing.' },
      { type: 'paragraph', text: 'If your service is good the client stays. If it is not, you found out early.' },

      { type: 'heading', text: '5. Fast onboarding' },
      { type: 'paragraph', text: 'The first week builds or breaks the relationship. Clients who get a plan, a short questionnaire and clear rules stay longer.' },
      { type: 'list', items: [
        'Reply to inquiries within two hours',
        'Send a welcome pack with plan and expectations',
        'Set an automatic reminder for the first check-in',
        'Ask for feedback after one month',
      ]},

      { type: 'heading', text: '6. Video testimonials' },
      { type: 'paragraph', text: 'A written testimonial is weaker than a short video. Ask for one after three months of work together.' },

      { type: 'heading', text: '7. Local network' },
      { type: 'paragraph', text: 'Connect with dietitians, physiotherapists and doctors. They refer clients to each other all the time.' },

      { type: 'heading', text: '8. Clear price on your profile' },
      { type: 'paragraph', text: 'Hidden prices reduce the number of inquiries. List the package price clearly, even as “from 99 euros”.' },

      { type: 'heading', text: '9. Consistent posting' },
      { type: 'paragraph', text: 'Three or four posts a week for six months brings real results. One-off campaigns rarely pay back.' },

      { type: 'paragraph', text: 'With these tactics most coaches we follow add three to five new clients in the first 90 days, without a single paid ad.' },
    ],
  },
  {
    slug: 'why-excel-is-not-enough',
    title: 'Why Excel Is No Longer Enough for Managing Clients',
    excerpt: 'Spreadsheets work at the start. As your clients grow, you need a real tool. Here is why.',
    category: 'Tools',
    categorySlug: 'tools',
    readTime: 4,
    publishedAt: 'March 11, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'Many coaches start with Excel. One sheet per client, calorie formulas, color coded weeks. It looks clean until the twelfth client.' },
      { type: 'paragraph', text: 'In this article we go through where Excel stops working and when it is time to switch to a real coaching app.' },

      { type: 'heading', text: 'Where Excel fails' },
      { type: 'list', items: [
        'No automatic check-in reminders',
        'Clients cannot open the plan from the phone',
        'Every change needs manual editing',
        'Messages live in WhatsApp, payments in a separate file',
        'No place for progress photos',
      ]},

      { type: 'heading', text: 'How much time you actually lose' },
      { type: 'paragraph', text: 'The average coach with 15 clients spends 8 to 12 hours a week on messages, plans and spreadsheets. That is almost a full workday every week.' },
      { type: 'paragraph', text: 'In money terms, at 30 euros an hour, that is over 1000 euros a month spent on copy-paste work.' },

      { type: 'heading', text: 'When it is time to switch' },
      { type: 'paragraph', text: 'Five or more active clients and busywork eating your time is a clear signal.' },
      { type: 'paragraph', text: 'A good app gives you reminders, mobile access for the client, messages in one place and a payment overview. Excel cannot.' },
    ],
  },
  {
    slug: 'tips-for-better-check-ins',
    title: 'Five Tips for Better Client Check-Ins',
    excerpt: 'How to set up weekly check-ins so clients stay motivated and you stay informed.',
    category: 'Clients',
    categorySlug: 'clients',
    readTime: 5,
    publishedAt: 'March 7, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'The check-in is the heart of online coaching. Without it, plans stay theory and clients quietly drop off.' },
      { type: 'paragraph', text: 'Here are five tips that make check-ins useful for clients and easy for you.' },

      { type: 'heading', text: '1. Standardize your questions' },
      { type: 'paragraph', text: 'Custom questions for every client sound good but take too much time. Build one standard set.' },
      { type: 'paragraph', text: 'Cover the basics: weight, energy, sleep, completed sessions and one open field. Six questions is enough.' },

      { type: 'heading', text: '2. Automatic reminder' },
      { type: 'paragraph', text: 'Clients forget. It is not a bad sign, they are busy. An automatic reminder raises response rate from 40 to 85 percent.' },

      { type: 'heading', text: '3. Reply within 24 hours' },
      { type: 'paragraph', text: 'A client who gets a quick reply stays longer and refers you more. Block time each week just for check-ins.' },

      { type: 'heading', text: '4. Celebrate effort, not only results' },
      { type: 'paragraph', text: 'Weight and tape are just part of the story. A client who returned after being sick made real progress.' },

      { type: 'heading', text: '5. Keep the history' },
      { type: 'paragraph', text: 'Every check-in is data. Over three to six months you see patterns: who drops off, what motivates clients.' },

      { type: 'list', items: [
        'Standard form: less time, more data',
        'Reminder: higher response rate',
        'Fast reply: happier clients',
        'Celebrate effort: longer retention',
        'Saved history: smarter program changes',
      ]},
    ],
  },
  {
    slug: 'how-to-set-your-prices',
    title: 'How to Set Your Prices as an Online Fitness Coach',
    excerpt: 'Stop undervaluing yourself. A practical guide to pricing that respects your time.',
    category: 'Growth',
    categorySlug: 'growth',
    readTime: 7,
    publishedAt: 'March 1, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'Pricing is where many coaches get stuck. Fear of rejection pushes them to set prices too low.' },
      { type: 'paragraph', text: 'In this article we go through how to calculate a real price and how to talk about it without fear.' },

      { type: 'heading', text: 'Why low pricing does not attract clients' },
      { type: 'paragraph', text: 'A low price sends the wrong signal. A client paying 50 euros engages less than one paying 200.' },
      { type: 'paragraph', text: 'A higher price attracts serious clients who want results. Less churn, less explaining.' },

      { type: 'heading', text: 'How to calculate your minimum price' },
      { type: 'list', items: [
        'Hours per week you want to spend on coaching',
        'Subtract 30 to 40 percent for paperwork and marketing',
        'Multiply the rest by your target hourly rate',
        'Divide by the number of clients you can manage',
        'That is your minimum price per client',
      ]},

      { type: 'heading', text: 'Use more than one package' },
      { type: 'paragraph', text: 'One package means everyone pays the same. Two or three packages let clients choose their level.' },
      { type: 'paragraph', text: 'Example: Basic 99 euros, Pro 199 euros, VIP 399 euros. VIP clients hold revenue, Basic attracts new ones.' },

      { type: 'heading', text: 'How to communicate your price' },
      { type: 'paragraph', text: 'Price without context sounds expensive. Tie it to a concrete service and a concrete result.' },
      { type: 'paragraph', text: 'Instead of “199 euros a month”, write “a program that helped 40 clients get stronger, 199 euros a month”.' },

      { type: 'heading', text: 'Raising prices for existing clients' },
      { type: 'paragraph', text: 'Once a year, with 30 days notice, raise prices by 10 to 20 percent. Most loyal clients accept it without issue.' },
    ],
  },
  {
    slug: 'automation-in-coaching',
    title: 'Automation in Coaching: What to Automate, What to Keep',
    excerpt: 'Which tasks take the most time in coaching and how to automate them without losing the human touch.',
    category: 'Guide',
    categorySlug: 'guide',
    readTime: 6,
    publishedAt: 'February 14, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'Automation has a bad reputation in coaching. Coaches worry they will become robots sending cold emails.' },
      { type: 'paragraph', text: 'The truth is simpler: automate the routine, keep the relationship human. Here is what falls on each side.' },

      { type: 'heading', text: 'What is safe to automate' },
      { type: 'list', items: [
        'Weekly check-in reminder',
        'Welcome message for a new client',
        'Payment reminder three days before renewal',
        'Delivering the plan when a new week starts',
        'Session booking confirmation',
      ]},

      { type: 'heading', text: 'What you should not automate' },
      { type: 'list', items: [
        'Personal congratulations for a big goal',
        'Reply to a difficult or emotional message',
        'Conversation when a client wants to quit',
        'Adjusting a plan in a special situation',
        'Video calls and live check-ins',
      ]},

      { type: 'heading', text: 'Principle: system runs, you think' },
      { type: 'paragraph', text: 'The point is not less contact with clients. The point is that you spend time on real coaching, not on sending reminders.' },

      { type: 'heading', text: 'Where to start' },
      { type: 'paragraph', text: 'Start with the check-in reminder. Once that runs, automate onboarding and payment reminders. One step at a time.' },
    ],
  },
  {
    slug: 'fitness-trainer-app',
    title: 'Fitness Trainer App: What to Look For',
    excerpt: 'Not every trainer app is built the same. Five features that must be on your checklist.',
    category: 'Tools',
    categorySlug: 'tools',
    readTime: 5,
    publishedAt: 'February 10, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'Demand for trainer apps is high. Dozens of options exist, from generic project tools to specialized platforms.' },
      { type: 'paragraph', text: 'In this article we go through five features an app must have to be worth your time.' },

      { type: 'heading', text: '1. Mobile app for the client' },
      { type: 'paragraph', text: 'The client must be able to open the plan on their phone. Without it you are taking a step back from WhatsApp.' },
      { type: 'paragraph', text: 'A good app covers both iOS and Android and the client gets it for free.' },

      { type: 'heading', text: '2. Built-in progress tracking' },
      { type: 'paragraph', text: 'Check-in data must save automatically and show up in a chart. Manual copying is not sustainable.' },

      { type: 'heading', text: '3. Training and nutrition templates' },
      { type: 'paragraph', text: 'Templates save hours. You build once and adapt for each client in a few minutes.' },

      { type: 'heading', text: '4. Messages inside the app' },
      { type: 'paragraph', text: 'WhatsApp is common but messages get lost and mix with private chats.' },
      { type: 'paragraph', text: 'In-app messages keep the history next to the plan and check-in for the same client.' },

      { type: 'heading', text: '5. Payment tracking' },
      { type: 'paragraph', text: 'Who paid, who is overdue, monthly revenue. All on one screen. Manual tracking always misses a payment.' },

      { type: 'list', items: [
        'Mobile app for clients on iOS and Android',
        'Automatic check-in and progress chart',
        'Training and nutrition templates',
        'Messages inside the app, not WhatsApp',
        'Payment and revenue overview',
        'GDPR compliance and secure storage',
      ]},
    ],
  },
  {
    slug: 'online-coaching-business-guide',
    title: 'How to Start an Online Coaching Business',
    excerpt: 'Step by step from registration to first paying clients. What to do in the first week, month, and quarter.',
    category: 'Growth',
    categorySlug: 'growth',
    readTime: 8,
    publishedAt: 'February 3, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'An online coaching business can look complex: website, social media, plans, communication, payments. The core is simple.' },
      { type: 'paragraph', text: 'Help someone reach a goal and charge for it. Everything else follows. Here is a 90-day plan.' },

      { type: 'heading', text: 'Week 1: the foundation' },
      { type: 'paragraph', text: 'Clarity comes first. Who you help, with what problem, in which way. Without this, everything else is random.' },
      { type: 'list', items: [
        'Define your ideal client',
        'Choose one transformation you offer',
        'Set up a coaching tool (about 5 minutes)',
        'Build one package with a clear price',
      ]},

      { type: 'heading', text: 'Weeks 2 to 4: first clients' },
      { type: 'paragraph', text: 'First clients do not come from ads. They come from people who already know you.' },
      { type: 'paragraph', text: 'Message 20 to 30 contacts. Offer a short trial. Aim for two or three clients to test your system.' },

      { type: 'heading', text: 'Months 2 and 3: system and growth' },
      { type: 'paragraph', text: 'With three to five paying clients, build a system that runs without you: onboarding, check-ins, reminders.' },
      { type: 'paragraph', text: 'That frees time for marketing and new clients. Without it you get stuck at ten.' },

      { type: 'heading', text: 'Most common mistakes' },
      { type: 'list', items: [
        'Too much time on design and logo, too little on sales',
        'Price set too low out of fear',
        'No system: everything is manual',
        'Not asking happy clients for reviews',
        'Quitting before month six',
      ]},

      { type: 'paragraph', text: 'UnitLift is made for this growth phase. Setup takes about 5 minutes and 14 days free is enough to see the difference.' },
    ],
  },
  {
    slug: 'online-coaching-platform-guide',
    title: 'Specialized Platforms vs Generic Tools for Coaches',
    excerpt: 'Google Docs, Notion, and WhatsApp are free. How much are they really costing you in time and trust?',
    category: 'Tools',
    categorySlug: 'tools',
    readTime: 5,
    publishedAt: 'January 28, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'Generic tools have one advantage: they are free. That is why most coaches start with them.' },
      { type: 'paragraph', text: 'Google Doc for plans, WhatsApp for messages, Revolut for payments. It works up to a point.' },

      { type: 'heading', text: 'The problem with multiple tools' },
      { type: 'paragraph', text: 'With 10 clients your data spreads across five tools. Client A messages on WhatsApp, B on Instagram, C by email.' },
      { type: 'paragraph', text: 'Check-ins in Google Forms, plans in Docs, payments in Revolut. It is hard to see who is waiting on what.' },

      { type: 'heading', text: 'What a specialized app brings' },
      { type: 'list', items: [
        'Client, plan, messages, check-in and payments in one place',
        'Automatic reminders that do not need your attention',
        'Professional feel: the client has their own app',
        'Data that accumulates and stays useful',
        'GDPR compliance without extra work',
      ]},

      { type: 'heading', text: 'The hidden cost of a split setup' },
      { type: 'paragraph', text: 'One hour a day on busywork is 365 hours a year. At 50 euros an hour that is over 18 thousand euros.' },
      { type: 'paragraph', text: 'A good app costs 20 to 50 euros a month. The math is simple.' },

      { type: 'paragraph', text: 'UnitLift is built only for online coaches. Every feature exists because a coach asked for it.' },
    ],
  },
  {
    slug: 'earn-more-as-online-fitness-trainer',
    title: 'How to Earn More as an Online Fitness Trainer',
    excerpt: 'Income does not only depend on client count. It depends on systems, pricing, and time per client.',
    category: 'Growth',
    categorySlug: 'growth',
    readTime: 6,
    publishedAt: 'January 20, 2026',
    ...author,
    content: [
      { type: 'paragraph', text: 'There are two paths to higher income: more clients or a higher price per client. Both need a working system.' },
      { type: 'paragraph', text: 'In this article we cover three strategies that raise income the fastest, without working 14 hours a day.' },

      { type: 'heading', text: 'Strategy 1: less time per client' },
      { type: 'paragraph', text: 'Count how many hours you spend per client each week. If it is more than two, you have room to optimize.' },
      { type: 'paragraph', text: 'Templates and automation can drop that to 30 to 45 minutes. Same work, double the clients.' },

      { type: 'heading', text: 'Strategy 2: more packages' },
      { type: 'paragraph', text: 'One package means everyone pays the same. Three packages (Basic, Pro, VIP) give clients a real choice.' },
      { type: 'paragraph', text: 'VIP clients pay two to four times more for faster replies and monthly calls. Same you, higher income.' },

      { type: 'heading', text: 'Strategy 3: longer retention' },
      { type: 'paragraph', text: 'A new client costs five to seven times more than keeping an existing one.' },
      { type: 'paragraph', text: 'If the average client stays six months instead of three, you double income without a single new sale.' },

      { type: 'list', items: [
        'Automate routine: more clients for the same hours',
        'Introduce packages: client picks the level',
        'Extend retention: less acquisition, more lifetime value',
        'Charge for value, not hours',
        'Invest in a tool that saves you five hours a week',
      ]},
    ],
  },
]
