import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#060709] bg-tech-grid">
      {/* Dynamic Ambient Glow Behind Hero */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow pointer-events-none opacity-70" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#FC6603]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow Label (Max 1 per 3 sections rule) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md w-fit mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#FC6603] animate-pulse" />
              <span className="text-xs font-mono font-medium tracking-wide text-zinc-300">
                STRATEGY · TECHNOLOGY · GROWTH
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.05]"
            >
              WE BUILD DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                EXPERIENCES THAT
              </span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC6603] via-[#FF7E26] to-[#FFA055]">
                MOVE BUSINESSES
              </span> <br />
              FORWARD.
            </motion.h1>

            {/* Subtext (Within 20 words cap) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-400 mt-6 max-w-[54ch] leading-relaxed font-normal"
            >
              From high-performance websites and intelligent AI solutions to data-driven marketing, Alphalinkx transforms ambitious ideas into measurable digital growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] active:scale-[0.98] transition-all duration-200 shadow-[0_0_25px_rgba(252,102,3,0.4)] group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-medium text-white glass-button active:scale-[0.98] group"
              >
                <span>Explore Our Work</span>
                <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Brand Sculpture Scene (5 columns) */}
          <div className="lg:col-span-5 h-[420px] sm:h-[500px] lg:h-[560px] w-full relative flex items-center justify-center">
            {/* 3D Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <HeroScene3D />
            </motion.div>

            {/* Floating Live Badge */}
            <div className="absolute bottom-4 right-4 glass-panel px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-lg backdrop-blur-md select-none pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] animate-ping" />
              <span>Interactive 3D WebGL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
