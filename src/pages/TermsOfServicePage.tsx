import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-[#060709] bg-tech-grid min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <span className="text-xs font-mono text-[#FC6603] tracking-widest uppercase font-semibold">
          AGREEMENT & POLICIES
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-2 mb-8">
          Terms of Service
        </h1>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 bg-[#0E1017] space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">1. Engagement Scope</h2>
            <p>
              By accessing Alphalinkx.com or engaging our agency for digital marketing, web engineering, mobile app development, or AI services, you agree to these terms. Formal production commitments are executed under mutually signed Statements of Work (SOW).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">2. Intellectual Property Rights</h2>
            <p>
              Upon complete settlement of agreed project deliverables, full proprietary rights, source code, and design assets developed specifically for the client transfer unconditionally to the client, subject to standard open-source framework licensing (MIT/Apache).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">3. Service Level Commitments</h2>
            <p>
              All websites and applications engineered by Alphalinkx undergo extensive cross-browser testing and performance benchmarking before deployment. Post-launch support SLAs are detailed within individual client master agreements.
            </p>
          </section>

          <p className="text-xs font-mono text-zinc-500 pt-6 border-t border-white/10">
            Last Updated: January 2026 · Alphalinkx Digital Agency
          </p>
        </div>
      </div>
    </div>
  );
};
