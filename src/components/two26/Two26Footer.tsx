'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Two26Button } from '../common/Two26Button';
import { ArrowUp } from 'lucide-react';
import { BRAND } from '../../content/siteContent';

export const Two26Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const wordmarkScaleY = useTransform(scrollYProgress, [0.4, 1], [0.85, 1]);
  const wordmarkY = useTransform(scrollYProgress, [0.4, 1], [40, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      className="relative w-full bg-[#FF5400] text-white overflow-hidden select-none"
    >
      {/* Main Top Block */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 pt-20 sm:pt-28 pb-12 sm:pb-16 border-b border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Top Left: CTA Callout */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="font-mono text-[12px] font-bold text-[#000000] uppercase tracking-[0.24em] mb-4">
              // READY TO SCALE?
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.03em] uppercase text-white mb-8">
              Let’s create something unfair.
            </h2>
            <Two26Button to="/contact" variant="black" className="!bg-[#000000] hover:!bg-[#151515]">
              Let’s Talk Today
            </Two26Button>
          </div>

          {/* Top Right: Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-[0.18em] block mb-4">
                Explore
              </span>
              <ul className="space-y-2.5 font-display text-[15px] sm:text-[16px] font-semibold">
                <li>
                  <Link href="/#about" className="hover:text-[#000000] transition-colors">
                    About Studio
                  </Link>
                </li>
                <li>
                  <Link href="/#work" className="hover:text-[#000000] transition-colors">
                    Selected Work
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-[#000000] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-[#000000] transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-[0.18em] block mb-4">
                Capabilities
              </span>
              <ul className="space-y-2.5 font-display text-[15px] sm:text-[16px] font-semibold">
                <li>
                  <Link href="/services/hyper-performance-web" className="hover:text-[#000000] transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/search-ai-visibility" className="hover:text-[#000000] transition-colors">
                    AEO & AI Search
                  </Link>
                </li>
                <li>
                  <Link href="/services/local-dominance-gmb" className="hover:text-[#000000] transition-colors">
                    Local 3-Pack
                  </Link>
                </li>
                <li>
                  <Link href="/services/paid-media-roas" className="hover:text-[#000000] transition-colors">
                    Paid Acquisition
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-[0.18em] block mb-4">
                Connect
              </span>
              <ul className="space-y-2.5 font-display text-[15px] sm:text-[16px] font-semibold">
                <li>
                  <a href="https://linkedin.com/company/alphalinkx" target="_blank" rel="noopener noreferrer" className="hover:text-[#000000] transition-colors">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href="https://x.com/alphalinkx" target="_blank" rel="noopener noreferrer" className="hover:text-[#000000] transition-colors">
                    X (Twitter) ↗
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/alphalinkx" target="_blank" rel="noopener noreferrer" className="hover:text-[#000000] transition-colors">
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} className="hover:text-[#000000] transition-colors">
                    Direct Email ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Architectural Wordmark: ALPHALINKX */}
      <div className="relative w-full overflow-hidden select-none py-6 sm:py-10 flex items-center justify-center cursor-default">
        <motion.div
          ref={wordmarkRef}
          style={{ scaleY: wordmarkScaleY, y: wordmarkY }}
          className="w-full flex items-center justify-center will-change-transform origin-bottom"
        >
          <h2 className="w-full text-center font-display font-black text-[13.5vw] sm:text-[14.5vw] md:text-[15.2vw] lg:text-[15.8vw] leading-[0.76] tracking-[-0.04em] uppercase select-none text-white whitespace-nowrap">
            ALP<span className="text-[#000000]">H</span>ALINKX
          </h2>
        </motion.div>
      </div>

      {/* Slim Black Bottom Strip */}
      <div className="relative z-20 bg-[#000000] text-[#A1A1AA] py-4 sm:py-5 border-t border-black/30">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.16em]">
          <p>© 2026 AlphaLinkx Studio. Crafted for unfair advantage.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-[#FF5400] transition-colors font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Two26Footer;
