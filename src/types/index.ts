export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  capabilities: string[];
  deliverables: string[];
  process: ProcessStep[];
  faqs: FAQItem[];
  sortOrder: number;
  isActive: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'Websites' | 'E-commerce' | 'Digital Marketing' | 'Branding' | 'AI & Applications' | string;
  summary: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  services: string[];
  technologies: string[];
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  project?: string;
  avatarUrl?: string;
  featured: boolean;
}

export interface InquiryFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  description: string;
  honeypot?: string;
}

export interface InquiryRecord extends InquiryFormData {
  id: string;
  status: 'NEW' | 'CONTACTED' | 'IN_REVIEW' | 'ARCHIVED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AdminStats {
  totalInquiries: number;
  newInquiries: number;
  totalProjects: number;
  totalSubscribers: number;
  totalServices: number;
  inquiriesByService: { service: string; count: number }[];
}
