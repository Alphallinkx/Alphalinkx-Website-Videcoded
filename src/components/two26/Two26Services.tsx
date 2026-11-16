'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticHeading } from '../common/MagneticHeading';
import { Two26Button } from '../common/Two26Button';
import { Plus } from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  link: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'web',
    num: '01',
    title: 'Hyper-Performance Web Development',
    shortDesc: 'Bespoke Next.js & React architectures scoring 99+ on Core Web Vitals.',
    fullDesc:
      'We build high-converting digital flagships engineered for extreme speed, search crawlability, and silky user experience. With micro-interactions, responsive scaling, and zero bloat, your site turns passive visitors into high-conviction customers.',
    deliverables: ['Custom Next.js & TypeScript', 'Micro-Interactions & Motion', 'Zero-Layout-Shift (CLS)', 'Stripe & CRM Integrations'],
    link: '/services/hyper-performance-web',
  },
  {
    id: 'aeo',
    num: '02',
    title: 'Generative & Answer Engine Optimization (AEO/GEO)',
    shortDesc: 'Be the cited source of truth across ChatGPT, Perplexity, and Google AI.',
    fullDesc:
      'Search has evolved from 10 blue links to AI synthesized answers. We reverse-engineer large language model retrieval pipelines, establishing structured entity graphs, citation authority, and programmatic topical clusters that guarantee your brand is recommended first.',
    deliverables: ['Knowledge Graph Architecture', 'Topical Authority Clusters', 'LLM Citation Monitoring', 'Schema & Entity Tuning'],
    link: '/services/search-ai-visibility',
  },
  {
    id: 'local',
    num: '03',
    title: 'Local Dominance & Google 3-Pack',
    shortDesc: 'Capture the highest-intent local buyers in your geographic service radius.',
    fullDesc:
      'When prospective buyers search for what you do near them, you must own top positions. We optimize local entity consistency, review momentum loops, geo-targeted signals, and Google Business Profile authority to secure monopoly position in your target markets.',
    deliverables: ['Google Business Profile Mastery', 'Local Geo-Grid Dominance', 'Automated Review Funnels', 'Citation Authority Defense'],
    link: '/services/local-dominance-gmb',
  },
  {
    id: 'ads',
    num: '04',
    title: 'High-ROAS Paid Acquisition & Funnels',
    shortDesc: 'Laser-targeted Google & Meta campaigns matched with dedicated landing pages.',
    fullDesc:
      'Traffic without conversion is vanity. We construct full-funnel ad architectures backed by relentless negative keyword filtering, conversion rate optimization, and dedicated message-matched landing experiences engineered to generate qualified appointments at predictable unit economics.',
    deliverables: ['Google Search & Performance Max', 'Message-Matched Landing Pages', 'Server-Side CAPI Tracking', 'Multi-Touch Attribution'],
    link: '/services/paid-media-roas',
  },
];

export const Two26Services: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('web');

  return (
    <section id="services" className="relative w-full py-20 sm:py-28 bg-[#F8EEE8] border-b border-[#DAD1CC] select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
        {/* Section Header with Dual Magnetic Offset */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="font-mono text-[11px] sm:text-[13px] font-bold text-[#FF5400] uppercase tracking-[0.24em] mb-4">
            // CORE CAPABILITIES
          </div>
          <MagneticHeading as="h2">
            <span className="block text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] tracking-[-0.03em] leading-[0.85]">
              WHAT WE DO BEST.
            </span>
          </MagneticHeading>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#333333] mt-6 max-w-xl mx-auto leading-[1.5]">
            No bloated agency retainers. Four interconnected disciplines engineered to deliver an unfair commercial advantage.
          </p>
        </div>

        {/* Services Accordion Cards List */}
        <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6">
          {SERVICES.map((srv) => {
            const isOpen = activeId === srv.id;

            return (
              <div
                key={srv.id}
                className={`w-full rounded-[20px] sm:rounded-[28px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FDF8F5] border-[#FF5400] shadow-md'
                    : 'bg-[#FDF8F5] border-[#DAD1CC] hover:border-[#FF5400] hover:bg-[#F3EEEB]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? null : srv.id)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6 pr-2">
                    <span className="font-mono text-[14px] sm:text-[16px] font-bold text-[#FF5400] shrink-0">
                      {srv.num}.
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-3xl text-[#000000] tracking-[-0.02em] leading-tight">
                      {srv.title}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#FF5400] border-[#FF5400] text-white rotate-45'
                        : 'bg-[#F8EEE8] border-[#DAD1CC] text-[#000000]'
                    }`}
                  >
                    <Plus className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#DAD1CC]/60">
                        <p className="font-sans text-[15px] sm:text-[17px] text-[#333333] leading-relaxed max-w-3xl mb-6">
                          {srv.fullDesc}
                        </p>

                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
                          {srv.deliverables.map((deliv) => (
                            <span
                              key={deliv}
                              className="font-mono text-[11px] sm:text-[12px] font-bold text-[#000000] bg-[#F8EEE8] border border-[#DAD1CC] px-4 py-1.5 rounded-full"
                            >
                              ✓ {deliv}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <Two26Button to={srv.link} variant="black">
                            Explore Service Details
                          </Two26Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <Two26Button to="/services" variant="cream">
            View Full Service Menu
          </Two26Button>
        </div>
      </div>
    </section>
  );
};

export default Two26Services;
