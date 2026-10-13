import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@alphalinkx.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Alphalinkx2026!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Alphalinkx Executive',
        role: 'SUPERADMIN',
      },
    });
    console.log(`✅ Created default admin: ${adminEmail}`);
  }

  // 2. Services
  const services = [
    {
      slug: 'website-development',
      title: 'Website Development',
      shortDesc: 'High-performance bespoke web applications, headless architectures, and conversion-engineered interfaces built on modern React stacks.',
      fullDesc: 'We architect and build ultra-responsive, visually cinematic, and performant web solutions. From custom enterprise web applications and SaaS platforms to headless e-commerce ecosystems, every digital build is optimized for sub-second load times, flawless responsiveness, and maximum conversion velocity.',
      icon: 'Code2',
      capabilities: JSON.stringify([
        'Custom React & Next.js Architecture',
        'Headless CMS & E-commerce (Shopify, Sanity, Strapi)',
        'Three.js & WebGL 3D Interactive Experiences',
        'Performance Optimization & Core Web Vitals (95+ Lighthouse)',
        'Full-stack API Integration & Microservices',
        'Enterprise Security & Scalability'
      ]),
      deliverables: JSON.stringify([
        'Production-ready codebase with TypeScript & modern CSS',
        'Automated CI/CD pipeline and hosting configuration',
        'Responsive testing across 15+ screen viewports',
        'Accessibility compliance (WCAG 2.1 AA)',
        'Comprehensive documentation and CMS training'
      ]),
      process: JSON.stringify([
        { step: '01', title: 'Architecture Blueprint', desc: 'Technical stack evaluation, component hierarchy mapping, and data flow design.' },
        { step: '02', title: 'Interactive Prototyping', desc: 'Design system implementation, atomic components, and motion choreography.' },
        { step: '03', title: 'Full-Stack Engineering', desc: 'Frontend development, API integrations, and database schema deployment.' },
        { step: '04', title: 'QA & Optimization', desc: 'Stress testing, performance auditing, cross-browser validation, and deployment.' }
      ]),
      faqs: JSON.stringify([
        { q: 'What tech stack do you recommend for high-growth websites?', a: 'We specialize in React, Next.js, TypeScript, Tailwind CSS, Node.js, and Three.js for interactive moments. This provides unmatched speed, SEO indexability, and component reusability.' },
        { q: 'How long does a custom agency website build take?', a: 'Standard high-end corporate or SaaS marketing sites typically launch in 4–8 weeks depending on scope, 3D assets, and backend integrations.' },
        { q: 'Do you provide ongoing maintenance and performance monitoring?', a: 'Yes, we offer post-launch SLA support, security patch management, Core Web Vitals monitoring, and ongoing feature development.' }
      ]),
      sortOrder: 1,
    },
    {
      slug: 'seo',
      title: 'Search Engine Optimization (SEO)',
      shortDesc: 'Data-driven technical SEO, semantic structured architecture, content dominance, and programmatic search authority.',
      fullDesc: 'Dominate organic search with an engineering-first approach to SEO. We align server-side performance, schema markup, entity optimization, and authoritative content strategies to position your brand at the very peak of high-intent search queries.',
      icon: 'Search',
      capabilities: JSON.stringify([
        'Technical Site Audits & Core Web Vitals Remediation',
        'Semantic Entity & Schema.org JSON-LD Architecture',
        'High-Intent Keyword Intelligence & Competitor Gap Analysis',
        'Programmatic SEO & Scalable Content Strategy',
        'International SEO & Multi-Region Hreflang Setup',
        'Authority Link Acquisition & Digital PR Strategy'
      ]),
      deliverables: JSON.stringify([
        'Comprehensive 80-point technical audit report',
        'Target keyword matrix mapped to high-converting user funnels',
        'Custom Schema.org rich snippet implementations',
        'Real-time automated analytics & organic rank tracking dashboard',
        'Monthly search performance and revenue attribution reports'
      ]),
      process: JSON.stringify([
        { step: '01', title: 'Diagnostic Audit', desc: 'Deep crawl analysis, indexation barrier removal, and speed benchmarks.' },
        { step: '02', title: 'Keyword & Entity Architecture', desc: 'Building topical clusters that establish domain topical authority.' },
        { step: '03', title: 'On-Page & Technical Remediation', desc: 'Code-level fixes, structured data injection, and internal link routing.' },
        { step: '04', title: 'Authority & Scale', desc: 'Strategic outreach, continuous rank tracking, and algorithm adaptation.' }
      ]),
      faqs: JSON.stringify([
        { q: 'How quickly can we expect measurable organic ranking improvements?', a: 'Technical and on-page fixes often yield indexation and ranking gains within 30–60 days. Comprehensive topical authority gains compound consistently over 3–6 months.' },
        { q: 'How do you handle algorithmic updates and AI search engines (SGE / Perplexity)?', a: 'We optimize for entity recognition, cited authoritativeness, and structured knowledge graphs, ensuring your brand is prominently surfaced by both Google and generative AI search agents.' }
      ]),
      sortOrder: 2,
    },
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing & Growth',
      shortDesc: 'Precision paid acquisition, conversion rate optimization (CRO), multi-channel campaign architectures, and scalable ROI.',
      fullDesc: 'We build integrated growth engines designed to acquire high-value customers predictably. By unifying paid media (Google Ads, Meta, LinkedIn), conversion-focused landing experiences, and behavioral analytics, we turn clicks into lasting business equity.',
      icon: 'TrendingUp',
      capabilities: JSON.stringify([
        'High-Performance Paid Media (Google, Meta, LinkedIn, TikTok)',
        'Full-Funnel Paid Search & Retargeting Architecture',
        'Conversion Rate Optimization (CRO) & A/B Testing',
        'Attribution Modeling & Server-Side Event Tracking (CAPI)',
        'Email Lifecycle Automation & Customer Retention',
        'Executive Growth Analytics & Revenue Dashboards'
      ]),
      deliverables: JSON.stringify([
        'Dedicated multi-platform campaign structure & custom ad creatives',
        'High-converting landing page variants with A/B testing setup',
        'Server-side conversion tracking setup (Meta CAPI & GA4)',
        'Automated lead qualification and CRM sync pipelines',
        'Bi-weekly performance sprint reviews with transparent ROAS metrics'
      ]),
      process: JSON.stringify([
        { step: '01', title: 'Audience & Offer Validation', desc: 'Market profiling, competitor creative reverse-engineering, and messaging hooks.' },
        { step: '02', title: 'Tracking & Infrastructure', desc: 'Server-side tracking, pixel hygiene, and CRM data pipeline integration.' },
        { step: '03', title: 'Pilot & Creative Testing', desc: 'Deploying rapid multivariate creative tests to isolate top converting angles.' },
        { step: '04', title: 'Scale & ROAS Optimization', desc: 'Budget expansion on proven winning ad sets with real-time bid adjustments.' }
      ]),
      faqs: JSON.stringify([
        { q: 'What monthly ad spend budgets do you typically manage?', a: 'We manage campaigns ranging from $5,000/month pilot programs for high-growth startups to $250,000+/month scale campaigns for enterprise clients.' },
        { q: 'Do you create the ad creative assets and copywriting?', a: 'Yes, our multidisciplinary team handles scriptwriting, static and motion design, video editing, and copywriting in-house.' }
      ]),
      sortOrder: 3,
    },
    {
      slug: 'app-development',
      title: 'App Development',
      shortDesc: 'Native & cross-platform mobile apps, bespoke SaaS dashboards, and cloud-native digital products designed for scale.',
      fullDesc: 'From intuitive iOS and Android applications to complex web-based SaaS platforms, we design and engineer scalable software architectures that delight users and withstand massive concurrency.',
      icon: 'Smartphone',
      capabilities: JSON.stringify([
        'Cross-Platform Mobile Apps (React Native, Flutter)',
        'Native iOS (Swift) & Android (Kotlin) Development',
        'Progressive Web Apps (PWA) & Cloud Applications',
        'Custom SaaS Admin Dashboards & Data Visualization',
        'RESTful & GraphQL Backend Architecture',
        'Real-time WebSockets & Push Notification Infrastructure'
      ]),
      deliverables: JSON.stringify([
        'App Store and Google Play publication and compliance approval',
        'Tested native binary builds with continuous deployment',
        'Complete UI/UX design kit with interactive Figma tokens',
        'Scalable backend API documentation (Swagger/OpenAPI)',
        'Automated crash logging, telemetry, and performance tracking'
      ]),
      process: JSON.stringify([
        { step: '01', title: 'Product Scoping & User Journeys', desc: 'Feature backlog prioritization, user personas, and state diagrams.' },
        { step: '02', title: 'Interactive UX & Design System', desc: 'High-fidelity wireframes, touch ergonomics, and micro-interactions.' },
        { step: '03', title: 'Agile Sprint Engineering', desc: 'Two-week development cycles with staging test builds on TestFlight.' },
        { step: '04', title: 'Store Launch & Scale', desc: 'App review submission, launch monitoring, and performance telemetry.' }
      ]),
      faqs: JSON.stringify([
        { q: 'Should we build native or cross-platform (React Native)?', a: 'For 90% of business applications, React Native delivers 98% shared codebase efficiency with near-identical native performance, saving significant time and cost.' },
        { q: 'Do you assist with Apple App Store and Google Play approval?', a: 'Yes, we handle the entire submission, certificate provisioning, review compliance guidelines, and release coordination.' }
      ]),
      sortOrder: 4,
    },
    {
      slug: 'graphic-designing',
      title: 'Graphic Design & Brand Systems',
      shortDesc: 'Distinctive brand identities, futuristic design systems, editorial marketing collateral, and visual storytelling.',
      fullDesc: 'We forge memorable visual identities that stand out in crowded digital markets. Combining bold typography, precision geometry, cinematic color harmonies, and tactile design systems, we build brands people remember and trust.',
      icon: 'Palette',
      capabilities: JSON.stringify([
        'Comprehensive Brand Identity Systems & Logo Marks',
        'Visual Design Systems & Digital Brand Guidelines',
        'Marketing Collateral, Pitch Decks & Investor Presentations',
        'Custom 2D/3D Graphic Assets & Editorial Illustration',
        'Packaging Design & Physical Brand Touchpoints',
        'Social Media Creative Toolkits & Campaign Visuals'
      ]),
      deliverables: JSON.stringify([
        'Vector logo master files (SVG, EPS, PDF, PNG) in all colorways',
        'Comprehensive 50+ page Brand Identity & Usage Guidelines book',
        'Complete typographic and color token definitions for web and print',
        'Editable social media and presentation templates (Figma/Canva)',
        'Custom icon set and brand illustration assets'
      ]),
      process: JSON.stringify([
        { step: '01', title: 'Brand Discovery & Moodboards', desc: 'Unearthing company ethos, competitive landscape, and visual positioning.' },
        { step: '02', title: 'Identity Concepts', desc: 'Developing 3 distinctive conceptual routes with real-world mockups.' },
        { step: '03', title: 'Refinement & Systems', desc: 'Locking typography, color scales, iconography, and spatial rules.' },
        { step: '04', title: 'Asset Handover & Guidelines', desc: 'Exporting vector asset suites and compiling documentation.' }
      ]),
      faqs: JSON.stringify([
        { q: 'What is included in a complete branding package?', a: 'Primary logo, secondary marks, sub-marks, color palette tokens, typography rules, iconography system, branded stationery, presentation deck template, and a comprehensive brand book.' },
        { q: 'Can you work with our existing brand guidelines?', a: 'Absolutely. We can either modernize an existing brand or build new marketing collateral strictly compliant with your current guidelines.' }
      ]),
      sortOrder: 5,
    },
    {
      slug: 'ai-development',
      title: 'AI Development & Automation',
      shortDesc: 'Autonomous agentic workflows, custom LLM integrations, intelligent workflow automation, and predictive data systems.',
      fullDesc: 'Accelerate your enterprise velocity with practical, production-ready AI solutions. We develop intelligent automation systems, conversational AI agents, custom retrieval-augmented generation (RAG) pipelines, and proprietary workflow copilots that multiply human productivity.',
      icon: 'Cpu',
      capabilities: JSON.stringify([
        'Custom LLM Fine-Tuning & Prompt Engineering',
        'Retrieval-Augmented Generation (RAG) Knowledge Systems',
        'Autonomous AI Agents & Multi-Agent Workflow Orchestration',
        'Intelligent Customer Support & Conversational Copilots',
        'Document Processing, Extraction & Summarization Pipelines',
        'Predictive Analytics & Machine Learning Models'
      ]),
      deliverables: JSON.stringify([
        'Enterprise-grade secure API wrapper with rate-limiting and auth',
        'Vector database indexing setup (Pinecone, pgvector, Weaviate)',
        'Admin telemetry dashboard monitoring token usage, latency, and costs',
        'Guardrails for hallucination prevention and data privacy compliance',
        'Full source code and integration guide for internal teams'
      ]),
      process: JSON.stringify([
        { step: '01', title: 'Use-Case Feasibility Audit', desc: 'Evaluating operational bottlenecks and identifying high-impact AI opportunities.' },
        { step: '02', title: 'Data Pipeline & RAG Setup', desc: 'Structuring proprietary documents, generating embeddings, and index creation.' },
        { step: '03', title: 'Model Orchestration & Guardrails', desc: 'Connecting LLM agents, testing evaluation benchmarks, and safety filters.' },
        { step: '04', title: 'Production Deployment & Monitoring', desc: 'Deploying scalable inference endpoints with telemetry tracking.' }
      ]),
      faqs: JSON.stringify([
        { q: 'How do you ensure our proprietary business data remains secure?', a: 'We build enterprise solutions with strict zero-retention policies, on-premise vector embeddings, or private cloud VPC deployments where your data is never used to train third-party public models.' },
        { q: 'What business workflows benefit most from custom AI agents?', a: 'Customer support deflection, proposal generation, contract and invoice analysis, automated research reports, and multi-step CRM operations.' }
      ]),
      sortOrder: 6,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`✅ Seeded ${services.length} core services.`);

  // 3. Featured Portfolio Projects
  const projects = [
    {
      slug: 'omniflow-ai-platform',
      title: 'OmniFlow AI — Autonomous Enterprise Workflows',
      client: 'OmniFlow Global Systems',
      category: 'AI & Applications',
      summary: 'An autonomous multi-agent platform designed to orchestrate complex supply chain logistics and automated financial compliance across global trade networks.',
      challenge: 'Enterprise logistics teams were losing thousands of manual hours reconciling cross-border freight documents, tariff classifications, and invoice discrepancies across disparate ERP systems.',
      solution: 'We engineered an agentic AI architecture paired with a cinematic dark-mode web application that processes unstructured freight manifests in under 400 milliseconds, validating data against global regulatory registries.',
      results: JSON.stringify([
        '84% reduction in manual document review time',
        '99.4% accuracy in multi-lingual customs classification',
        '$2.4M saved in annual operational overhead within 6 months'
      ]),
      services: JSON.stringify(['AI Development', 'Website Development', 'App Development']),
      technologies: JSON.stringify(['React', 'TypeScript', 'Python', 'FastAPI', 'Three.js', 'Tailwind CSS', 'PostgreSQL']),
      liveUrl: 'https://omniflow-preview.alphalinkx.com',
      imageUrl: '/assets/projects/omniflow.jpg',
      featured: true,
      sortOrder: 1,
    },
    {
      slug: 'hyperion-fintech',
      title: 'Hyperion — Next-Gen Quantitative Trading Terminal',
      client: 'Hyperion Capital & Partners',
      category: 'Websites',
      summary: 'High-frequency institutional trading terminal and brand identity featuring ultra-low latency WebSockets, real-time depth-of-market charts, and bank-grade encryption.',
      challenge: 'Traditional fintech web interfaces were sluggish, poorly formatted for multi-monitor desktop setups, and lacked the visual prestige required to build trust with sovereign wealth funds.',
      solution: 'Alphalinkx designed an obsidian-and-electric visual design system and engineered a WebGL-accelerated chart engine capable of rendering 120,000 tick updates per second without frame drops.',
      results: JSON.stringify([
        'Sub-15ms WebSocket data rendering latency',
        '340% increase in qualified institutional account inquiries',
        'Winner of Awwwards Site of the Day for Financial Technology'
      ]),
      services: JSON.stringify(['Website Development', 'Graphic Design', 'SEO']),
      technologies: JSON.stringify(['React 18', 'WebGL', 'Three.js', 'Tailwind CSS', 'WebSockets', 'Node.js']),
      liveUrl: 'https://hyperion-preview.alphalinkx.com',
      imageUrl: '/assets/projects/hyperion.jpg',
      featured: true,
      sortOrder: 2,
    },
    {
      slug: 'aura-health-biotech',
      title: 'Aura Health — Precision Longevity & Genomic Platform',
      client: 'Aura Longevity Labs',
      category: 'Websites',
      summary: 'An interactive patient portal and digital brand experience translating complex genetic biomarker data into actionable longevity health regimens.',
      challenge: 'Clinical genetic reports were overly technical and intimidating, leading to high patient churn and low engagement with personalized preventative protocols.',
      solution: 'We developed an intuitive interactive 3D human biomarker visualization model, simplified genetic dashboard cards, and an integrated telehealth consultation booking flow.',
      results: JSON.stringify([
        '4.9/5 patient satisfaction score across 18,000 active members',
        '210% increase in protocol adherence after interactive 3D launch',
        '65% uplift in organic search traffic via targeted longevity SEO clusters'
      ]),
      services: JSON.stringify(['Website Development', 'SEO', 'Graphic Design']),
      technologies: JSON.stringify(['React', 'Three.js R3F', 'Framer Motion', 'Tailwind CSS', 'Next.js', 'PostgreSQL']),
      liveUrl: 'https://aura-preview.alphalinkx.com',
      imageUrl: '/assets/projects/aura.jpg',
      featured: true,
      sortOrder: 3,
    },
    {
      slug: 'vanguard-headless-commerce',
      title: 'Vanguard Luxury — Headless Global E-Commerce Flagship',
      client: 'Vanguard International',
      category: 'E-commerce',
      summary: 'A sub-second headless commerce experience across 34 countries with dynamic currency localization, 3D product previews, and zero checkout friction.',
      challenge: 'Legacy monolithic e-commerce software suffered from 4.8 second mobile load times, high checkout drop-offs, and rigid catalog management across international storefronts.',
      solution: 'We architected a headless Shopify Plus stack utilizing React, Edge caching, and interactive 3D product configurators, bringing page load times down to 0.7 seconds globally.',
      results: JSON.stringify([
        '41% increase in mobile checkout conversion rate',
        'Page load speed improved from 4.8s to 720ms worldwide',
        '185% increase in average time spent on 3D product visualizer pages'
      ]),
      services: JSON.stringify(['Website Development', 'Digital Marketing', 'Graphic Design']),
      technologies: JSON.stringify(['Shopify Plus', 'React', 'Three.js', 'Tailwind CSS', 'GraphQL', 'Stripe']),
      liveUrl: 'https://vanguard-preview.alphalinkx.com',
      imageUrl: '/assets/projects/vanguard.jpg',
      featured: true,
      sortOrder: 4,
    },
    {
      slug: 'nexus-cybernetics',
      title: 'Nexus Cybernetics — Autonomous Robotics Brand & Portal',
      client: 'Nexus Robotics Group',
      category: 'Branding',
      summary: 'Futuristic brand architecture, industrial design guidelines, and customer deployment portal for an autonomous warehouse logistics robotics manufacturer.',
      challenge: 'Nexus needed to transition from an R&D stealth startup to an industry-dominant robotics supplier competing with Fortune 500 automation incumbents.',
      solution: 'Created an authoritative brand identity centered on precision engineering, alongside an interactive web portal featuring real-time robot fleet telemetry visualizers.',
      results: JSON.stringify([
        'Secured $42M Series B funding following brand repositioning',
        'Featured in TechCrunch, Wired, and Bloomberg Innovation',
        'Over 14,000 corporate downloads of the Autonomous Fleet Whitepaper'
      ]),
      services: JSON.stringify(['Graphic Design', 'Website Development', 'SEO']),
      technologies: JSON.stringify(['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'WebGL']),
      liveUrl: 'https://nexus-preview.alphalinkx.com',
      imageUrl: '/assets/projects/nexus.jpg',
      featured: true,
      sortOrder: 5,
    },
    {
      slug: 'pulse-ev-mobility',
      title: 'Pulse EV — Ultra-Fast Electric Vehicle Charging Network',
      client: 'Pulse Energy Inc.',
      category: 'App Development',
      summary: 'Real-time iOS and Android charging locator, contactless station activation, and enterprise fleet billing management application.',
      challenge: 'Drivers faced constant frustration with unreliable charging apps, delayed status updates, and cumbersome payment methods at rural stations.',
      solution: 'Engineered a React Native mobile application with sub-second offline station caching, Apple Pay / Google Pay one-tap activation, and turn-by-turn route optimization.',
      results: JSON.stringify([
        'Over 250,000 active app users across North America and Europe',
        '99.98% station handshake and activation success rate',
        '4.8 App Store rating across 12,000+ verified driver reviews'
      ]),
      services: JSON.stringify(['App Development', 'Digital Marketing', 'Website Development']),
      technologies: JSON.stringify(['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Mapbox']),
      liveUrl: 'https://pulse-preview.alphalinkx.com',
      imageUrl: '/assets/projects/pulse.jpg',
      featured: true,
      sortOrder: 6,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✅ Seeded ${projects.length} portfolio projects.`);

  // 4. Testimonials
  const testimonials = [
    {
      clientName: 'Alexander Vance',
      role: 'Chief Technology Officer',
      company: 'Hyperion Capital',
      quote: 'Alphalinkx transformed our trading platform from a standard data grid into an institutional-grade digital experience. Their speed, Three.js craftsmanship, and engineering rigor are unmatched.',
      rating: 5,
      project: 'Hyperion Quantitative Terminal',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      featured: true,
    },
    {
      clientName: 'Elena Rostova',
      role: 'VP of Product',
      company: 'OmniFlow AI',
      quote: 'Working with Alphalinkx felt like having an elite SWAT team inside our company. They delivered an autonomous AI interface that reduced our client onboarding from 2 weeks to 40 minutes.',
      rating: 5,
      project: 'OmniFlow Enterprise Suite',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      featured: true,
    },
    {
      clientName: 'Marcus Sterling',
      role: 'Founder & CEO',
      company: 'Vanguard International',
      quote: 'Our mobile conversion jumped 41% within 30 days of deploying the new headless build. Alphalinkx understands both the art of visual prestige and the cold math of conversion velocity.',
      rating: 5,
      project: 'Vanguard Global E-Commerce',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      featured: true,
    },
    {
      clientName: 'Dr. Sophia Chen',
      role: 'Chief Medical Officer',
      company: 'Aura Longevity Labs',
      quote: 'The 3D interactive biomarker visualizer Alphalinkx created became the centerpiece of our Series A pitch. Their attention to nuance, accessibility, and visual elegance is world-class.',
      rating: 5,
      project: 'Aura Patient Portal',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      featured: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log(`✅ Seeded ${testimonials.length} testimonials.`);

  // 5. Initial Inquiries for demonstration in admin
  const inquiries = [
    {
      name: 'Julian Montgomery',
      email: 'julian@montgomeryventures.io',
      company: 'Montgomery Global Ventures',
      service: 'Website Development',
      budget: '$25,000 - $50,000',
      timeline: '1-2 Months',
      description: 'We are seeking an award-winning digital experience for our new deep-tech fund. Needs custom 3D WebGL hero, LP portal, and high-performance editorial layout.',
      status: 'NEW',
      notes: 'High-priority prospect. Referenced the Hyperion FinTech case study.',
    },
    {
      name: 'Kavita Patel',
      email: 'kavita@synthetix-bio.com',
      company: 'Synthetix Bio Solutions',
      service: 'AI Development',
      budget: '$50,000+',
      timeline: '2-3 Months',
      description: 'Need a custom AI copilot interface to query our proprietary genetic patent database. Must be secure, enterprise-grade, and responsive.',
      status: 'IN_REVIEW',
      notes: 'Initial technical call scheduled for Thursday at 2 PM.',
    },
  ];

  for (const inq of inquiries) {
    await prisma.inquiry.create({
      data: inq,
    });
  }
  console.log(`✅ Seeded demo inquiries.`);

  // 6. Settings
  const settings = [
    { key: 'site_name', value: 'Alphalinkx Digital Agency' },
    { key: 'tagline', value: 'Strategy. Technology. Growth.' },
    { key: 'contact_email', value: 'hello@alphalinkx.com' },
    { key: 'contact_phone', value: '+1 (800) 450-LINK' },
    { key: 'agency_address', value: 'Silicon Valley · New York · London' },
    { key: 'twitter_url', value: 'https://twitter.com/alphalinkx' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/alphalinkx' },
    { key: 'github_url', value: 'https://github.com/alphalinkx' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`✅ Seeded site settings.`);
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
