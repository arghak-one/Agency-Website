export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  badge?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Websites' | 'Automation' | 'AI Projects' | 'SaaS' | 'E-commerce';
  description: string;
  thumbnail: string;
  industry: string;
  technologies: string[];
  liveDemoUrl?: string;
  caseStudyId?: string;
  customCategoryBadge?: string;
  caseStudyText?: string;
  caseStudyActionType?: 'scroll-to-contact' | 'scroll-to-case-study' | 'open-url';
  caseStudyUrl?: string;
  showLiveBadge?: boolean;
  hideClientIntegration?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  photoUrl: string;
  rating: number;
  text: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  results: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isHighlighted: boolean;
  ctaText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
