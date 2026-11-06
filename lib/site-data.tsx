export const profile = {
  name: 'Prince Owire',
  role: 'Frontend developer',
  location: 'Nigeria',
  email: '', // Add your preferred public contact email here.
  github: 'https://github.com/princeowire',
  linkedin: '', // Add your LinkedIn profile URL here when ready.
};

export const skills = [
  { id: '01', title: 'Interface engineering', items: ['JavaScript', 'React', 'Next.js', 'HTML & CSS', 'Tailwind CSS'] },
  { id: '02', title: 'Interaction & design', items: ['Responsive layouts', 'Reusable components', 'Framer Motion', 'Interactive UI', 'Design-to-code'] },
  { id: '03', title: 'Tools & integrations', items: ['Git & GitHub', 'Firebase', 'API integration', 'Authentication flows', 'Accessibility fundamentals'] },
];

export const journey = [
  { year: '2022', title: 'The beginning', text: 'Started learning frontend development through structured online resources and hands-on practice.' },
  { year: '01 / FOUNDATIONS', title: 'Learning by building', text: 'Built a foundation in HTML, CSS, JavaScript, responsive design, and reusable interface patterns.' },
  { year: '02 / REAL WORK', title: 'From ideas to interfaces', text: 'Started creating websites and interfaces for portfolio work and freelance projects.' },
  { year: '03 / PRODUCT THINKING', title: 'Beyond the screen', text: 'Explored e-commerce flows, authentication, API-driven interfaces, and interactive components.' },
  { year: 'NOW', title: 'Building forward', text: 'Focused on stronger frontend craft, better implementation decisions, and the next professional opportunity.' },
];

export const projects = [
  {
    id: '01', name: 'Euphoria', type: 'E-commerce experience', year: 'FEATURED PROJECT',
    description: 'A storefront built around product discovery and the details of a complete shopping flow—from browsing and cart interactions to checkout integration.',
    stack: ['Next.js', 'Tailwind CSS', 'Firebase', 'Paystack'],
    live: 'https://euphoria-next-eight.vercel.app/', source: 'https://github.com/princeowire/euphoria-next', visual: 'euphoria',
    details: 'Implemented product browsing, Firebase authentication, cart functionality, Paystack integration, and order-related UI. Order data is stored locally in this version rather than persisted in a server-backed order database.',
  },
  {
    id: '02', name: 'Blue Ice', type: 'Brand landing page', year: 'WEB EXPERIENCE',
    description: 'A focused landing-page build that explores visual hierarchy, brand presentation, responsive layouts, and a clear path through the content.',
    stack: ['React', 'CSS', 'Responsive UI'],
    live: 'https://blueice-bay.vercel.app/', source: '', visual: 'blueice',
    details: 'A landing page focused on a clean brand presentation and a responsive layout. Source link can be added when the repository is ready to share.',
  },
  {
    id: '03', name: 'Weather App', type: 'API-driven interface', year: 'DATA & INTERACTION',
    description: 'A compact weather interface focused on presenting changing data clearly and making everyday information easy to scan.',
    stack: ['JavaScript', 'API integration', 'CSS'],
    live: 'https://weather-x-six.vercel.app/', source: '', visual: 'weather',
    details: 'A weather application exploring data presentation and interactive frontend behavior. Add the repository URL here if you want to share the source.',
  },
];
