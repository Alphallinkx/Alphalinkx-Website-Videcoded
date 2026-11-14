'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Gauge, BarChart3, RotateCw } from 'lucide-react';
import { STATS } from '../../content/siteContent';

const STAT_META = [
  { icon: TrendingUp, animClass: 'anim-metric-trend' },
  { icon: Gauge, animClass: 'anim-metric-gauge' },
  { icon: BarChart3, animClass: 'anim-metric-bars' },
  { icon: RotateCw, animClass: 'anim-metric-rotate' },
];

/**
 * Smooth Count-Up Animation from 0 to target value on scroll into view
 */
const CountUpNumber: React.FC<{ value: string; start: boolean; duration?: number }> = ({
  value,
  start,
  duration = 2000,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const targetNum = parseFloat(value);
  const isDecimal = value.includes('.');
  const decimalPlaces = isDecimal ? value.split('.')[1].length : 0;

  useEffect(() => {
    if (!start || isNaN(targetNum)) return;

    let startTime: number | null = null;
    let animId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const current = easedProgress * targetNum;

      if (progress < 1) {
        setDisplayValue(isDecimal ? current.toFixed(decimalPlaces) : Math.floor(current).toString());
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [start, value, targetNum, isDecimal, decimalPlaces, duration]);

  return <>{displayValue}</>;
};

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
      className="relative py-[80px] bg-[#FC6603] overflow-hidden"
    >
      {/* Textured Orange Background Image Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <img
          src="/assets/metrics-orange-bg.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Centered & Compact spacing */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-9 sm:mb-10 px-4"
        >
          <div className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#0A0A0B] mb-2 sm:mb-2.5">
            // 07 VERIFIED METRICS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] mt-2">
            <span className="block text-[#0A0A0B]">Results backed by</span>
            <span className="block text-white">real measurement.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-white/90 mt-3 sm:mt-3.5 max-w-2xl mx-auto leading-relaxed">
            Every metric captured directly from production deployments and verified revenue pipelines.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5 xl:gap-6">
          {STATS.map((stat, idx) => {
            const meta = STAT_META[idx] || {
              icon: TrendingUp,
              animClass: 'anim-metric-trend',
            };
            const Icon = meta.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 36, scale: 0.98, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.85,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-[24px] bg-[#121214] border border-white/5 shadow-[0_16px_36px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(0,0,0,0.45)] group h-full"
              >
                <div>
                  {/* Top Row: Metric Value on left + Animated Icon on right */}
                  <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-display font-black text-4xl sm:text-[42px] lg:text-[40px] xl:text-[46px] text-white tracking-[-0.03em] leading-none tabular-nums">
                        <CountUpNumber value={stat.number} start={isInView} />
                      </span>
                      {stat.suffix && (
                        <span className="font-display font-black text-2xl sm:text-[28px] lg:text-[26px] xl:text-[32px] text-[#FC6603] leading-none ml-0.5">
                          {stat.suffix}
                        </span>
                      )}
                    </div>

                    <div className="text-white/95 shrink-0 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                      <Icon className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[2] ${meta.animClass}`} />
                    </div>
                  </div>

                  {/* Metric Label */}
                  <h3 className="font-display font-bold text-[16px] sm:text-[17px] text-white tracking-tight leading-snug mb-2">
                    {stat.label}
                  </h3>

                  {/* Metric Description */}
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-[#A1A1AA] leading-[1.5]">
                    {stat.wittyCaption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
