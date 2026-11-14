'use client';

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail, ArrowUp } from 'lucide-react';
import { BRAND } from '../../content/siteContent';

export const Footer: React.FC = () => {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/alphalinkx',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/alphalinkx',
      svg: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/alphalinkx',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@alphalinkx',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      className="relative bg-[#FC6603] text-white overflow-hidden select-none"
    >
      {/* Static Textured Orange Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-90"
      >
        <img
          src="/assets/faq-orange-bg.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-20 sm:pt-24 pb-10 sm:pb-14">
        {/* Navigation Grid (Brand Column + 4 Ordered Link Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 pb-16 sm:pb-20 border-b border-white/20 items-start">
          
          {/* =========================================================================
              COLUMN 1: PROMINENT ALL-WHITE BRAND LOGO, COMPELLING CTA DESCRIPTION, SOCIAL ICONS
             ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              {/* Prominent All-White Official Logo Lockup */}
              <Link
                to="/"
                aria-label="AlphaLinkx Home"
                className="inline-block group transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src="/assets/alphalinkx-white-logo.png"
                  alt="AlphaLinkx Digital Agency"
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-md select-none"
                />
              </Link>

              {/* Conversion-Approaching White Description */}
              <p className="font-sans text-[15px] sm:text-[16px] text-white/95 font-medium leading-[1.65] mt-5 max-w-sm">
                Engineering unfair commercial advantage. We architect high-performance websites, generative AI search visibility, and revenue acquisition engines for brands ready to scale.
              </p>
            </div>

            {/* Circular Social Media Icons (White outlines, hover solid white with orange icon) */}
            <div className="mt-8 pt-2">
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-full border border-white/40 hover:border-white bg-white/10 hover:bg-white text-white hover:text-[#FC6603] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
              COLUMNS 2-5: STRICT ORDER (NO SLASHES, BOLD HEADINGS, WHITE ICONS)
              1. Quick Links  2. Services  3. Legal  4. Contact Us
             ========================================================================= */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
            
            {/* 1. Quick Links */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-[20px] sm:text-[22px] text-white tracking-[-0.02em]">
                Quick Links
              </h3>
              <ul className="space-y-3 font-sans text-[15px] sm:text-[15.5px] font-medium text-white/90">
                <li>
                  <Link to="/" className="hover:text-[#0A0A0B] transition-colors block">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="/#about" className="hover:text-[#0A0A0B] transition-colors block">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/#services" className="hover:text-[#0A0A0B] transition-colors block">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#work" className="hover:text-[#0A0A0B] transition-colors block">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="/#process" className="hover:text-[#0A0A0B] transition-colors block">
                    4-Node Process
                  </a>
                </li>
                <li>
                  <a href="/#faq" className="hover:text-[#0A0A0B] transition-colors block">
                    FAQs
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#0A0A0B] transition-colors block">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* 2. Services */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-[20px] sm:text-[22px] text-white tracking-[-0.02em]">
                Services
              </h3>
              <ul className="space-y-3 font-sans text-[15px] sm:text-[15.5px] font-medium text-white/90">
                <li>
                  <Link to="/services/search-ai-visibility" className="hover:text-[#0A0A0B] transition-colors block">
                    Search & AI Visibility
                  </Link>
                </li>
                <li>
                  <Link to="/services/hyper-performance-web" className="hover:text-[#0A0A0B] transition-colors block">
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link to="/services/local-dominance-gmb" className="hover:text-[#0A0A0B] transition-colors block">
                    GMB & Local Dominance
                  </Link>
                </li>
                <li>
                  <Link to="/services/paid-media-roas" className="hover:text-[#0A0A0B] transition-colors block">
                    Paid Media & High-ROAS
                  </Link>
                </li>
                <li>
                  <Link to="/services/full-stack-retainer" className="hover:text-[#0A0A0B] transition-colors block">
                    Full-Stack Retainer
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-[#0A0A0B] transition-colors inline-flex items-center gap-1.5 text-[14px] font-semibold pt-1">
                    <span>View All Services</span>
                    <span>→</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. Legal */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-[20px] sm:text-[22px] text-white tracking-[-0.02em]">
                Legal
              </h3>
              <ul className="space-y-3 font-sans text-[15px] sm:text-[15.5px] font-medium text-white/90">
                <li>
                  <Link to="/privacy-policy" className="hover:text-[#0A0A0B] transition-colors block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="hover:text-[#0A0A0B] transition-colors block">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy#cookies" className="hover:text-[#0A0A0B] transition-colors block">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service#security" className="hover:text-[#0A0A0B] transition-colors block">
                    Security & SLA
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#0A0A0B] transition-colors block">
                    Compliance Audit
                  </Link>
                </li>
              </ul>
            </div>

            {/* 4. Contact Us (Only Phone & Email with White Background & Orange Icon) */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h3 className="font-display font-extrabold text-[20px] sm:text-[22px] text-white tracking-[-0.02em]">
                Contact Us
              </h3>
              
              <div className="space-y-5 pt-1">
                {/* Phone */}
                <a
                  href={`tel:${BRAND.phone}`}
                  className="group flex items-center gap-3.5 text-left transition-transform hover:translate-x-1"
                >
                  <div className="w-11 h-11 rounded-full bg-white text-[#FC6603] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Phone className="w-5 h-5 stroke-[2.25]" />
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] font-bold text-white/80 uppercase tracking-[0.18em]">
                      Phone No
                    </span>
                    <span className="font-sans text-[14.5px] sm:text-[15px] font-bold text-white group-hover:text-[#0A0A0B] transition-colors leading-tight block">
                      {BRAND.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="group flex items-center gap-3.5 text-left transition-transform hover:translate-x-1"
                >
                  <div className="w-11 h-11 rounded-full bg-white text-[#FC6603] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                    <Mail className="w-5 h-5 stroke-[2.25]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[11px] font-bold text-white/80 uppercase tracking-[0.18em]">
                      Email
                    </span>
                    <span className="font-sans text-[14.5px] sm:text-[15px] font-bold text-white group-hover:text-[#0A0A0B] transition-colors leading-tight truncate block">
                      {BRAND.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          GIANT BOTTOM ARCHITECTURAL WORDMARK: "ALPHALINKX"
          - Full-bleed edge-to-edge massive typography (inspired by reference "TWO 26")
          - Dynamic Mouse-Tracking Spotlight: pure white base, turns black wherever cursor moves
          - Beautiful smooth entrance animation
         ========================================================================= */}
      <div
        ref={wordmarkRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-full overflow-hidden select-none pt-2 sm:pt-4 pb-4 sm:pb-8 px-2 sm:px-4 flex items-center justify-center cursor-default"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center"
        >
          <h2
            style={{
              backgroundImage: isHovered
                ? `radial-gradient(circle 280px at ${spotlightPos.x}% ${spotlightPos.y}%, #0A0A0B 0%, #0A0A0B 35%, rgba(10, 10, 11, 0.85) 55%, rgba(255, 255, 255, 0.95) 75%, #FFFFFF 100%)`
                : 'linear-gradient(to bottom, #FFFFFF, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="w-full text-center font-display font-black text-[13.5vw] sm:text-[14.5vw] md:text-[15.2vw] lg:text-[15.8vw] leading-[0.76] tracking-[-0.04em] uppercase select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.12)] whitespace-nowrap"
          >
            ALPHALINKX
          </h2>
        </motion.div>
      </div>

      {/* =========================================================================
          SLIM BLACK BOTTOM STRIP (Matching user reference)
         ========================================================================= */}
      <div className="relative z-20 bg-[#0A0A0B] border-t border-white/10 py-4 sm:py-5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] sm:text-[12px] font-medium text-[#A1A1AA] uppercase tracking-[0.16em]">
          <p>© 2026 All Rights Reserved by AlphaLinkx.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-[#FF5A1F] transition-colors font-bold uppercase cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
