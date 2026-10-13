import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then((data) => {
      setServices(data);
      setLoading(false);
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

  return (
    <section id="services" className="relative py-28 bg-[#090B10] border-t border-white/[0.08]">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FC6603]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
              SERVICES & CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3">
              WHAT WE BUILD & DELIVER.
            </h2>
            <p className="text-base text-zinc-400 mt-4 leading-relaxed">
              Precision-crafted digital solutions designed to expand market reach, captivate audiences, and accelerate technical velocity.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FC6603] hover:text-[#FF8833] group pb-2 shrink-0"
          >
            <span>Explore all services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 6 Services Grid (3x2 on desktop, 2x3 on tablet, 1x6 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const IconComp = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block h-full glass-panel rounded-3xl p-8 border border-white/10 hover:border-[#FC6603]/50 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden bg-gradient-to-b from-[#10131C] to-[#0A0C12]"
                >
                  {/* Hover Corner Light Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FC6603]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Header: Icon + Number / Directional Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-[#FC6603] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(252,102,3,0.4)] transition-all duration-300">
                      <IconComp className="w-6 h-6 text-[#FC6603] group-hover:text-black transition-colors" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#FC6603] group-hover:bg-[#FC6603]/20 transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#FC6603] transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Top 3 Capabilities Pills */}
                  <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                    {service.capabilities.slice(0, 3).map((cap, capIdx) => (
                      <div key={capIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FC6603] shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
