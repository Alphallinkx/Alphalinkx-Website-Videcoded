import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { DIAGNOSIS_CARDS, type DiagnosisCardItem } from '../../content/siteContent';

/**
 * High-Impact Animated Vector Illustrations specifically tailored for each Diagnosis card.
 * Rendered at a responsive 44px–56px scale with 1.5px–1.75px technical strokes,
 * continuous motion, and signature AlphaLinkx brand orange (#FC6603) accents.
 * Marked aria-hidden="true" for accessibility.
 */
const DiagnosisIllustration: React.FC<{ id: DiagnosisCardItem['id'] }> = ({ id }) => {
  const commonSvgClass = "w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 text-white/45 group-hover:text-white/80 transition-colors duration-300";

  switch (id) {
    case 'visibility':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={commonSvgClass}
          aria-hidden="true"
        >
          {/* Radar scope coordinate rings */}
          <circle cx="28" cy="28" r="21" className="stroke-white/15" />
          <circle cx="28" cy="28" r="14" className="stroke-white/25" />
          <circle cx="28" cy="28" r="7" className="stroke-white/35" />

          {/* Precision axis ticks */}
          <line x1="28" y1="5" x2="28" y2="51" className="stroke-white/15 stroke-dasharray-[2_2]" />
          <line x1="5" y1="28" x2="51" y2="28" className="stroke-white/15 stroke-dasharray-[2_2]" />

          {/* Continuous 360° Rotating Radar Sweep Line */}
          <g className="anim-radar-sweep origin-[28px_28px]">
            <line x1="28" y1="28" x2="49" y2="28" className="stroke-[#FC6603] stroke-[1.75]" />
            <polygon points="28,28 49,21 49,28" className="fill-[#FC6603]/25 stroke-none" />
          </g>

          {/* Pulsing Sonar Ping Rings */}
          <circle cx="28" cy="28" r="3.5" className="stroke-[#FC6603] fill-none anim-sonar-ping" />
          <circle cx="28" cy="28" r="3.5" className="stroke-[#FC6603] fill-none anim-sonar-ping-delayed" />

          {/* Local Map Pin Outline with Focal Discovery Beacon */}
          <path
            d="M 28 17 C 24 17 21 20 21 24 C 21 29 28 35 28 35 C 28 35 35 29 35 24 C 35 20 32 17 28 17 Z"
            className="stroke-[#FC6603] fill-[#FC6603]/15 group-hover:fill-[#FC6603]/30 transition-colors duration-300"
          />
          <circle
            cx="28"
            cy="24"
            r="2.5"
            className="fill-[#FC6603] stroke-none anim-beacon-pulse origin-[28px_24px]"
          />

          {/* Search Glass Handle */}
          <line
            x1="43"
            y1="43"
            x2="57"
            y2="57"
            className="stroke-white/50 group-hover:stroke-white stroke-[2.2] transition-colors duration-300"
          />
        </svg>
      );

    case 'website-conversion':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={commonSvgClass}
          aria-hidden="true"
        >
          {/* Browser Window Chrome */}
          <rect
            x="6"
            y="9"
            width="52"
            height="46"
            rx="6"
            className="stroke-white/25 group-hover:stroke-white/45 transition-colors duration-300"
          />
          {/* Browser Header Bar */}
          <line x1="6" y1="20" x2="58" y2="20" className="stroke-white/20" />

          {/* Window Control Dots */}
          <circle cx="13" cy="14.5" r="1.75" className="fill-[#FC6603] stroke-none" />
          <circle cx="19" cy="14.5" r="1.75" className="fill-white/30 stroke-none" />
          <circle cx="25" cy="14.5" r="1.75" className="fill-white/30 stroke-none" />

          {/* Minimalist Webpage Structure Lines */}
          <line x1="13" y1="27" x2="28" y2="27" className="stroke-white/35" />
          <line x1="13" y1="32" x2="23" y2="32" className="stroke-white/20" />

          {/* Fast Visitor Conversion Journey Flow */}
          <circle cx="13" cy="42" r="2.5" className="fill-white/50 anim-step-1" />
          <path
            d="M 13 42 Q 25 42 34 35"
            className="stroke-[#FC6603] stroke-[2] anim-flow-dash"
          />

          {/* High-Intent Conversion CTA Button in Brand Orange */}
          <rect
            x="34"
            y="26"
            width="18"
            height="18"
            rx="3.5"
            className="stroke-[#FC6603] fill-[#FC6603]/20 group-hover:fill-[#FC6603]/35 anim-beacon-pulse transition-all duration-300 origin-[43px_35px]"
          />
          {/* Action Arrow Glyph inside Enquiry Button */}
          <path
            d="M 39 35 L 47 35 M 44 32 L 47 35 L 44 38"
            className="stroke-[#FC6603] stroke-[1.75]"
          />
        </svg>
      );

    case 'social-marketing':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={commonSvgClass}
          aria-hidden="true"
        >
          {/* Primary Audience Engagement Speech Bubble */}
          <path
            d="M 10 16 C 10 12 13 9 20 9 L 40 9 C 47 9 50 12 50 16 L 50 28 C 50 32 47 35 40 35 L 24 35 L 15 42 L 17 35 L 20 35 C 13 35 10 32 10 28 Z"
            className="stroke-white/30 group-hover:stroke-white/50 transition-colors duration-300"
          />

          {/* Conversation Rhythm Dots */}
          <circle cx="22" cy="22" r="2" className="fill-white/40 stroke-none anim-step-1" />
          <circle cx="30" cy="22" r="2" className="fill-white/40 stroke-none anim-step-2" />
          <circle cx="38" cy="22" r="2" className="fill-white/40 stroke-none anim-step-3" />

          {/* High-Value Business Response Hub in Brand Orange */}
          <path
            d="M 28 32 C 28 28 31 25 36 25 L 48 25 C 53 25 56 28 56 32 L 56 42 C 56 46 53 49 48 49 L 44 49 L 40 54 L 41 49 L 36 49 C 31 49 28 46 28 42 Z"
            className="stroke-[#FC6603] fill-[#FC6603]/15 group-hover:fill-[#FC6603]/30 anim-beacon-pulse transition-all duration-300 origin-[42px_39.5px]"
          />

          {/* Radiating Audience Conversation Ripple Arcs */}
          <path
            d="M 43 35 C 45 37 45 39 43 41"
            className="stroke-[#FC6603] stroke-[1.75]"
          />
          <path
            d="M 46 32 C 50 36 50 42 46 45"
            className="stroke-[#FC6603]/60 stroke-[1.5] anim-flow-dash"
          />

          {/* Central Dialogue Spark */}
          <circle cx="37" cy="37" r="1.75" className="fill-[#FC6603] stroke-none" />
        </svg>
      );

    case 'paid-ads':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={commonSvgClass}
          aria-hidden="true"
        >
          {/* Rotating Outer Multi-Channel Reticle (Meta & Google) */}
          <g className="anim-reticle-rotate origin-[32px_32px]">
            <circle cx="32" cy="32" r="22" className="stroke-white/20 stroke-dasharray-[4_5]" />
            <line x1="32" y1="6" x2="32" y2="10" className="stroke-[#FC6603] stroke-[1.75]" />
            <line x1="32" y1="54" x2="32" y2="58" className="stroke-[#FC6603] stroke-[1.75]" />
            <line x1="6" y1="32" x2="10" y2="32" className="stroke-[#FC6603] stroke-[1.75]" />
            <line x1="54" y1="32" x2="58" y2="32" className="stroke-[#FC6603] stroke-[1.75]" />
          </g>

          {/* Steady Mid Audience Calibration Ring */}
          <circle cx="32" cy="32" r="14" className="stroke-white/30 group-hover:stroke-white/50 transition-colors duration-300" />

          {/* Precision Target Brackets */}
          <path d="M 21 26 L 21 21 L 26 21" className="stroke-[#FC6603] stroke-[1.75]" />
          <path d="M 38 21 L 43 21 L 43 26" className="stroke-[#FC6603] stroke-[1.75]" />
          <path d="M 21 38 L 21 43 L 26 43" className="stroke-[#FC6603] stroke-[1.75]" />
          <path d="M 38 43 L 43 43 L 43 38" className="stroke-[#FC6603] stroke-[1.75]" />

          {/* Cardinal Crosshair Ticks */}
          <line x1="32" y1="14" x2="32" y2="18" className="stroke-white/50" />
          <line x1="32" y1="46" x2="32" y2="50" className="stroke-white/50" />
          <line x1="14" y1="32" x2="18" y2="32" className="stroke-white/50" />
          <line x1="46" y1="32" x2="50" y2="32" className="stroke-white/50" />

          {/* High-ROAS Ideal Customer Bullseye in Brand Orange */}
          <circle
            cx="32"
            cy="32"
            r="4.5"
            className="stroke-[#FC6603] fill-[#FC6603]/30 anim-beacon-pulse origin-[32px_32px]"
          />
          <circle cx="32" cy="32" r="1.5" className="fill-[#FC6603] stroke-none" />
        </svg>
      );

    case 'performance-marketing':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={commonSvgClass}
          aria-hidden="true"
        >
          {/* Performance Analytics Coordinate Axes */}
          <path
            d="M 10 12 L 10 52 L 54 52"
            className="stroke-white/30 group-hover:stroke-white/50 transition-colors duration-300 stroke-[1.5]"
          />

          {/* Background Grid Guide Lines */}
          <line x1="10" y1="25" x2="52" y2="25" className="stroke-white/10 stroke-dasharray-[2_3]" />
          <line x1="10" y1="38" x2="52" y2="38" className="stroke-white/10 stroke-dasharray-[2_3]" />
          <line x1="24" y1="12" x2="24" y2="52" className="stroke-white/10 stroke-dasharray-[2_3]" />
          <line x1="38" y1="12" x2="38" y2="52" className="stroke-white/10 stroke-dasharray-[2_3]" />

          {/* Shaded Attribution Area */}
          <polygon
            points="12,47 22,45 36,26 51,14 51,52 12,52"
            className="fill-[#FC6603]/10 stroke-none"
          />

          {/* Upward Ascending Conversion & Attribution Trajectory */}
          <path
            d="M 12 47 C 22 45 28 36 36 26 C 41 20 45 16 51 14"
            className="stroke-[#FC6603] stroke-[2] anim-flow-dash"
          />

          {/* Touchpoint 1: Inbound Campaign Touchpoint */}
          <circle cx="18" cy="45" r="3" className="stroke-white/40 fill-white/10 anim-step-1" />

          {/* Touchpoint 2: Mid-Funnel Conversion Milestone */}
          <circle cx="34" cy="28" r="3.5" className="stroke-[#FC6603] fill-white/15 anim-step-3" />

          {/* Touchpoint 3: Peak Verified ROI Acquisition Beacon */}
          <circle
            cx="51"
            cy="14"
            r="5.5"
            className="stroke-[#FC6603] fill-[#FC6603]/30 group-hover:fill-[#FC6603]/45 anim-beacon-pulse origin-[51px_14px]"
          />
          <path
            d="M 48.5 14 L 50.5 16 L 53.5 12"
            className="stroke-[#FC6603] stroke-[1.75]"
          />
        </svg>
      );

    case 'ai-automation':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={commonSvgClass}
          aria-hidden="true"
        >
          {/* AI Neural Processor / Automation Microchip */}
          <rect
            x="20"
            y="20"
            width="24"
            height="24"
            rx="5"
            className="stroke-[#FC6603] fill-[#FC6603]/15 group-hover:fill-[#FC6603]/30 anim-beacon-pulse transition-all duration-300 origin-[32px_32px]"
          />

          {/* High-Speed Instant Reply Lightning Core */}
          <path
            d="M 33 24 L 28 32 L 32.5 32 L 31 40 L 36.5 31.5 L 32 31.5 Z"
            className="fill-[#FC6603] stroke-[#FC6603] stroke-[0.75]"
          />

          {/* Top Automated Workflow Bus Pins */}
          <line x1="26" y1="20" x2="26" y2="10" className="stroke-white/35" />
          <line x1="32" y1="20" x2="32" y2="8" className="stroke-[#FC6603] stroke-[1.75] anim-pipeline-flow" />
          <line x1="38" y1="20" x2="38" y2="10" className="stroke-white/35" />

          {/* Bottom Automated Follow-Up Pins */}
          <line x1="26" y1="44" x2="26" y2="54" className="stroke-white/35" />
          <line x1="32" y1="44" x2="32" y2="56" className="stroke-[#FC6603] stroke-[1.75] anim-pipeline-flow" />
          <line x1="38" y1="44" x2="38" y2="54" className="stroke-white/35" />

          {/* Left Inbound Task Stream Pins */}
          <line x1="20" y1="26" x2="10" y2="26" className="stroke-white/35" />
          <line x1="20" y1="32" x2="8" y2="32" className="stroke-white/35" />
          <line x1="20" y1="38" x2="10" y2="38" className="stroke-white/35" />

          {/* Right Outbound Instant Response Pins */}
          <line x1="44" y1="26" x2="54" y2="26" className="stroke-white/35" />
          <line x1="44" y1="32" x2="56" y2="32" className="stroke-[#FC6603] stroke-[1.75] anim-pipeline-flow" />
          <line x1="44" y1="38" x2="54" y2="38" className="stroke-white/35" />

          {/* Flowing Automated Task Packets */}
          <circle cx="8" cy="32" r="2" className="fill-white/60 stroke-none anim-step-1" />
          <circle cx="56" cy="32" r="2" className="fill-[#FC6603] stroke-none anim-step-3" />
        </svg>
      );

    default:
      return null;
  }
};

/**
 * Individual Diagnosis Card Component.
 * Pure dark matte surface (#111113) without any blue/slate tint.
 * 
 * Interactive 3D Cursor Physics (Fine Pointer Desktop Only):
 * Controlled, subtle 3D tilt (±4.8° rotateY, ±3.5° rotateX, -3.0px lift) with responsive smoothing (0.075)
 * for a refined, premium agency hover feel.
 * 
 * Compact, Short Card Height:
 * Directly attaches the supporting description below the divider line, eliminating the dead gap.
 */
interface DiagnosisCardProps {
  item: DiagnosisCardItem;
  index: number;
}

const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Detect touch / coarse pointer — disable 3D tilt on touch devices for fluid native scrolling
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch || prefersReduced) return;

    let rafId: number | null = null;
    let targetRx = 0;
    let targetRy = 0;
    let targetLift = 0;
    let targetGlowX = 0;
    let targetGlowY = 0;

    let currentRx = 0;
    let currentRy = 0;
    let currentLift = 0;
    let isHovering = false;

    // Controlled, smooth physics: refined back-and-forth movement without being overly steep
    const lerpFactor = 0.075;

    const updatePhysics = () => {
      // Smoothly interpolate rotation AND vertical lift continuously
      currentRx += (targetRx - currentRx) * lerpFactor;
      currentRy += (targetRy - currentRy) * lerpFactor;
      currentLift += (targetLift - currentLift) * lerpFactor;

      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg) translateY(${currentLift.toFixed(2)}px)`;
      }

      if (glowRef.current && isHovering) {
        glowRef.current.style.background = `radial-gradient(280px circle at ${targetGlowX}px ${targetGlowY}px, rgba(252, 102, 3, 0.10), rgba(255, 255, 255, 0.025) 40%, transparent 80%)`;
      }

      const diffRx = Math.abs(targetRx - currentRx);
      const diffRy = Math.abs(targetRy - currentRy);
      const diffLift = Math.abs(targetLift - currentLift);

      if (isHovering || diffRx > 0.02 || diffRy > 0.02 || diffLift > 0.02) {
        rafId = requestAnimationFrame(updatePhysics);
      } else {
        if (card) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        }
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetGlowX = x;
      targetGlowY = y;

      const normX = (x / rect.width) * 2 - 1;   // -1 (left) to +1 (right)
      const normY = (y / rect.height) * 2 - 1;  // -1 (top) to +1 (bottom)

      // Controlled, tasteful 3D tilt:
      targetRy = normX * 4.8;   // ±4.8 deg side tilt
      targetRx = -normY * 3.5;  // ±3.5 deg vertical tilt

      if (!isHovering) {
        isHovering = true;
        targetLift = -3; // Gentle 3px lift
        if (!rafId) rafId = requestAnimationFrame(updatePhysics);
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      isHovering = true;
      targetLift = -3;

      const rect = card.getBoundingClientRect();
      targetGlowX = e.clientX - rect.left;
      targetGlowY = e.clientY - rect.top;

      if (glowRef.current) glowRef.current.style.opacity = '1';
      if (!rafId) rafId = requestAnimationFrame(updatePhysics);
    };

    const handlePointerLeave = () => {
      isHovering = false;
      targetRx = 0;
      targetRy = 0;
      targetLift = 0; // Smoothly glides back to resting 0px
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (!rafId) rafId = requestAnimationFrame(updatePhysics);
    };

    card.addEventListener('pointermove', handlePointerMove, { passive: true });
    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.52,
        delay: prefersReduced ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div
        ref={cardRef}
        data-diagnosis-id={item.id}
        className="group relative h-full rounded-2xl bg-[#111113] hover:bg-[#141417] border border-white/10 hover:border-[#FC6603]/55 p-4 sm:p-4.5 xl:p-4 2xl:p-5 flex flex-col overflow-hidden shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.85),0_0_24px_rgba(252,102,3,0.12)] transition-shadow duration-500 will-change-transform select-none cursor-default min-h-0 sm:min-h-[285px] lg:min-h-[305px] xl:min-h-[320px] 2xl:min-h-[330px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: 'border-color 0.4s ease, background-color 0.4s ease',
        }}
      >
        {/* Specular Surface Reflection Highlight */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-400 z-0"
        />

        {/* Minimal Corner Technical Tick at Bottom-Right */}
        <div
          aria-hidden="true"
          className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-white/15 group-hover:border-[#FC6603]/60 transition-colors duration-400 pointer-events-none"
          style={{ transform: 'translateZ(14px)' }}
        />

        {/* Top Header Row: Sized compactly to short the length of the cards */}
        <div
          className="relative z-10 flex items-start justify-between h-12 sm:h-14 lg:h-15 mb-2.5 sm:mb-3 shrink-0"
          style={{ transform: 'translateZ(26px)' }}
        >
          {/* Prominent High-Impact SVG Illustration */}
          <div className="h-full flex items-center">
            <DiagnosisIllustration id={item.id} />
          </div>

          {/* Clean Monospace Sequence Index (JetBrains Mono) */}
          <span className="font-mono text-[11px] sm:text-[12px] font-semibold text-white/30 group-hover:text-[#FC6603] transition-colors duration-300 tracking-[0.15em] pt-0.5">
            0{index + 1}
          </span>
        </div>

        {/* Content Area: Single natural flow without any artificial stretching */}
        <div className="relative z-10 flex flex-col" style={{ transform: 'translateZ(18px)' }}>
          {/* Category & Title Block:
              - Mobile (< 640px): h-auto for natural, tight flow.
              - Tablet / Desktop: Calibrated compact height that fits titles cleanly and locks divider position.
          */}
          <div className="h-auto sm:h-[84px] md:h-[90px] lg:h-[102px] xl:h-[116px] 2xl:h-[112px] flex flex-col justify-start shrink-0">
            {/* Category Label in Clean Brand Orange Monospace (JetBrains Mono) */}
            <span className="font-mono text-[10px] sm:text-[10.5px] font-bold text-[#FC6603] uppercase tracking-[0.2em] block mb-1 shrink-0">
              {item.category}
            </span>

            {/* Authoritative Problem Statement Title (Bricolage Grotesque) — 22px on desktop, 17-18px on mobile */}
            <h3 className="font-display font-bold text-[17px] sm:text-[18px] lg:text-[20px] xl:text-[22px] text-white tracking-[-0.02em] leading-[1.2] group-hover:text-white transition-colors duration-300">
              {item.title}
            </h3>
          </div>

          {/* Dedicated Horizontal Divider Line: directly above the description */}
          <div
            aria-hidden="true"
            className="w-full h-[1px] bg-white/[0.08] mt-2.5 mb-2 sm:mt-3 sm:mb-2.5 group-hover:bg-[#FC6603]/35 transition-colors duration-300 shrink-0"
            style={{ transform: 'translateZ(14px)' }}
          />

          {/* Supporting Description Text (Schibsted Grotesk) — sits directly below the line with zero excess space */}
          <p
            className="font-sans pt-[10px] text-[12.5px] sm:text-[13px] xl:text-[12px] 2xl:text-[13px] text-[#A1A1AA] leading-[1.48] font-normal"
            style={{ transform: 'translateZ(12px)' }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Reusable DiagnosisSection Component.
 * Left-aligned editorial agency heading followed by six compact cards in one horizontal row on wide desktop,
 * transitioning gracefully to 3 columns on laptops, 2 on tablets, and 1 on mobile.
 * Features exact typography:
 * - Headings/Titles: 'Bricolage Grotesque' (font-display)
 * - Text/Descriptions: 'Schibsted Grotesk' (font-sans)
 * - Buttons/Accents: 'JetBrains Mono' (font-mono)
 */
export const DiagnosisSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="diagnosis"
      aria-labelledby="diagnosis-heading"
      className="relative py-16 sm:py-24 md:py-32 lg:py-36 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden"
    >
      {/* Top Ambient Subtle Hairline in Brand Orange */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/35 to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-6 2xl:px-10">
        {/* Section Header: Flex layout with Left-Aligned Heading & Right-Aligned "Get a Free Audit" CTA */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10 sm:mb-12 md:mb-16">
          {/* Left Column: Mono Tag, Heading, and Single-Line Supporting Text with Inline Services Link */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-3xl xl:max-w-4xl"
          >
            {/* Section Mono Label (JetBrains Mono) */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2.5 sm:mb-3 flex items-center gap-2">
              <span>//</span>
              <span className="text-white/60">THE DIAGNOSIS</span>
            </div>

            {/* Heading (Bricolage Grotesque) with "chain" moved to line 2 before "breaking?" */}
            <h2
              id="diagnosis-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-white tracking-[-0.03em] leading-[1.08]"
            >
              Where is your growth <br className="hidden sm:inline" />
              chain <span className="text-[#FC6603]">breaking?</span>
            </h2>

            {/* Supporting Text (Schibsted Grotesk) in a single continuous line on desktop with link */}
            <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] text-[#A1A1AA] leading-[1.6] mt-3 sm:mt-4 font-normal whitespace-normal xl:whitespace-nowrap">
              Recognise any of these challenges? Here’s where growth can get held back.{' '}
              <Link
                to="/services"
                className="inline-flex items-center gap-1 font-mono text-[12px] sm:text-[13px] font-semibold text-[#FC6603] hover:text-[#FF8833] transition-colors duration-200 underline underline-offset-4 decoration-[#FC6603]/40 hover:decoration-[#FC6603] whitespace-nowrap ml-1 group/link"
              >
                <span>View our services</span>
                <span className="text-[12px] sm:text-[13px] transition-transform duration-200 group-hover/link:translate-x-1">→</span>
              </Link>
            </p>
          </motion.div>

          {/* Right Column: "Get a Free Audit" Button positioned in front of the section heading on desktop */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:shrink-0 mt-2 sm:mt-3 lg:mt-14 xl:mt-16 self-start"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 md:py-4 rounded-full bg-[#FC6603] text-black font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:bg-white hover:text-black hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Get a Free Audit</span>
              <span className="text-[12px] sm:text-[13px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </motion.div>
        </div>

        {/* Six Diagnosis Cards:
            - 1 column on mobile (< 640px)
            - 2 columns on tablet (sm: 640px - 1023px)
            - 3 columns on laptop / mid-screen (lg: 1024px - 1279px)
            - 6 columns in ONE horizontal row on wide desktop (xl: >= 1280px)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 xl:gap-3 2xl:gap-4.5 items-stretch">
          {DIAGNOSIS_CARDS.map((card, idx) => (
            <DiagnosisCard key={card.id} item={card} index={idx} />
          ))}
        </div>
      </div>

      {/* Bottom Ambient Hairline */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none"
      />
    </section>
  );
};

export default DiagnosisSection;
