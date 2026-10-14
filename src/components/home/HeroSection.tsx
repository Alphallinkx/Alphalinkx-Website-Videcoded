import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { BRAND, ROTATING_WORDS } from '../../content/siteContent';
import { Reveal, MaskLine, MagneticButton } from '../common/MotionComponents';

export const HeroSection: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<number>(0);

  // Vertical word rotator (slide-up cycle every 2.4s)
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // High-performance scroll tracking for 3D physics without React re-render overhead
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, -rect.top / window.innerHeight);
      scrollRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Motion scroll-driven scrubbing for hero text layers (GPU accelerated)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.65], [0, -50]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.92]);

  const metaOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const metaY = useTransform(scrollYProgress, [0, 0.35], [0, -25]);

  const bottomOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-24 pb-10 px-6 md:px-12 overflow-hidden bg-[#0A0A0B]"
    >
      {/* 01. 3D WebGL Canvas Layer (3 Interlocking Links with Scroll Unlinking & Linking) */}
      <HeroScene3D scroll={scrollRef} />

      {/* 02. Studio Atmosphere: Soft warm vignette & subtle bottom fade */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(255,107,0,0.08)_0%,rgba(10,10,11,0.25)_55%,#0A0A0B_95%)] z-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[#0A0A0B] to-transparent z-0" />

      {/* 03. Top Meta Row (Monospace Telemetry) */}
      <motion.div
        style={{ opacity: metaOpacity, y: metaY }}
        className="relative z-10 w-full flex items-center justify-between font-mono text-[11px] md:text-xs text-[#8A8A8E] tracking-widest uppercase"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
          <span>{BRAND.metaRow}</span>
        </span>
        <span className="hidden sm:inline-block text-[#FF5A1F]">
          // 3D SIGNAL ENGINE ACTIVE
        </span>
      </motion.div>

      {/* 04. Center Giant Hero Headline with Masked Line Animations */}
      <motion.div
        style={{
          opacity: headlineOpacity,
          y: headlineY,
          scale: headlineScale,
        }}
        className="relative z-10 my-auto py-8 text-center max-w-6xl mx-auto flex flex-col items-center justify-center will-change-transform"
      >
        {/* Line 1: WE BUILD */}
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter uppercase leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          <MaskLine delay={0.05}>WE BUILD</MaskLine>
        </h1>

        {/* Line 2: [ROTATING WORD] THAT GROWS. */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2 mt-3 sm:mt-5 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          <span className="relative inline-flex items-center justify-center h-[1.18em] min-w-[3.5ch] overflow-hidden align-middle text-[#FF5A1F]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={ROTATING_WORDS[wordIndex]}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block select-none whitespace-nowrap text-[#FF5A1F] drop-shadow-[0_0_35px_rgba(255,107,0,0.85)]"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>

          <span className="font-display font-black text-white tracking-tighter uppercase leading-none">
            THAT GROWS.
          </span>
        </div>

        {/* Value Proposition Subtext with Reveal Motion */}
        <Reveal delay={0.25} className="mt-8 sm:mt-10 max-w-3xl mx-auto px-4">
          <p className="text-lg sm:text-xl md:text-2xl text-[#E5E5E7] font-medium font-sans leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            High-performance web architecture, generative AI search visibility (AEO/GEO), and mathematically tuned paid acquisition.
          </p>
        </Reveal>

        {/* Two CTAs using MagneticButton */}
        <Reveal delay={0.35} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="/contact"
            variant="primary"
            dataCursor="CONNECT"
          >
            Start a Project
          </MagneticButton>

          <MagneticButton
            href="/#work"
            variant="ghost"
            dataCursor="EXPLORE"
          >
            See Our Work
          </MagneticButton>
        </Reveal>
      </motion.div>

      {/* 05. Bottom Bar: Monospace Scroll Indicator & Telemetry */}
      <motion.div
        style={{ opacity: bottomOpacity }}
        className="relative z-10 w-full flex items-center justify-between font-mono text-[11px] text-[#8A8A8E] tracking-widest uppercase"
      >
        <span className="hidden md:inline-block">
          // SCROLL TO UNLINK
        </span>

        <div className="mx-auto md:mx-0 flex items-center gap-3">
          <span>Scroll to unlink</span>
          <div className="w-4 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"
            />
          </div>
        </div>

        <span className="hidden md:inline-block text-right">
          AEO • GEO • SEO • WEB • ADS
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
