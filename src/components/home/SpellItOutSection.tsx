import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SPELL_IT_OUT_PANELS } from '../../content/siteContent';
import { LetterIcon3D } from '../3d/LetterIcon3D';

gsap.registerPlugin(ScrollTrigger);

export const SpellItOutSection: React.FC = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !wrapperRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, trackRef.current!.scrollWidth - window.innerWidth);

      const anim = gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${progress})`;
            }
            const currentIdx = Math.min(
              SPELL_IT_OUT_PANELS.length - 1,
              Math.floor(progress * SPELL_IT_OUT_PANELS.length)
            );
            setActivePanelIndex(currentIdx);
          },
        },
      });

      return () => {
        anim.kill();
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="capabilities"
      aria-label="Spell It Out Capabilities Section"
      className="relative w-full bg-[#0A0A0B] overflow-hidden border-b border-white/[0.08]"
    >
      {/* Pinned Viewport Container */}
      <div className="relative h-[100dvh] w-full flex flex-col justify-between overflow-hidden">
        {/* Top Header Row */}
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 pt-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#8A8A8E] z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[#FF5A1F] font-bold">// 03 THE SPELL</span>
            <span>A-L-P-H-A-L-I-N-K-X CAPABILITY MATRIX</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">
              {String(activePanelIndex + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(SPELL_IT_OUT_PANELS.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Sliding Horizontal Track */}
        <div
          ref={trackRef}
          className="flex h-full items-center px-6 md:px-20 gap-8 md:gap-16 w-max will-change-transform py-6"
        >
          {SPELL_IT_OUT_PANELS.map((panel, idx) => {
            const isActive = idx === activePanelIndex;

            return (
              <div
                key={`${panel.letter}-${idx}`}
                className={`shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] max-w-[700px] rounded-3xl bg-[#111113]/90 border p-6 sm:p-10 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 shadow-2xl ${
                  isActive
                    ? 'border-[#FF5A1F]/70 shadow-[0_0_50px_rgba(255,90,31,0.15)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Panel Top: Counter and Tag */}
                <div className="flex items-center justify-between font-mono text-xs text-[#8A8A8E] pb-6 border-b border-white/5">
                  <span className="text-[#FF5A1F] font-bold">{panel.index}</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-wider text-white">
                    {panel.badge}
                  </span>
                </div>

                {/* Panel Center: Gigantic Stroke Letter + 3D Icon */}
                <div className="my-6 flex items-center justify-between gap-4">
                  <div className="relative">
                    <span
                      className={`font-display font-black text-8xl sm:text-9xl md:text-[140px] leading-none tracking-tighter select-none transition-colors duration-500 ${
                        isActive
                          ? 'text-[#FF5A1F] drop-shadow-[0_0_35px_rgba(255,90,31,0.5)]'
                          : 'text-transparent'
                      }`}
                      style={{
                        WebkitTextStroke: isActive
                          ? '2px #FF5A1F'
                          : '2px rgba(255, 255, 255, 0.25)',
                      }}
                    >
                      {panel.letter}
                    </span>
                  </div>

                  {/* Mini Interactive 3D Icon for this letter */}
                  <LetterIcon3D type={panel.icon3DType} />
                </div>

                {/* Panel Bottom: Service Details & Deliverable Chips */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      {panel.service}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[#FF8A3D] mt-1">
                      {panel.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8A8A8E] leading-relaxed">
                    {panel.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {panel.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono uppercase tracking-wider text-[#F5F5F4]/80 bg-white/5 px-2.5 py-1 rounded border border-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pinned Progress Line */}
        <div className="w-full px-6 md:px-10 pb-8 flex items-center justify-between font-mono text-[11px] text-[#8A8A8E] uppercase tracking-widest shrink-0 z-10">
          <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden mr-4">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#FF5A1F] to-[#FF8A3D] origin-left transition-transform duration-75 ease-out shadow-[0_0_10px_#FF5A1F]"
              style={{ transform: 'scaleX(0.1)' }}
            />
          </div>
          <span className="shrink-0 text-white font-semibold">
            PINNED HORIZONTAL SCROLL
          </span>
        </div>
      </div>
    </section>
  );
};
