import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { submitInquiry } from '../../lib/api';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Mail,
  User,
  Building2,
  FileText,
} from 'lucide-react';

export const InquirySection: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    service: 'Website Development',
    budget: '$25k – $50k',
    timeline: '1–2 Months',
    name: '',
    email: '',
    company: '',
    description: '',
    honeypot: '', // Spam bot trap
  });

  const servicesList = [
    'Website Development',
    'AI Development',
    'App Development',
    'Digital Marketing',
    'Search Engine Optimization (SEO)',
    'Graphic Design & Branding',
  ];

  const budgetOptions = [
    '$10k – $25k',
    '$25k – $50k',
    '$50k – $100k',
    '$100k+',
  ];

  const timelineOptions = [
    'ASAP (< 1 Month)',
    '1–2 Months',
    '2–4 Months',
    'Flexible / Long-term',
  ];

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1 && !formData.service) {
      setErrorMessage('Please select a service category.');
      return;
    }
    if (step === 2 && !formData.budget) {
      setErrorMessage('Please select an estimated budget range.');
      return;
    }
    if (step === 3 && !formData.timeline) {
      setErrorMessage('Please select an estimated timeline.');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setErrorMessage('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setErrorMessage('Please describe your project (minimum 10 characters).');
      return;
    }

    setLoading(true);

    try {
      const res = await submitInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        description: formData.description,
        honeypot: formData.honeypot,
      });

      if (res.success) {
        setSubmitted(true);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FC6603', '#FFA055', '#FFFFFF'],
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[#090B10] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-radial-glow pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            START A PROJECT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3">
            LET'S BUILD SOMETHING MEANINGFUL.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mt-4 leading-relaxed">
            Have an idea, a challenge, or a digital experience you want to bring to life? Tell us about it, and let's explore what's possible.
          </p>
        </div>

        {/* Multi-Step Interactive Form Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-12 border border-white/10 bg-[#0E1017]/90 shadow-2xl relative">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-[#FC6603]/10 border border-[#FC6603]/40 flex items-center justify-center text-[#FC6603] mx-auto mb-6 shadow-[0_0_30px_rgba(252,102,3,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Project Brief Received!
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
                Thank you for trusting Alphalinkx. Our partners are evaluating your requirements and will reach out to <strong className="text-white">{formData.email}</strong> within 24 business hours.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setFormData({
                      service: 'Website Development',
                      budget: '$25k – $50k',
                      timeline: '1–2 Months',
                      name: '',
                      email: '',
                      company: '',
                      description: '',
                      honeypot: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Submit Another Project Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Progress Stepper Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
                  <span>STEP 0{step} OF 04</span>
                  <span>
                    {step === 1 && 'Select Capabilities'}
                    {step === 2 && 'Estimated Budget'}
                    {step === 3 && 'Project Timeline'}
                    {step === 4 && 'Project Brief & Details'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-[#FC6603]"
                    initial={{ width: '25%' }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit}>
                {/* Honeypot hidden input for spam bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <AnimatePresence mode="wait">
                  {/* Step 1: Select Service */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-display font-bold text-white mb-4">
                        What capability are you looking to activate?
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {servicesList.map((srv) => (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: srv })}
                            className={`p-4 rounded-2xl text-left transition-all border ${
                              formData.service === srv
                                ? 'bg-[#FC6603]/15 border-[#FC6603] text-white shadow-[0_0_15px_rgba(252,102,3,0.25)] font-semibold'
                                : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/25 hover:bg-white/[0.02]'
                            }`}
                          >
                            <span className="text-sm">{srv}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Budget Range */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-display font-bold text-white mb-4">
                        What is your estimated investment budget?
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {budgetOptions.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`p-4 rounded-2xl text-left transition-all border ${
                              formData.budget === b
                                ? 'bg-[#FC6603]/15 border-[#FC6603] text-white shadow-[0_0_15px_rgba(252,102,3,0.25)] font-semibold'
                                : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/25 hover:bg-white/[0.02]'
                            }`}
                          >
                            <span className="text-base font-display">{b}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Timeline */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-display font-bold text-white mb-4">
                        When do you target to launch?
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {timelineOptions.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: t })}
                            className={`p-4 rounded-2xl text-left transition-all border ${
                              formData.timeline === t
                                ? 'bg-[#FC6603]/15 border-[#FC6603] text-white shadow-[0_0_15px_rgba(252,102,3,0.25)] font-semibold'
                                : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/25 hover:bg-white/[0.02]'
                            }`}
                          >
                            <span className="text-base font-display">{t}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Contact Details & Project Description */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-display font-bold text-white mb-4">
                        Tell us about your team & project.
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                            Your Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Alex Mercer"
                              required
                              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FC6603] focus:ring-1 focus:ring-[#FC6603] transition-all"
                            />
                            <User className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                            Business Email *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="alex@company.com"
                              required
                              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FC6603] focus:ring-1 focus:ring-[#FC6603] transition-all"
                            />
                            <Mail className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                          Company / Brand Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Innovations"
                            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FC6603] focus:ring-1 focus:ring-[#FC6603] transition-all"
                          />
                          <Building2 className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                          Project Description & Goals *
                        </label>
                        <textarea
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Tell us about the project scope, current pain points, and desired outcomes..."
                          required
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FC6603] focus:ring-1 focus:ring-[#FC6603] transition-all resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Stepper Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(252,102,3,0.3)]"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-7 py-3 rounded-full text-sm font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] active:scale-[0.98] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(252,102,3,0.4)] disabled:opacity-60"
                    >
                      <span>{loading ? 'Transmitting Brief...' : 'Transmit Project Brief'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
