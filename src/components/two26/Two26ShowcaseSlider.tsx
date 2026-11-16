'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SHOWCASE_ITEMS = [
  {
    type: 'video',
    src: 'https://cdn.prod.website-files.com/6aaad679fdb9d914f7f52049/6ab26381b5a759b6db4cec12_Shot%201_mp4.mp4',
    poster: 'https://cdn.prod.website-files.com/6aaad679fdb9d914f7f52049/6ab26381b5a759b6db4cec12_Shot%201_poster.0000000.jpg',
    title: 'Kinetic Identity & 3D Web',
    client: 'Nexus Global',
  },
  {
    type: 'image',
    src: 'https://cdn.prod.website-files.com/6aaad679fdb9d914f7f52049/6ab263498b14a38a7a109afc_Shot%202.jpg',
    title: 'Conversion Experience Engine',
    client: 'Vanguard Health',
  },
  {
    type: 'video',
    src: 'https://cdn.prod.website-files.com/6aaad679fdb9d914f7f52049/6aaad679fdb9d914f7f52055_Hero_mp4.mp4',
    poster: 'https://cdn.prod.website-files.com/6a7d9d7d7c99784ba2cac874/6a7db9b17a581584f4171aad_Hero_poster.0000000.jpg',
    title: 'Autonomous Growth Funnel',
    client: 'Equinox Retail',
  },
  {
    type: 'image',
    src: 'https://cdn.prod.website-files.com/6aaad679fdb9d914f7f52049/6ab2641a9cfd63477610662e_Shot%204.jpg',
    title: 'Answer Engine Authority',
    client: 'HyperScale AI',
  },
  {
    type: 'image',
    src: 'https://cdn.prod.website-files.com/6aaad679fdb9d914f7f52049/6ab263c9143d9943ff5ce2bb_Shot%203.jpg',
    title: 'Brand Modernization & SEO',
    client: 'Aura Logistics',
  },
];

export const Two26ShowcaseSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let totalWidth = track.scrollWidth / 2 || 1000;
    const updateTotal = () => {
      if (track && track.scrollWidth > 0) totalWidth = track.scrollWidth / 2;
    };
    updateTotal();
    window.addEventListener('resize', updateTotal);
    const loadTimer = setTimeout(updateTotal, 600);

    let currentX = 0;
    const baseSpeed = 1.2;
    let speed = baseSpeed;

    const loop = gsap.to({}, {
      repeat: -1,
      duration: 1,
      onUpdate: () => {
        currentX -= speed;
        if (Math.abs(currentX) >= totalWidth) {
          currentX = 0;
        }
        gsap.set(track, { x: currentX });
        // Return speed toward base
        speed += (baseSpeed - speed) * 0.05;
      },
    });

    // Accelerate speed on scroll
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        if (velocity > 100) {
          speed = Math.min(baseSpeed + velocity * 0.0035, 8);
        }
      },
    });

    return () => {
      window.removeEventListener('resize', updateTotal);
      clearTimeout(loadTimer);
      loop.kill();
      st.kill();
    };
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#ECEAE5] border-b border-[#DAD1CC] overflow-hidden select-none">
      {/* Eyebrow strip */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 mb-8 sm:mb-12 flex items-center justify-between">
        <span className="font-mono text-[11px] sm:text-[12px] font-bold text-[#FF5400] uppercase tracking-[0.22em]">
          // SELECTED REEL & SHOWCASE
        </span>
        <span className="font-mono text-[11px] sm:text-[12px] font-bold text-[#333333] uppercase tracking-[0.16em]">
          DRAG TO EXPLORE ⇄
        </span>
      </div>

      {/* Marquee Track Container */}
      <div ref={containerRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing">
        <div ref={trackRef} className="flex gap-6 sm:gap-8 will-change-transform w-max">
          {/* Double array for seamless infinite looping */}
          {[...SHOWCASE_ITEMS, ...SHOWCASE_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="relative w-[300px] sm:w-[420px] md:w-[500px] aspect-[16/10] rounded-[22px] sm:rounded-[32px] overflow-hidden border border-[#DAD1CC] bg-[#FDF8F5] shrink-0 group shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {item.type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={item.poster}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}

              {/* Bottom Tag Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/75 via-black/35 to-transparent flex items-end justify-between text-white pointer-events-none">
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#FF5400] uppercase tracking-[0.18em]">
                    {item.client}
                  </div>
                  <div className="font-display font-bold text-[16px] sm:text-[18px] leading-tight">
                    {item.title}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-[12px]">
                  ↗
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Two26ShowcaseSlider;
