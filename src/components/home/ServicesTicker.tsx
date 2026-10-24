import React, { useEffect, useRef } from 'react';
import { TICKER_ITEMS } from '../../content/siteContent';

export const ServicesTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetSkew = 0;
    let currentSkew = 0;
    let pos1 = 0;
    let pos2 = 0;
    let animationId: number;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      targetSkew = Math.min(12, Math.max(-12, (currentScrollY - lastScrollY) * 0.15));
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const loop = () => {
      // Decay velocity and lerp skew
      scrollVelocity *= 0.92;
      targetSkew *= 0.92;
      currentSkew += (targetSkew - currentSkew) * 0.1;

      const baseSpeed = 1.2 + scrollVelocity * 0.25;
      pos1 -= baseSpeed;
      pos2 += baseSpeed;

      if (track1Ref.current) {
        track1Ref.current.style.transform = `translateX(${pos1 % 1000}px) skewX(${currentSkew}deg)`;
      }
      if (track2Ref.current) {
        track2Ref.current.style.transform = `translateX(${-pos2 % 1000}px) skewX(${-currentSkew}deg)`;
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const marqueeText = TICKER_ITEMS.join(' ✦ ') + ' ✦ ';
  const repeatedText = Array(4).fill(marqueeText).join(' ');

  return (
    <section
      ref={containerRef}
      aria-label="Services ticker"
      className="relative py-12 md:py-20 overflow-hidden bg-[#0A0A0B] border-y border-white/[0.06] select-none"
    >
      <div className="transform -rotate-2 scale-105 space-y-4">
        {/* Track 1: Leftward infinite ticker */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div
            ref={track1Ref}
            className="flex shrink-0 font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-[-0.03em] uppercase will-change-transform"
          >
            <span className="text-white">{repeatedText}</span>
          </div>
        </div>

        {/* Track 2: Rightward infinite ticker with hollow stroke style */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div
            ref={track2Ref}
            className="flex shrink-0 font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-transparent tracking-[-0.03em] uppercase will-change-transform"
            style={{
              WebkitTextStroke: '1.5px rgba(255, 90, 31, 0.85)',
            }}
          >
            <span>{repeatedText}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
