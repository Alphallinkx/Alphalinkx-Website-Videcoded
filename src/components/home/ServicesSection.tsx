import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fetchServices } from '../../lib/api';
import { ServiceItem } from '../../types';
import {
  Code2,
  Search,
  TrendingUp,
  Smartphone,
  Palette,
  Cpu,
  ArrowUpRight,
  CheckCircle,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchServices().then((data) => {
      setServices(data);
      // Default expand the first service on load
      if (data.length > 0) {
        setExpandedSlug(data[0].slug);
      }
    });
  }, []);

  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Search,
    TrendingUp,
    Smartphone,
    Palette,
    Cpu,
  };

  const toggleExpand = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id="services" className="relative py-28 bg-[#090B10] border-t border-white/[0.08]">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FC6603]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              CAPABILITIES & DOMAINS.
            </h2>
            <p className="text-base text-zinc-400 mt-3 max-w-2xl leading-relaxed">
              We engineer specialized digital solutions designed to expand market authority, captivate audiences, and accelerate technical velocity.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FC6603] hover:text-[#FF8833] group pb-1 shrink-0"
            data-cursor-hover
          >
            <span>Explore All 6 Domains</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Editorial Service Rows / Accordion Suite */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {services.map((service, idx) => {
            const IconComp = iconMap[service.icon] || Code2;
            const isExpanded = expandedSlug === service.slug;
            const stepNum = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={service.slug}
                className="transition-colors group hover:bg-white/[0.015]"
              >
                {/* Clickable Header Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(service.slug)}
                  aria-expanded={isExpanded}
                  className="w-full py-8 text-left flex items-start sm:items-center justify-between gap-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FC6603] rounded-lg"
                  data-cursor-hover
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-8 min-w-0">
                    {/* Index Monospace Indicator */}
                    <span className="font-mono text-xs sm:text-sm text-zinc-400 font-bold group-hover:text-[#FC6603] transition-colors pt-1 sm:pt-0 shrink-0">
                      /{stepNum}
                    </span>

                    {/* Icon + Title */}
                    <div className="min-w-0">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-[#FC6603] transition-colors truncate">
                        {service.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1 line-clamp-1 max-w-2xl">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Indicator Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:border-[#FC6603] group-hover:text-white transition-all">
                      {isExpanded ? (
                        <Minus className="w-4 h-4 text-[#FC6603]" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expandable Editorial Deep-Dive Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 pl-8 sm:pl-16 pr-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left: Full Narrative & Deliverables */}
                        <div className="lg:col-span-7 space-y-5">
                          <p className="text-base text-zinc-300 leading-relaxed">
                            {service.fullDesc}
                          </p>

                          <div>
                            <h4 className="text-xs font-mono text-[#FC6603] uppercase tracking-wider font-semibold mb-3">
                              Core Capabilities Delivered
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {service.capabilities.map((cap, ci) => (
                                <div key={ci} className="flex items-center gap-2 text-xs text-zinc-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-[#FC6603] shrink-0" />
                                  <span className="truncate">{cap}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Key Deliverables & Direct Route */}
                        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-white/10 bg-[#0E1017]">
                          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                            Production Deliverables
                          </h4>
                          <ul className="space-y-2 text-xs text-zinc-300 mb-6">
                            {service.deliverables.slice(0, 3).map((deliv, di) => (
                              <li key={di} className="flex items-start gap-2">
                                <span className="text-[#FC6603] font-bold">·</span>
                                <span>{deliv}</span>
                              </li>
                            ))}
                          </ul>

                          <Link
                            to={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] transition-colors w-full justify-center shadow-[0_0_15px_rgba(252,102,3,0.3)]"
                            data-cursor-hover
                          >
                            <span>View Full Specifications & Pricing</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
