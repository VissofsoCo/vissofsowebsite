// ─────────────────────────────────────────────────────────────
// Every piece of copy on the site lives here. Edit this file to
// change text, contact details or the service list.
// Entries marked TODO are placeholders; replace them.
// ─────────────────────────────────────────────────────────────

export const company = {
  name: 'VISSOFSO',
  tagline: 'Think . Build . Evolve',
  headlineTop: 'Ideas to',
  headlineBottom: 'Intelligent Solutions',
  intro:
    'We design, develop and deploy future-ready solutions that help businesses grow faster, work smarter and stay ahead.',
  strapline: ['Technology', 'People', 'Possibilities'],
  partnerLine: 'Partnering for a smarter tomorrow',

  email: 'vissofso@gmail.com',

  // Unset until the real details are known. Anything left null is simply not
  // rendered — the phone card, the address block and the social row each
  // disappear rather than showing a placeholder. Fill a value in and it
  // appears on the site automatically; no component changes needed.
  //
  //   phone: '+91 98765 43210',
  //   phoneHref: '+919876543210',   // digits and a leading +, no spaces
  //   address: '12 Example Street, Chennai, Tamil Nadu 600001',
  //
  phone: null as string | null,
  phoneHref: null as string | null,
  address: null as string | null,
  hours: 'Monday to Friday, 9:30am – 6:30pm IST',

  // Add entries as: { label: 'LinkedIn', href: 'https://www.linkedin.com/company/…' }
  social: [] as { label: string; href: string }[],
} as const

/** The four-item strip along the bottom of the hero. */
export const highlights = [
  { icon: 'Lightbulb', title: 'IT Consulting', body: 'Strategy for a digital future' },
  { icon: 'Code', title: 'Product Development', body: 'Web, Mobile & Cloud' },
  { icon: 'Brain', title: 'AI Automation', body: 'Smarter. Faster. Scalable.' },
  { icon: 'BarChart', title: 'Business Solutions', body: 'Built for real impact' },
] as const

export type Service = {
  id: string
  index: string
  icon: 'Lightbulb' | 'Code' | 'Brain' | 'BarChart'
  title: string
  summary: string
  detail: string
  points: string[]
}

export const services: Service[] = [
  {
    id: 'consulting',
    index: '01',
    icon: 'Lightbulb',
    title: 'IT Consulting',
    summary: 'Strategy for a digital future.',
    detail:
      'We help you decide what to build and in what order — reviewing the systems you run today, where they hold you back, and what the next eighteen months should look like.',
    points: [
      'Technology strategy and roadmapping',
      'Systems and architecture review',
      'Vendor and platform selection',
      'Security and compliance assessment',
      'Cost and licensing review',
    ],
  },
  {
    id: 'product',
    index: '02',
    icon: 'Code',
    title: 'Product Development',
    summary: 'Web, mobile and cloud.',
    detail:
      'From a marketing site to a full customer platform: design, engineering and release, built on a modern stack your team can maintain after we hand it over.',
    points: [
      'Websites and web applications',
      'iOS and Android apps',
      'E-commerce and payments',
      'Cloud hosting and CI/CD pipelines',
      'Performance, SEO and accessibility',
    ],
  },
  {
    id: 'ai',
    index: '03',
    icon: 'Brain',
    title: 'AI Automation',
    summary: 'Smarter. Faster. Scalable.',
    detail:
      'We find the repetitive work inside your operations and build the integrations, pipelines and models that handle it — measured against what it actually saves.',
    points: [
      'Workflow and process automation',
      'Document and data extraction',
      'Third-party and API integrations',
      'Chat and support assistants',
      'Reporting and analytics pipelines',
    ],
  },
  {
    id: 'business',
    index: '04',
    icon: 'BarChart',
    title: 'Business Solutions',
    summary: 'Built for real impact.',
    detail:
      'Internal platforms shaped around how your business actually runs, replacing the spreadsheets and manual handoffs that quietly cost you hours every week.',
    points: [
      'Internal tools and admin dashboards',
      'CRM and ERP integration',
      'Inventory and billing systems',
      'Data migration and clean-up',
      'Training and ongoing support',
    ],
  },
]

export const pillars = [
  { word: 'Think', body: 'Every innovation begins with an idea.' },
  { word: 'Build', body: 'Transforming concepts into functional solutions.' },
  { word: 'Evolve', body: 'Creating technology that grows with your business.' },
]

export const process = [
  { step: '01', title: 'Discover', body: 'Understanding your business requirements.' },
  { step: '02', title: 'Design', body: 'Crafting intuitive digital experiences.' },
  { step: '03', title: 'Develop', body: 'Building scalable technology solutions.' },
  { step: '04', title: 'Deploy', body: 'Launching reliable digital products.' },
  { step: '05', title: 'Evolve', body: 'Continuous improvement and technical support.' },
]

/**
 * Solutions are the business outcomes the services combine to deliver.
 * Where services answer "what we do", these answer "what you get".
 */
export const solutions = [
  {
    id: 'digital-presence',
    title: 'Digital Presence',
    body: 'A website and brand presence that holds up next to much larger competitors, loads fast and is found in search.',
    services: ['Product Development', 'IT Consulting'],
    outcomes: [
      'A site your team can update without a developer',
      'Measurable search and performance improvements',
      'Content and analytics set up from day one',
    ],
  },
  {
    id: 'operations',
    title: 'Operations & Automation',
    body: 'Replacing the spreadsheets, re-keying and manual handoffs that quietly cost your team hours every week.',
    services: ['AI Automation', 'Business Solutions'],
    outcomes: [
      'Manual steps removed from recurring workflows',
      'Systems that talk to each other instead of to a person',
      'Reporting that reflects reality without chasing it',
    ],
  },
  {
    id: 'platform',
    title: 'Customer Platforms',
    body: 'Portals, apps and dashboards that give your customers a direct way to transact with you.',
    services: ['Product Development', 'Business Solutions'],
    outcomes: [
      'Self-service for the requests that fill your inbox',
      'One record of a customer across your tools',
      'A platform built to extend, not to replace in two years',
    ],
  },
  {
    id: 'modernisation',
    title: 'Modernisation',
    body: 'Moving ageing systems onto current infrastructure without stopping the business while it happens.',
    services: ['IT Consulting', 'Product Development'],
    outcomes: [
      'A migration plan with staged, reversible steps',
      'Lower hosting and licensing costs',
      'Security and compliance gaps closed',
    ],
  },
]

export const strengths = [
  { title: 'Modern Technology', body: 'Building with current, well-supported technologies.' },
  { title: 'Scalable Architecture', body: 'Solutions designed to support business growth.' },
  { title: 'Thoughtful Design', body: 'Interfaces focused on usability as much as aesthetics.' },
  { title: 'Collaborative Development', body: 'Solutions shaped around client requirements.' },
]

export type TeamMember = {
  /** Used in the URL-safe key and nothing else. */
  id: string
  name: string
  role: string
  /** Optional. Two or three sentences, shown under the role. */
  bio?: string
  /** Optional path under /public, e.g. '/images/team/asha.jpg'.
      With no photo the card falls back to the person's initials. */
  photo?: string
  /** Optional, e.g. 'https://www.linkedin.com/in/…'. */
  linkedin?: string
}

/**
 * The team, in the order they appear on the Team page.
 *
 * `bio`, `photo` and `linkedin` are all optional — a card without a photo
 * falls back to the person's initials, and one without a bio simply shows
 * the name and role. Nothing here is invented: add a line only when you
 * have the real wording for it.
 */
export const team: TeamMember[] = [
  {
    id: 'kavin',
    name: 'Kavin',
    role: 'Founder & Lead Developer',
    // bio: add a sentence or two here when you have the wording.
    // photo: '/images/team/kavin.jpg',
    // linkedin: 'https://www.linkedin.com/in/…',
  },
]

/** Shown on the Team page — true of how the company works, not about people. */
export const teamPrinciples = [
  {
    title: 'You talk to the people building it',
    body: 'No account layer between you and the engineers. The person who scoped your project is the person delivering it.',
  },
  {
    title: 'Small and senior by choice',
    body: 'Projects are staffed with people who have shipped this kind of work before, rather than padded out with headcount.',
  },
  {
    title: 'One team across the stack',
    body: 'Strategy, design, build and deployment sit together, so decisions made early survive contact with production.',
  },
]
