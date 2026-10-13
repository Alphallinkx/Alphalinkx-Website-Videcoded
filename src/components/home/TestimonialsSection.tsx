import React, { useEffect, useState } from 'react';
import { fetchTestimonials } from '../../lib/api';
import { TestimonialItem } from '../../types';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    fetchTestimonials().then((data) => setTestimonials(data));
  }, []);

  return (
    <section className="relative py-28 bg-[#060709] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-10 bottom-10 w-80 h-80 bg-[#FC6603]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3">
            VERIFIED INDUSTRY LEADERS.
          </h2>
          <p className="text-base text-zinc-400 mt-4 leading-relaxed">
            What leaders and engineering founders say about partnering with our specialized digital agency.
          </p>
        </div>

        {/* Testimonials 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-[#FC6603]/30 transition-all duration-300 flex flex-col justify-between bg-gradient-to-br from-[#0F121C] to-[#0A0C13] relative group"
            >
              <div>
                {/* Rating Stars & Project Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#FC6603]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FC6603]" />
                    ))}
                  </div>
                  {t.project && (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/5 truncate max-w-[200px]">
                      {t.project}
                    </span>
                  )}
                </div>

                {/* Quote (Strictly max 3 lines, fits in a glance) */}
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.clientName}
                    className="w-12 h-12 rounded-full object-cover border border-white/15"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-white/15 flex items-center justify-center font-bold text-white">
                    {t.clientName[0]}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-display font-bold text-white">
                    {t.clientName}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {t.role} · <span className="text-[#FC6603]">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
