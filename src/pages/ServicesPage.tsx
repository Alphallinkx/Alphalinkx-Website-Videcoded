import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchServices } from '../lib/api';
import { ServiceItem } from '../types';
import {
  Code2,
  Search,
  TrendingUp,
  Smartphone,
  Palette,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices().then((data) => setServices(data));
  }, []);

  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Search,
    TrendingUp,
    Smartphone,
    Palette,
    Cpu,
  };

  return (
    <div className="pt-32 pb-24 bg-[#060709] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            FULL AGENCY CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight mt-3 leading-tight">
            ENGINEERED TO OUTPERFORM.
          </h1>
          <p className="text-lg text-zinc-400 mt-5 leading-relaxed">
            From bespoke interactive React applications to custom AI pipelines and technical SEO, explore our six core capability domains.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, idx) => {
            const IconComp = iconMap[service.icon] || Code2;
            return (
              <div
                key={service.slug}
                className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-[#FC6603]/40 transition-all duration-300 flex flex-col justify-between bg-gradient-to-b from-[#10131C] to-[#0A0C13] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC6603] group-hover:bg-[#FC6603] group-hover:text-black transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-[#FC6603] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl font-display font-bold text-white group-hover:text-[#FC6603] transition-colors mb-3">
                    {service.title}
                  </h2>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {service.fullDesc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Core Specializations:
                    </h4>
                    {service.capabilities.slice(0, 4).map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FC6603] shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#FC6603] group-hover:text-[#FF8833] transition-colors"
                  >
                    <span>Read Service Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/contact"
                    className="px-4 py-1.5 rounded-full text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquire CTA */}
        <div className="text-center py-12 border-t border-white/10">
          <h3 className="text-2xl font-display font-bold text-white">
            Need a tailored multi-discipline project?
          </h3>
          <p className="text-zinc-400 text-sm mt-2 max-w-md mx-auto">
            We frequently combine web development, branding, and custom AI agents into comprehensive end-to-end deliverables.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] shadow-lg shadow-[#FC6603]/25 transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
