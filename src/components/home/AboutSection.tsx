import React from 'react';
import { Link } from 'react-router-dom';
import { TechConstellation3D } from '../3d/TechConstellation3D';
import { ArrowRight, Code2, Sparkles, Cpu, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Full-Stack Synergy',
      desc: 'Designers who write clean code and engineers who obsess over typography, spacing, and micro-interactions.',
    },
    {
      num: '02',
      title: 'Sub-Second Performance',
      desc: 'Engineered for 95+ Core Web Vitals, Edge caching, and zero layout shift across all viewports.',
    },
    {
      num: '03',
      title: 'Applied Intelligence',
      desc: 'Production-ready LLM agents, automated workflows, and vector knowledge systems with strict enterprise security.',
    },
  ];

  return (
    <section className="relative py-28 bg-[#060709] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Narrative Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            THE ALPHALINKX FORMULA
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3 leading-[1.12]">
            CONNECTING STRATEGY, CODE AND MEASURABLE GROWTH.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mt-4 leading-relaxed">
            Most agencies treat design, software engineering, and performance marketing as isolated handoffs. We build them as one synchronized production engine: interfaces that captivate, codebases optimized for sub-second response times, and funnels engineered to convert.
          </p>
        </div>

        {/* 3 Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#FC6603]/30 transition-all bg-[#0B0D13]/80 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#FC6603]">
                  {pillar.num}
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-2 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Consolidated Technology Architecture Showcase (3D Constellation Integrated) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 bg-[#0E1017] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Production Standards
              </span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">
                Open Frameworks & Cloud Architecture
              </h3>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FC6603] hover:text-[#FF8833] group"
              data-cursor-hover
            >
              <span>Read Our Full Architecture Philosophy</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm text-zinc-300 leading-relaxed">
                We partner with modern frameworks to guarantee security, sub-second speed, and zero vendor lock-in. Every build includes strict TypeScript typings, component-level testing, and automated deployment pipelines.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">React 19 & Next.js</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Three.js / WebGL</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Node.js & Express</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">PostgreSQL & Prisma</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Autonomous LLMs</span>
              </div>
            </div>

            {/* Right 3D Interactive Constellation */}
            <div className="lg:col-span-7 h-[380px] rounded-2xl bg-black/50 border border-white/10 overflow-hidden relative">
              <TechConstellation3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
