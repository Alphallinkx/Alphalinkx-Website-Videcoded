import React from 'react';
import { Compass, Cpu, Gauge, BarChart3, Users, MessageSquareCode, ArrowUpRight } from 'lucide-react';

export const WhyUsBentoSection: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#090B10] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            WHY PARTNER WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3">
            BUILT FOR IMPACT. BACKED BY RIGOR.
          </h2>
          <p className="text-base text-zinc-400 mt-4 leading-relaxed">
            We reject the slow agency bureaucracy. Here is how our engineering-first model drives tangible competitive advantages.
          </p>
        </div>

        {/* Bento Grid: 5 carefully balanced asymmetric cells with diverse backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Cell 1: Strategy-Led Execution (Large 8 cols, with vivid brand radial ambient) */}
          <div className="md:col-span-7 lg:col-span-8 glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-gradient-to-br from-[#121626] via-[#0D101A] to-[#0A0C13]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FC6603]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC6603] mb-6 shadow-[0_0_20px_rgba(252,102,3,0.2)]">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#FC6603] tracking-wider uppercase font-semibold">
              01 · STRATEGY-LED FOUNDATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2 mb-3">
              We Never Write a Line of Code Without Market Clarity.
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Before sketching layouts, we analyze user journeys, search intent landscapes, and competitor weaknesses. Your digital product is built with clear architectural specifications mapped to measurable business outcomes.
            </p>
          </div>

          {/* Cell 2: Performance-Conscious Engineering (5 cols, telemetry metric visual) */}
          <div className="md:col-span-5 lg:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden bg-gradient-to-b from-[#141828] to-[#0B0D16]">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC6603] mb-6 shadow-[0_0_20px_rgba(252,102,3,0.2)]">
              <Gauge className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#FC6603] tracking-wider uppercase font-semibold">
              02 · SUB-SECOND SPEED
            </span>
            <h3 className="text-xl font-display font-bold text-white mt-2 mb-2">
              95+ Core Web Vitals
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Optimized bundle sizes, tree-shaking, and hardware-accelerated 3D shaders ensure instantaneous navigation.
            </p>
            {/* Speed Gauge Metric Card */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-2xl font-display font-bold text-emerald-400">99</span>
                <span className="text-xs text-zinc-400 ml-1">/100</span>
                <div className="text-[10px] font-mono text-zinc-400 mt-0.5">Lighthouse Score</div>
              </div>
              <div className="text-right">
                <span className="text-lg font-mono font-bold text-white">480ms</span>
                <div className="text-[10px] font-mono text-zinc-400 mt-0.5">Average LCP</div>
              </div>
            </div>
          </div>

          {/* Cell 3: Design & Code In Sync (4 cols) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 bg-gradient-to-b from-[#0F121C] to-[#080A10]">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC6603] mb-6">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#FC6603] tracking-wider uppercase font-semibold">
              03 · SEAMLESS CRAFT
            </span>
            <h3 className="text-lg font-display font-bold text-white mt-2 mb-2">
              Design & Code Unified
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              No endless developer-designer disconnect. Our creative technologists translate design vision directly into pixel-precise, responsive components.
            </p>
          </div>

          {/* Cell 4: Practical AI Integration (4 cols, with dark tech pattern) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden bg-gradient-to-br from-[#161B2E] to-[#0B0D18]">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC6603] mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#FC6603] tracking-wider uppercase font-semibold">
              04 · REAL INTELLIGENCE
            </span>
            <h3 className="text-lg font-display font-bold text-white mt-2 mb-2">
              Practical AI Integration
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Beyond trendy buzzwords, we deploy production-ready LLM agents, semantic vector databases, and custom automation that save hundreds of operational hours.
            </p>
          </div>

          {/* Cell 5: Transparent Communication (4 cols) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 bg-gradient-to-b from-[#0F121C] to-[#080A10]">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC6603] mb-6">
              <MessageSquareCode className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-[#FC6603] tracking-wider uppercase font-semibold">
              05 · TRANSPARENCY
            </span>
            <h3 className="text-lg font-display font-bold text-white mt-2 mb-2">
              Direct Senior Access
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              You collaborate directly with senior architects and developers. Weekly sprints, staging environments, and zero account-manager telephone games.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
