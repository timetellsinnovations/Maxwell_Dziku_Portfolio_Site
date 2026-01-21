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
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    year: '2024',
    link: 'https://aitrainingcoach.com/',
    // videoUrl: '/assets/ai-coach-preview.mp4' // Ready for video implementation
  },
  {
    id: '2',
    title: 'Taxonomy of Significant Learning',
    category: 'Instructional Design • Dr. Fink',
    description: 'An interactive course module bringing Dr. Fink’s taxonomy to life. Demonstrates clean UI, intuitive navigation, and effective pedagogical structure in a digital format.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1200&auto=format&fit=crop',
    year: '2023',
    link: 'https://maxprojectshare.s3.amazonaws.com/taxonomy-of-significant-learning-by-dr-fink-raw-_A0hv-iW/content/index.html#/'
  },
  {
    id: '3',
    title: 'Gamified ID Portfolio',
    category: 'Storyline 360 • JavaScript • Game Design',
    description: 'An interactive, game-based resume pushing the limits of Articulate Storyline. Features complex variable logic, motion graphics, and JavaScript triggers.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
    year: '2023',
    link: 'https://share.articulate.com/HyJ_jPirnDg87SqjeJEAE'
  },
  {
    id: '4',
    title: 'Time Tells Case Studies',
    category: 'Agency Portfolio • Full Stack',
    description: 'A collection of high-impact learning solutions delivered for diverse clients. Showcasing the breadth of capabilities from strategic consulting to full-stack app development.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
    year: '2022',
    link: 'https://timetellsinnovations.com/case-studies'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: '1',
    role: 'Associate Manager, Content Dev, US Education',
    company: 'Johnson & Johnson Vision',
    period: 'Jun 2021 - Present',
    description: 'Leading global learning and development initiatives with data-driven strategic planning. I manage content for product launches, develop efficient workflows using SmartSheet/SharePoint, and provide ongoing PD support for global L&D teams.',
    skills: ['Global Strategy', 'AI Integration', 'Project Mgmt', 'L&D Leadership']
  },
  {
    id: '2',
    role: 'Learning & ID Manager',
    company: 'Time Tells Innovations LLC',
    period: 'Jun 2016 - Present',
    description: 'Owner and Lead Consultant driving business development and executing specialty projects. I bridge the gap between ID and Engineering, building digital, interactive learning modules and custom software solutions.',
    skills: ['Business Dev', 'Full Stack Dev', 'Consulting', 'Instructional Design']
  },
  {
    id: '3',
    role: 'Freelance ID / LMS Solutions Builder',
    company: 'Wisewire Ed',
    period: 'Mar 2019 - Present',
    description: 'Developing AI-driven educational workflows and LMS solutions for higher education. I collaborate on AI prompt engineering challenges and integrate AI solutions into instructional design processes.',
    skills: ['Sakai', 'AI Prompt Eng', 'LMS Architecture', 'Higher Ed']
  },
  {
    id: '4',
    role: 'Instructional Designer',
    company: 'MedHub LLC',
    period: 'Dec 2018 - May 2021',
    description: 'Managed content releases and designed interactive e-Learning for MedHub platforms. I implemented training resources on the LMS and developed "Smart Walkthroughs" and onboarding solutions using WalkMe.',
    skills: ['WalkMe', 'Simulation Design', 'LMS Mgmt', 'Camtasia']
  },
  {
    id: '5',
    role: 'Content Ingest Developer',
    company: 'ProQuest',
    period: 'Aug 2017 - Nov 2018',
    description: 'Technical role focused on data engineering. Created programs for web crawling and RSS feed content capture using Kapow Design Studio. Troubleshot complex content ingest pipelines.',
    skills: ['Web Crawling', 'Kapow', 'XML/RSS', 'Data Engineering']
  }
];

export const SERVICES: Service[] = [
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
    id: '3',
    title: 'Instructional Design',
    description: 'I design complex, scenario-based learning experiences grounded in cognitive science and adult learning theory.'
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
    text: "Highly organized and delivered flexible e-learning on time and on budget.",
    author: "Cristian Opazo",
    role: "Director of EdTech, New York College of Dentistry",
    organization: "NYU"
  },
  {
    id: '2',
    text: "Helped us deliver a global training program online. Responsive and reliable.",
    author: "Eric Schulman",
    role: "Johns Hopkins",
    organization: "Johns Hopkins"
  },
  {
    id: '3',
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