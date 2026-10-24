import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../../content/siteContent';

export const StatsSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Key Performance Statistics"
      className="relative py-28 md:py-40 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden"
    >
      {/* Slow-moving orange gradient mesh shader blob background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#FF5A1F]/20 via-[#FF8A3D]/15 to-transparent rounded-full blur-[140px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F]">
            // 07 VERIFIED METRICS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-[-0.02em] leading-[1.1] mt-2">
            Results backed by telemetry.
          </h2>
          <p className="font-sans text-[16px] text-[#C2C2C2] mt-3 leading-[1.6]">
            Every metric captured directly from production deployments and verified revenue pipelines.
          </p>
        </div>

        {/* 4 Huge Count-Up Numbers in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col p-8 rounded-3xl bg-[#111113]/80 border border-white/10 hover:border-[#FF5A1F]/50 backdrop-blur-xl transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white tracking-[-0.03em] tabular-nums group-hover:text-[#FF5A1F] transition-colors">
                  {isInView ? stat.number : '0'}
                </span>
                {stat.suffix && (
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#FF5A1F]">
                    {stat.suffix}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-[-0.01em] mt-4">
                {stat.label}
              </h3>

              <p className="font-sans text-[16px] text-[#C2C2C2] mt-2 leading-[1.6]">
                {stat.wittyCaption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
