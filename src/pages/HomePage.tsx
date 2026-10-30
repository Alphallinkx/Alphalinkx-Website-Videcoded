import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesTicker } from '../components/home/ServicesTicker';
import { DiagnosisSection } from '../components/home/DiagnosisSection';
import { ChainSection } from '../components/home/ChainSection';
import { ClientLogoMarquee } from '../components/home/ClientLogoMarquee';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection';
import { ServicesListSection } from '../components/home/ServicesListSection';
import { NetworkProcessSection } from '../components/home/NetworkProcessSection';
import { StatsSection } from '../components/home/StatsSection';
import { TestimonialsCarousel } from '../components/home/TestimonialsCarousel';
import { FaqSection } from '../components/home/FaqSection';
import { InquirySection } from '../components/home/InquirySection';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full bg-[#0A0A0B] text-[#F5F5F4] overflow-x-clip selection:bg-[#FF5A1F] selection:text-black">
      {/* 01. HERO: "Growth, Linked." (3D Centerpiece + Rotating Word + Meta Row) */}
      <HeroSection />

      {/* 02. SERVICES TICKER: Dual infinite marquees tilted -3° with velocity skew */}
      <ServicesTicker />

      {/* 03. THE DIAGNOSIS: "Where is your growth chain breaking?" (6 Cards in 1 Row) */}
      <DiagnosisSection />

      {/* 04. THE CHAIN: "Four links. One stronger customer journey." (Alternating Timeline + Progress Line) */}
      <ChainSection />

      {/* 05. CLIENT LOGO MARQUEE: Trusted by grayscale to orange-white hover */}
      <ClientLogoMarquee />

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
