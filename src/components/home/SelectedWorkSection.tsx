'use client';

import React, { useState } from 'react';
import { BrandButton } from '../common/BrandButton';
import { ProjectModal } from '../common/ProjectModal';
import { ProjectItem } from '../../types';

/* =========================================================================
   OUR RECENT PROJECTS DATA
   Styled with Creovibe Project Block v1 Skin (project-block-ONE-FILE-v1)
   ========================================================================= */
export interface ShowcaseProject {
  id: string;
  slug: string;
  badge: string;
  category: string;
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

const RECENT_PROJECTS: ShowcaseProject[] = [
  // 01 — Testing and quality assurance (Development)
  {
    id: 'testing-and-quality-assurance',
    slug: 'testing-and-quality-assurance',
    badge: 'CASE STUDY',
    category: 'Development',
    title: 'Testing and quality assurance',
    client: 'Creovibe Next-Gen Platform',
    image: '/assets/projects/creovibe-project-4.jpg',
    summary:
      'Enterprise automated QA and continuous testing pipelines verifying sub-second latency, zero UI regression, and mission-critical reliability.',
    challenge:
      'Fragmented testing across edge runtimes leading to intermittent regression and performance degradation.',
    solution:
      'Engineered an automated end-to-end telemetry harness with real-time browser test suites and synthetic user journey benchmarking.',
    results: [
      { metric: '99.99%', label: 'Test Coverage' },
      { metric: '0.35s', label: 'Response Latency' },
      { metric: 'Zero', label: 'Production Regressions' },
    ],
    tags: ['Quality Assurance', 'Automated QA', 'Next.js', 'Core Web Vitals'],
    liveUrl: 'https://example.com/testing-qa',
  },

  // 02 — Future-ready solutions (Branding)
  {
    id: 'future-ready-solutions',
    slug: 'future-ready-solutions',
    badge: 'CASE STUDY',
    category: 'Branding',
    title: 'Future-ready solutions',
    client: 'Aura Technology Dynamics',
    image: '/assets/projects/creovibe-project-3.jpg',
    summary:
      'Holistic brand architecture and digital product positioning engineered for high-growth tech innovators commanding premium market authority.',
    challenge:
      'Outdated brand identity and inconsistent design language causing customer disconnect across enterprise sales cycles.',
    solution:
      'Developed a unified design system, tactile digital visual identities, and future-proof design guidelines deployed across all digital touchpoints.',
    results: [
      { metric: '4.8x', label: 'Brand Valuation Lift' },
      { metric: '+260%', label: 'Enterprise Inquiries' },
      { metric: '100%', label: 'Design System Adoption' },
    ],
    tags: ['Brand Identity', 'Design System', 'UI/UX Architecture', 'Positioning'],
    liveUrl: 'https://example.com/future-ready',
  },

  // 03 — High-performance website (Development)
  {
    id: 'high-performance-website',
    slug: 'high-performance-website',
    badge: 'CASE STUDY',
    category: 'Development',
    title: 'High-performance website',
    client: 'Apex Global Media',
    image: '/assets/projects/creovibe-project-2.jpg',
    summary:
      'Sub-second editorial web publication platform engineered with modern headless JAMstack architecture and fluid responsive typography.',
    challenge:
      'Heavy legacy CMS delivering poor mobile Core Web Vitals and losing organic Google search distribution.',
    solution:
      'Rebuilt ground-up with modern edge caching, atomic asset optimization, and fluid responsive design layouts.',
    results: [
      { metric: '100/100', label: 'Google PageSpeed' },
      { metric: '+410%', label: 'Organic Search Traffic' },
      { metric: '0.4s', label: 'Average Page Load' },
    ],
    tags: ['Web Development', 'Jamstack', 'Performance Optimization', 'SEO GEO'],
    liveUrl: 'https://example.com/high-performance',
  },
];

export const SelectedWorkSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

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
      aria-label="Recent Projects"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#060709] border-b border-white/[0.08] overflow-hidden selection:bg-[#FC6603] selection:text-black"
    >
      {/* Background Subtle Ambient Orange Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.05)_0%,transparent_70%)] pointer-events-none"
      />

      {/* =========================================================================
          STANDARD WIDTH CONTAINER: SECTION HEADER (CENTERED)
         ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 relative z-10 mb-10 sm:mb-12 lg:mb-14 text-center flex flex-col items-center">
        {/* Eyebrow: // SELECTED WORK */}
        <div className="font-mono text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8E929E] mb-2 sm:mb-2.5 flex items-center justify-center gap-2">
          <span className="text-[#FC6603] font-bold">//</span>
          <span>SELECTED WORK</span>
        </div>

        {/* Headline: Our work. Your next possibility. */}
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] text-white">
          <span className="block text-[#F4F4F5]">Our work.</span>
          <span className="block text-[#FC6603]">Your next possibility.</span>
        </h2>

        {/* Supporting text */}
        <p className="font-sans text-[15px] sm:text-[16px] text-[#A1A1AA] leading-relaxed mt-4 max-w-xl mx-auto">
          See how bold ideas become work that moves businesses forward.
        </p>
      </div>

      {/* =========================================================================
          FULL-WIDTH RESPONSIVE CARDS CONTAINER (Creovibe Project Block v1 Skin)
         ========================================================================= */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 relative z-10">
        <div className="cv-proj-v1">
          <div className="tm-sc-projects tm-sc-projects-grid border-radius-around-box">
            <div className="isotope-layout grid-3 gutter-10 clearfix">
              <div className="isotope-layout-inner">
                {RECENT_PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className={`isotope-item projct-order ${project.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <div className="project-item projects-current-theme1">
                      <div
                        onClick={() => handleProjectClick(project)}
                        className="inner-box cursor-pointer"
                        data-cursor="VIEW"
                      >
                        {/* Top Left Category Label */}
                        <div className="top-cat">
                          <span>{project.category}</span>
                        </div>

                        {/* 1:1 Aspect Ratio Image Container */}
                        <div className="image">
                          <img
                            loading="lazy"
                            decoding="async"
                            width={550}
                            height={550}
                            src={project.image}
                            alt={project.title}
                            className="img-fullwidth wp-post-image"
                          />
                        </div>

                        {/* Center Hover Action Arrow Icon */}
                        <a
                          href={`#${project.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
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
                        </a>

                        {/* Bottom Content Area with Title & Summary */}
                        <div className="content">
                          <div className="title-area">
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
                            <p className="summary">
                              {project.summary}
                            </p>
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
          BOTTOM CENTER CALL-TO-ACTION BUTTON
         ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 relative z-10 mt-10 sm:mt-12 lg:mt-14 flex justify-center">
        <BrandButton to="/projects" variant="orange" dataCursor="VIEW ALL">
          View All Projects
        </BrandButton>
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
