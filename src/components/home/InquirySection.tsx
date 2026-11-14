'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FORM_OPTIONS, BRAND } from '../../content/siteContent';
import { BrandButton } from '../common/BrandButton';
import { CountryPhoneInput } from '../common/CountryPhoneInput';

export const InquirySection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalSteps = 4;

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 32 : -32,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -32 : 32,
      opacity: 0,
      filter: 'blur(4px)',
    }),
  };

  // Form state
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [referral, setReferral] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [step3Error, setStep3Error] = useState('');

  const handleNextFromStep3 = () => {
    if (!name.trim()) {
      setStep3Error('Please enter your name to proceed.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStep3Error('Please enter a valid work email to proceed.');
      return;
    }
    setStep3Error('');
    goToStep(4);
  };

  // Zero-re-render mouse tracking for section glow, card border glow & headline gradient
  const sectionRef = useRef<HTMLElement>(null);
  const glowWrapRef = useRef<HTMLDivElement>(null);
  const cardShellRef = useRef<HTMLDivElement>(null);
  const cardBorderGlowRef = useRef<HTMLDivElement>(null);
  const cardSurfaceGlowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowWrapRef.current;
    if (!section || !glow) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getOffsets = () => {
      const sRect = section.getBoundingClientRect();
      const cRect = cardShellRef.current?.getBoundingClientRect();
      return {
        sRect,
        offsetX: cRect ? cRect.left - sRect.left : sRect.width * 0.5,
        offsetY: cRect ? cRect.top - sRect.top : sRect.height * 0.5,
      };
    };

    const { sRect: initialRect, offsetX: initOX, offsetY: initOY } = getOffsets();
    let cardOffsetX = initOX;
    let cardOffsetY = initOY;
    let curX = initialRect.width * 0.5;
    let curY = initialRect.height * 0.36;
    let targetX = curX;
    let targetY = curY;
    let rafId: number | null = null;
    let isUnmounted = false;

    const applyTransforms = () => {
      glow.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      const cx = curX - cardOffsetX;
      const cy = curY - cardOffsetY;
      if (cardBorderGlowRef.current) {
        cardBorderGlowRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      if (cardSurfaceGlowRef.current) {
        cardSurfaceGlowRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
    };

    applyTransforms();

    const animate = () => {
      rafId = null;
      if (isUnmounted) return;

      const dx = targetX - curX;
      const dy = targetY - curY;
      curX += dx * 0.12;
      curY += dy * 0.12;

      applyTransforms();

      if (Math.abs(dx) > 0.35 || Math.abs(dy) > 0.35) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const startAnim = () => {
      if (!prefersReduced && rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (prefersReduced) return;
      const { sRect, offsetX, offsetY } = getOffsets();
      cardOffsetX = offsetX;
      cardOffsetY = offsetY;
      targetX = e.clientX - sRect.left;
      targetY = e.clientY - sRect.top;
      glow.style.opacity = '1';
      if (cardBorderGlowRef.current) cardBorderGlowRef.current.style.opacity = '1';
      if (cardSurfaceGlowRef.current) cardSurfaceGlowRef.current.style.opacity = '1';
      startAnim();
    };

    const onPointerLeave = () => {
      const { sRect, offsetX, offsetY } = getOffsets();
      cardOffsetX = offsetX;
      cardOffsetY = offsetY;
      targetX = sRect.width * 0.5;
      targetY = sRect.height * 0.36;
      glow.style.opacity = '0.72';
      if (cardBorderGlowRef.current) cardBorderGlowRef.current.style.opacity = '0';
      if (cardSurfaceGlowRef.current) cardSurfaceGlowRef.current.style.opacity = '0';
      startAnim();
    };

    const onResize = () => {
      const { sRect, offsetX, offsetY } = getOffsets();
      cardOffsetX = offsetX;
      cardOffsetY = offsetY;
      curX = sRect.width * 0.5;
      curY = sRect.height * 0.36;
      targetX = curX;
      targetY = curY;
      applyTransforms();
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      isUnmounted = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleHeadlineMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const el = headlineRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--hx', `${x}%`);
    el.style.setProperty('--hy', `${y}%`);
  };

  const toggleInterest = (val: string) => {
    if (interests.includes(val)) {
      setInterests(interests.filter((i) => i !== val));
    } else {
      setInterests([...interests, val]);
    }
  };

  const handleSelectInterest = (opt: string) => {
    if (isTransitioning) return;
    setInterests([opt]);
    setIsTransitioning(true);
    setTimeout(() => {
      goToStep(2);
      setIsTransitioning(false);
    }, 420);
  };

  const handleSelectBudget = (b: string) => {
    if (isTransitioning) return;
    setBudget(b);
    setIsTransitioning(true);
    setTimeout(() => {
      goToStep(3);
      setIsTransitioning(false);
    }, 420);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name,
        email,
        phone,
        company: website,
        service: interests.join(', ') || 'General Growth Scope',
        budget: budget || '$3k – $7k',
        timeline: referral || 'Immediate',
        description: message || `Referral source: ${referral || 'Direct'}. Selected budget: ${budget}`,
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Brief submission failed. Please try again or reach out on WhatsApp.');
      }

      setIsSuccess(true);

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF5A1F', '#FF8A3D', '#FFFFFF'],
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to send brief. Please reach out via WhatsApp.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Multi-Step Project Inquiry"
      className="relative py-28 md:py-44 bg-[#0A0A0B] overflow-hidden"
    >
      {/* Subtle Technical Dot Grid Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.22) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Soft Static Corner/Top Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,transparent_25%,rgba(10,10,11,0.88)_100%)]"
      />

      {/* Interactive GPU Mouse-Tracking Orange Glow Layer (pure translate3d, zero repaints) */}
      <div
        ref={glowWrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 will-change-transform transition-opacity duration-500"
        style={{ opacity: 0.72 }}
      >
        {/* Outer atmospheric orange halo */}
        <div
          className="w-[780px] h-[780px] -ml-[390px] -mt-[390px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(252,102,3,0.22) 0%, rgba(255,90,31,0.10) 32%, rgba(255,90,31,0.03) 56%, transparent 72%)',
          }}
        />
        {/* Inner warm core hotspot */}
        <div
          className="absolute top-0 left-0 w-[340px] h-[340px] -ml-[170px] -mt-[170px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,138,61,0.18) 0%, rgba(252,102,3,0.06) 45%, transparent 72%)',
          }}
        />
      </div>

      <div id="free-audit" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Massive Headline with Mouse-Follow Gradient */}
        <div className="text-center mb-16">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F] block mb-3">
            // KICKOFF SPRINT
          </span>
          <h2
            ref={headlineRef}
            onMouseMove={handleHeadlineMouseMove}
            className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-[-0.03em] uppercase select-none transition-colors duration-150 leading-[1.05]"
            style={{
              backgroundImage: `radial-gradient(circle at var(--hx, 50%) var(--hy, 50%), #FF8A3D 0%, #FF5A1F 30%, #FFFFFF 70%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LET'S LINK UP.
          </h2>
          <p className="font-sans text-[16px] text-[#C2C2C2] mt-4 max-w-xl mx-auto leading-[1.6]">
            Configure your growth parameters below to receive an engineered roadmap from our specialist squad.
          </p>
        </div>

        {/* Multi-Step Chip Selection Card with Interactive Mouse-Tracking Border Glow */}
        <div
          ref={cardShellRef}
          className="max-w-3xl mx-auto rounded-3xl p-[1.5px] bg-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Mouse-Tracking Luminous Orange Border Glow */}
          <div
            ref={cardBorderGlowRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 w-[520px] h-[520px] -ml-[260px] -mt-[260px] rounded-full will-change-transform transition-opacity duration-300"
            style={{
              opacity: 0,
              background:
                'radial-gradient(circle, rgba(255,154,77,1) 0%, rgba(252,102,3,0.85) 28%, rgba(255,90,31,0.32) 52%, transparent 72%)',
            }}
          />

          {/* Inner Card Surface */}
          <div className="relative rounded-[calc(1.5rem-1.5px)] bg-[#111113] p-8 sm:p-14 overflow-hidden">
            {/* Subtle Inner Ambient Pointer Sheen */}
            <div
              ref={cardSurfaceGlowRef}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] -ml-[250px] -mt-[250px] rounded-full will-change-transform transition-opacity duration-300"
              style={{
                opacity: 0,
                background:
                  'radial-gradient(circle, rgba(252,102,3,0.09) 0%, rgba(255,90,31,0.03) 40%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF5A1F] to-[#FF8A3D] transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F] text-[#FF5A1F] font-bold text-2xl flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-[-0.01em]">
                Nodes linked. Brief received.
              </h3>
              <p className="font-sans text-[16px] text-[#C2C2C2] max-w-md mx-auto leading-[1.6]">
                Telemetry review has begun. Our team will contact you at <span className="text-white font-mono">{email}</span> within 24 hours.
              </p>
              <div className="pt-6">
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[12px] font-medium text-[#FF5A1F] hover:text-[#FF8A3D] uppercase tracking-[0.18em]"
                >
                  <span>Need urgent kickoff? Chat on WhatsApp</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait" custom={direction}>
                {/* STEP 1: INTERESTS */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-[-0.01em]">
                        1. What nodes are you looking to activate?
                      </h3>
                      <span className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em]">01 / 04</span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {FORM_OPTIONS.interests.map((opt) => {
                        const isSelected = interests.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleSelectInterest(opt)}
                            className={`px-5 py-3 rounded-full text-[12px] font-mono font-medium tracking-[0.18em] transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF5A1F] text-black shadow-[0_0_24px_rgba(255,90,31,0.55)] scale-105 border border-[#FF5A1F]'
                                : 'bg-white/5 text-[#8A8A8E] hover:text-white hover:bg-white/10 border border-white/10 hover:border-[#FF5A1F]/50 hover:scale-[1.02]'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: BUDGET */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-[-0.01em]">
                        2. What is your estimated investment budget?
                      </h3>
                      <span className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em]">02 / 04</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {FORM_OPTIONS.budgets.map((b) => {
                        const isSelected = budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => handleSelectBudget(b)}
                            className={`p-4 rounded-2xl text-left font-mono text-[12px] font-medium tracking-[0.18em] transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF5A1F] text-black shadow-[0_0_24px_rgba(255,90,31,0.55)] scale-[1.02] border border-[#FF5A1F]'
                                : 'bg-white/5 text-[#8A8A8E] hover:text-white hover:bg-white/10 border border-white/10 hover:border-[#FF5A1F]/50 hover:scale-[1.01]'
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 flex items-center justify-start">
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="font-mono text-[12px] font-medium text-[#8A8A8E] hover:text-white uppercase tracking-[0.18em] transition-colors"
                      >
                        ← Back
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CONTACT INFORMATION */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-[-0.01em]">
                        3. Where should we deliver the growth plan?
                      </h3>
                      <span className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em]">03 / 04</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (step3Error) setStep3Error('');
                          }}
                          placeholder="Marcus Vance"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-[15px] focus:outline-none focus:border-[#FF5A1F] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (step3Error) setStep3Error('');
                          }}
                          placeholder="marcus@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-[15px] focus:outline-none focus:border-[#FF5A1F] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mb-1.5">
                          Phone / WhatsApp
                        </label>
                        <CountryPhoneInput
                          value={phone}
                          onChange={(fullNumber) => setPhone(fullNumber)}
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mb-1.5">
                          Website or Domain URL
                        </label>
                        <input
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-[15px] focus:outline-none focus:border-[#FF5A1F] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mb-1.5">
                        Brief Description / Core Challenge
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Outline your primary growth bottleneck or target goals..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-[15px] focus:outline-none focus:border-[#FF5A1F] transition-colors"
                      />
                    </div>

                    {step3Error && (
                      <p className="font-mono text-[12px] font-medium text-[#FF5A1F] bg-[#FF5A1F]/10 px-4 py-2.5 rounded-xl border border-[#FF5A1F]/30 animate-in fade-in">
                        ⚠ {step3Error}
                      </p>
                    )}

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="font-mono text-[12px] font-medium text-[#8A8A8E] hover:text-white uppercase tracking-[0.18em] transition-colors"
                      >
                        ← Back
                      </button>
                      <BrandButton
                        type="button"
                        onClick={handleNextFromStep3}
                      >
                        Next: Final Step
                      </BrandButton>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: REFERRAL SOURCE & TRANSMIT */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-[-0.01em]">
                        4. How did you discover AlphaLinkx?
                      </h3>
                      <span className="font-mono text-[12px] font-medium text-[#8A8A8E] tracking-[0.18em]">04 / 04</span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {FORM_OPTIONS.referralSources.map((source) => {
                        const isSelected = referral === source;
                        return (
                          <button
                            key={source}
                            type="button"
                            onClick={() => setReferral(source)}
                            className={`px-5 py-3 rounded-full text-[12px] font-mono font-medium tracking-[0.18em] transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#FF5A1F] text-black shadow-[0_0_20px_rgba(255,90,31,0.4)]'
                                : 'bg-white/5 text-[#8A8A8E] hover:text-white border border-white/10 hover:border-white/20'
                            }`}
                          >
                            {source}
                          </button>
                        );
                      })}
                    </div>

                    {errorMessage && (
                      <p className="font-mono text-[12px] font-medium text-rose-500 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                        {errorMessage}
                      </p>
                    )}

                    <div className="pt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => goToStep(3)}
                        className="font-mono text-[12px] font-medium text-[#8A8A8E] hover:text-white uppercase tracking-[0.18em]"
                      >
                        ← Back
                      </button>
                      <BrandButton
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting Brief…' : 'Submit Brief'}
                      </BrandButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
