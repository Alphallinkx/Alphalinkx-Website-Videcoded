/**
 * ALPHALINKX — Central Site Content
 * Active content schemas and data for brand metadata, services, metrics, diagnosis cards, and the 4-link chain.
 */

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

/**
 * 5 COMPREHENSIVE SERVICE CATEGORIES (Mega Menu & Services Listing)
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
 * 07 VERIFIED METRICS STATS
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
 * TESTIMONIALS DATA
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
