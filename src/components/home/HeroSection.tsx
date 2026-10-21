import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { HeroParticles } from './HeroParticles';
import { HeroSocialBar } from './HeroSocialBar';
import { Reveal, MaskLine, MagneticButton } from '../common/MotionComponents';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<number>(0);

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

  // Smooth scroll down to explore next section and unlink the 3D chain
  const scrollToExplore = () => {
    const nextSection = document.getElementById('work') || document.getElementById('services') || document.querySelector('section:nth-of-type(2)');
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(nextSection || window.innerHeight * 0.95, {
        offset: -70,
        duration: 1.35,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'smooth' });
    }
  };

  // Motion scroll-driven scrubbing for hero text layers (GPU accelerated)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.65], [0, -45]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.94]);

  const bottomOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 overflow-hidden bg-[#08080A]"
    >
      {/* 01. Clean Deep Black Studio Background (Zero Glow) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#08080A]">
        {/* Bottom smooth fade to black */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08080A] to-transparent pointer-events-none" />
      </div>

      {/* 02. Feather-Light Interactive Live Particles */}
      <HeroParticles />

      {/* 03. 3D WebGL Canvas Layer (Interlocking Links with Scroll Physics) */}
      <HeroScene3D scroll={scrollRef} />

      {/* 04. Bottom Cinematic Fade (Dips 3D chain smoothly into black on scroll) */}
      <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 pointer-events-none bg-gradient-to-t from-[#08080A] via-[#08080A]/85 to-transparent z-[2]" />

      {/* 05. Vertical Social Media Icons & Links on the Left */}
      <HeroSocialBar />

      {/* 05. Prominent, Powerful Hero Typography & Content */}
      <motion.div
        style={{
          opacity: headlineOpacity,
          y: headlineY,
          scale: headlineScale,
        }}
        className="relative z-10 my-auto py-8 text-center w-full max-w-7xl mx-auto flex flex-col items-center justify-center will-change-transform px-4"
      >
        {/* Main Prominent Headline - Strictly 2 Lines, Clean White */}
        <h1 className="font-display font-black text-[clamp(1.35rem,4.8vw,5.2rem)] text-white tracking-tighter uppercase leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] flex flex-col items-center text-center w-full">
          <MaskLine delay={0.05} className="whitespace-nowrap">
            WE BUILD DIGITAL EMPIRES
          </MaskLine>
          <MaskLine delay={0.12} className="whitespace-nowrap mt-1 sm:mt-2.5">
            THAT DOMINATE & SCALE.
          </MaskLine>
        </h1>

        {/* Clear, Prominent Value Proposition Subtext */}
        <Reveal delay={0.2} className="mt-6 sm:mt-8 max-w-2xl mx-auto px-4">
          <p className="text-base sm:text-lg md:text-xl text-[#F2F2F5] font-medium font-sans leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            High-performance web architecture, Generative AI search visibility (AEO/GEO), and algorithmic paid acquisition engineered to turn intent into exponential revenue.
          </p>
        </Reveal>

        {/* Two CTAs using MagneticButton */}
        <Reveal delay={0.3} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
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

      {/* 06. Interactive Bottom Bar: Clickable "Unlink & Explore" CTA */}
      <motion.div
        style={{ opacity: bottomOpacity }}
        className="relative z-10 w-full flex items-center justify-center font-mono text-[11px] text-[#8A8A8E] tracking-widest uppercase"
      >
        <button
          type="button"
          onClick={scrollToExplore}
          className="group flex items-center gap-3 cursor-pointer select-none text-[#8A8A8E] hover:text-white transition-colors duration-200"
          data-cursor="SCROLL"
          title="Click to explore and unlink the chain"
        >
          <span className="tracking-widest font-mono text-[11px] uppercase group-hover:text-[#FF5A1F] transition-colors">
            UNLINK TO EXPLORE THE ENGINE ↓
          </span>
          <div className="w-4 h-8 rounded-full border border-white/20 group-hover:border-[#FF5A1F]/60 flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
