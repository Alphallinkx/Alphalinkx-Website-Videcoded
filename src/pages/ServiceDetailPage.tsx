import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchServiceBySlug } from '../lib/api';
import { ServiceItem } from '../types';
import {
  Code2,
  Search,
  TrendingUp,
  Smartphone,
  Palette,
  Cpu,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      setLoading(true);
      fetchServiceBySlug(slug).then((data) => {
        setService(data);
        setLoading(false);
      });
    }
  }, [slug]);

  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Search,
    TrendingUp,
    Smartphone,
    Palette,
    Cpu,
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#060709] flex items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm">
          <div className="w-3 h-3 rounded-full bg-[#FC6603] animate-ping" />
          <span>Loading Service Architecture...</span>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#060709] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-display font-bold text-white">Service Not Found</h2>
        <p className="text-zinc-400 mt-2 mb-6 text-sm">The capability blueprint you requested does not exist or has been moved.</p>
        <Link
          to="/services"
          className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FC6603]"
        >
          View All Services
        </Link>
      </div>
    );
  }

  const IconComp = iconMap[service.icon] || Code2;

  return (
    <div className="pt-32 pb-24 bg-[#060709] bg-tech-grid min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Capabilities</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-br from-[#10131E] to-[#0A0C14] mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A1F]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FF5A1F] mb-6">
                <IconComp className="w-6 h-6" />
              </div>

              <span className="font-mono text-[12px] font-medium tracking-[0.18em] text-[#FF5A1F] uppercase">
                // CAPABILITY SPECIFICATION
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-[-0.03em] mt-2 leading-[1.05]">
                {service.title}
              </h1>

              <p className="font-sans text-[16px] sm:text-[17px] text-[#C2C2C2] mt-4 leading-[1.6] max-w-2xl">
                {service.fullDesc}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-full font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-black bg-[#FF5A1F] hover:bg-[#FF8A3D] active:scale-[0.98] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,90,31,0.35)]"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-black/50 border border-white/10">
              <h3 className="font-mono text-[12px] font-medium text-zinc-400 uppercase tracking-[0.18em] mb-4">
                Standard Engagement SLA
              </h3>
              <div className="space-y-3 font-mono text-[12px] font-medium tracking-[0.18em] text-zinc-300">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-zinc-500 uppercase">Timeline:</span>
                  <span className="text-white">4–8 Weeks</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-zinc-500 uppercase">Team:</span>
                  <span className="text-white">Senior Squad</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-zinc-500 uppercase">Handoff:</span>
                  <span className="text-white">Full IP Transfer</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-zinc-500 uppercase">Support:</span>
                  <span className="text-[#FF5A1F]">30-Day SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities & Deliverables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Capabilities */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-[#0E1017]">
            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#FC6603]" />
              <span>Technical Capabilities</span>
            </h2>
            <div className="space-y-3.5">
              {service.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#FC6603] shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-200 font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-[#0E1017]">
            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#FC6603]" />
              <span>Guaranteed Deliverables</span>
            </h2>
            <div className="space-y-3.5">
              {service.deliverables.map((del, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="font-mono text-xs text-[#FC6603] font-bold mt-0.5">0{i + 1}</span>
                  <span className="text-sm text-zinc-200">{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Stage Process for this service */}
        {service.process && service.process.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-white mb-8">
              Service Execution Roadmap
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-[#10131E] to-[#0A0C14]"
                >
                  <span className="text-xs font-mono font-bold text-[#FC6603] tracking-widest uppercase">
                    STEP {step.step}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs Accordion */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
                Questions Regarding {service.title}
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="glass-panel rounded-2xl border border-white/10 overflow-hidden bg-[#0E1017]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-base font-display font-semibold text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#FC6603]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-r from-[#121626] to-[#0A0C13] flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Launch Your {service.title} Project.
            </h3>
            <p className="text-zinc-400 text-sm mt-2">
              Share your brief with our technical architects and receive an actionable scope within 24 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] transition-all shrink-0 flex items-center gap-2 shadow-[0_0_20px_rgba(252,102,3,0.35)]"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
