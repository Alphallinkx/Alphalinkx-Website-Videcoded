import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, Zap, Sparkles, Code2, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      title: 'Obsessive Craftsmanship',
      desc: 'We treat every layout, shader, and API route with deep care. Good enough is never good enough.',
    },
    {
      title: 'Measurable Velocity',
      desc: 'Beautiful digital design is meaningless if it fails to convert users. We optimize for commercial impact.',
    },
    {
      title: 'Zero Bureaucracy',
      desc: 'You work directly with senior architects. Fast feedback loops, transparent sprints, and rapid momentum.',
    },
    {
      title: 'Technical Longevity',
      desc: 'We build with clean open-source foundations and TypeScript so your codebase remains maintainable for years.',
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#060709] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-[12px] font-medium tracking-[0.18em] text-[#FF5A1F] uppercase">
            // ABOUT ALPHALINKX
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-[-0.03em] uppercase mt-3 leading-[1.02]">
            THE ARCHITECTURE OF DIGITAL GROWTH.
          </h1>
          <p className="font-sans text-[16px] sm:text-[17px] text-[#C2C2C2] mt-5 leading-[1.6]">
            Founded to eliminate the divide between aesthetic prestige and engineering rigor, Alphalinkx is a specialized digital studio for ambitious brands.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-br from-[#0F121C] to-[#0A0C13]">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-[-0.02em] leading-[1.1] mb-6">
              Engineering what’s next.
            </h2>
            <div className="space-y-4 font-sans text-[16px] text-[#C2C2C2] leading-[1.6]">
              <p>
                In a digital landscape flooded with templated page builders and slow corporate agencies, Alphalinkx was built to offer a distinct alternative: an elite strike team capable of taking a complex vision and bringing it to life with surgical precision.
              </p>
              <p>
                We do not view website development as a brochure. We treat it as your most critical commercial asset. By uniting custom WebGL 3D design, sub-second React engineering, technical SEO, and intelligent automation, we build platforms that outshine competitors and convert high-value visitors.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <span className="text-3xl font-display font-extrabold text-[#FF5A1F] tracking-[-0.03em]">95+</span>
                <p className="font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mt-1">Core Web Vitals</p>
              </div>
              <div>
                <span className="text-3xl font-display font-extrabold text-white tracking-[-0.03em]">&lt;0.8s</span>
                <p className="font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mt-1">Avg Global Load</p>
              </div>
              <div>
                <span className="text-3xl font-display font-extrabold text-emerald-400 tracking-[-0.03em]">100%</span>
                <p className="font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mt-1">Code Ownership</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-white/10 relative group bg-black">
            <img
              src="/assets/al-mark-dark.jpg"
              alt="Alphalinkx Brand Monogram"
              className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-8">
              <span className="font-mono text-[12px] font-medium text-[#FF5A1F] tracking-[0.18em] uppercase">
                ESTABLISHED FOR HIGH-GROWTH ENTERPRISES
              </span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F]">
              // OUR CODE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-[-0.02em] leading-[1.1] mt-2">
              Values that drive every line of code.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-[#FF5A1F]/30 transition-all bg-[#0E1017]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F] font-mono text-[12px] font-medium mb-4">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-display font-bold text-white tracking-[-0.01em] mb-2">
                  {v.title}
                </h3>
                <p className="font-sans text-[15px] sm:text-[16px] text-[#C2C2C2] leading-[1.6]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-r from-[#121626] to-[#0A0C13] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-[-0.02em] leading-[1.1]">
              Ready to collaborate on your next release?
            </h3>
            <p className="font-sans text-[16px] text-[#C2C2C2] mt-2 leading-[1.6]">
              Book an initial strategy consultation with our senior technical team.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-black bg-[#FF5A1F] hover:bg-[#FF8A3D] transition-all shrink-0 flex items-center gap-2 shadow-[0_0_20px_rgba(255,90,31,0.35)]"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
