import React from 'react';

export const TrustMarquee: React.FC = () => {
  const tools = [
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/ffffff' },
    { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/ffffff' },
    { name: 'Three.js', logo: 'https://cdn.simpleicons.org/threedotjs/ffffff' },
    { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/ffffff' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
    { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/ffffff' },
    { name: 'Prisma ORM', logo: 'https://cdn.simpleicons.org/prisma/ffffff' },
    { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/ffffff' },
    { name: 'Amazon Web Services', logo: 'https://cdn.simpleicons.org/amazonwebservices/ffffff' },
  ];

  return (
    <section
      aria-label="Technology Stack Ecosystem"
      className="relative py-10 border-y border-white/[0.08] bg-[#080A0F] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
        <p className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase font-semibold">
          CORE TECHNOLOGY STACK & PLATFORM ECOSYSTEM
        </p>
      </div>

      {/* Infinite Scrolling Track with Pause on Hover */}
      <div className="relative w-full overflow-hidden flex items-center group/marquee">
        {/* Left & Right gradient masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080A0F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080A0F] to-transparent z-10 pointer-events-none" />

        {/* Primary Track */}
        <div className="flex shrink-0 animate-[marquee_36s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none items-center gap-12 sm:gap-16">
          {tools.map((tool, index) => (
            <div
              key={`tool-1-${index}`}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200"
              title={tool.name}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                loading="lazy"
                className="h-6 sm:h-7 max-w-[120px] object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"
              />
            </div>
          ))}
        </div>

        {/* Duplicate Track for Smooth Infinite Loop (Hidden from screen readers to prevent repetition) */}
        <div
          aria-hidden="true"
          className="flex shrink-0 animate-[marquee_36s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:hidden items-center gap-12 sm:gap-16 pl-12 sm:pl-16"
        >
          {tools.map((tool, index) => (
            <div
              key={`tool-2-${index}`}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <img
                src={tool.logo}
                alt=""
                loading="lazy"
                className="h-6 sm:h-7 max-w-[120px] object-contain filter drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
