export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  year: string;
  cta?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
}