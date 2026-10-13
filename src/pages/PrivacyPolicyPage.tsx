import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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
          LEGAL & COMPLIANCE
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-2 mb-8">
          Privacy Policy
        </h1>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 bg-[#0E1017] space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">1. Information We Collect</h2>
            <p>
              When you submit a project inquiry or subscribe to our intelligence briefs on Alphalinkx.com, we collect your name, business email address, company name, service selections, project scope descriptions, and budget estimates. We use this information solely to evaluate project suitability and provide service proposals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">2. How We Protect Your Data</h2>
            <p>
              We enforce strict cryptographic controls and HTTPS transmission across all endpoints. Client briefs are never sold, rented, or distributed to third-party ad networks. All database entries are secured using industry-standard role-based authentication.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">3. Cookies & Analytical Telemetry</h2>
            <p>
              We employ essential performance cookies and anonymous analytical tracking to monitor Core Web Vitals, page rendering speeds, and user navigation paths to ensure optimal WebGL performance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-white mb-3">4. Data Deletion Requests</h2>
            <p>
              You may request full removal of your submitted project brief or newsletter subscription at any time by contacting our compliance office at{' '}
              <a href="mailto:privacy@alphalinkx.com" className="text-[#FC6603] underline">
                privacy@alphalinkx.com
              </a>.
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
