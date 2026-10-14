import React, { useState } from 'react';
import { BRAND } from '../../content/siteContent';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Direct messaging contact"
      className="fixed bottom-6 right-6 z-[85] flex items-center gap-3 select-none"
    >
      {/* Tooltip badge on hover */}
      <div
        className={`bg-[#111113]/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-white shadow-xl transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="text-[#FF5A1F] mr-1.5 font-bold">//</span>
        <span>Chat with growth squad</span>
      </div>

      <a
        href={BRAND.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#111113] border border-white/15 hover:border-[#FF5A1F] shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Chat with AlphaLinkx team on WhatsApp"
        data-cursor="CHAT"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#FF5A1F]/20 animate-ping opacity-60" />

        {/* Live dot */}
        <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#111113]" />

        {/* WhatsApp Icon */}
        <svg
          className="w-6 h-6 text-white group-hover:text-[#FF5A1F] transition-colors duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </aside>
  );
};
