import React from 'react';

export const TrustMarquee: React.FC = () => {
  const partners = [
    { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/ffffff' },
    { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/ffffff' },
    { name: 'Amazon Web Services', logo: 'https://cdn.simpleicons.org/amazonwebservices/ffffff' },
    { name: 'Google Cloud', logo: 'https://cdn.simpleicons.org/googlecloud/ffffff' },
    { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/ffffff' },
    { name: 'Shopify', logo: 'https://cdn.simpleicons.org/shopify/ffffff' },
    { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/ffffff' },
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/ffffff' },
    { name: 'Three.js', logo: 'https://cdn.simpleicons.org/threedotjs/ffffff' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/ffffff' },
  ];

  return (
    <section className="relative py-12 border-y border-white/[0.08] bg-[#080A0F] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase font-medium">
          POWERING MODERN EXPERIENCES WITH LEADING GLOBAL TECHNOLOGIES
        </p>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right gradient masks for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080A0F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080A0F] to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] items-center gap-12 sm:gap-16">
          {partners.concat(partners).map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="h-7 sm:h-8 max-w-[120px] object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
