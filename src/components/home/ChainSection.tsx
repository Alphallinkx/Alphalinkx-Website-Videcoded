import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { CHAIN_LINKS } from '../../content/siteContent';

/**
 * Technical Micro-Illustrations for each Growth Stage
 * Designed specifically to match AlphaLinkx dark-tech aesthetic:
 * 1.5px technical strokes, signature #FC6603 neon orange accents, 
 * subtle animated coordinates, and responsive scaling.
 */
const StageIllustration: React.FC<{ stageId: string; isHovered: boolean }> = ({ stageId, isHovered }) => {
  const prefersReduced = useReducedMotion();

  switch (stageId) {
    case 'be-found':
      return (
        <svg
          viewBox="0 0 52 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-white/50 group-hover:text-white transition-colors duration-300"
          aria-hidden="true"
        >
          {/* Radar scope rings */}
          <circle cx="26" cy="26" r="20" className="stroke-white/10" />
          <circle cx="26" cy="26" r="13" className="stroke-white/20" />
          <circle cx="26" cy="26" r="6" className="stroke-white/30" />
          
          {/* Technical crosshairs */}
          <line x1="26" y1="6" x2="26" y2="46" className="stroke-white/15 stroke-dasharray-[2_2]" />
          <line x1="6" y1="26" x2="46" y2="26" className="stroke-white/15 stroke-dasharray-[2_2]" />

          {/* Radar Sweep Arc */}
          <path
            d="M 26 26 L 44 18 A 20 20 0 0 0 26 6 Z"
            className={`transition-opacity duration-300 ${
              isHovered ? 'fill-[#FC6603]/25 stroke-[#FC6603]' : 'fill-[#FC6603]/10 stroke-[#FC6603]/60'
            }`}
          />

          {/* Focal Discovery Beacon */}
          <circle
            cx="35"
            cy="17"
            r="3"
            className="fill-[#FC6603] stroke-none shadow-[0_0_8px_#FC6603]"
          />
          <circle
            cx="35"
            cy="17"
            r="6"
            className={`stroke-[#FC6603]/50 fill-none ${prefersReduced ? '' : 'animate-ping origin-[35px_17px]'}`}
          />
        </svg>
      );

    case 'be-clicked':
      return (
        <svg
          viewBox="0 0 52 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-white/50 group-hover:text-white transition-colors duration-300"
          aria-hidden="true"
        >
          {/* Speed & Velocity Burst lines */}
          <line x1="8" y1="14" x2="16" y2="14" className="stroke-[#FC6603]/60 stroke-dasharray-[3_2]" />
          <line x1="6" y1="22" x2="18" y2="22" className="stroke-[#FC6603] stroke-[1.75]" />
          <line x1="10" y1="30" x2="17" y2="30" className="stroke-[#FC6603]/40" />

          {/* Precision Target Ripple */}
          <circle cx="32" cy="28" r="14" className="stroke-white/10" />
          <circle cx="32" cy="28" r="8" className="stroke-white/20" />

          {/* Interactive Cursor Pointer */}
          <path
            d="M 22 12 L 22 36 L 27 30 L 34 38 L 38 34 L 31 26 L 38 24 Z"
            className={`transition-all duration-300 ${
              isHovered
                ? 'fill-[#FC6603] stroke-[#FC6603] translate-x-0.5 -translate-y-0.5 drop-shadow-[0_0_10px_rgba(252,102,3,0.5)]'
                : 'fill-white/10 stroke-white/80'
            }`}
          />
          <circle cx="22" cy="12" r="2" className="fill-[#FC6603] stroke-none" />
        </svg>
      );

    case 'be-trusted':
      return (
        <svg
          viewBox="0 0 52 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-white/50 group-hover:text-white transition-colors duration-300"
          aria-hidden="true"
        >
          {/* Cryptographic Shield Outline */}
          <path
            d="M 26 8 L 40 14 C 40 28 26 38 26 44 C 26 38 12 28 12 14 Z"
            className={`transition-all duration-300 ${
              isHovered
                ? 'stroke-[#FC6603] fill-[#FC6603]/10 drop-shadow-[0_0_12px_rgba(252,102,3,0.3)]'
                : 'stroke-white/30 fill-white/[0.03]'
            }`}
          />

          {/* Certified Verification Checkmark */}
          <path
            d="M 20 26 L 24 30 L 32 20"
            className={`transition-colors duration-300 stroke-[2] ${
              isHovered ? 'stroke-[#FC6603]' : 'stroke-white/80'
            }`}
          />

          {/* Trust Stars / Authority Constellation */}
          <circle cx="18" cy="11" r="1.5" className="fill-[#FC6603] stroke-none" />
          <circle cx="26" cy="5" r="1.5" className="fill-[#FC6603] stroke-none" />
          <circle cx="34" cy="11" r="1.5" className="fill-[#FC6603] stroke-none" />
        </svg>
      );

    case 'be-chosen':
    default:
      return (
        <svg
          viewBox="0 0 52 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-white/50 group-hover:text-white transition-colors duration-300"
          aria-hidden="true"
        >
          {/* Compounding Revenue Loop / Flywheel */}
          <circle cx="26" cy="26" r="17" className="stroke-white/10 stroke-dasharray-[4_3]" />
          
          <path
            d="M 26 9 A 17 17 0 0 1 43 26"
            className="stroke-[#FC6603] stroke-[2]"
          />
          <polygon
            points="43,26 39,21 47,21"
            className="fill-[#FC6603] stroke-none"
          />

          <path
            d="M 26 43 A 17 17 0 0 1 9 26"
            className="stroke-[#FC6603] stroke-[2]"
          />
          <polygon
            points="9,26 13,31 5,31"
            className="fill-[#FC6603] stroke-none"
          />

          {/* Central Conversion Nexus */}
          <circle
            cx="26"
            cy="26"
            r="5"
            className={`transition-all duration-300 ${
              isHovered
                ? 'fill-[#FC6603] stroke-[#FC6603] drop-shadow-[0_0_10px_rgba(252,102,3,0.6)]'
                : 'fill-white/10 stroke-white/40'
            }`}
          />
          <circle cx="26" cy="26" r="2" className="fill-white stroke-none" />
        </svg>
      );
  }
};

/**
 * THE CHAIN SECTION
 * High-Density 4-Station Interconnected Growth Pipeline
 *
 * Designed to mirror AlphaLinkx's UI/UX system:
 * - Partner pill monograms and badges ([01], [02], [03], [04])
 * - JetBrains Mono stage indicators & telemetry metadata
 * - High-speed desktop interconnect bus showing continuous data flow
 * - 100% lightweight & responsive (zero heavy layout recalculations)
 */
export const ChainSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  // Technical category classification matching AlphaLinkx engineering stack
  const stageCategories = [
    'DISCOVERY & AI SEARCH',
    'CONVERSION & UX SPEED',
    'AUTHORITY & TRUST',
    'AUTOMATION & RETENTION',
  ];

  // Smooth scroll handler for anchor links
  const handleScrollToAudit = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId) || document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="chain"
      aria-labelledby="chain-heading"
      className="relative py-20 sm:py-24 md:py-32 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden"
    >
      {/* Top Ambient Hairline Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/30 to-transparent pointer-events-none"
      />

      {/* Subtle Background Radial Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl"
      />

      <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Section Mono Label */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2.5 sm:mb-3 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="text-white/60">04 THE GROWTH CHAIN</span>
            </div>

            {/* Display Heading */}
            <h2
              id="chain-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white tracking-[-0.03em] leading-[1.08]"
            >
              Four links. <span className="text-[#FC6603]">One unbreakable chain.</span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#A1A1AA] leading-[1.6] mt-3 sm:mt-4 font-normal max-w-2xl">
              Growth isn’t one isolated service — it’s a connected pipeline. If even one link leaks, your customer acquisition stalls. We engineer, repair, and strengthen all four.
            </p>
          </motion.div>

          {/* Right Column: Status HUD Badge */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 self-start lg:self-end shrink-0"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] tracking-[0.16em] uppercase text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#FC6603] animate-pulse" />
              <span>[ PIPELINE SYNCHRONIZED ]</span>
            </div>
          </motion.div>
        </div>

        {/* ================= 4 CONNECTED CHAIN STATIONS ================= */}
        <div className="relative">
          {/* Connecting Data Bus Line (Desktop only) */}
          <div
            aria-hidden="true"
            className="hidden xl:block absolute top-[52px] inset-x-12 h-[2px] bg-gradient-to-r from-[#FC6603]/30 via-white/10 to-[#FC6603]/30 pointer-events-none z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 relative z-10 items-stretch">
            {CHAIN_LINKS.map((link, idx) => {
              const isSelected = activeNode === idx;
              const categoryTag = stageCategories[idx] || 'CORE PIPELINE';

              return (
                <motion.div
                  key={link.id}
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setActiveNode(idx)}
                  className={`group relative rounded-2xl p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-[#14161F]/90 border-[#FC6603]/50 shadow-[0_0_36px_rgba(252,102,3,0.15)] -translate-y-1'
                      : 'bg-[#111113]/60 hover:bg-[#13151D]/80 border-white/[0.08] hover:border-white/20'
                  } border backdrop-blur-xl`}
                >
                  {/* Watermark Ghost Word in Background */}
                  <span
                    aria-hidden="true"
                    className={`font-display font-extrabold text-[5rem] sm:text-[5.5rem] tracking-tighter transition-all duration-500 pointer-events-none select-none absolute right-2 bottom-12 leading-none ${
                      isSelected ? 'text-[#FC6603]/[0.06] translate-x-0' : 'text-white/[0.02] translate-x-2'
                    }`}
                  >
                    {link.ghostWord}
                  </span>

                  <div>
                    {/* Top Station Header */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      {/* Monogram Box (Matching the site's partner badges) */}
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono text-[13px] font-bold transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FC6603] text-black border-[#FC6603] shadow-[0_0_16px_rgba(252,102,3,0.4)]'
                            : 'bg-white/[0.04] text-white/80 border-white/10 group-hover:border-[#FC6603]/40 group-hover:text-[#FC6603]'
                        }`}
                      >
                        {link.number}
                      </div>

                      {/* Technical Category Tag */}
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-white/50 group-hover:text-white/80 tracking-[0.16em] uppercase transition-colors">
                        {categoryTag}
                      </span>

                      {/* Node Status Indicator */}
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FC6603] ring-4 ring-[#FC6603]/20 shadow-[0_0_10px_#FC6603]'
                            : 'bg-white/20 group-hover:bg-[#FC6603]/60'
                        }`}
                      />
                    </div>

                    {/* Vector Tech Micro-Illustration & Title */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-[#FC6603]/30 transition-colors shrink-0">
                        <StageIllustration stageId={link.id} isHovered={isSelected} />
                      </div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-[26px] text-white tracking-[-0.02em] leading-tight group-hover:text-[#FC6603] transition-colors duration-200">
                        {link.title}
                      </h3>
                    </div>

                    {/* Pain & Solution Hook */}
                    <div className="font-sans text-[14px] sm:text-[14.5px] leading-[1.65] text-[#A1A1AA] mb-6">
                      <b className="text-white font-semibold block mb-1.5">
                        {link.painBold}
                      </b>
                      <span>{link.painText}</span>
                    </div>

                    {/* Technical Capability Pills */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8">
                      {link.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10.5px] sm:text-[11px] font-medium tracking-[0.06em] text-white/70 uppercase px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] group-hover:border-white/15 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between mt-auto">
                    <a
                      href={link.learnHref}
                      onClick={(e) => handleScrollToAudit(e, link.learnHref)}
                      className="inline-flex items-center gap-2 font-mono text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#FC6603] group-hover:text-white transition-colors"
                    >
                      <span>{link.learnText}</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
                    </a>

                    <span className="font-mono text-[10px] text-white/40 tracking-[0.14em] uppercase">
                      {link.ghostCaption}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM PIPELINE DIAGNOSTIC HUD ================= */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-12 rounded-2xl bg-[#111113]/60 border border-white/[0.08] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-md"
        >
          {/* Left: Chain Icon & Diagnostic Philosophy */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-xl bg-[#FC6603]/10 border border-[#FC6603]/30 flex items-center justify-center text-[#FC6603] shrink-0 shadow-[0_0_20px_rgba(252,102,3,0.15)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M10 14a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
                <path d="M14 10a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
              </svg>
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold text-[#FC6603] uppercase tracking-[0.2em] mb-1">
                // UNBROKEN REVENUE ASSURANCE
              </div>
              <p className="font-sans text-[14px] sm:text-[15px] text-[#A1A1AA] leading-relaxed">
                A funnel breaks at its weakest link. We audit every touchpoint, locate your leak, and strengthen the entire chain.
              </p>
            </div>
          </div>

          {/* Right: Direct Audit CTA */}
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FC6603] text-black font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:bg-white hover:text-black hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shrink-0 text-center"
          >
            <span>Diagnose My Chain Free</span>
            <span className="text-[12px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ChainSection;