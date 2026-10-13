import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMarquee } from '../components/home/TrustMarquee';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { WhyUsBentoSection } from '../components/home/WhyUsBentoSection';
import { ProcessTimelineSection } from '../components/home/ProcessTimelineSection';
import { TechStackSection } from '../components/home/TechStackSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { InquirySection } from '../components/home/InquirySection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full">
      {/* Section 01: 3D Hero */}
      <HeroSection />

      {/* Section 02: Trust Marquee (Single marquee per page rule) */}
      <TrustMarquee />

      {/* Section 03: About Alphalinkx */}
      <AboutSection />

      {/* Section 04: Services & Capabilities */}
      <ServicesSection />

      {/* Section 05: Featured Projects */}
      <FeaturedProjectsSection />

      {/* Section 06: Why Choose Us (Bento Grid) */}
      <WhyUsBentoSection />

      {/* Section 07: 4-Stage Process Timeline */}
      <ProcessTimelineSection />

      {/* Section 08: Technology Constellation */}
      <TechStackSection />

      {/* Section 09: Testimonials */}
      <TestimonialsSection />

      {/* Section 10: Multi-Step Project Inquiry */}
      <InquirySection />
    </main>
  );
};
