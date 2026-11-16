'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ABOUT_TEXT =
  'We believe creative work needs focus. That’s why we keep our team tight and our involvement high, so every project gets our full attention. We build brands from scratch or make them better.';

export const Two26AboutPinned: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);
  const pill3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const para = paraRef.current;
    const pill1 = pill1Ref.current;
    const pill2 = pill2Ref.current;
    const pill3 = pill3Ref.current;

    if (!section || !para) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const wordSpans = para.querySelectorAll('.about-word');

    // Create ScrollTrigger timeline pinned to the section
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=1200',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Scrub words from muted orange to deep black
      tl.to(wordSpans, {
        opacity: 1,
        color: '#000000',
        stagger: 0.05,
        ease: 'power1.inOut',
      });

      // Floating pills scrub into place with slight physics
      if (pill1 && pill2 && pill3) {
        tl.fromTo(
          pill1,
          { x: -60, y: 30, rotation: -12, opacity: 0 },
          { x: 0, y: 0, rotation: 5, opacity: 1, ease: 'power2.out' },
          0.1
        );
        tl.fromTo(
          pill2,
          { x: 70, y: -40, rotation: 10, opacity: 0 },
          { x: 0, y: 0, rotation: -4, opacity: 1, ease: 'power2.out' },
          0.2
        );
        tl.fromTo(
          pill3,
          { x: 40, y: 50, rotation: 14, opacity: 0 },
          { x: 0, y: 0, rotation: 2, opacity: 1, ease: 'power2.out' },
          0.3
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-[#F8EEE8] border-b border-[#DAD1CC] flex items-center justify-center overflow-hidden py-24 select-none"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-12 flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div className="font-mono text-[11px] sm:text-[13px] font-bold text-[#FF5400] uppercase tracking-[0.24em] mb-8 sm:mb-12">
          // A BIT ABOUT US
        </div>

        {/* Pinned Kinetic Statement */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Floating Pill 1: Left */}
          <div
            ref={pill1Ref}
            className="hidden lg:inline-flex absolute -top-12 -left-12 z-20 bg-[#FF5400] text-white px-5 py-2 rounded-full font-mono text-[12px] font-bold tracking-[0.06em] uppercase shadow-sm cursor-default"
          >
            Obsessed with ROI
          </div>

          {/* Floating Pill 2: Right Top */}
          <div
            ref={pill2Ref}
            className="hidden lg:inline-flex absolute -top-8 -right-10 z-20 bg-[#000000] text-white px-5 py-2 rounded-full font-mono text-[12px] font-bold tracking-[0.06em] uppercase shadow-sm cursor-default"
          >
            Data meets high craft
          </div>

          {/* Floating Pill 3: Right Bottom */}
          <div
            ref={pill3Ref}
            className="hidden lg:inline-flex absolute -bottom-10 right-14 z-20 bg-[#FDF8F5] text-[#000000] border border-[#DAD1CC] px-5 py-2 rounded-full font-mono text-[12px] font-bold tracking-[0.06em] uppercase shadow-sm cursor-default"
          >
            Allergic to generic
          </div>

          <p
            ref={paraRef}
            className="font-display font-bold text-[32px] sm:text-[46px] md:text-[54px] lg:text-[62px] leading-[1.08] tracking-[-0.03em] text-[#333333]"
          >
            {ABOUT_TEXT.split(' ').map((word, idx) => (
              <span key={idx} className="inline-block whitespace-nowrap mr-[0.25em]">
                <span className="about-word inline-block transition-colors will-change-transform opacity-30 text-[#FF5400]">
                  {word}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Two26AboutPinned;
