'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { MagneticHeading } from '../common/MagneticHeading';
import { Two26Button } from '../common/Two26Button';

export const Two26Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] pt-32 sm:pt-36 pb-20 flex flex-col items-center justify-between overflow-hidden select-none"
      style={{
        background: 'linear-gradient(rgb(250, 227, 226) 73%, rgb(248, 238, 232))',
      }}
    >
      {/* Decorative Left Serpentine SVG Path */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 -translate-y-12 w-[140px] sm:w-[200px] lg:w-[240px] opacity-40 lg:opacity-75 z-0"
      >
        <svg viewBox="0 0 229 599" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.612 225.002 245.612C225.002 121.612 110.502 20.6123 10.502 6.6123"
            stroke="#FF5400"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative Right Serpentine SVG Path */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 -translate-y-8 w-[140px] sm:w-[200px] lg:w-[240px] opacity-40 lg:opacity-75 z-0 scale-x-[-1]"
      >
        <svg viewBox="0 0 229 599" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.612 225.002 245.612C225.002 121.612 110.502 20.6123 10.502 6.6123"
            stroke="#FF5400"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-10 flex flex-col items-center text-center">
        {/* Floating Pills + Headline Container */}
        <div className="relative w-full max-w-5xl mx-auto pt-6 sm:pt-10 pb-8 sm:pb-12">
          {/* Floating Pill 1: Top-Left */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotate: -7, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.08, rotate: -4 }}
            className="hidden sm:inline-flex absolute -top-2 left-6 md:left-12 z-20 bg-[#000000] text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.06em] uppercase shadow-sm cursor-default"
          >
            Boutique growth studio
          </motion.div>

          {/* Floating Pill 2: Top-Right */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotate: 4, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.08, rotate: 7 }}
            className="hidden sm:inline-flex absolute -top-4 right-10 md:right-20 z-20 bg-[#FF5400] text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.06em] uppercase shadow-sm cursor-default"
          >
            Web & AI visibility
          </motion.div>

          {/* Floating Pill 3: Bottom-Right */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotate: -5, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.08, rotate: -2 }}
            className="hidden sm:inline-flex absolute -bottom-4 right-4 md:right-16 z-20 bg-[#FDF8F5] text-[#000000] border border-[#DAD1CC] px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.06em] uppercase shadow-sm cursor-default"
          >
            Engineered for scale
          </motion.div>

          {/* Massive Display Heading with Dual Magnetic Offset */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="px-2"
          >
            <MagneticHeading as="h1" className="text-center">
              <span className="block text-[44px] xs:text-[54px] sm:text-[76px] md:text-[96px] lg:text-[116px] xl:text-[128px] tracking-[-0.035em] leading-[0.82] select-none">
                BE THE <span className="text-[#FF5400]">ALPHA</span>
              </span>
              <span className="block text-[44px] xs:text-[54px] sm:text-[76px] md:text-[96px] lg:text-[116px] xl:text-[128px] tracking-[-0.035em] leading-[0.82] select-none">
                IN YOUR MARKET.
              </span>
            </MagneticHeading>
          </motion.div>
        </div>

        {/* Subtitle statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[16px] sm:text-[18px] md:text-[20px] text-[#333333] max-w-2xl mx-auto leading-[1.45] mb-8 sm:mb-10"
        >
          We engineer high-performance websites, generative AI search visibility, and revenue acquisition engines for brands that refuse to settle.
        </motion.p>

        {/* Call-to-Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mb-14 sm:mb-16"
        >
          <Two26Button to="/contact" variant="black">
            Start a Project
          </Two26Button>
          <Two26Button to="#work" variant="cream">
            See Our Work
          </Two26Button>
        </motion.div>

        {/* Central Showcase Showcase Window / Video Loop */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl aspect-[16/9] sm:aspect-[21/9] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-[#DAD1CC] bg-[#FDF8F5] shadow-[0_20px_50px_rgba(0,0,0,0.06)] group"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://cdn.prod.website-files.com/6a7d9d7d7c99784ba2cac874/6a7db9b17a581584f4171aad_Hero_poster.0000000.jpg"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          >
            <source src="https://cdn.prod.website-files.com/6aaad679fdb9d914f7f52049/6aaad679fdb9d914f7f52055_Hero_mp4.mp4" type="video/mp4" />
          </video>
          {/* Subtle warm light vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default Two26Hero;
