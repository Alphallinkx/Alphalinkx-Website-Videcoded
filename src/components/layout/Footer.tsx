import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BRAND, SERVICE_CATEGORIES } from '../../content/siteContent';

export const Footer: React.FC = () => {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      className="relative bg-[#0A0A0B] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden select-none"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-20 border-b border-white/10">
          <div className="col-span-2 lg:col-span-2 pr-6">
            <Link to="/" className="inline-flex items-center gap-3 group" aria-label="AlphaLinkx Home">
              <img
                src="/assets/alphalinkx-mark.png"
                alt="AlphaLinkx Logo"
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <span className="font-display font-extrabold text-xl text-white tracking-[-0.02em] group-hover:text-[#FF5A1F] transition-colors">
                {BRAND.name}
              </span>
            </Link>
            <p className="font-sans text-[16px] text-[#C2C2C2] mt-4 max-w-sm leading-[1.6]">
              High-performance web development, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and high-ROAS paid media engineering.
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-[12px] font-medium text-[#FF5A1F] tracking-[0.18em]">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
              <span>GLOBAL SIGNAL NODES: ACTIVE</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F] block">
              // SERVICES
            </span>
            <ul className="space-y-2.5 font-sans text-[15px] sm:text-[16px] text-[#C2C2C2]">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/services/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-4">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F] block">
              // COMPANY
            </span>
            <ul className="space-y-2.5 font-sans text-[15px] sm:text-[16px] text-[#C2C2C2]">
              <li>
                <a href="/#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#work" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="/#process" className="hover:text-white transition-colors">
                  4-Node Process
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-4">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F] block">
              // DIRECT CHANNELS
            </span>
            <ul className="space-y-2.5 font-sans text-[15px] sm:text-[16px] text-[#C2C2C2]">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-white transition-colors font-mono text-[12px] font-medium tracking-[0.18em]"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5A1F] transition-colors font-mono text-[12px] font-medium text-white tracking-[0.18em]"
                >
                  WhatsApp Direct →
                </a>
              </li>
              <li className="pt-2 font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em]">
                {BRAND.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Mouse-Reactive ALPHALINKX Wordmark */}
        <div
          ref={wordmarkRef}
          onMouseMove={handleMouseMove}
          className="relative py-14 sm:py-20 text-center overflow-hidden cursor-crosshair"
        >
          <h2
            className="font-display font-extrabold text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] leading-none tracking-[-0.03em] uppercase select-none transition-all duration-75"
            style={{
              backgroundImage: `radial-gradient(circle 280px at ${spotlightPos.x}% ${spotlightPos.y}%, #FF5A1F 0%, rgba(255, 90, 31, 0.4) 40%, rgba(255, 255, 255, 0.08) 80%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ALPHALINKX
          </h2>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] gap-4">
          <p>© 2024 ALPHALINKX // built to grow.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-[#FF5A1F] transition-colors uppercase font-bold"
            >
              <span>Back to top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
