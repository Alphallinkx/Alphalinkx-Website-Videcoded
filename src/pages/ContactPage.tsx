import React, { useEffect } from 'react';
import { InquirySection } from '../components/home/InquirySection';
import { MapPin, Mail, Phone, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-16 bg-[#060709] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <span className="font-mono text-[12px] font-medium tracking-[0.18em] text-[#FF5A1F] uppercase">
            // 01 DIRECT SIGNAL
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-[-0.03em] uppercase mt-3 leading-[1.02]">
            START YOUR PROJECT.
          </h1>
          <p className="font-sans text-[16px] sm:text-[17px] text-[#C2C2C2] mt-4 leading-[1.6]">
            Whether you have a fully scoped technical brief or an early-stage concept, we are here to discuss technical architecture, timelines, and budgets.
          </p>
        </div>

        {/* Global Hubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
            <MapPin className="w-5 h-5 text-[#FF5A1F] mb-3" />
            <h2 className="text-base font-display font-bold text-white tracking-[-0.01em]">Silicon Valley</h2>
            <p className="font-sans text-[15px] text-[#C2C2C2] mt-1">HQ & Creative Technology Studio</p>
            <p className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em] uppercase mt-3">San Francisco, CA</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
            <MapPin className="w-5 h-5 text-[#FF5A1F] mb-3" />
            <h2 className="text-base font-display font-bold text-white tracking-[-0.01em]">New York</h2>
            <p className="font-sans text-[15px] text-[#C2C2C2] mt-1">Strategy & Growth Division</p>
            <p className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em] uppercase mt-3">Manhattan, NY</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
            <MapPin className="w-5 h-5 text-[#FF5A1F] mb-3" />
            <h2 className="text-base font-display font-bold text-white tracking-[-0.01em]">London</h2>
            <p className="font-sans text-[15px] text-[#C2C2C2] mt-1">European Enterprise Operations</p>
            <p className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em] uppercase mt-3">Shoreditch, London</p>
          </div>
        </div>
      </div>

      {/* Inquiry Component */}
      <InquirySection />
    </div>
  );
};
