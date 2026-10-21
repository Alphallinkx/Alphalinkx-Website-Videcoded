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
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/alphalinkx',
    svg: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
];

export const HeroSocialBar: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="absolute left-4 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-4 select-none">
      {/* Top vertical accent line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#FF5A1F]/30 to-[#FF5A1F]" />

      {/* Monospace Micro Label */}
      <span
        className="font-mono text-[9px] tracking-[0.28em] text-[#8A8A8E] uppercase -rotate-90 py-3 whitespace-nowrap"
        style={{ writingMode: 'vertical-rl' }}
      >
        FOLLOW
      </span>

      {/* Social Icons list */}
      <div className="flex flex-col items-center gap-2.5 py-1">
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
              className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-[#121215]/80 hover:bg-[#FF5A1F]/15 border border-white/10 hover:border-[#FF5A1F]/60 text-[#9E9EA4] hover:text-[#FF5A1F] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_18px_rgba(255,90,31,0.45)] backdrop-blur-sm"
            >
              {item.svg}
            </a>

            {/* Hover Tooltip Floating to the Right */}
            <AnimatePresence>
              {hoveredId === item.id && (
                <motion.div
                  initial={{ opacity: 0, x: -6, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -4, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded bg-[#16161A]/95 border border-[#FF5A1F]/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] whitespace-nowrap z-30"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5A1F]">
                    {item.name}
                  </span>
                  {/* Tooltip caret */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#16161A]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom vertical accent line */}
      <div className="w-[1px] h-12 bg-gradient-to-t from-transparent via-white/15 to-[#FF5A1F]" />
    </div>
  );
};
