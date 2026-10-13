import React from 'react';
import { TechConstellation3D } from '../3d/TechConstellation3D';
import { Cpu, Terminal, Shield, Zap } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const techCategories = [
    {
      name: 'Frontend & Creative 3D',
      items: ['React 19', 'TypeScript', 'Three.js / WebGL', 'React Three Fiber', 'Tailwind CSS', 'GSAP Motion'],
    },
    {
      name: 'Backend & Cloud Scale',
      items: ['Node.js & Express', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'Edge Networks'],
    },
    {
      name: 'Artificial Intelligence',
      items: ['Custom LLM Fine-Tuning', 'Multi-Agent Workflows', 'RAG Vector Indexing', 'FastAPI', 'LangChain'],
    },
    {
      name: 'Growth & Analytics',
      items: ['Server-Side GA4', 'Meta CAPI', 'Schema.org JSON-LD', 'Core Web Vitals Auditing', 'Stripe Payments'],
    },
  ];

  return (
    <section className="relative py-28 bg-[#080A0F] border-t border-white/[0.08] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-glow pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            TECHNOLOGY & INNOVATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3">
            ARCHITECTED FOR SCALE.
          </h2>
          <p className="text-base text-zinc-400 mt-4 leading-relaxed">
            We partner with battle-tested open standards and modern frameworks to guarantee security, sub-second speed, and zero platform lock-in.
          </p>
        </div>

        {/* 3D Interactive Constellation Scene */}
        <div className="glass-panel rounded-3xl p-4 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-b from-[#0F121C] to-[#0A0C13] mb-12">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#FC6603] animate-pulse" />
            <span>Interactive Node Constellation · Rotate & Explore</span>
          </div>
          <TechConstellation3D />
        </div>

        {/* Stack Category Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FC6603]/30 transition-all bg-[#0E1017]"
            >
              <h3 className="text-sm font-display font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>{cat.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603]" />
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/5 text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
