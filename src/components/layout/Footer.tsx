import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { subscribeNewsletter } from '../../lib/api';
import { ArrowRight, CheckCircle2, Mail, Phone, MapPin, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Subscription failed.');
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { title: 'Website Development', slug: 'website-development' },
    { title: 'Technical SEO', slug: 'seo' },
    { title: 'Digital Marketing & Growth', slug: 'digital-marketing' },
    { title: 'App & Cloud Products', slug: 'app-development' },
    { title: 'Brand & Visual Systems', slug: 'graphic-designing' },
    { title: 'Autonomous AI Solutions', slug: 'ai-development' },
  ];

  return (
    <footer className="relative bg-[#060709] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-radial-glow pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter & Callout Strip */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-16 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0E1017] via-[#10131C] to-[#141824]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-[#FC6603] bg-[#FC6603]/10 uppercase mb-3">
                Digital Intelligence Brief
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Stay Ahead of Digital Transformation.
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
                Get our monthly executive breakdown of high-performance web engineering, AI breakthroughs, and conversion architectures. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">
                    You're in! Check your inbox for our latest digital insights.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                    required
                    className="flex-1 px-4 py-3.5 rounded-full bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FC6603] focus:ring-1 focus:ring-[#FC6603] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3.5 rounded-full bg-[#FC6603] hover:bg-[#FF771E] active:scale-[0.98] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-60 shadow-[0_0_15px_rgba(252,102,3,0.3)]"
                  >
                    <span>{loading ? 'Subscribing...' : 'Join Intel'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
              {errorMsg && (
                <p className="text-rose-400 text-xs mt-2 pl-3">{errorMsg}</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mt-3">
              We design and build bespoke digital experiences, high-performance web systems, and intelligent AI architectures that elevate ambitious businesses into market leaders.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-500 flex flex-col gap-1.5">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FC6603]" />
                Silicon Valley · New York · London
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FC6603]" />
                <a href="mailto:hello@alphalinkx.com" className="hover:text-white transition-colors">
                  hello@alphalinkx.com
                </a>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FC6603]" />
                +1 (800) 450-LINK
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-zinc-300 hover:text-[#FC6603] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-300 hover:text-[#FC6603] transition-colors">
                  About Agency
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-zinc-300 hover:text-[#FC6603] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-300 hover:text-[#FC6603] transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-zinc-400 hover:text-white transition-colors font-mono text-xs">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-zinc-300 hover:text-[#FC6603] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Ready to Talk */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold mb-4">
              Connect
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Have an ambitious challenge? Let's engineer something memorable together.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/alphalinkx"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#FC6603] hover:bg-[#FC6603]/10 transition-colors text-xs font-bold"
                aria-label="X Twitter"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com/company/alphalinkx"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#FC6603] hover:bg-[#FC6603]/10 transition-colors text-xs font-bold"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://github.com/alphalinkx"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#FC6603] hover:bg-[#FC6603]/10 transition-colors text-xs font-bold"
                aria-label="GitHub"
              >
                git
              </a>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#FC6603] hover:text-[#FF8833] group"
              >
                <span>Initiate a Project Brief</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Massive Editorial Watermark Typography */}
        <div className="py-8 select-none overflow-hidden opacity-10 flex justify-center pointer-events-none">
          <span className="font-display font-extrabold text-[12vw] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent leading-none">
            ALPHALINKX
          </span>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>
            © {new Date().getFullYear()} Alphalinkx Digital Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <span className="text-zinc-600">·</span>
            <span className="font-mono text-[11px] text-zinc-400">
              Built with precision & 3D WebGL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
