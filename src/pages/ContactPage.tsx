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
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mt-3 leading-tight">
            START YOUR PROJECT.
          </h1>
          <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
            Whether you have a fully scoped technical brief or an early-stage concept, we are here to discuss technical architecture, timelines, and budgets.
          </p>
        </div>

        {/* Global Hubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
            <MapPin className="w-5 h-5 text-[#FC6603] mb-3" />
            <h2 className="text-base font-display font-bold text-white">Silicon Valley</h2>
            <p className="text-xs text-zinc-400 mt-1">HQ & Creative Technology Studio</p>
            <p className="text-xs font-mono text-zinc-500 mt-3">San Francisco, CA</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
            <MapPin className="w-5 h-5 text-[#FC6603] mb-3" />
            <h2 className="text-base font-display font-bold text-white">New York</h2>
            <p className="text-xs text-zinc-400 mt-1">Strategy & Growth Division</p>
            <p className="text-xs font-mono text-zinc-500 mt-3">Manhattan, NY</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
            <MapPin className="w-5 h-5 text-[#FC6603] mb-3" />
            <h2 className="text-base font-display font-bold text-white">London</h2>
            <p className="text-xs text-zinc-400 mt-1">European Enterprise Operations</p>
            <p className="text-xs font-mono text-zinc-500 mt-3">Shoreditch, London</p>
          </div>
        </div>
      </div>

      {/* Inquiry Component */}
      <InquirySection />
    </div>
  );
};
