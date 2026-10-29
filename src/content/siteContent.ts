/**
 * ALPHALINKX — Unified Central Content Architecture
 * All copy, navigation, services, case study placeholders, stats, testimonials, and FAQs.
 * All placeholder data is explicitly marked TODO for client replacement.
 */

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface LetterPanel {
  letter: string;
  index: string;
  service: string;
  tagline: string;
  description: string;
  icon3DType: 'ai-beacon' | 'radar-pin' | 'paid-click' | 'hyper-web' | 'audience-ring' | 'lead-funnel' | 'insight-nodes' | 'rank-crown' | 'geo-prism' | 'growth-nexus';
  badge: string;
  deliverables: string[];
}

export interface ServiceCategory {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  chips: string[];
  slug: string;
  objectType: 'search' | 'local' | 'ads' | 'dev' | 'social';
}

export interface ProjectShowcase {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  tags: string[];
  summary: string;
  results: { metric: string; label: string }[];
  imageUrl: string;
  previewVideoUrl?: string;
  challenge: string;
  solution: string;
  year: string;
  isPlaceholderTODO: boolean;
}

export interface StatItem {
  number: string;
  suffix?: string;
  label: string;
  wittyCaption: string;
  isPlaceholderTODO: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  verifiedMetric: string;
  isPlaceholderTODO: boolean;
}

export interface FaqQuestion {
  question: string;
  answer: string;
  category: string;
}

export const BRAND = {
  name: 'ALPHALINKX',
  tagline: 'Growth, Linked.',
  est: 'EST. 2024',
  metaRow: '[ EST. 2024 ] [ SEO / AEO / GEO / WEB / ADS ] [ WORLDWIDE ]',
  email: 'growth@alphalinkx.com',
  phone: '+1 (800) 555-LINK',
  whatsappUrl: 'https://wa.me/18005555465?text=Hello%20AlphaLinkx%20team%2C%20I%20would%20like%20to%20discuss%20a%20project.',
  location: 'San Francisco • New York • London • Remote Worldwide',
};

export const ROTATING_WORDS = [
  'REVENUE ENGINES',
  'HIGH-ROI FUNNELS',
  'DIGITAL EMPIRES',
  'SEARCH MOATS',
  'DOMINANT BRANDS',
  'GROWTH PLATFORMS',
] as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Process', href: '/#process' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact', badge: 'LET\'S TALK' },
];

export const TICKER_ITEMS = [
  'SEO',
  'AEO',
  'GEO',
  'WEB DEVELOPMENT',
  'GOOGLE ADS',
  'PAID SOCIAL',
  'GMB RANKING',
  'SOCIAL MEDIA',
  'AI OPTIMIZATION',
  'CONVERSION ARCHITECTURE',
];

export const CLIENT_LOGOS = [
  { name: 'Google Partner', type: 'Certification' },
  { name: 'Meta Business', type: 'Media Partner' },
  { name: 'Shopify Plus', type: 'E-commerce' },
  { name: 'Vercel Enterprise', type: 'Cloud & Edge' },
  { name: 'OpenAI Ecosystem', type: 'Generative AI' },
  { name: 'Next.js', type: 'Architecture' },
  { name: 'Supabase', type: 'Realtime Infrastructure' },
  { name: 'Stripe Verified', type: 'Payments' },
  { name: 'HubSpot', type: 'CRM Integration' },
  { name: 'Cloudflare', type: 'Global Edge Security' },
];

/**
 * 10 PANELS SPELLING OUT A-L-P-H-A-L-I-N-K-X
 * Signature Pinned Horizontal-Scroll Section
 */
export const SPELL_IT_OUT_PANELS: LetterPanel[] = [
  {
    letter: 'A',
    index: '01 / 10',
    service: 'AEO — Answer Engine Optimization',
    tagline: 'Be the definitive answer in voice & AI search.',
    description: 'We position your brand as the cited ground truth on Perplexity, ChatGPT, Siri, and Google AI Overviews.',
    icon3DType: 'ai-beacon',
    badge: 'AI Search Primacy',
    deliverables: ['Entity Mapping', 'Direct Answer Schemas', 'Citation Synthesis', 'Voice Knowledge Hooks'],
  },
  {
    letter: 'L',
    index: '02 / 10',
    service: 'Local & GMB Dominance',
    tagline: 'Claim the top 3-pack across every target zip code.',
    description: 'Geo-grid local ranking, automated review velocity, and Google Business Profile optimization that drives direct phone calls and foot traffic.',
    icon3DType: 'radar-pin',
    badge: 'Local Supremacy',
    deliverables: ['Map Pack Domination', 'Geo-Coordinate Clustering', 'Citation Defense', 'Review Funnels'],
  },
  {
    letter: 'P',
    index: '03 / 10',
    service: 'Paid Ads & Google Ads',
    tagline: 'High-intent search capture with mathematical ROAS.',
    description: 'Targeted Google Ads, Search, YouTube, and Meta paid campaigns engineered with negative keyword scrubbing and high-converting landing pages.',
    icon3DType: 'paid-click',
    badge: 'Paid Performance',
    deliverables: ['Search Arbitrage', 'High-ROAS Bidding', 'Conversion Landing Pages', 'Omnichannel Retargeting'],
  },
  {
    letter: 'H',
    index: '04 / 10',
    service: 'High-Performance Websites',
    tagline: 'Sub-second loading, 60fps WebGL, zero friction.',
    description: 'Bespoke web development built with Next.js, Three.js, and headless CMS architecture designed to turn visits into verified inbound pipeline.',
    icon3DType: 'hyper-web',
    badge: 'Core Web Vitals 100',
    deliverables: ['Custom Next.js & React', 'Interactive 3D Experiences', 'Headless CMS Integration', 'Edge CDN Optimization'],
  },
  {
    letter: 'A',
    index: '05 / 10',
    service: 'Audience & Social Media',
    tagline: 'High-retention storytelling across modern channels.',
    description: 'Strategic social media management, short-form viral hooks, and brand creative that builds an engaged, compounding follower base.',
    icon3DType: 'audience-ring',
    badge: 'Cultural Resonance',
    deliverables: ['Short-Form Video Production', 'Content Strategy & Calendars', 'Community Growth', 'Viral Hook Formats'],
  },
  {
    letter: 'L',
    index: '06 / 10',
    service: 'Leads & Conversion Funnels',
    tagline: 'Engineered pipelines that convert passive browsers into buyers.',
    description: 'Full-funnel conversion rate optimization (CRO), automated email nurture sequences, and multi-step qualification engines.',
    icon3DType: 'lead-funnel',
    badge: 'Conversion Engine',
    deliverables: ['CRO Audits & A/B Splits', 'Interactive Lead Quizzes', 'Automated CRM Sync', 'Behavioral Tracking'],
  },
  {
    letter: 'I',
    index: '07 / 10',
    service: 'Insights & Data Analytics',
    tagline: 'Transparent dashboards, real math, zero vanity metrics.',
    description: 'Server-side tracking, GA4 telemetry, blended CAC and LTV attribution so every marketing dollar is accounted for with scientific clarity.',
    icon3DType: 'insight-nodes',
    badge: 'Attribution Rigor',
    deliverables: ['Server-Side CAPI', 'Custom BI Dashboards', 'Cohort LTV Modeling', 'Lead Attribution Models'],
  },
  {
    letter: 'N',
    index: '08 / 10',
    service: 'Number One SEO Rankings',
    tagline: 'Organic dominance that outlasts every algorithmic shift.',
    description: 'Deep technical audits, semantic topical authority maps, clean programmatic architecture, and authoritative backlink earning.',
    icon3DType: 'rank-crown',
    badge: 'Organic Authority',
    deliverables: ['Topical Cluster Architecture', 'Technical Core Audits', 'Editorial Link Strategy', 'Indexation Scaling'],
  },
  {
    letter: 'K',
    index: '09 / 10',
    service: 'Keywords → GEO Optimization',
    tagline: 'Rank inside generative engine answers (Claude, ChatGPT, Gemini).',
    description: 'Generative Engine Optimization (GEO). Structuring your brand data so large language models natively retrieve and recommend your services.',
    icon3DType: 'geo-prism',
    badge: 'Next-Gen Retrieval',
    deliverables: ['LLM Retrieval Audits', 'Semantic Triples', 'Knowledge Graph Feeds', 'Synthetic Prompt Benchmarks'],
  },
  {
    letter: 'X',
    index: '10 / 10',
    service: 'eXponential Growth',
    tagline: 'When every digital link compounds, growth goes non-linear.',
    description: 'Unified growth engineering uniting technical web architecture, search dominance, paid scale, and automated conversion.',
    icon3DType: 'growth-nexus',
    badge: 'Compounding Scale',
    deliverables: ['Holistic Growth Playbooks', 'Cross-Channel Synergies', 'Enterprise Scaling Support', 'Dedicated Growth Squad'],
  },
];

/**
 * 5 COMPREHENSIVE SERVICE CATEGORIES (Buzz-style stacked blocks)
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'search-ai',
    number: '01',
    name: 'Search & AI Visibility',
    tagline: 'Dominating traditional algorithms and generative answer engines.',
    description: 'From classic Google Page 1 ranking to AI Overviews, Perplexity citations, and ChatGPT recommendations. We build unbreakable topical authority.',
    chips: ['Technical SEO', 'AEO (Answer Engine)', 'GEO (Generative Engine)', 'Topical Clustering', 'Core Web Vitals', 'Semantic Schemas'],
    slug: 'search-and-ai-visibility',
    objectType: 'search',
  },
  {
    id: 'local-growth',
    number: '02',
    name: 'Local Growth & GMB Dominance',
    tagline: 'Hyper-targeted regional supremacy for local enterprise & service brands.',
    description: 'Turn local search intent into booked appointments, phone calls, and foot traffic. We optimize Google Business Profiles and localized geo-grids.',
    chips: ['GMB 3-Pack Optimization', 'Geo-Grid Tracking', 'Review Generation Funnels', 'Local Citation Defense', 'Hyper-Local SEO', 'Multi-Location Scaling'],
    slug: 'local-growth-gmb',
    objectType: 'local',
  },
  {
    id: 'paid-media',
    number: '03',
    name: 'Paid Media & High-ROAS Ads',
    tagline: 'Targeted acquisition engines where every dollar returns multiples.',
    description: 'Scientific search arbitrage and social ad placement. Custom bid algorithms, negative keyword sculpting, and dynamic high-converting landing pages.',
    chips: ['Google Search Ads', 'Meta (Instagram & FB) Ads', 'Performance Max (PMax)', 'High-Converting Landing Pages', 'Omnichannel Retargeting', 'Server-Side Tracking'],
    slug: 'paid-media-google-ads',
    objectType: 'ads',
  },
  {
    id: 'web-development',
    number: '04',
    name: 'Website & Digital Engineering',
    tagline: 'Awwwards-caliber aesthetics backed by sub-second infrastructure.',
    description: 'We do not build generic page templates. We craft fast, 3D-accelerated, high-converting digital flagships on Next.js, React, and modern headless CMS stacks.',
    chips: ['Custom Next.js & React', 'Interactive Three.js & WebGL', 'Shopify Plus & E-Commerce', 'Headless CMS (Sanity/Payload)', 'Sub-Second Page Speeds', 'Custom API Integrations'],
    slug: 'website-development-engineering',
    objectType: 'dev',
  },
  {
    id: 'social-content',
    number: '05',
    name: 'Social Media & Content Systems',
    tagline: 'High-velocity creative formats that build cult-tier brand affinity.',
    description: 'Stop posting filler. We create thumb-stopping short-form videos, strategic thought leadership, and organic content calendars that convert followers into advocates.',
    chips: ['Short-Form Video (Reels/TikTok)', 'Content Calendars & Strategy', 'Executive Thought Leadership', 'Community Management', 'Brand Visual Identity', 'Viral Hook Frameworks'],
    slug: 'social-media-content-systems',
    objectType: 'social',
  },
];

/**
 * SELECTED WORK / CASE STUDY PORTFOLIO
 * Placeholder projects clearly marked TODO for user replacement
 */
export const SELECTED_WORK: ProjectShowcase[] = [
  {
    id: 'nexus-logistics',
    slug: 'nexus-freight-platform',
    title: 'Nexus Freight Systems',
    client: 'Nexus Supply Chain Inc.',
    category: 'Web Development & SEO',
    tags: ['Next.js', 'Technical SEO', 'Interactive 3D', 'GEO'],
    summary: 'A sub-second enterprise freight intelligence platform with interactive 3D cargo routing and 420% organic traffic growth in 90 days.',
    results: [
      { metric: '+420%', label: 'Organic Search Growth' },
      { metric: '0.42s', label: 'LCP Page Speed' },
      { metric: '3.8x', label: 'Qualified Enterprise Pipeline' },
    ],
    imageUrl: '/assets/projects/nexus-preview.jpg',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-digital-animation-43288-large.mp4',
    challenge: 'Legacy WordPress infrastructure was failing Google Core Web Vitals and losing high-value commercial carrier queries.',
    solution: 'Engineered a bespoke Next.js architecture with server-side generation, structured knowledge schemas, and an interactive 3D portal.',
    year: '2024',
    isPlaceholderTODO: true,
  },
  {
    id: 'lumina-luxury',
    slug: 'lumina-haute-horlogerie',
    title: 'Lumina Timepieces',
    client: 'Lumina Horology Group',
    category: 'E-commerce & Ads',
    tags: ['Shopify Plus', 'Google Ads', 'WebGL Viewer', 'Meta Ads'],
    summary: 'An ultra-luxury bespoke e-commerce store featuring real-time 3D watch customization and 5.4x blended return on ad spend.',
    results: [
      { metric: '5.4x', label: 'Blended Paid ROAS' },
      { metric: '+188%', label: 'Direct Conversion Rate' },
      { metric: '$2.8M', label: 'Q1 Attributed Revenue' },
    ],
    imageUrl: '/assets/projects/lumina-preview.jpg',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-working-on-a-clock-mechanism-43407-large.mp4',
    challenge: 'High customer acquisition costs and low online conversion for luxury items valued above $4,500.',
    solution: 'Designed an immersive WebGL product viewer with high-intent search ad campaigns targeting verified luxury watch collectors.',
    year: '2024',
    isPlaceholderTODO: true,
  },
  {
    id: 'apex-dental-network',
    slug: 'apex-multi-clinic-gmb',
    title: 'Apex Dental Partners',
    client: 'Apex Health Holdings',
    category: 'Local GMB & AEO',
    tags: ['GMB 3-Pack', 'AEO Engine', 'Local SEO', 'Review Funnels'],
    summary: 'Dominated the Google 3-Pack across 18 regional metropolitan clinics, generating over 1,200 new high-value patient bookings each month.',
    results: [
      { metric: '#1 Rank', label: 'Across 18 Regional Zip Codes' },
      { metric: '+310%', label: 'Direct Phone Inquiries' },
      { metric: '1,200+', label: 'Monthly Booked Consults' },
    ],
    imageUrl: '/assets/projects/apex-preview.jpg',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-office-technology-42790-large.mp4',
    challenge: 'Severe patient churn to hospital networks and invisibility outside of a 2-mile radius.',
    solution: 'Implemented multi-cluster GMB optimization, automated SMS review velocity engines, and geo-targeted conversational AEO answers.',
    year: '2024',
    isPlaceholderTODO: true,
  },
  {
    id: 'volt-fintech',
    slug: 'volt-cross-border-pay',
    title: 'Volt Financial Network',
    client: 'Volt Payments Global',
    category: 'Branding & Development',
    tags: ['React Three Fiber', 'High-ROAS Ads', 'Interactive Charts', 'GEO'],
    summary: 'Redefining global treasury transfers with motion-driven narrative design, generating 14,000 waitlist conversions before private beta.',
    results: [
      { metric: '14,000+', label: 'Verified Pre-Launch Leads' },
      { metric: '$0.84', label: 'Cost Per Qualified Lead' },
      { metric: 'Top 3', label: 'AEO Citations for Global FX' },
    ],
    imageUrl: '/assets/projects/volt-preview.jpg',
    previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-financial-graphs-moving-on-a-digital-screen-42994-large.mp4',
    challenge: 'Complex financial APIs needed to feel intuitive, trustworthy, and cutting-edge to CFOs and enterprise finance teams.',
    solution: 'Built a sleek dark-mode WebGL experience with interactive currency corridors and aggressive paid search captures.',
    year: '2024',
    isPlaceholderTODO: true,
  },
];

/**
 * 4 STAGES OF THE 3D NETWORK PROCESS
 */
export const NETWORK_STEPS = [
  {
    number: '01',
    title: 'Discover & Map',
    subtitle: 'Auditing every signal, node, and keyword gap.',
    description: 'We run deep technical telemetry across your existing domain, algorithmic visibility, search competitor moats, and conversion drop-offs.',
    deliverable: '360° Technical & GEO Moat Blueprint',
  },
  {
    number: '02',
    title: 'Strategize & Engineer',
    subtitle: 'Constructing the mathematical growth system.',
    description: 'We map content clusters, design high-converting wireframes, engineer bespoke Next.js architecture, and program custom bidding strategies.',
    deliverable: 'Information Architecture & Paid Playbook',
  },
  {
    number: '03',
    title: 'Build & Launch',
    subtitle: 'Precision execution at 60 frames per second.',
    description: 'Deploying sub-second digital flagships, indexing high-authority topical clusters, configuring server-side tracking, and launching multi-channel campaigns.',
    deliverable: 'Production Deployment & Campaign Ignition',
  },
  {
    number: '04',
    title: 'Scale & Compound',
    subtitle: 'Relentless optimization that widens your moat.',
    description: 'Daily conversion optimization, generative AI answer reinforcement, review acceleration, and scaling budget into highest-performing corridors.',
    deliverable: 'Real-Time Telemetry & Blended Profit Scaling',
  },
];

/**
 * STATS (Buzz-style witty one-liners + count-up numbers)
 * Placeholder numbers marked TODO for user replacement
 */
export const STATS: StatItem[] = [
  {
    number: '312',
    suffix: '%',
    label: 'Average Pipeline Growth',
    wittyCaption: 'Real math, not vibes. Verified in Google Analytics & CRM pipelines.',
    isPlaceholderTODO: true,
  },
  {
    number: '0.4',
    suffix: 's',
    label: 'Average Core Web Vitals LCP',
    wittyCaption: 'Faster than your customer can reconsider clicking back.',
    isPlaceholderTODO: true,
  },
  {
    number: '4.8',
    suffix: 'x',
    label: 'Blended Paid Search ROAS',
    wittyCaption: 'Because vanity clicks do not pay payroll or scale balance sheets.',
    isPlaceholderTODO: true,
  },
  {
    number: '98.9',
    suffix: '%',
    label: 'Client Retainer Retention',
    wittyCaption: 'When growth compounds every quarter, nobody looks for the door.',
    isPlaceholderTODO: true,
  },
];

/**
 * TESTIMONIALS (3D tilt cards, clearly marked TODO placeholders)
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'AlphaLinkx overhauled our entire digital presence from the code up. Our organic pipeline quadrupled within four months, and we are now cited #1 on Perplexity for our core commercial terms.',
    author: 'Marcus Vance',
    role: 'Chief Revenue Officer',
    company: 'Vanguard Industrial Logistics',
    verifiedMetric: '+410% Enterprise Pipeline',
    isPlaceholderTODO: true,
  },
  {
    id: 't-2',
    quote: 'Most agencies send slide decks filled with excuses. AlphaLinkx built us a blazing-fast site and engineered our Google Ads to a 5.2x ROAS in the first 60 days. Unmatched technical caliber.',
    author: 'Elena Rostova',
    role: 'Founder & Managing Director',
    company: 'Aethel Luxury Atelier',
    verifiedMetric: '5.2x Verified Return on Ad Spend',
    isPlaceholderTODO: true,
  },
  {
    id: 't-3',
    quote: 'Our multi-clinic group went from invisible on Google Maps to dominating the 3-pack across 18 regional zip codes. Direct phone inquiries doubled almost immediately.',
    author: 'Dr. Julian Thorne',
    role: 'Managing Partner',
    company: 'Apex Healthcare Network',
    verifiedMetric: '#1 GMB 3-Pack Across 18 Clinics',
    isPlaceholderTODO: true,
  },
];

/**
 * FREQUENTLY ASKED QUESTIONS (FAQ Accordion)
 */
export const FAQS: FaqQuestion[] = [
  {
    category: 'AI & Search',
    question: 'What is AEO & GEO, and why does my business need them right now?',
    answer: 'Traditional SEO ranks you on 10 blue links. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) structure your brand data so large language models (Perplexity, ChatGPT, Siri, Google AI Overviews) cite your business as the single verified answer. If AI agents do not know you exist, you lose half the future search market before the user ever clicks a link.',
  },
  {
    category: 'Local Search',
    question: 'Do you work with local service businesses across the US & worldwide?',
    answer: 'Yes. We specialize in high-intent regional growth. We optimize Google Business Profiles (GMB), local geo-coordinates, review generation systems, and local citation networks so you dominate the Google Maps 3-Pack in your target cities and surrounding radius.',
  },
  {
    category: 'Timeline',
    question: 'How fast can we realistically expect to see measurable results?',
    answer: 'Paid search and high-performance landing pages produce inquiries within the first 48 hours of campaign ignition. High-impact technical web builds launch in 4 to 8 weeks. Organic SEO and AEO authority compound visibly by months 2 through 4, delivering long-term, non-linear ROI.',
  },
  {
    category: 'Investment',
    question: 'What does a project engagement with AlphaLinkx cost?',
    answer: 'Our growth partnerships typically begin with focused project sprints starting at $3k–$7k, scaling to comprehensive full-stack retainers ($7k+) for organizations seeking holistic web architecture, paid acquisition, and organic engine dominance. Every proposal is scope-locked with transparent deliverables.',
  },
  {
    category: 'Kickoff',
    question: 'How do we get started and kick off our project?',
    answer: 'Complete the multi-step brief below or message us directly on WhatsApp. We review your current metrics, run a preliminary technical audit, and schedule a 30-minute growth blueprint session within 24 hours.',
  },
];

/**
 * MULTI-STEP INQUIRY FORM OPTIONS
 */
export const FORM_OPTIONS = {
  interests: [
    'SEO Dominance',
    'AEO / GEO (AI Search)',
    'Website Development',
    'Google Ads & Paid Media',
    'GMB / Local Ranking',
    'Social Media Systems',
    'Full-Stack Growth Retainer',
    'Other / Custom Scope',
  ],
  budgets: [
    '$1k – $3k (Starter Sprint)',
    '$3k – $7k (Core Growth)',
    '$7k – $15k (Scale Retainer)',
    '$15k+ (Enterprise Dominance)',
  ],
  referralSources: [
    'Google Search',
    'LinkedIn',
    'Instagram / Social',
    'ChatGPT / Perplexity',
    'Client Referral',
    'Other',
  ],
};


/**
 * 6 DIAGNOSIS CHALLENGE CARDS
 * Shared configuration with stable IDs for growth chain diagnosis.
 * Purely informational cards reflecting client growth bottlenecks.
 */
export interface DiagnosisCardItem {
  id: 'visibility' | 'website-conversion' | 'social-marketing' | 'ai-automation' | 'paid-ads' | 'performance-marketing';
  category: string;
  title: string;
  description: string;
}

export const DIAGNOSIS_CARDS: DiagnosisCardItem[] = [
  {
    id: 'visibility',
    category: 'VISIBILITY',
    title: 'Customers can’t find my business online',
    description: 'Help the right people discover your business through search and local maps.',
  },
  {
    id: 'website-conversion',
    category: 'WEBSITE',
    title: 'My website isn’t turning visitors into enquiries',
    description: 'Give visitors a faster, clearer experience that makes taking action easier.',
  },
  {
    id: 'social-marketing',
    category: 'SOCIAL MARKETING',
    title: 'My social media isn’t bringing business',
    description: 'Build a consistent presence that attracts the right audience and starts conversations.',
  },
  {
    id: 'paid-ads',
    category: 'META & GOOGLE ADS',
    title: 'My ads aren’t reaching the right customers',
    description: 'Improve targeting, messaging and creative across Facebook, Instagram and Google.',
  },
  {
    id: 'performance-marketing',
    category: 'PERFORMANCE MARKETING',
    title: 'I’m spending on marketing without knowing what works',
    description: 'Connect campaigns, conversion tracking and customer acquisition to understand what drives results.',
  },
  {
    id: 'ai-automation',
    category: 'AI AUTOMATION',
    title: 'Repetitive tasks and slow replies hold us back',
    description: 'Streamline routine work and customer follow-ups so your team can focus on growth.',
  },
];

/**
 * FOUR-LINK CHAIN JOURNEY
 * Explains how the customer journey connects:
 * BE FOUND → BE CLICKED → BE TRUSTED → BE CHOSEN
 * Four stages of the journey, not four individual services.
 */
export interface ChainLinkItem {
  id: 'be-found' | 'be-clicked' | 'be-trusted' | 'be-chosen';
  stageNumber: string;
  number: string;
  title: string;
  painBold: string;
  painText: string;
  description: string;
  tags: string[];
  learnText: string;
  learnHref: string;
  ghostWord: string;
  ghostCaption: string;
}

export const CHAIN_LINKS: ChainLinkItem[] = [
  {
    id: 'be-found',
    stageNumber: 'Link 01',
    number: '01',
    title: 'Be Found',
    painBold: 'If Google and AI search can’t find you, customers choose your competitors.',
    painText: ' We put you where buyers are already looking — and keep you there.',
    description: 'If Google and AI search can’t find you, customers choose your competitors. We put you where buyers are already looking — and keep you there.',
    tags: ['SEO', 'AI Search (GEO)', 'Google Business Profile'],
    learnText: 'Get found first',
    learnHref: '#free-audit',
    ghostWord: 'Found',
    ghostCaption: 'Search · AI · Maps',
  },
  {
    id: 'be-clicked',
    stageNumber: 'Link 02',
    number: '02',
    title: 'Be Clicked',
    painBold: 'A slow, confusing website makes visitors leave in seconds.',
    painText: ' We build fast, clear pages designed around one job: turning a visit into a call.',
    description: 'A slow, confusing website makes visitors leave in seconds. We build fast, clear pages designed around one job: turning a visit into a call.',
    tags: ['Website Design', 'Speed', 'Layout & UX'],
    learnText: 'Turn visits into calls',
    learnHref: '#free-audit',
    ghostWord: 'Clicked',
    ghostCaption: 'Design · Speed · UX',
  },
  {
    id: 'be-trusted',
    stageNumber: 'Link 03',
    number: '03',
    title: 'Be Trusted',
    painBold: 'People buy from brands they know, see, and hear good things about.',
    painText: ' Reviews and consistent content make you the safe, obvious choice.',
    description: 'People buy from brands they know, see, and hear good things about. Reviews and consistent content make you the safe, obvious choice.',
    tags: ['Reviews', 'Social Media', 'Content'],
    learnText: 'Build the trust',
    learnHref: '#free-audit',
    ghostWord: 'Trusted',
    ghostCaption: 'Reviews · Social · Content',
  },
  {
    id: 'be-chosen',
    stageNumber: 'Link 04',
    number: '04',
    title: 'Be Chosen',
    painBold: 'Attention without follow-up is money leaking out of your chain.',
    painText: ' Targeted ads and automatic follow-up turn interest into booked customers.',
    description: 'Attention without follow-up is money leaking out of your chain. Targeted ads and automatic follow-up turn interest into booked customers.',
    tags: ['Google & Meta Ads', 'Offers', 'Lead Follow-Up'],
    learnText: 'Close the sale',
    learnHref: '#free-audit',
    ghostWord: 'Chosen',
    ghostCaption: 'Ads · Offers · Follow-Up',
  },
];
