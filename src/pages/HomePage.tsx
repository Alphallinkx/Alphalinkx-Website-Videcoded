import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesTicker } from '../components/home/ServicesTicker';
import { ShowreelSection } from '../components/home/ShowreelSection';
import { ClientLogoMarquee } from '../components/home/ClientLogoMarquee';
import { SpellItOutSection } from '../components/home/SpellItOutSection';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection';
import { ServicesListSection } from '../components/home/ServicesListSection';
import { NetworkProcessSection } from '../components/home/NetworkProcessSection';
import { StatsSection } from '../components/home/StatsSection';
import { TestimonialsCarousel } from '../components/home/TestimonialsCarousel';
import { FaqSection } from '../components/home/FaqSection';
import { InquirySection } from '../components/home/InquirySection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-[#0A0A0B] text-[#F5F5F4] overflow-hidden selection:bg-[#FF5A1F] selection:text-black">
      {/* 01. HERO: "Growth, Linked." (3D Centerpiece + Rotating Word + Meta Row) */}
      <HeroSection />

      {/* 02. SERVICES TICKER: Dual infinite marquees tilted -3° with velocity skew */}
      <ServicesTicker />

      {/* 03. SHOWREEL: Expanding video card (60% to full-bleed) + PLAY cursor */}
      <ShowreelSection />

      {/* 04. CLIENT LOGO MARQUEE: Trusted by grayscale to orange-white hover */}
      <ClientLogoMarquee />

      {/* 05. "SPELL IT OUT": Pinned Horizontal Scroll across 10 A-L-P-H-A-L-I-N-K-X panels */}
      <SpellItOutSection />

      {/* 06. SELECTED WORK: Asymmetric 2-column parallax with video hover preview */}
      <SelectedWorkSection />

      {/* 07. SERVICES: Interactive 3D category blocks with sub-service chips */}
      <ServicesListSection />

      {/* 08. THE NETWORK: 3D Constellation Process Section (4 Glowing Nodes) */}
      <NetworkProcessSection />

      {/* 09. STATS: Results, not fluff (Count-up numbers + witty one-liners) */}
      <StatsSection />

      {/* 10. TESTIMONIALS: 3D tilt cards with DRAG cursor */}
      <TestimonialsCarousel />

      {/* 11. FAQ: Smooth accordion with rotating "+" icon */}
      <FaqSection />

      {/* 12. BIG CTA + MULTI-STEP CONTACT FORM: "LET'S LINK UP." + Chip selections */}
      <InquirySection />
    </main>
  );
};

export default HomePage;
