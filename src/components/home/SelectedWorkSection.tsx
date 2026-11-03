import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProjectModal } from '../common/ProjectModal';
import { ProjectItem } from '../../types';

/* =========================================================================
   SELECTED WORK PORTFOLIO DATA
   Exact 1:1 match with reference mockup + category filter support
   ========================================================================= */
export interface ShowcaseProject {
  id: string;
  slug: string;
  badge: string;
  category: string;
  filterCategory: string;
  title: string;
  client: string;
  image: string;
  summary: string;
  challenge?: string;
  solution?: string;
  results: { metric: string; label: string }[];
  tags: string[];
  liveUrl?: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  // 01 — Discover wilder places (Website Design & Development)
  {
    id: 'explore-outdoor-travel',
    slug: 'explore-outdoor-travel',
    badge: 'CONCEPT STUDY',
    category: 'WEBSITE DESIGN & DEVELOPMENT',
    filterCategory: 'Websites',
    title: 'A better way to explore',
    client: 'Wanderlust Alpine Escapes',
    image: '/assets/projects/selected-explore-art-2x.jpg',
    summary:
      'Bespoke high-performance outdoor travel platform engineered with sub-second page transitions, dynamic mountain itineraries, and responsive mobile reservation funnels.',
    challenge:
      'High bounce rate on mobile travel bookings and slow map rendering across heavy image-rich itineraries.',
    solution:
      'Engineered a headless Next.js architecture with instant edge caching, interactive SVG trail maps, and sub-second checkout.',
    results: [
      { metric: '+320%', label: 'Booking Inquiries' },
      { metric: '0.45s', label: 'LCP Page Speed' },
      { metric: '4.2x', label: 'Mobile Conversion' },
    ],
    tags: ['Next.js', 'React', 'Sub-second LCP', 'Interactive Itineraries'],
    liveUrl: 'https://example.com/explore',
  },

  // 02 — Skincare for real life (Social Marketing · Paid Ads)
  {
    id: 'radiance-skincare',
    slug: 'radiance-skincare-d2c',
    badge: 'CONCEPT STUDY',
    category: 'SOCIAL MARKETING · PAID ADS',
    filterCategory: 'Social Marketing',
    title: 'Designed to start conversations',
    client: 'Aura Botanical Skincare',
    image: '/assets/projects/selected-skincare-art-2x.jpg',
    summary:
      'Editorial content architecture and high-ROAS social acquisition campaigns driving authentic community engagement and record direct-to-consumer conversion.',
    challenge:
      'Skyrocketing customer acquisition costs and saturated cosmetic messaging on Instagram and TikTok.',
    solution:
      'Built an authentic editorial narrative engine with lifestyle creator funnels, conversational TikTok hooks, and real-time Meta Conversions API attribution.',
    results: [
      { metric: '5.8x', label: 'Blended Paid ROAS' },
      { metric: '+210%', label: 'Social Engagement' },
      { metric: '$1.4M', label: 'Attributed Q2 Revenue' },
    ],
    tags: ['Editorial Direction', 'Meta Ads', 'TikTok Creative', 'High ROAS'],
    liveUrl: 'https://example.com/skincare',
  },

  // 03 — Automation Workflow (AI Automation)
  {
    id: 'automation-momentum',
    slug: 'automation-workflow-orchestration',
    badge: 'CONCEPT STUDY',
    category: 'AI AUTOMATION',
    filterCategory: 'AI Automation',
    title: 'Less busywork. More momentum.',
    client: 'Apex Enterprise Intelligence',
    image: '/assets/projects/selected-automation-art-2x.jpg',
    summary:
      'Enterprise autonomous workflow orchestration connecting lead enrichment, automated qualification, and CRM synchronization with zero human lag.',
    challenge:
      'Over 22 hours per week lost to manual lead data entry, delayed inbound response times, and fragmented CRM silos.',
    solution:
      'Designed end-to-end autonomous agentic triggers that enrich incoming inquiries in <3 seconds, route priority leads, and auto-book calendar demos.',
    results: [
      { metric: '84%', label: 'Manual Tasks Cut' },
      { metric: '10x', label: 'Pipeline Velocity' },
      { metric: '< 3s', label: 'Lead Response Time' },
    ],
    tags: ['Autonomous AI', 'CRM Sync', 'Lead Enrichment', 'Workflow Ops'],
    liveUrl: 'https://example.com/automation',
  },

  // 04 — SEO & Visibility
  {
    id: 'nexus-freight-seo',
    slug: 'nexus-freight-platform',
    badge: 'CASE STUDY',
    category: 'SEO & VISIBILITY',
    filterCategory: 'SEO & Visibility',
    title: 'Search authority engineered to scale',
    client: 'Nexus Supply Chain Inc.',
    image: '/assets/projects/nexus.jpg',
    summary:
      'Dominating competitive enterprise keywords with structured semantic data, sub-second latency, and organic generative engine optimization.',
    challenge:
      'Legacy website failing Google Core Web Vitals and completely invisible on high-value commercial carrier queries.',
    solution:
      'Rebuilt with structured schema nodes, high-density entity authority clusters, and sub-300ms time-to-first-byte.',
    results: [
      { metric: '+420%', label: 'Organic Search Growth' },
      { metric: '#1 Rank', label: 'Across Key National Terms' },
      { metric: '3.8x', label: 'Commercial Quote Volume' },
    ],
    tags: ['Technical SEO', 'Structured GEO', 'Core Web Vitals', 'Search Dominance'],
    liveUrl: 'https://example.com/nexus',
  },

  // 05 — Meta & Google Ads
  {
    id: 'lumina-luxury-ads',
    slug: 'lumina-haute-horlogerie',
    badge: 'CASE STUDY',
    category: 'META & GOOGLE ADS',
    filterCategory: 'Meta & Google Ads',
    title: 'High-intent paid performance',
    client: 'Lumina Horology Group',
    image: '/assets/projects/hyperion.jpg',
    summary:
      'Precision targeted multi-channel ad funnels capturing high-ticket buyers across search and social with real-time attribution.',
    challenge:
      'High CAC and low online conversion rate for luxury timepieces priced above $4,500.',
    solution:
      'Engineered high-intent search campaigns coupled with interactive 3D product view ads and server-side tracking.',
    results: [
      { metric: '5.4x', label: 'Blended Paid ROAS' },
      { metric: '+188%', label: 'Direct Conversion Rate' },
      { metric: '$2.8M', label: 'Attributed Q1 Revenue' },
    ],
    tags: ['Google Ads', 'Meta Conversions API', 'Blended ROAS', 'Server Telemetry'],
    liveUrl: 'https://example.com/lumina',
  },

  // 06 — Performance Marketing
  {
    id: 'volt-fintech',
    slug: 'volt-cross-border-pay',
    badge: 'CASE STUDY',
    category: 'PERFORMANCE MARKETING',
    filterCategory: 'Performance Marketing',
    title: 'Compounding multi-channel growth',
    client: 'Volt Financial Network',
    image: '/assets/projects/pulse.jpg',
    summary:
      'Algorithmic conversion rate optimization and blended acquisition telemetry multiplying net margins and customer lifetime value.',
    challenge:
      'Stagnating signup conversion and steep drop-offs during KYC verification.',
    solution:
      'Deployed aggressive multivariate CRO testing, simplified onboarding friction, and scaled high-converting referral loops.',
    results: [
      { metric: '3.4x', label: 'Conversion Lift' },
      { metric: '-42%', label: 'CPA Reduction' },
      { metric: '14K+', label: 'Verified Pre-Launch Leads' },
    ],
    tags: ['CRO Testing', 'Funnel Optimization', 'CAC Reduction', 'Compound Scaling'],
    liveUrl: 'https://example.com/volt',
  },

  // 07 — Websites (Quantitative Platform)
  {
    id: 'vanguard-quant',
    slug: 'vanguard-quant-platform',
    badge: 'CASE STUDY',
    category: 'WEBSITE DESIGN & DEVELOPMENT',
    filterCategory: 'Websites',
    title: 'Real-time financial telemetry portal',
    client: 'Vanguard Alpha Capital',
    image: '/assets/projects/vanguard.jpg',
    summary:
      'Institutional quantitative research portal with sub-millisecond data feeds and bespoke interactive data visualizations.',
    challenge:
      'Complex legacy trading portal unable to handle high-frequency data streams without browser lag.',
    solution:
      'Developed high-throughput WebGL charting with custom Web Workers and zero-latency WebSocket feeds.',
    results: [
      { metric: '+540%', label: 'Institutional Signups' },
      { metric: '0.38s', label: 'LCP Benchmark' },
      { metric: '99.99%', label: 'Feed Uptime' },
    ],
    tags: ['WebGL Charts', 'React Three Fiber', 'High Frequency Telemetry'],
    liveUrl: 'https://example.com/vanguard',
  },

  // 08 — AI Automation (Omniflow)
  {
    id: 'omniflow-ai',
    slug: 'omniflow-enterprise-ai',
    badge: 'CASE STUDY',
    category: 'AI AUTOMATION',
    filterCategory: 'AI Automation',
    title: 'Full-stack intelligence engines',
    client: 'Omniflow Dynamics',
    image: '/assets/projects/omniflow.jpg',
    summary:
      'Building full-stack AI agents and real-time dashboard telemetry integrated directly into customer support pipelines.',
    challenge:
      'Support backlog overwhelming customer success teams as enterprise accounts scaled 5x.',
    solution:
      'Integrated deterministic semantic vector retrieval with autonomous multi-agent ticket resolution.',
    results: [
      { metric: '92%', label: 'First-touch Resolution' },
      { metric: '< 200ms', label: 'Inference Latency' },
      { metric: '4.9/5', label: 'CSAT Satisfaction' },
    ],
    tags: ['LLM Agents', 'Vector Search', 'Enterprise Telemetry', 'FastAPI'],
    liveUrl: 'https://example.com/omniflow',
  },

  // 09 — Social Marketing (Aura Global)
  {
    id: 'aura-creative',
    slug: 'aura-creative-studio',
    badge: 'CASE STUDY',
    category: 'SOCIAL MARKETING · PAID ADS',
    filterCategory: 'Social Marketing',
    title: 'Organic viral reach engineered',
    client: 'Aura Media Global',
    image: '/assets/projects/aura.jpg',
    summary:
      'Creative content engine multiplying organic views and direct viral search interest across multiple tier-one demographics.',
    challenge:
      'Brand awareness constrained by expensive paid-only customer acquisition models.',
    solution:
      'Produced recurring serialized short-form social content engineered for TikTok and Instagram algorithmic distribution.',
    results: [
      { metric: '18M+', label: 'Organic Video Views' },
      { metric: '4.2x', label: 'Follower Velocity' },
      { metric: '68%', label: 'Organic Customer Share' },
    ],
    tags: ['Content Architecture', 'Short-form Viral', 'Community Funnels'],
    liveUrl: 'https://example.com/aura',
  },
];

/* Filter Tabs matching the reference mockup */
const CATEGORY_TABS = [
  'All Work',
  'Websites',
  'SEO & Visibility',
  'Social Marketing',
  'AI Automation',
  'Meta & Google Ads',
  'Performance Marketing',
] as const;

export const SelectedWorkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Work');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Filter projects based on active tab
  const filteredProjects = useMemo(() => {
    if (activeTab === 'All Work') return SHOWCASE_PROJECTS;
    return SHOWCASE_PROJECTS.filter((p) => p.filterCategory === activeTab);
  }, [activeTab]);

  // Items per page: 3 cards in desktop row
  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));

  // Reset to first page whenever active tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  // Safe navigation
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Slice visible projects for current page
  const visibleProjects = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  // Convert ShowcaseProject to ProjectItem for ProjectModal compatibility
  const handleProjectClick = (project: ShowcaseProject) => {
    const modalItem: ProjectItem = {
      id: project.id,
      slug: project.slug,
      title: project.title,
      client: project.client,
      category: project.category,
      summary: project.summary,
      challenge: project.challenge,
      solution: project.solution,
      results: project.results.map((r) => `${r.metric} ${r.label}`),
      services: [project.category],
      technologies: project.tags,
      liveUrl: project.liveUrl,
      imageUrl: project.image,
      featured: true,
      sortOrder: 1,
    };
    setActiveModalProject(modalItem);
  };

  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#060709] border-b border-white/[0.08] overflow-hidden selection:bg-[#FC6603] selection:text-black"
    >
      {/* Background Subtle Ambient Orange Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.05)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 relative z-10">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            {/* Eyebrow: // SELECTED WORK */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8E929E] mb-2 sm:mb-2.5 flex items-center gap-2">
              <span className="text-[#FC6603] font-bold">//</span>
              <span>SELECTED WORK</span>
            </div>

            {/* Headline: Our work. Your next possibility. */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] text-white">
              <span className="block text-[#F4F4F5]">Our work.</span>
              <span className="block text-[#FC6603]">Your next possibility.</span>
            </h2>
          </div>

          {/* Top-Right CTA Button: VIEW ALL WORK ↗ */}
          <Link
            to="/projects"
            className="group relative inline-flex items-center gap-3 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full bg-[#FC6603] hover:bg-[#FF771E] text-white font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:shadow-[0_0_32px_rgba(252,102,3,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0 self-start md:self-auto"
            data-cursor="VIEW ALL"
          >
            <span>VIEW ALL WORK</span>
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-[13px] shadow-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>

        {/* =========================================================================
            2. CATEGORY FILTER TABS
           ========================================================================= */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-sans text-[13px] sm:text-[14px] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FC6603] text-white font-semibold shadow-[0_0_18px_rgba(252,102,3,0.35)]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3. 3-CARDS HORIZONTAL ROW
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0C0D12] border border-white/[0.1] hover:border-[#FC6603]/50 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col justify-between"
              data-cursor="VIEW"
            >
              {/* Media Container with Image & Concept Study Badge */}
              <div className="relative aspect-[16/13] w-full overflow-hidden bg-[#16171E]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Concept Study Tag Badge (Top Left) */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-[11px] font-semibold text-white/90 tracking-[0.16em] uppercase">
                    {project.badge}
                  </span>
                </div>

                {/* Subtle bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Bottom Content Bar */}
              <div className="p-5 sm:p-6 bg-[#0E0F14] border-t border-white/[0.06] flex flex-col justify-between flex-grow">
                {/* Category Label in JetBrains Mono */}
                <span className="font-mono text-[10.5px] sm:text-[11.5px] font-semibold text-[#8E929E] tracking-[0.16em] uppercase block mb-1.5">
                  {project.category}
                </span>

                {/* Project Title + Northeast Arrow in Bricolage Grotesque */}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display font-bold text-lg sm:text-[21px] text-[#F4F4F5] tracking-[-0.01em] group-hover:text-white transition-colors leading-[1.25]">
                    {project.title}
                  </h3>
                  <span className="font-mono text-base sm:text-lg text-white/50 group-hover:text-[#FC6603] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            4. BOTTOM PROGRESS BAR & CAROUSEL NAVIGATION
           ========================================================================= */}
        <div className="mt-10 sm:mt-12 pt-4 flex items-center justify-between gap-6 sm:gap-8">
          {/* Progress Bar Track on Left */}
          <div className="flex-1 max-w-[65%] h-[3px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FC6603] rounded-full transition-all duration-300 shadow-[0_0_8px_#FC6603]"
              style={{
                width: `${((currentPage + 1) / totalPages) * 100}%`,
              }}
            />
          </div>

          {/* Right Controls: Counter + Arrow Navigation Buttons */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Step Counter: 01 — 03 */}
            <span className="font-mono text-[12.5px] sm:text-[13px] font-bold text-white/70 tracking-widest select-none">
              {String(currentPage + 1).padStart(2, '0')} — {String(totalPages).padStart(2, '0')}
            </span>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Previous Button ← */}
              <button
                onClick={handlePrev}
                disabled={totalPages <= 1}
                aria-label="Previous Projects"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-[#FC6603] hover:bg-[#FC6603]/10 flex items-center justify-center text-white/75 hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button → */}
              <button
                onClick={handleNext}
                disabled={totalPages <= 1}
                aria-label="Next Projects"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-[#FC6603] hover:bg-[#FC6603]/10 flex items-center justify-center text-white/75 hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

export default SelectedWorkSection;
