import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../common/Logo';
import {
  Code2,
  Search,
  TrendingUp,
  Smartphone,
  Palette,
  Cpu,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navServices = [
    {
      title: 'Website Development',
      slug: 'website-development',
      icon: Code2,
      desc: 'High-performance React & Next.js architectures',
    },
    {
      title: 'SEO Strategy',
      slug: 'seo',
      icon: Search,
      desc: 'Technical search dominance & organic authority',
    },
    {
      title: 'Digital Marketing',
      slug: 'digital-marketing',
      icon: TrendingUp,
      desc: 'High-ROAS paid acquisition & conversion engines',
    },
    {
      title: 'App Development',
      slug: 'app-development',
      icon: Smartphone,
      desc: 'Native iOS, Android & SaaS cloud products',
    },
    {
      title: 'Graphic Design',
      slug: 'graphic-designing',
      icon: Palette,
      desc: 'Futuristic brand systems & visual identities',
    },
    {
      title: 'AI Development',
      slug: 'ai-development',
      icon: Cpu,
      desc: 'Autonomous agentic workflows & LLM pipelines',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060709]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-[#FC6603] bg-[#FC6603]/10 font-semibold'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-[#FC6603] bg-[#FC6603]/10 font-semibold'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none ${
                  isActive('/services')
                    ? 'text-[#FC6603] bg-[#FC6603]/10 font-semibold'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-[#FC6603]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px] z-50"
                  >
                    <div className="glass-panel rounded-2xl p-4 shadow-2xl border border-white/10 bg-[#0B0D13]/95 backdrop-blur-xl">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 px-2">
                        <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
                          Our Capabilities
                        </span>
                        <Link
                          to="/services"
                          className="text-xs text-[#FC6603] hover:underline flex items-center gap-1 font-medium"
                        >
                          View all services <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {navServices.map((service) => {
                          const IconComp = service.icon;
                          return (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}`}
                              className="group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-[#FC6603]/10 border border-transparent hover:border-[#FC6603]/20"
                            >
                              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#FC6603] group-hover:text-black transition-colors">
                                <IconComp className="w-4 h-4 text-[#FC6603] group-hover:text-black transition-colors" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-white group-hover:text-[#FC6603] transition-colors truncate">
                                  {service.title}
                                </div>
                                <div className="text-xs text-zinc-400 line-clamp-1">
                                  {service.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/projects"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/projects')
                  ? 'text-[#FC6603] bg-[#FC6603]/10 font-semibold'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Projects
            </Link>

            <Link
              to="/#process"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => {
                if (location.pathname === '/') {
                  document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Process
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-[#FC6603] bg-[#FC6603]/10 font-semibold'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin"
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors px-2 py-1"
              title="Admin Portal"
            >
              Portal
            </Link>

            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(252,102,3,0.35)] group overflow-hidden"
            >
              {/* Pulsing Beacon Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/contact"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E]"
            >
              Let's Talk
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-white hover:text-[#FC6603] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Slide-Down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#060709]/98 border-b border-white/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/5"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/5"
                >
                  About Us
                </Link>
                <Link
                  to="/services"
                  className="px-3 py-2 rounded-lg text-base font-medium text-[#FC6603] hover:bg-white/5"
                >
                  All Capabilities & Services
                </Link>
                <div className="pl-4 grid grid-cols-1 gap-1 border-l border-white/10 my-1">
                  {navServices.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="py-1.5 text-sm text-zinc-400 hover:text-white"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/projects"
                  className="px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/5"
                >
                  Selected Work
                </Link>
                <Link
                  to="/contact"
                  className="px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/5"
                >
                  Project Inquiry
                </Link>
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-lg text-sm font-mono text-zinc-400 hover:text-white"
                >
                  Admin Dashboard Portal
                </Link>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-center font-semibold text-white bg-[#FC6603]"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
