'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Check } from 'lucide-react';

interface ConversionScenario {
  query: string;
  resultTitle: string;
  resultSubtitle: string;
  metric: string;
}

const SCENARIOS: ConversionScenario[] = [
  {
    query: 'Florist near me',
    resultTitle: 'Consultation',
    resultSubtitle: 'booked',
    metric: '+340% Local Footprint',
  },
  {
    query: 'Emergency Dental Care',
    resultTitle: 'New Patient',
    resultSubtitle: 'scheduled',
    metric: 'Rank #1 on Google AI',
  },
  {
    query: 'B2B Enterprise SaaS',
    resultTitle: 'Demo Meeting',
    resultSubtitle: 'confirmed',
    metric: '$2.8M Pipeline Value',
  },
  {
    query: 'Luxury Architect NYC',
    resultTitle: 'Project Brief',
    resultSubtitle: 'received',
    metric: '6.8x ROAS on Ads',
  },
];

export const Two26HeroConversion: React.FC = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [pulseActive, setPulseActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Mouse tilt for 3D miniature storefront
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScenario = SCENARIOS[scenarioIndex];

  // Typing and transition loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const targetText = currentScenario.query;

    if (isTyping) {
      if (displayText.length < targetText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        }, 65);
      } else {
        // Finished typing query: trigger pulse along wire
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          setPulseActive(true);

          // After pulse travels to destination (approx 1.4s), trigger celebration
          setTimeout(() => {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 1200);
          }, 1100);

          // Hold scenario before switching to next
          setTimeout(() => {
            setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
            setDisplayText('');
            setIsTyping(true);
            setPulseActive(false);
          }, 3800);
        }, 500);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, scenarioIndex, currentScenario.query]);

  // Handle subtle 3D tilt on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 8), y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 select-none"
    >
      {/* Outer Scene Container */}
      <div className="relative w-full min-h-[290px] sm:min-h-[340px] flex items-center justify-between">
        
        {/* SVG Connecting Signal Wire Layer */}
        <svg
          viewBox="0 0 860 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        >
          <defs>
            {/* Glowing gradient for the traveling signal */}
            <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5400" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FF7733" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF5400" stopOpacity="0.9" />
            </linearGradient>

            <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#FF5400" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Left Wire: Search Pill -> Storefront Entrance */}
          <motion.path
            d="M 230 152 C 290 152, 330 185, 385 188"
            stroke="url(#wireGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#wireGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Right Wire: Storefront Exit -> Consultation Card */}
          <motion.path
            d="M 475 190 C 530 190, 580 155, 640 152"
            stroke="url(#wireGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#wireGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Orange Junction Sphere / Bead on the Right Wire */}
          <motion.circle
            cx="580"
            cy="166"
            r="6"
            fill="#FF5400"
            stroke="#FFFFFF"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{
              scale: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
            }}
          />

          {/* Traveling Signal Pulse Bead (Flows from Search Pill -> Shop -> Booked Card) */}
          {pulseActive && (
            <>
              {/* Pulse along Left Wire */}
              <motion.circle
                r="5"
                fill="#FF5400"
                filter="url(#wireGlow)"
                initial={{ cx: 230, cy: 152, opacity: 0 }}
                animate={{
                  cx: [230, 310, 385],
                  cy: [152, 172, 188],
                  opacity: [0, 1, 1],
                }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
              />

              {/* Pulse along Right Wire */}
              <motion.circle
                r="5"
                fill="#FF5400"
                filter="url(#wireGlow)"
                initial={{ cx: 475, cy: 190, opacity: 0 }}
                animate={{
                  cx: [475, 560, 640],
                  cy: [190, 170, 152],
                  opacity: [0, 1, 1],
                }}
                transition={{ duration: 0.65, delay: 0.55, ease: 'easeInOut' }}
              />
            </>
          )}
        </svg>

        {/* ------------------------------------------------------------- */}
        {/* LEFT COMPONENT: Floating Search Query Pill */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
            rotate: [-0.8, 0.8, -0.8],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-20 shrink-0"
        >
          <div className="bg-[#FDF8F5] border border-[#DAD1CC] shadow-[0_12px_30px_rgba(0,0,0,0.06),_0_2px_6px_rgba(0,0,0,0.03)] px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-105 duration-300">
            {/* Orange Magnifying Search Icon */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FF5400]/12 flex items-center justify-center shrink-0">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5400] stroke-[2.5]" />
            </div>

            {/* Dynamic Search Query Text */}
            <div className="font-display font-semibold text-[13px] sm:text-[16px] text-[#000000] tracking-tight whitespace-nowrap min-w-[120px] sm:min-w-[150px]">
              <span>{displayText}</span>
              <span className="inline-block w-[2px] h-4 bg-[#FF5400] ml-0.5 animate-pulse align-middle" />
            </div>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* CENTER COMPONENT: 3D Isometric Florist Storefront Miniature */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          animate={{
            y: [-3, 3, -3],
            scale: [1, 1.008, 1],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative z-20 flex flex-col items-center justify-center shrink-0 w-[180px] sm:w-[250px] md:w-[290px] mx-auto cursor-pointer group"
        >
          {/* Soft Ground Contact Shadow */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 w-[78%] h-7 bg-black/15 blur-lg rounded-[100%] pointer-events-none group-hover:scale-105 transition-transform duration-500"
          />

          {/* High-Resolution 3D Storefront Image */}
          <img
            src="/assets/storefront-2x.png"
            alt="3D High-Converting Storefront Architecture"
            className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] group-hover:scale-[1.03] transition-transform duration-500"
          />

          {/* Interactive Tooltip on Hover */}
          <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#000000] text-white text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md whitespace-nowrap">
            Converted In 18ms
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* RIGHT COMPONENT: Floating Consultation Booked Card */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          animate={{
            y: [4, -4, 4],
            rotate: [0.8, -0.8, 0.8],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-20 shrink-0"
        >
          <div
            className={`bg-[#FDF8F5] border transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.06),_0_2px_6px_rgba(0,0,0,0.03)] px-4 sm:px-6 py-3 sm:py-4 rounded-[20px] sm:rounded-[24px] flex items-center gap-3 sm:gap-4 hover:scale-105 ${
              showCelebration
                ? 'border-[#FF5400] ring-4 ring-[#FF5400]/20 shadow-[0_16px_36px_rgba(255,84,0,0.22)]'
                : 'border-[#DAD1CC]'
            }`}
          >
            {/* Orange Circular Checkmark Badge */}
            <div
              className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FF5400] flex items-center justify-center text-white shrink-0 shadow-[0_4px_12px_rgba(255,84,0,0.35)] transition-transform duration-300 ${
                showCelebration ? 'scale-125 rotate-12' : 'scale-100'
              }`}
            >
              <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.8]" />
            </div>

            {/* Result Text */}
            <div className="flex flex-col text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScenario.resultTitle}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="font-display font-bold text-[13px] sm:text-[16px] text-[#000000] leading-none block">
                    {currentScenario.resultTitle}
                  </span>
                  <span className="font-display font-bold text-[13px] sm:text-[16px] text-[#000000] leading-tight block mt-0.5">
                    {currentScenario.resultSubtitle}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dynamic Metric Pill Floating Below */}
          <div className="absolute -bottom-6 right-2 sm:right-4 bg-[#FF5400]/10 border border-[#FF5400]/25 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-bold text-[#FF5400] shadow-sm whitespace-nowrap">
            {currentScenario.metric}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Two26HeroConversion;
