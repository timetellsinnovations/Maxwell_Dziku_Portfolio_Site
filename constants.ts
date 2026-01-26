import { Project, ExperienceItem, Service } from './types';

export const NAV_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Training Coach',
    category: 'SaaS • AI • Roleplay',
    description: 'A conversational AI platform designed to simulate real-world training scenarios. Users interact with AI personas to practice soft skills, objection handling, and leadership communication.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    link: 'https://aitrainingcoach.com/',
    cta: 'Launch Platform'
  },
  {
    id: '5',
    title: 'IOL Visual Simulator',
    category: 'Medical Sim • React • Physics',
    description: 'A physics-based visual simulator demonstrating Intraocular Lens effects for patient education. Features real-time optical adjustments and comparison modes.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    link: 'https://iol-visual-simulator.vercel.app',
    cta: 'Launch Simulator'
  },
  {
    id: '6',
    title: 'EduPrime LMS Dashboard',
    category: 'LMS Architecture • React • UX',
    description: 'A custom-built Learning Management System interface focusing on instructor analytics and student progress tracking. Demonstrates complex dashboard architecture.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    link: 'https://timetellsinnovations.github.io/eduprime-lms/',
    cta: 'View Dashboard'
  },
  {
    id: '2',
    title: 'Taxonomy of Significant Learning',
    category: 'Instructional Design • Dr. Fink',
    description: 'An interactive course module bringing Dr. Fink’s taxonomy to life. Demonstrates clean UI, intuitive navigation, and effective pedagogical structure in a digital format.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1200&auto=format&fit=crop',
    year: '2023',
    link: 'https://maxprojectshare.s3.amazonaws.com/taxonomy-of-significant-learning-by-dr-fink-raw-_A0hv-iW/content/index.html#/',
    cta: 'Start Module'
  },
  {
    id: '4',
    title: 'Time Tells Case Studies',
    category: 'Agency Portfolio • Full Stack',
    description: 'A collection of high-impact learning solutions delivered for diverse clients. Showcasing the breadth of capabilities from strategic consulting to full-stack app development.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
    year: '2022',
    link: 'https://timetellsinnovations.com/case-studies',
    cta: 'View Case Studies'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: '1',
    role: 'Associate Manager, Content Dev, US Education',
    company: 'Johnson & Johnson Vision',
    period: 'Jun 2021 - Present',
    description: 'Leading content strategy for global product launches, developing SmartSheet automation workflows, and pioneering AI integration in L&D. Supporting learning initiatives reaching 15,000+ learners annually across multiple regions.',
    skills: ['Global Strategy', 'AI Integration', 'Project Mgmt', 'L&D Leadership']
  },
  {
    id: '2',
    role: 'Learning & ID Manager',
    company: 'Time Tells Innovations LLC',
    period: 'Jun 2016 - Present',
    description: '9+ years | Owner & Lead Consultant. Delivered custom learning solutions for clients including NYU, Johns Hopkins, WiseWire, and MedHub. Services span strategic consulting, full-stack development, and LMS architecture across Canvas, Sakai, Moodle, and Adobe Captivate Prime.',
    skills: ['Business Dev', 'Full Stack Dev', 'Consulting', 'Instructional Design']
  },
  {
    id: '3',
    role: 'Freelance ID / LMS Solutions Builder',
    company: 'Wisewire Ed',
    period: 'Mar 2019 - Present',
    description: 'Built AI-powered content analysis tools and Sakai LMS integrations for higher education partners. Early adopter of prompt engineering for instructional design workflows to optimize content development.',
    skills: ['Sakai', 'AI Prompt Eng', 'LMS Architecture', 'Higher Ed']
  },
  {
    id: '4',
    role: 'Instructional Designer',
    company: 'MedHub LLC',
    period: 'Dec 2018 - May 2021',
    description: 'Built Smart Walkthroughs and digital adoption solutions using WalkMe, improving user onboarding and reducing support tickets for MedHub’s e*Value platform serving medical residency programs nationwide.',
    skills: ['WalkMe', 'Simulation Design', 'LMS Mgmt', 'Camtasia']
  },
  {
    id: '5',
    role: 'Content Ingest Developer',
    company: 'ProQuest',
    period: 'Aug 2017 - Nov 2018',
    description: 'Technical data engineering role. Created automated web crawling programs using Kapow Design Studio to ingest complex content streams, ensuring 99.9% data accuracy for research databases.',
    skills: ['Web Crawling', 'Kapow', 'XML/RSS', 'Data Engineering']
  }
];

export const SERVICES: Service[] = [
  {
    id: '3',
    title: 'Instructional Design',
    description: 'I design scenario-based learning experiences grounded in cognitive science—making complex topics accessible without sacrificing accuracy.'
  },
  {
    id: '1',
    title: 'Web App Development',
    description: 'I build custom learning applications, simulators, and performance support tools using React, Next.js, and Node.'
  },
  {
    id: '2',
    title: 'Workflow Automation',
    description: 'I automate repetitive L&D tasks (content parsing, reporting, notifications) using Python, Webhooks, and Low-Code platforms.'
  },
  {
    id: '4',
    title: 'AI Strategy & RAG',
    description: 'I help teams implement Generative AI securely, building RAG (Retrieval Augmented Generation) chatbots on internal knowledge.'
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    text: "Maxwell was a thought leader, engineering processes for efficiency... and approaching all design situations with a learner-centric mentality. He is an educational technology guru.",
    author: "Tina Gates, M.S., M.S.Ed.",
    role: "Learning & Development Executive",
    organization: "MedHub"
  },
  {
    id: '2',
    text: "Highly organized and delivered flexible e-learning on time and on budget.",
    author: "Cristian Opazo",
    role: "Director of EdTech, New York College of Dentistry",
    organization: "NYU"
  },
  {
    id: '3',
    text: "Helped us deliver a global training program online. Responsive and reliable.",
    author: "Eric Schulman",
    role: "Johns Hopkins",
    organization: "Johns Hopkins"
  },
  {
    id: '4',
    text: "Our team benefited greatly from their (TimeTells Innovations LLC) instructional design expertise.",
    author: "Peter Fitzgerald",
    role: "WiseWire",
    organization: "WiseWire"
  }
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/maxwelldzikuinstructionaldesign/',
  website: 'https://timetellsinnovations.com/case-studies',
  email: 'mailto:maxdziku@gmail.com,timetellsinnovationsllc@gmail.com',
  displayEmails: ['maxdziku@gmail.com', 'timetellsinnovationsllc@gmail.com'],
  resume: 'https://share.articulate.com/HyJ_jPirnDg87SqjeJEAE'
};