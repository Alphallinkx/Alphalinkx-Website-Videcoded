import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { HeroParticles } from './HeroParticles';
import { HeroSocialBar } from './HeroSocialBar';
import { Reveal, MaskLine, MagneticButton } from '../common/MotionComponents';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<number>(0);

  // High-performance scroll tracking without layout thrashing
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          const h = window.innerHeight || 800;
          scrollRef.current = Math.max(0, scrollY / h);
          ticking = false;
        });
        ticking = true;
      }
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
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 overflow-hidden bg-[#0A0A0B]"
    >
      {/* 01. Attractive Layered Orange Glow Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A0B]">
        {/* Main glow behind the chain, centered slightly above middle */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 42%, rgba(255, 90, 0, 0.28), rgba(255, 60, 0, 0.10) 45%, transparent 70%)',
          }}
        />

        {/* Second soft glow at top center */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 45% 35% at 50% 0%, rgba(255, 110, 0, 0.14), transparent 70%)',
          }}
        />

        {/* Third faint glow at the bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 40% at 50% 110%, rgba(255, 70, 0, 0.12), transparent 70%)',
          }}
        />

        {/* Subtle vignette at the far edges only (rgba(0,0,0,0.25) at the corners) — center stays bright and glowing */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 95% 85% at 50% 50%, transparent 65%, rgba(0, 0, 0, 0.25) 100%)',
          }}
        />

        {/* Bottom smooth fade to black */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
      </div>

      {/* 02. Feather-Light Interactive Live Particles */}
      <HeroParticles />

      {/* 03. 3D WebGL Canvas Layer (Interlocking Links with Scroll Physics) */}
      <HeroScene3D scroll={scrollRef} />

      {/* 04. Bottom Cinematic Fade (Dips 3D chain smoothly into black on scroll) */}
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-56 pointer-events-none bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent z-[2]" />

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
        {/* Main Prominent Headline with Cinematic Mask Reveal (Bricolage Grotesque 800, tracking: -0.03em, leading: 1.02) */}
        <h1 className="font-display font-extrabold text-[clamp(2.4rem,7.8vw,6.25rem)] text-white tracking-[-0.03em] uppercase leading-[1.02] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] flex flex-col items-center text-center w-full">
          <span className="block overflow-hidden py-1">
            <motion.span
              initial={{ y: '115%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block sm:whitespace-nowrap will-change-transform"
            >
              BE THE <span className="text-[#FC6603]">ALPHA</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden py-1">
            <motion.span
              initial={{ y: '115%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block sm:whitespace-nowrap mt-1 sm:mt-2 text-white will-change-transform"
            >
              IN YOUR MARKET.
            </motion.span>
          </span>
        </h1>

        {/* Clear, Prominent Value Proposition Subtext (Schibsted Grotesk, 17px-20px, text-white, line-height: 1.6) */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2 sm:px-4"
        >
          <p className="text-[17px] sm:text-[19px] md:text-[20px] text-white font-normal font-sans leading-[1.6] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            Your competitors are taking the customers that should be yours. We change that. We manage your growth and turn yours into an awesome business the first name in your market that people find, trust, and choose.
          </p>
        </motion.div>

        {/* Two CTAs with Staggered Scale-Up Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
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
        </motion.div>
      </motion.div>

      {/* 06. Interactive Bottom Bar: Clickable "Unlink & Explore" CTA with Entrance Reveal (JetBrains Mono 500, 12px, tracking: 0.18em) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: bottomOpacity }}
        className="relative z-10 w-full flex items-center justify-center font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em] uppercase"
      >
        <button
          type="button"
          onClick={scrollToExplore}
          className="group flex items-center gap-3 cursor-pointer select-none text-[#8A8A8E] hover:text-white transition-colors duration-200"
          data-cursor="SCROLL"
          title="Click to explore and unlink the chain"
        >
          <span className="tracking-[0.18em] font-mono text-[12px] font-medium uppercase group-hover:text-[#FF5A1F] transition-colors">
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
