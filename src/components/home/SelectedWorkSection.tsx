import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProjectModal } from '../common/ProjectModal';
import { ProjectItem } from '../../types';

/* =========================================================================
   SELECTED WORK PORTFOLIO DATA
   Styled with Creovibe Project Skin (project-block-ONE-FILE-v1)
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
    category: 'Development',
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
    category: 'Branding',
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
    category: 'AI Automation',
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
    category: 'SEO & Visibility',
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
    category: 'Performance Ads',
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
    category: 'Scaling',
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
    category: 'Development',
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
    category: 'AI & Data',
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
    category: 'Branding',
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

      {/* =========================================================================
          STANDARD WIDTH CONTAINER: HEADER & CATEGORY FILTER TABS
         ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 relative z-10 mb-8 sm:mb-10">
        {/* 1. Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
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

          {/* Standard Site Brand CTA Button: VIEW ALL WORK ↗ */}
          <Link
            to="/projects"
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FC6603] text-black font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:bg-white hover:text-black hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6603] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709] shrink-0 self-start sm:self-auto"
            data-cursor="VIEW ALL"
          >
            <span>VIEW ALL WORK</span>
            <span className="text-[12px] sm:text-[13px] font-bold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>

        {/* 2. Category Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
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
      </div>

      {/* =========================================================================
          FULL-WIDTH RESPONSIVE CARDS CONTAINER (Creovibe Project Block v1 Skin)
         ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 relative z-10 mb-8 sm:mb-10">
        <div className="cv-proj-v1">
          <div className="tm-sc-projects tm-sc-projects-grid border-radius-around-box">
            <div className="isotope-layout">
              <div className="isotope-layout-inner">
                {visibleProjects.map((project) => (
                  <div key={project.id} className="isotope-item projct-order">
                    <div className="project-item projects-current-theme1">
                      <div
                        onClick={() => handleProjectClick(project)}
                        className="inner-box cursor-pointer"
                        data-cursor="VIEW"
                      >
                        {/* 1:1 Aspect Ratio Image Container */}
                        <div className="image">
                          <img
                            loading="lazy"
                            decoding="async"
                            src={project.image}
                            alt={project.title}
                          />
                        </div>

                        {/* Center Hover Action Arrow Icon */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                          className="arrow-icon"
                          aria-label={project.title}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>

                        {/* Bottom Content Area with Category & Title Underline */}
                        <div className="content">
                          <div className="title-area">
                            <ul className="cat-list">
                              <li>
                                {project.category}
                                <span> /</span>
                              </li>
                            </ul>
                            <h4 className="title">
                              <a
                                href={`#${project.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleProjectClick(project);
                                }}
                              >
                                {project.title}
                              </a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STANDARD WIDTH CONTAINER: BOTTOM PROGRESS BAR & CAROUSEL NAVIGATION
         ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 relative z-10">
        <div className="pt-2 flex items-center justify-between gap-6 sm:gap-8">
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
