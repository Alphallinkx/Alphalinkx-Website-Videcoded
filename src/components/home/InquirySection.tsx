import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { FORM_OPTIONS, BRAND } from '../../content/siteContent';

export const InquirySection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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

  // Mouse follow gradient on headline
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!headlineRef.current) return;
    const rect = headlineRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const toggleInterest = (val: string) => {
    if (interests.includes(val)) {
      setInterests(interests.filter((i) => i !== val));
    } else {
      setInterests([...interests, val]);
    }
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
      id="contact"
      aria-label="Multi-Step Project Inquiry"
      className="relative py-28 md:py-44 bg-[#0A0A0B] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Massive Headline with Mouse-Follow Gradient */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] block mb-3">
            // 10 KICKOFF SPRINT
          </span>
          <h2
            ref={headlineRef}
            onMouseMove={handleMouseMove}
            className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase select-none transition-colors duration-150"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #FF8A3D 0%, #FF5A1F 30%, #FFFFFF 70%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LET'S LINK UP.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#8A8A8E] mt-4 max-w-xl mx-auto">
            Choose your parameters below to construct an actionable growth blueprint with our engineering squad.
          </p>
        </div>

        {/* Multi-Step Chip Selection Card */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#111113] border border-white/10 p-8 sm:p-14 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF5A1F] to-[#FF8A3D] transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F] text-[#FF5A1F] font-bold text-2xl flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                NODES LINKED. BRIEF RECEIVED.
              </h3>
              <p className="font-sans text-sm text-[#8A8A8E] max-w-md mx-auto">
                We have initiated telemetry review. Our squad will contact you at <span className="text-white font-mono">{email}</span> within 24 hours.
              </p>
              <div className="pt-6">
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#FF5A1F] hover:text-[#FF8A3D] uppercase tracking-wider font-bold"
                >
                  <span>Need urgent kickoff? Chat on WhatsApp</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* STEP 1: INTERESTS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      1. What nodes are you looking to activate?
                    </h3>
                    <span className="font-mono text-xs text-[#8A8A8E]">01 / 04</span>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {FORM_OPTIONS.interests.map((opt) => {
                      const isSelected = interests.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleInterest(opt)}
                          className={`px-5 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#FF5A1F] text-black font-bold shadow-[0_0_20px_rgba(255,90,31,0.4)] scale-105'
                              : 'bg-white/5 text-[#8A8A8E] hover:text-white border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      disabled={interests.length === 0}
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FF5A1F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next: Budget →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: BUDGET */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      2. What is your estimated investment budget?
                    </h3>
                    <span className="font-mono text-xs text-[#8A8A8E]">02 / 04</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {FORM_OPTIONS.budgets.map((b) => {
                      const isSelected = budget === b;
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`p-4 rounded-2xl text-left font-mono text-xs tracking-wider transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#FF5A1F] text-black font-bold shadow-[0_0_20px_rgba(255,90,31,0.4)]'
                              : 'bg-white/5 text-[#8A8A8E] hover:text-white border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="font-mono text-xs text-[#8A8A8E] hover:text-white uppercase"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      disabled={!budget}
                      onClick={() => setCurrentStep(3)}
                      className="px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FF5A1F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next: Contact Details →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT INFORMATION */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      3. Where should we deliver the growth plan?
                    </h3>
                    <span className="font-mono text-xs text-[#8A8A8E]">03 / 04</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-[#8A8A8E] uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Vance"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-[#8A8A8E] uppercase mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-[#8A8A8E] uppercase mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-[#8A8A8E] uppercase mb-1">
                        Website or Domain URL
                      </label>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-[#8A8A8E] uppercase mb-1">
                      Brief Description / Core Challenge
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your primary growth bottleneck or target goals..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="font-mono text-xs text-[#8A8A8E] hover:text-white uppercase"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      disabled={!name || !email}
                      onClick={() => setCurrentStep(4)}
                      className="px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FF5A1F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next: Final Step →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REFERRAL SOURCE & TRANSMIT */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      4. How did you discover AlphaLinkx?
                    </h3>
                    <span className="font-mono text-xs text-[#8A8A8E]">04 / 04</span>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {FORM_OPTIONS.referralSources.map((source) => {
                      const isSelected = referral === source;
                      return (
                        <button
                          key={source}
                          type="button"
                          onClick={() => setReferral(source)}
                          className={`px-5 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#FF5A1F] text-black font-bold shadow-[0_0_20px_rgba(255,90,31,0.4)]'
                              : 'bg-white/5 text-[#8A8A8E] hover:text-white border border-white/10 hover:border-white/20'
                          }`}
                        >
                          {source}
                        </button>
                      );
                    })}
                  </div>

                  {errorMessage && (
                    <p className="font-mono text-xs text-rose-500 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                      {errorMessage}
                    </p>
                  )}

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="font-mono text-xs text-[#8A8A8E] hover:text-white uppercase"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#FF8A3D] text-black font-mono text-xs font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,90,31,0.6)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? 'TRANSMITTING BRIEF…' : 'TRANSMIT BRIEF →'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
