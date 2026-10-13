import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Layers, Zap, ShieldCheck, Target } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Layers,
      title: 'Full-Stack Synergy',
      desc: 'Designers who write production code and engineers who obsess over typography and spatial hierarchy.',
    },
    {
      icon: Zap,
      title: 'Sub-Second Performance',
      desc: 'Engineered for 95+ Core Web Vitals, Edge caching, and instantaneous visual response times.',
    },
    {
      icon: Target,
      title: 'Measurable Velocity',
      desc: 'Every pixel, copy line, and interaction is engineered to convert high-intent prospects into customers.',
    },
    {
      icon: ShieldCheck,
      title: 'Future-Proof Code',
      desc: 'Modular TypeScript architectures and clean APIs designed for multi-year enterprise longevity.',
    },
  ];

  return (
    <section className="relative py-28 bg-[#060709] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial-glow pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Headline on top, max 65ch (Split-Header Ban compliance) */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            WHO WE ARE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3 leading-[1.15]">
            WHERE CREATIVE THINKING MEETS INTELLIGENT TECHNOLOGY.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mt-5 leading-relaxed">
            Alphalinkx brings together design systems, full-stack engineering, performance marketing, and artificial intelligence to build transformative digital foundations for companies shaping tomorrow.
          </p>
        </div>

        {/* Asymmetric Bento Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual Narrative Panel (7 columns) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#0F121C] to-[#0A0C12]">
            <div className="relative z-10">
              <span className="text-xs font-mono text-[#FC6603] tracking-widest uppercase font-semibold">
                THE ALPHALINKX PHILOSOPHY
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-4 leading-snug">
                We believe digital experiences should be memorable, technically flawless, and commercial powerhouses.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
                Most agencies treat design, engineering, and growth as isolated handoffs. We build them as one integrated engine. Your 3D interactions load instantly, your copy converts, your search ranking climbs, and your infrastructure scales under real-world load.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#FC6603] animate-pulse" />
                <span className="text-xs font-mono text-zinc-300">
                  Global Client Deployments
                </span>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FC6603] hover:text-[#FF8833] group"
              >
                <span>Read our full story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Pillars List (5 columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FC6603]/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#FC6603] group-hover:text-black transition-colors">
                      <IconComp className="w-5 h-5 text-[#FC6603] group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-base font-display font-bold text-white group-hover:text-[#FC6603] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
