import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SocialItem {
  id: string;
  name: string;
  href: string;
  svg: React.ReactNode;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    href: '#',
    svg: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://instagram.com/alphalinkx',
    svg: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/alphalinkx',
    svg: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    href: 'https://x.com/alphalinkx',
    svg: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: '#',
    svg: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    href: '#',
    svg: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.55c-.01 2.21-.77 4.43-2.26 6.07-1.58 1.76-3.87 2.78-6.26 2.8-2.31.02-4.63-.84-6.28-2.45C.2 20.89-.35 18.59-.19 16.3c.18-2.43 1.4-4.71 3.32-6.17 1.77-1.37 4.07-1.93 6.27-1.55v4.14c-1.18-.32-2.48-.19-3.54.41-.95.53-1.62 1.47-1.78 2.55-.2 1.25.32 2.57 1.34 3.33 1.01.76 2.39.87 3.53.37 1.03-.45 1.72-1.5 1.74-2.63V.02h1.83z" />
      </svg>
    ),
  },
];

export const HeroSocialBar: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-4 sm:left-6 md:left-8 lg:left-10 top-[47%] -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-2 select-none"
    >
      {/* 01. Top Signal Beacon & Antenna */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-3.5 h-3.5 rounded-full bg-[#FF5A1F]/35 animate-ping pointer-events-none" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shadow-[0_0_10px_#FF5A1F]" />
        </div>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#FF5A1F] via-[#FF5A1F]/30 to-transparent" />
      </div>

      {/* 02. Premium "FOLLOW US" Micro Label */}
      <div className="group/label py-1 cursor-default">
        <span
          className="font-mono text-[9.5px] font-medium tracking-[0.28em] text-[#9E9EA4] group-hover/label:text-[#FF5A1F] transition-colors duration-300 uppercase select-none whitespace-nowrap block drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          FOLLOW US
        </span>
      </div>

      {/* 03. Connector Line to Dock */}
      <div className="w-[1px] h-5 bg-gradient-to-b from-transparent via-white/15 to-[#FF5A1F]/60" />

      {/* 04. Frosted Glass Social Dock */}
      <div className="relative group">
        {/* Subtle orange halo glow behind the dock */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-[#FF5A1F]/20 via-transparent to-[#FF5A1F]/15 blur-md pointer-events-none -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col items-center gap-2 p-1.5 rounded-full bg-[#0E0F14]/90 border border-white/15 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(255,90,31,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]">
          {SOCIAL_ITEMS.map((item) => (
            <div key={item.id} className="relative">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="LINK"
                aria-label={item.name}
                className="group/btn relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#FF5A1F]/20 border border-white/5 hover:border-[#FF5A1F]/70 text-[#9E9EA4] hover:text-[#FF5A1F] transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,90,31,0.5)]"
              >
                {item.svg}
              </a>

              {/* Hover Tooltip Floating to the Right */}
              <AnimatePresence>
                {hoveredId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -6, scale: 0.94 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 rounded-full bg-[#101015]/95 border border-[#FF5A1F]/40 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.9),0_0_15px_rgba(255,90,31,0.25)] whitespace-nowrap z-30 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shadow-[0_0_6px_#FF5A1F]" />
                    <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-white">
                      {item.name}
                    </span>
                    {/* Tooltip caret arrow pointing back to dock */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#101015]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* 05. Bottom Terminal Accent Line & Micro-Dot */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-[1px] h-7 bg-gradient-to-t from-transparent via-white/10 to-[#FF5A1F]/40" />
        <div className="w-1 h-1 rounded-full bg-white/20" />
      </div>
    </motion.div>
  );
};

