import { Service, PortfolioItem, Testimonial, CaseStudy, PricingPlan, FAQItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'Bespoke, blazing-fast web experiences engineered with React, Next.js, and Tailwind CSS. We weave luxury design with modern code to generate massive business authority.',
    iconName: 'Laptop',
    features: ['High-Performance React Architectures', 'Bespoke Visual Layouts & Motion', 'Pixel-Perfect Mobile Conversions', 'Proactive Edge CDN Deployments'],
    badge: 'Premium Craft'
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description: 'Transform user interactions with intelligent AI models that understand context, access corporate knowledge-bases, and qualify prospects instantly.',
    iconName: 'MessageSquareShare',
    features: ['Semantic Search & Retrieval (RAG)', 'Context-Aware 24/7 Client Support', 'HubSpot & Salesforce CRM Sync', 'Multi-Language Auto-Translation'],
    badge: 'Smart Automations'
  },
  {
    id: 'whatsapp-auto',
    title: 'WhatsApp Automation',
    description: 'Reach customers where they feel most active. Automated drip campaigns, rich catalog layouts, and dynamic support triggers powered by Meta’s Official Cloud APIs.',
    iconName: 'MessageCircleDot',
    features: ['Meta Official Cloud API Setup', 'Interactive Call-To-Action Nodes', 'Automated Cart & Broadcast Alerts', 'Multi-Agent Support Dashboard Routing'],
    badge: 'High Conversion'
  },
  {
    id: 'ai-voice',
    title: 'AI Voice Agents',
    description: 'Deploy fluid, ultra-low latency interactive voice agents that qualify inbound sales, book direct appointments, and follow up with leads in real call environments.',
    iconName: 'PhoneCall',
    features: ['Ultra-Real Dialect & Pitch Shaping', 'Calendar/Scheduler Synchronization', 'Instant CRM Database Qualification', 'Post-Call Structural Transcripts'],
    badge: 'Advanced AI'
  },
  {
    id: 'crm-auto',
    title: 'CRM Automation',
    description: 'Unshackle your sales representatives. Automate lead routing, pipeline stages, task follow-up reminders, and beautiful hyper-personalized email workflows.',
    iconName: 'Layers',
    features: ['Bespoke Integration Architectures', 'Automated Lead Qualification Filters', 'Real-Time Slack/Teams Notifications', 'Cross-Platform Data Sanitization'],
    badge: 'Operations'
  },
  {
    id: 'lead-gen',
    title: 'Lead Generation Systems',
    description: 'High-intent lead sourcing architectures with interactive questionnaires, multi-variable calculators, and automated calendar-booking workflows.',
    iconName: 'Users',
    features: ['Bespoke Client Qualification Funnels', 'Automated SMS/Email Follow-Up Drips', 'Multi-Source Analytics Scribing', 'Instant Meeting Router Distribution'],
    badge: 'Revenue Systems'
  },
  {
    id: 'saas-dev',
    title: 'SaaS Development',
    description: 'Custom subscription software, dashboards, multi-tenant databases, and Stripe core billing dashboards engineered to launch your software prototype fast.',
    iconName: 'Cpu',
    features: ['Elegant Multi-Tenant App States', 'Stripe / LemonSqueezy Core Rails', 'Secure Auth0 or Firebase Authorization', 'Highly Scalable API Architectures'],
    badge: 'Custom Software'
  },
  {
    id: 'api-integrations',
    title: 'API Integrations',
    description: 'Erase data friction. Build reliable webhooks, custom API gateways, or serverless middleware bridges to keep all legacy database nodes synchronized.',
    iconName: 'GitMerge',
    features: ['Secure OAuth & JWT Connections', 'High-Throughput Webhook Listeners', 'Automated Data Cleanup Schedules', 'Real-Time Database Replication Filters'],
    badge: 'Infrastructure'
  },
  {
    id: 'seo-solutions',
    title: 'SEO Solutions',
    description: 'Climb the rankings with technical page-speed audits, microdata structured schemas, dynamic sitemaps, and intentional semantic keyword hierarchy.',
    iconName: 'TrendingUp',
    features: ['Core Web Vitals Perfect Audits', 'Structured Semantic JSON-LD Schema', 'Bespoke Keyword Authority Maps', 'Dynamic Rendering Analytics'],
    badge: 'Digital Growth'
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-commerce Development',
    description: 'Headless storefront builds that load instantly. Increase conversions with frictionless mobile buying flows, single-tap apple pay, and dynamic visual carts.',
    iconName: 'ShoppingBag',
    features: ['Next-Gen Headless Cart Loading', 'Optimized Stripe Checkout Workflows', 'Direct Inventory API Synchronization', 'Bespoke Product Filter Configs'],
    badge: 'Scalable Sales'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'fitvant-gym',
    title: 'FitVant Gym & Fitness Platform',
    category: 'Websites',
    customCategoryBadge: 'FITNESS WEBSITE',
    description: 'A premium high-converting gym and fitness website designed for modern fitness brands. Features responsive design, powerful CTA sections, membership conversion flows, workout showcases, nutrition highlights, and mobile-first user experience.',
    thumbnail: '/images/fitvant_gym_screenshot_1782184919363.jpg',
    industry: 'Fitness • Gym • Health & Wellness',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'Vercel'],
    liveDemoUrl: 'https://gym-website-2.vercel.app/',
    caseStudyId: 'fitvant-gym-case',
    caseStudyText: 'View Project',
    caseStudyActionType: 'scroll-to-contact',
    showLiveBadge: true,
    hideClientIntegration: true
  },
  {
    id: 'novaflow-crm',
    title: 'NovaFlow CRM State Syncer',
    category: 'Automation',
    description: 'An enterprise-grade serverless synchronization engine connecting custom warehouse databases directly to Salesforce pipelines in real-time.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    industry: 'Logistics Technology',
    technologies: ['Node.js', 'Salesforce API', 'PostgreSQL', 'Google Cloud Functions'],
    liveDemoUrl: '#',
    caseStudyId: 'insurevelo-intake'
  },
  {
    id: 'omnichat-ai',
    title: 'OmniChat Smart Legal Assistant',
    category: 'AI Projects',
    description: 'An intelligent AI chatbot trained specifically on complex litigation documentation, handling automated FAQ triage for active law firm clients.',
    thumbnail: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=800',
    industry: 'Legal Services',
    technologies: ['Gemini Pro API', 'Pinecone Embeddings', 'Next.js', 'Express'],
    liveDemoUrl: '#',
    caseStudyId: 'apex-lead-gen'
  },
  {
    id: 'aura-royal-salon',
    title: 'Aura Royal Premium Salon & Spa',
    category: 'Websites',
    customCategoryBadge: 'SALON WEBSITE',
    description: 'A luxury salon and spa website designed for premium beauty brands. Features elegant visual design, appointment booking system, WhatsApp consultation, service showcases, bridal packages, pricing sections, customer testimonials, and a fully responsive mobile-first experience that helps convert visitors into paying clients.',
    thumbnail: '/images/aura_royal_salon_screenshot_1782185886882.jpg',
    industry: 'Beauty Salon • Luxury Spa • Wellness',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'Vercel'],
    liveDemoUrl: 'https://premium-salon-spa-1000339181400.asia-southeast1.run.app/',
    caseStudyId: 'aura-royal-case',
    caseStudyText: 'View Project',
    caseStudyActionType: 'scroll-to-contact',
    showLiveBadge: true,
    hideClientIntegration: true
  },
  {
    id: 'onyx-elite-wellness',
    title: 'Onyx Elite Wellness Collective',
    category: 'Websites',
    customCategoryBadge: 'LUXURY GYM WEBSITE',
    description: 'A premium luxury gym and wellness website crafted for elite fitness clubs and high-end training facilities. Features immersive storytelling, membership conversion funnels, personal coaching showcases, wellness experiences, premium branding, lead generation systems, and a fully responsive user experience optimized for modern fitness businesses.',
    thumbnail: '/images/onyx_elite_gym_screenshot_1782186275810.jpg',
    industry: 'Luxury Fitness • Premium Gym • Wellness Club',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'Premium UI/UX'],
    liveDemoUrl: 'https://elite-gym-wellness-club-1000339181400.asia-southeast1.run.app/',
    caseStudyId: 'onyx-elite-case',
    caseStudyText: 'View Project',
    caseStudyActionType: 'open-url',
    caseStudyUrl: 'https://elite-gym-wellness-club-1000339181400.asia-southeast1.run.app/',
    showLiveBadge: true,
    hideClientIntegration: true
  },
  {
    id: 'lumina-lead-engine',
    title: 'Lumina Dynamic Funnel Optimizer',
    category: 'Automation',
    description: 'A multi-step lead qualification form combined with Meta WhatsApp triggers which qualifies over 1,200 leads daily without overhead.',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    industry: 'Corporate Marketing',
    technologies: ['WhatsApp Webhooks', 'Meta Developer Cloud', 'HubSpot API', 'React'],
    liveDemoUrl: '#'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Sterling',
    role: 'VP of Digital Operations',
    company: 'Apex Realty Group',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'Nexora reorganized our lead qualification pipeline. The AI chatbot they embedded into our HubSpot CRM has reduced customer response times from hours to under two seconds. Out of 5,000 monthly leads, our agents only handle qualified bookings. Incredible return on investment.'
  },
  {
    id: 'test-2',
    name: 'Sarah Lindqvist',
    role: 'Founder & Director',
    company: 'Lora Cosmetics',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'Our old shop loaded so slowly that customers abandoned their carts on mobile. Nexora completely rebuilt our frontend into a React-based headless storefront. Page loads are now instantaneous, and our mobile conversion rates jumped by 38% almost overnight. They are true craftsmen.'
  },
  {
    id: 'test-3',
    name: 'David Vance',
    role: 'Chief Operations Officer',
    company: 'InsureVelo',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'Our adjusters were overwhelmed. Nexora built custom database bridges and CRM automations that process claims documentation automatically. An operations bottleneck that used to take 42 minutes per case is now completed in 6 minutes. They saved our team hundreds of hours weekly.'
  },
  {
    id: 'test-4',
    name: 'Elena Rostova',
    role: 'Chief Marketing Officer',
    company: 'Vanguard Equity',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'Working with Nexora felt like hiring an elite internal product team. They understood our complex enterprise requirements, built deep custom integrations, and delivered a pixel-perfect portal that our institutional partners praise daily.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'apex-lead-gen',
    title: 'Automating High-Volume Lead Qualification for Apex Realty',
    client: 'Apex Realty Group',
    industry: 'Real Estate Enterprise',
    metrics: [
      { label: 'Booking Multiplier', value: '3.2x' },
      { label: 'Qualification Rate', value: '92%' },
      { label: 'Hourly Rep Saved', value: '140 hrs' }
    ],
    problem: 'Apex received over 5,000 portal signups per month, but sales representatives spent 88% of their day calling cold or invalid phone numbers, failing to quickly qualify genuine prospective buyers.',
    solution: 'Designed and deployed an integrated multichannel AI qualification flow. The instant a user signs up, customized WhatsApp flows query the user on timeline, budget, and purchasing status, matching details directly to HubSpot properties and routing premium qualified leads directly to agent calendars.',
    results: [
      'Increased qualified buyer meetings booked by 320% in the first 60 days.',
      'Achieved a 92% chatbot qualification completion rate for valid numbers.',
      'Reallocated 140+ hours per month of agent calling time towards closing negotiations.'
    ]
  },
  {
    id: 'cosmetics-headless',
    title: 'Re-engineering Headless E-Commerce Architecture for Lora',
    client: 'Lora Cosmetics',
    industry: 'Direct-to-Consumer Beauty',
    metrics: [
      { label: 'Core Speed Load', value: '1.2s' },
      { label: 'Mobile Conversions', value: '+38%' },
      { label: 'Server Costs', value: '$0/mo' }
    ],
    problem: 'Lora Cosmetics operated on a heavy, monolith legacy store with mobile page load speeds averaging 6.4 seconds, driving high bounce rates and causing high cart abandonment rates during peak campaign periods.',
    solution: 'Replaced the legacy system with a modern headless e-commerce frontend. Built as a blazing-fast React client powered by Vite, utilizing Shopify Storefront APIs to process checkout processes off-server and serving static components globally on high-speed Edge CDN networks.',
    results: [
      'Brought page loading speeds down from 6.4 seconds to an outstanding 1.2 second average.',
      'Boosted mobile customer conversion metrics by a proven 38% month-over-month.',
      'Saved over thousands of dollars yearly by hosting serverless structures.'
    ]
  },
  {
    id: 'insurevelo-intake',
    title: 'Enterprise Process Automation Pipeline for InsureVelo',
    client: 'InsureVelo Insurance Solutions',
    industry: 'InsureTech Operations',
    metrics: [
      { label: 'Intake Reduction', value: '85%' },
      { label: 'Data Error Margin', value: '< 0.1%' },
      { label: 'Automated Claims', value: '72%' }
    ],
    problem: 'Claims intake reviews took an average of 42 minutes per claim. Adjusters manually downloaded PDFs, cross-referenced internal spreadsheets, and entered details into a legacy database system.',
    solution: 'Created a serverless document parsing pipeline using advanced computer vision and cloud middleware. Incoming digital claim attachments are analyzed, metadata is classified, historical records are auto-checked for coverage, and claims are securely parsed into CRM pipelines.',
    results: [
      'Reduced average customer claim processing durations by 85%.',
      'Drastically reduced data entering errors to less than 0.1%.',
      'Fully automated claims sorting and verification for 72% of qualified tickets.'
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Suite',
    price: '$1,499',
    period: 'monthly billing',
    description: 'Perfect for established local businesses and startups looking to establish digital authority and connect basic customer databases.',
    features: [
      'Custom High-Performance Vite React Website',
      'Up to 5 Fully Cohesive Bespoke Page Layouts',
      'Standard CRM Synchronizations (HubSpot/ActiveCamp)',
      'WhatsApp Click-to-Chat Quick Connector Widget',
      'Speed Audit & Core Web Vitals Optimization',
      'Standard Google Semantic Schema Setup',
      '30 Days Dedicated Production Warranty Support'
    ],
    isHighlighted: false,
    ctaText: 'Book Consultation'
  },
  {
    id: 'growth',
    name: 'Growth & Automation',
    price: '$3,499',
    period: 'monthly billing',
    description: 'Our most sought-after plan. Designed to unlock client pipelines, automate sales procedures, and qualify leads round-the-clock.',
    features: [
      'Advanced Custom E-Commerce or App Portal',
      'Up to 12 Fully Responsive Page Layouts',
      'Custom Context-Aware AI Chatbot Integration',
      'Meta Official WhatsApp Catalog & Automated Flows',
      'Deep HubSpot / Salesforce Pipeline Workflows',
      'Multi-Variable Qualification Form Funnels',
      'Comprehensive Technical SEO & Competitor Audit',
      'Dedicated Slack Communication Channel (24/7 Response)'
    ],
    isHighlighted: true,
    ctaText: 'Book Consultation'
  },
  {
    id: 'premium',
    name: 'Enterprise Custom',
    price: '$6,999',
    period: 'monthly billing',
    description: 'For major enterprises requiring complex full-stack SaaS SaaS development, high-frequency database bridges, and custom AI Voice Agents.',
    features: [
      'Turn-key Multi-Tenant Custom SaaS Application',
      'Custom Outbound/Inbound AI Voice Agent Dialer',
      'High-Throughput Complex Custom API Data Bridges',
      'Proprietary AI Fine-Tuned LLM Assistants',
      'End-to-End Enterprise Process Automation',
      'Premium Multi-Layer Security & JWT Authentication',
      'Strategic Bi-Weekly Advisory & Tech Consulting Calls',
      'Dedicated Lead Engineer & Priority Production SLA'
    ],
    isHighlighted: false,
    ctaText: 'Book Consultation'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'cost',
    question: 'How much does a custom website and automation setup cost?',
    answer: 'Website plans start from ₹999/month.\n\nCustom website and AI automation solutions start from ₹1,999/month, including hosting, maintenance, support, and regular updates.'
  },
  {
    id: 'delivery',
    question: 'What is the typical development timeline for a project?',
    answer: 'Starter Website: 2–3 Days\n\nBusiness Website Pro: 3–4 Days\n\nAI Automation & Growth: 7–9 Days\n\nTimelines may vary slightly based on project scope and client requirements.'
  },
  {
    id: 'whatsapp',
    question: 'How do you handle the WhatsApp API and system accounts?',
    answer: 'We construct all integrations using the official Meta Cloud developer pipelines, keeping your numbers safe and legally sound. We guide you through simple Meta Business Manager configuration to set up direct billing (which includes fee-free conversations every month).'
  },
  {
    id: 'support',
    question: 'What happens after the website or automation is launched?',
    answer: 'Every project includes 30 to 90 days of complete warranty coverage. After launch, most clients transition to a direct monthly SLA (Service Level Agreement) so our engineers can handle server upgrades, custom functional changes, monthly optimizations, and new campaigns.'
  },
  {
    id: 'revisions',
    question: 'How many revisions or mockups are included in a project?',
    answer: 'We utilize a collaborative agile format. During design reviews, we operate with open, iterative feedback loops until you approve. Once we initiate frontend development, we include 2 comprehensive rounds of visual and flow adjustments to ensure perfection.'
  },
  {
    id: 'hosting',
    question: 'Where are our products, databases, and servers hosted?',
    answer: 'We deploy static websites to high-speed Edge Networks (Vercel, Cloudflare, Netlify) for infinite scalability and speed. Our custom NodeJS/database engines are containerized on modern serverless cloud environments (Google Cloud Run or AWS) guaranteeing 99.9% uptime.'
  }
];
