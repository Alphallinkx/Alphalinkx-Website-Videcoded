'use client';

import React from 'react';
import { Two26Hero } from '@/components/two26/Two26Hero';
import { Two26AboutPinned } from '@/components/two26/Two26AboutPinned';
import { Two26ShowcaseSlider } from '@/components/two26/Two26ShowcaseSlider';
import { Two26Projects } from '@/components/two26/Two26Projects';
import { Two26Services } from '@/components/two26/Two26Services';
import { Two26Testimonials } from '@/components/two26/Two26Testimonials';
import { Two26Faq } from '@/components/two26/Two26Faq';
import { InquirySection } from '@/components/home/InquirySection';

export default function HomePage() {
  return (
    <main className="w-full bg-[#F8EEE8] text-[#000000] overflow-x-clip selection:bg-[#FF5400] selection:text-white">
      {/* 01. HERO: Looking Suspiciously Good -> BE THE ALPHA IN YOUR MARKET */}
      <Two26Hero />

      {/* 02. ABOUT PINNED: Kinetic letter scrub + floating stickers */}
      <Two26AboutPinned />

      {/* 03. SHOWCASE SLIDER: Full-bleed infinite horizontal marquee */}
      <Two26ShowcaseSlider />

      {/* 04. SELECTED PROJECTS: Vertical cards with scroll clip-mask reveal */}
      <Two26Projects />

      {/* 05. CORE CAPABILITIES: What we do best with interactive expansion */}
      <Two26Services />

      {/* 06. TESTIMONIALS: 3D stacked card deck with organic rotation & shuffle */}
      <Two26Testimonials />

      {/* 07. FAQ: Things you might ask with dual magnetic offset */}
      <Two26Faq />

      {/* 08. MULTI-STEP KICKOFF INQUIRY SPRINT */}
      <InquirySection />
    </main>
  );
}
