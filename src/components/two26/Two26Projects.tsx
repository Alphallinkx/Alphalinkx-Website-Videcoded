'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { MagneticHeading } from '../common/MagneticHeading';
import { Two26Button } from '../common/Two26Button';

interface Project {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  image: string;
  metrics: string;
}

const PROJECTS: Project[] = [
  {
    slug: 'nexus-robotics',
    client: 'NEXUS ROBOTICS',
    title: 'Autonomous Industrial Systems',
    category: 'Full-Stack Web & 3D Interactive',
    year: '2026',
    tags: ['Next.js', 'Three.js', 'GEO / AEO', 'Conversion Funnel'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85',
    metrics: '+340% Pipeline Velocity',
  },
  {
    slug: 'strata-cloud',
    client: 'STRATA CLOUD',
    title: 'Enterprise Infrastructure Platform',
    category: 'Brand Architecture & Hyper-Performance Web',
    year: '2026',
    tags: ['Design System', 'SEO Architecture', 'Speed 100/100', 'Stripe Integration'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85',
    metrics: '$2.8M Added Contract Value',
  },
  {
    slug: 'aura-health',
    client: 'AURA HEALTH',
    title: 'Clinical Intelligence Interface',
    category: 'High-Intent Landing Pages & Paid Search',
    year: '2026',
    tags: ['A/B Testing', 'Google Ads 6.8x ROAS', 'HIPAA Compliant', 'Mobile First'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85',
    metrics: '6.8x ROAS on Paid Media',
  },
  {
    slug: 'lumina-retail',
    client: 'LUMINA LUXURY',
    title: 'Global Commerce Experience',
    category: 'E-Commerce Architecture & Local Dominance',
    year: '2026',
    tags: ['Headless Shopify', 'Google 3-Pack #1', 'Custom Animation', 'Micro-Interactions'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85',
    metrics: '99.4% Core Web Vitals',
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.45], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="group relative w-full rounded-[24px] sm:rounded-[36px] bg-[#FDF8F5] border border-[#DAD1CC] overflow-hidden p-6 sm:p-10 lg:p-12 mb-12 sm:mb-16 last:mb-0 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Top Meta Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#DAD1CC]">
        <div>
          <span className="font-mono text-[11px] sm:text-[12px] font-bold text-[#FF5400] uppercase tracking-[0.2em] block mb-1">
            // {project.client}
          </span>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-[#000000] tracking-[-0.02em] leading-tight">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex bg-[#FF5400]/10 border border-[#FF5400]/30 text-[#FF5400] font-mono text-[12px] font-bold px-3.5 py-1.5 rounded-full">
            {project.metrics}
          </span>
          <span className="font-mono text-[13px] font-bold text-[#888888]">
            {project.year}
          </span>
        </div>
      </div>

      {/* Main Image Showcase with Smooth Hover Scale */}
      <Link
        href={`/projects`}
        className="block relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-[18px] sm:rounded-[26px] overflow-hidden bg-[#ECEAE5] mb-8"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Subtle orange corner accent on hover */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center font-bold text-[14px] text-[#000000] group-hover:bg-[#FF5400] group-hover:text-white transition-all duration-300">
          ↗
        </div>
      </Link>

      {/* Tags and CTA Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#F8EEE8] border border-[#DAD1CC] text-[#333333] font-mono text-[11px] sm:text-[12px] font-medium px-3.5 py-1.5 rounded-full group-hover:border-[#FF5400]/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <Two26Button to="/projects" variant="black">
            Explore Project
          </Two26Button>
        </div>
      </div>
    </motion.div>
  );
};

export const Two26Projects: React.FC = () => {
  return (
    <section id="work" className="relative w-full py-20 sm:py-28 bg-[#F8EEE8] border-b border-[#DAD1CC] select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
        {/* Section Header with Dual Magnetic Offset */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="font-mono text-[11px] sm:text-[13px] font-bold text-[#FF5400] uppercase tracking-[0.24em] mb-4">
            // SELECTED PROJECTS
          </div>
          <MagneticHeading as="h2">
            <span className="block text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] tracking-[-0.03em] leading-[0.85]">
              OUR WORK.
            </span>
            <span className="block text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] tracking-[-0.03em] leading-[0.85]">
              YOUR NEXT BENCHMARK.
            </span>
          </MagneticHeading>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#333333] mt-6 max-w-xl mx-auto leading-[1.5]">
            Each project is engineered with high visual craft, measurable commercial intent, and zero compromises.
          </p>
        </div>

        {/* Vertical Project Cards Stack */}
        <div className="w-full">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <Two26Button to="/projects" variant="cream">
            View All Work Archive
          </Two26Button>
        </div>
      </div>
    </section>
  );
};

export default Two26Projects;
