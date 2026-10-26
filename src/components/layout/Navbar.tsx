import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SERVICE_CATEGORIES, BRAND } from '../../content/siteContent';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;

          // Header background blur threshold
          setIsScrolled(currentY > 30);

          // Hide on scroll down, show on scroll up
          if (currentY > 150) {
            if (currentY > lastScrollY && !isMegaMenuOpen && !isMobileMenuOpen) {
              setIsVisible(false);
            } else {
              setIsVisible(true);
            }
          } else {
            setIsVisible(true);
          }

          setLastScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMegaMenuOpen, isMobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isMegaMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isMegaMenuOpen]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#0A0A0B]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo on Left */}
          <Link
            to="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] rounded-lg transition-transform hover:scale-105 duration-200 shrink-0"
            aria-label="AlphaLinkx Home"
          >
            <img
              src="/assets/alphalinkx-mark.png"
              alt="AlphaLinkx"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Mobile Social Bar (positioned directly between Logo and Hamburger) */}
          <div className="md:hidden flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-full bg-[#121215]/85 border border-white/10 backdrop-blur-md shadow-lg">
            <a
              href="https://x.com/alphalinkx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#9E9EA4] hover:text-[#FF5A1F] hover:bg-white/5 active:scale-95 transition-all"
              aria-label="X (Twitter)"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/alphalinkx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#9E9EA4] hover:text-[#FF5A1F] hover:bg-white/5 active:scale-95 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/alphalinkx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#9E9EA4] hover:text-[#FF5A1F] hover:bg-white/5 active:scale-95 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://github.com/alphalinkx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#9E9EA4] hover:text-[#FF5A1F] hover:bg-white/5 active:scale-95 transition-all"
              aria-label="GitHub"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>

          {/* Links Center (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 bg-[#111113]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08]"
          >
            <a
              href="/#work"
              className="px-4 py-1.5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-white hover:text-[#FF5A1F] transition-colors duration-150"
            >
              Work
            </a>

            {/* Mega menu trigger for services */}
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`px-4 py-1.5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase flex items-center gap-1.5 transition-colors duration-150 ${
                isMegaMenuOpen ? 'text-[#FF5A1F]' : 'text-white hover:text-[#FF5A1F]'
              }`}
            >
              <span>Services</span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  isMegaMenuOpen ? 'rotate-180 text-[#FF5A1F]' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <a
              href="/#about"
              className="px-4 py-1.5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-white hover:text-[#FF5A1F] transition-colors duration-150"
            >
              About
            </a>

            <a
              href="/#process"
              className="px-4 py-1.5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-white hover:text-[#FF5A1F] transition-colors duration-150"
            >
              Process
            </a>

            <a
              href="/#faq"
              className="px-4 py-1.5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-white hover:text-[#FF5A1F] transition-colors duration-150"
            >
              FAQ
            </a>
          </nav>

          {/* CTA Right (Desktop) & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white bg-gradient-to-r from-[#FF5A1F] to-[#FF8A3D] hover:shadow-[0_0_25px_rgba(255,90,31,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              data-cursor="CONNECT"
            >
              <span>Let's Talk</span>
              <span className="ml-2">→</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-[#111113] border border-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F]"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-200 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-200 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Services Mega Menu Overlay (Desktop) */}
      {isMegaMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Services Mega Menu"
          className="fixed inset-0 top-[68px] z-40 bg-[#0A0A0B]/95 backdrop-blur-2xl border-b border-white/[0.08] overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
              <div>
                <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F]">
                  // CORE CAPABILITIES
                </p>
                <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-white mt-1">
                  Engineered for Search, AI, and Revenue Conversion
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(false)}
                className="font-mono text-[12px] font-medium text-[#8A8A8E] hover:text-white uppercase tracking-[0.18em] px-3 py-1.5 rounded border border-white/10"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {SERVICE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/services/${cat.slug}`}
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="group flex flex-col p-5 rounded-2xl bg-[#111113]/60 border border-white/[0.07] hover:border-[#FF5A1F]/50 hover:bg-[#161619] transition-all duration-200"
                >
                  <span className="font-mono text-[12px] font-medium text-[#FF5A1F] tracking-[0.18em]">
                    {cat.number}
                  </span>
                  <h4 className="font-display font-bold text-base text-white tracking-[-0.01em] mt-2 group-hover:text-[#FF5A1F] transition-colors">
                    {cat.name}
                  </h4>
                  <p className="font-sans text-[15px] text-[#C2C2C2] mt-2 line-clamp-2 leading-[1.6]">
                    {cat.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                    {cat.chips.slice(0, 3).map((chip) => (
                      <span
                        key={chip}
                        className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-[#8A8A8E] bg-white/[0.04] px-2 py-0.5 rounded"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#FF5A1F]/10 via-transparent to-transparent border border-[#FF5A1F]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[12px] font-medium text-[#FF5A1F] uppercase tracking-[0.18em]">
                  Need a full-stack growth retainer?
                </span>
                <p className="font-sans text-[15px] sm:text-[16px] text-white mt-1 leading-[1.6]">
                  We unite web engineering, AI answer optimization, and paid acquisition into one compounding machine.
                </p>
              </div>
              <Link
                to="/contact"
                onClick={() => setIsMegaMenuOpen(false)}
                className="shrink-0 px-6 py-2.5 rounded-full text-[12px] font-mono font-medium uppercase tracking-[0.18em] text-black bg-[#FF5A1F] hover:bg-[#FF8A3D] transition-colors"
              >
                Request Growth Audit →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-[#0A0A0B] flex flex-col justify-between px-8 pt-28 pb-12 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[12px] font-medium text-[#FF5A1F] tracking-[0.18em] uppercase">
              // ALPHALINKX MENU
            </span>

            <a
              href="/#work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-4xl font-extrabold text-white hover:text-[#FF5A1F] tracking-[-0.02em] transition-colors"
            >
              Work
            </a>

            <div className="flex flex-col gap-3 py-2 border-y border-white/10">
              <span className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em] uppercase">
                Services:
              </span>
              {SERVICE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/services/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-xl text-white/90 hover:text-[#FF5A1F] pl-3 flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <span className="font-mono text-[12px] font-medium text-[#FF5A1F] tracking-[0.18em]">{cat.number}</span>
                </Link>
              ))}
            </div>

            <a
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-4xl font-extrabold text-white hover:text-[#FF5A1F] tracking-[-0.02em] transition-colors"
            >
              About
            </a>

            <a
              href="/#process"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-4xl font-extrabold text-white hover:text-[#FF5A1F] tracking-[-0.02em] transition-colors"
            >
              Process
            </a>

            <a
              href="/#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-4xl font-extrabold text-white hover:text-[#FF5A1F] tracking-[-0.02em] transition-colors"
            >
              FAQ
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#FF8A3D] font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-black"
            >
              Start a Project →
            </Link>
            <div className="flex items-center justify-between font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em]">
              <span>{BRAND.email}</span>
              <span>{BRAND.est}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
