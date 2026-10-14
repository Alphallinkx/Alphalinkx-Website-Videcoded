import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isFinished, setIsFinished] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const hasLoadedBefore = sessionStorage.getItem('alphalinkx_preloader_seen');
    const hasNoPreloaderParam = window.location.search.includes('no-preloader');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return Boolean(hasLoadedBefore || hasNoPreloaderParam || prefersReducedMotion);
  });

  const lines = [
    '> linking nodes…',
    '> calibrating growth engine…',
    '> synthesizing 3d signal graph…',
    '> rendering experience…',
  ];

  useEffect(() => {
    // Check if user already saw preloader in this session to avoid annoyance on quick refreshes
    const hasLoadedBefore = sessionStorage.getItem('alphalinkx_preloader_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || hasLoadedBefore) {
      setIsFinished(true);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem('alphalinkx_preloader_seen', 'true');
            onComplete?.();
          }, 600);
          return 100;
        }

        // Advance line according to progress
        const next = prev + Math.floor(Math.random() * 8) + 3;
        const boundedNext = Math.min(next, 100);

        if (boundedNext > 75) setCurrentLineIndex(3);
        else if (boundedNext > 50) setCurrentLineIndex(2);
        else if (boundedNext > 25) setCurrentLineIndex(1);

        return boundedNext;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-between overflow-hidden">
        {/* Top Split Half */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: progress === 100 ? '-100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0B] border-b border-white/[0.06] z-10 pointer-events-auto"
        />

        {/* Bottom Split Half */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: progress === 100 ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0B] border-t border-white/[0.06] z-10 pointer-events-auto"
        />

        {/* Center Preloader Content */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: progress === 100 ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pointer-events-auto"
        >
          {/* Logo Mark Connecting Lines Animation */}
          <div className="relative mb-8 w-20 h-20 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#FF5A1F] drop-shadow-[0_0_20px_rgba(255,90,31,0.5)]"
            >
              {/* Outer interlocking ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="250"
                strokeDashoffset={250 - (250 * progress) / 100}
                className="transition-all duration-150 ease-out"
              />
              {/* Connected node links */}
              <path
                d="M30 50 L50 30 L70 50 L50 70 Z"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="2"
                strokeDasharray="160"
                strokeDashoffset={160 - (160 * progress) / 100}
              />
              <circle cx="50" cy="50" r="5" fill="#FF5A1F" />
            </svg>
          </div>

          {/* Huge Numeric Percentage Counter */}
          <div className="font-display font-bold text-7xl md:text-9xl text-white tracking-tighter tabular-nums mb-4">
            {progress}
            <span className="text-[#FF5A1F] text-4xl md:text-6xl font-mono ml-1">%</span>
          </div>

          {/* Terminal-style status typewriter */}
          <div className="h-8 flex items-center justify-center">
            <div className="font-mono text-xs md:text-sm text-[#FF5A1F] tracking-wider uppercase flex items-center gap-2">
              <span>{lines[currentLineIndex]}</span>
              <span className="w-2 h-4 bg-[#FF5A1F] animate-pulse inline-block" />
            </div>
          </div>

          {/* Cheeky Buzz-style footnote */}
          <p className="mt-8 font-mono text-[11px] text-[#8A8A8E] tracking-widest uppercase">
            // Fake loader? Maybe. Good vibes? Definitely.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
