'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'motion/react';
import { HeroParticles } from './HeroParticles';
import { HeroSocialBar } from './HeroSocialBar';
import { Reveal, MaskLine, MagneticButton } from '../common/MotionComponents';

// Dynamic import with ssr: false for lightning-fast initial load & zero hydration issues
const HeroScene3D = dynamic(() => import('../3d/HeroScene3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-[2] bg-transparent" />
  ),
});

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
      style={{
        background: 'linear-gradient(rgb(250, 227, 226) 73%, rgb(248, 238, 232))',
      }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-28 pb-10 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* 01. Two26 Warm Peachy-Cream Ambient Glow Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft warm peach radial highlight behind the 3D chain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 42%, rgba(255, 84, 0, 0.12), rgba(250, 227, 226, 0.4) 45%, transparent 72%)',
          }}
        />

        {/* Top subtle warmth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 35% at 50% 0%, rgba(255, 84, 0, 0.08), transparent 70%)',
          }}
        />

        {/* Bottom smooth fade to canvas */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8EEE8] to-transparent pointer-events-none" />
      </div>

      {/* 02. Feather-Light Interactive Live Particles */}
      <HeroParticles />

      {/* 03. 3D WebGL Canvas Layer (Interlocking Links with Scroll Physics) */}
      <HeroScene3D scroll={scrollRef} />

      {/* 04. Bottom Fade (Dips 3D chain smoothly into peachy canvas on scroll) */}
      <div className="absolute inset-x-0 bottom-0 h-20 sm:h-44 pointer-events-none bg-gradient-to-t from-[#F8EEE8] via-[#F8EEE8]/85 to-transparent z-[2]" />

      {/* 05. Vertical Social Media Icons & Links on the Left */}
      <HeroSocialBar />

      {/* 05. Prominent, Powerful Hero Typography & Content */}
      <motion.div
        style={{
          opacity: headlineOpacity,
          y: headlineY,
          scale: headlineScale,
        }}
        className="relative z-10 my-auto py-8 text-center w-full max-w-7xl mx-auto flex flex-col items-center justify-center will-change-transform px-2 sm:px-4"
      >
        {/* Main Prominent Headline (Bricolage Grotesque 800, tracking: -0.03em, leading: 1.02) */}
        <h1 className="font-display font-extrabold text-[clamp(2.85rem,8.5vw,6.25rem)] text-[#000000] tracking-[-0.03em] uppercase leading-[1.05] sm:leading-[1.02] flex flex-col items-center text-center w-full">
          <span className="block overflow-hidden py-1 sm:py-1.5">
            <span className="block sm:whitespace-nowrap will-change-transform">
              BE THE <span className="text-[#FF5400]">ALPHA</span>
            </span>
          </span>
          <span className="block overflow-hidden py-1 sm:py-1.5">
            <span className="block sm:whitespace-nowrap mt-1 sm:mt-2 text-[#000000] will-change-transform">
              IN YOUR MARKET.
            </span>
          </span>
        </h1>

        {/* Clear, Prominent Value Proposition Subtext (Schibsted Grotesk, 17px-20px, text-[#333333], line-height: 1.6) */}
        <div className="mt-6 sm:mt-8 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-2 sm:px-4">
          <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[#333333] font-normal font-sans leading-[1.6]">
            Your competitors are taking the customers that should be yours. We change that. We manage your growth and turn yours into an awesome business the first name in your market that people find, trust, and choose.
          </p>
        </div>

        {/* Two CTAs: Two26 Signature Black Pill & Surface Pill */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="/contact"
            variant="black"
            dataCursor="CONNECT"
          >
            Start a Project
          </MagneticButton>

          <MagneticButton
            href="/#work"
            variant="white"
            dataCursor="EXPLORE"
          >
            See Our Work
          </MagneticButton>
        </div>
      </motion.div>

      {/* 06. Interactive Bottom Bar: Clickable "Unlink & Explore" CTA (JetBrains Mono 500, 12px, tracking: 0.18em) */}
      <motion.div
        style={{ opacity: bottomOpacity }}
        className="relative z-10 w-full flex items-center justify-center font-mono text-[12px] font-medium text-[#555555] tracking-[0.18em] uppercase"
      >
        <button
          type="button"
          onClick={scrollToExplore}
          className="group flex items-center gap-3 cursor-pointer select-none text-[#555555] hover:text-[#000000] transition-colors duration-200"
          data-cursor="SCROLL"
          title="Click to explore and unlink the chain"
        >
          <span className="tracking-[0.18em] font-mono text-[12px] font-medium uppercase group-hover:text-[#FF5400] transition-colors">
            UNLINK TO EXPLORE THE ENGINE ↓
          </span>
          <div className="w-4 h-8 rounded-full border border-[#DAD1CC] group-hover:border-[#FF5400] flex items-start justify-center p-1 transition-colors bg-[#FDF8F5]">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#FF5400]"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
