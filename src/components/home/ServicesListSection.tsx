import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../../content/siteContent';

export const ServicesListSection: React.FC = () => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  return (
    <section
      id="services"
      aria-label="Capabilities and Services"
      className="relative py-24 md:py-36 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F]">
              // 05 CAPABILITIES & INFRASTRUCTURE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-[-0.02em] leading-[1.1] mt-2">
              Capabilities engineered for dominance.
            </h2>
          </div>
          <p className="font-sans text-[16px] text-[#C2C2C2] max-w-sm leading-[1.6]">
            Inspect our specialized execution squads built to outrank competitors and capture high-intent demand.
          </p>
        </div>

        {/* Big Stacked Service Rows (Buzz-style Category Blocks) */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {SERVICE_CATEGORIES.map((cat) => {
            const isHovered = hoveredServiceId === cat.id;

            return (
              <Link
                key={cat.id}
                to={`/services/${cat.slug}`}
                onMouseEnter={() => setHoveredServiceId(cat.id)}
                onMouseLeave={() => setHoveredServiceId(null)}
                className="group relative block py-10 sm:py-14 px-4 sm:px-8 transition-all duration-500 overflow-hidden"
                data-cursor="EXPLORE"
              >
                {/* Background Orange-to-Black Flood on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#FF5A1F]/15 via-[#111113] to-[#0A0A0B] transition-opacity duration-500 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Content Layout */}
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-transform duration-300 group-hover:translate-x-3">
                  {/* Left: Number + Huge Service Name */}
                  <div className="flex items-start sm:items-center gap-6 md:gap-10">
                    <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-[#FF5A1F] tracking-tight shrink-0">
                      {cat.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-[-0.01em] group-hover:text-[#FF5A1F] transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="font-sans text-[16px] text-[#C2C2C2] mt-2 max-w-xl leading-[1.6]">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: Sub-service chips and arrow indicator */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8 lg:shrink-0">
                    <div className="flex flex-wrap gap-2 max-w-md">
                      {cat.chips.map((chip) => (
                        <span
                          key={chip}
                          className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#8A8A8E] group-hover:text-white bg-white/[0.04] group-hover:bg-white/[0.08] px-3 py-1 rounded-full border border-white/5 transition-colors"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="w-12 h-12 rounded-full border border-white/10 group-hover:border-[#FF5A1F] flex items-center justify-center text-white group-hover:text-[#FF5A1F] group-hover:scale-110 transition-all duration-300 shrink-0">
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] gap-4">
          <span>// ALL CAPABILITIES DEPLOYED IN-HOUSE BY SPECIALIST SQUADS</span>
          <Link
            to="/contact"
            className="text-[#FF5A1F] hover:text-[#FF8A3D] font-bold"
          >
            CUSTOM SCOPE INQUIRY →
          </Link>
        </div>
      </div>
    </section>
  );
};
