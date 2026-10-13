import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Map, Code, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProcessTimelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discover',
      icon: Search,
      tagline: 'Deep Dive & Problem Definition',
      desc: 'We unearth your exact commercial objectives, target audience friction points, technical debt, and competitive differentiation.',
      deliverables: [
        'Stakeholder & User Research Synthesis',
        'Technical Architecture Feasibility Report',
        'Competitor & Market Gap Analysis',
      ],
    },
    {
      num: '02',
      title: 'Strategize',
      icon: Map,
      tagline: 'Architecture & UX Blueprint',
      desc: 'We map out the user journeys, choose the optimal technology stack, define milestones, and engineer the visual design tokens.',
      deliverables: [
        'Comprehensive Wireframes & User Flows',
        'Technical Stack Specification (API & Database)',
        'Sprint Roadmap & Resource Allocation Plan',
      ],
    },
    {
      num: '03',
      title: 'Design & Build',
      icon: Code,
      tagline: 'Agile Engineering & 3D Polish',
      desc: 'We craft production code in synchronized two-week sprints. WebGL scenes, responsive layouts, and backend APIs are built in tandem.',
      deliverables: [
        'Interactive High-Fidelity Prototypes',
        'Tested Modular Frontend & Backend Repositories',
        'Live Staging Environment for Continuous Testing',
      ],
    },
    {
      num: '04',
      title: 'Launch & Optimize',
      icon: Rocket,
      tagline: 'Zero-Downtime Deployment & Scale',
      desc: 'We deploy to global Edge networks, configure server-side telemetry, monitor Core Web Vitals, and run continuous CRO tests.',
      deliverables: [
        'Automated CI/CD Pipeline & Production DNS Setup',
        'Real-Time Telemetry & Error Tracking Dashboard',
        'Post-Launch Growth Sprints & Ongoing SLA Support',
      ],
    },
  ];

  return (
    <section id="process" className="relative py-28 bg-[#060709] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial-glow pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#FC6603] uppercase">
            HOW WE OPERATE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mt-3">
            A PROVEN 4-STAGE ENGINE.
          </h2>
          <p className="text-base text-zinc-400 mt-4 leading-relaxed">
            From initial concept to mission-critical deployment, our phased methodology ensures zero surprises, rapid delivery, and measurable excellence.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative border ${
                  isActive
                    ? 'bg-[#10131E] border-[#FC6603] shadow-[0_0_20px_rgba(252,102,3,0.2)]'
                    : 'bg-[#0B0D13]/70 border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#FC6603]' : 'text-zinc-500'
                    }`}
                  >
                    STAGE {step.num}
                  </span>
                  <IconComp
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#FC6603]' : 'text-zinc-500'
                    }`}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white">
                  {step.title}
                </h3>
                {isActive && (
                  <motion.div
                    layoutId="activeProcessIndicator"
                    className="absolute -bottom-[2px] left-4 right-4 h-[3px] bg-[#FC6603] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Visual Showcase Panel */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 bg-gradient-to-br from-[#0F121C] to-[#0A0C13] min-h-[360px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold text-[#FC6603] bg-[#FC6603]/10 uppercase mb-4">
                  <span>PHASE {steps[activeStep].num}</span>
                  <span>·</span>
                  <span>{steps[activeStep].tagline}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {steps[activeStep].title}: {steps[activeStep].tagline}
                </h3>

                <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed">
                  {steps[activeStep].desc}
                </p>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                    Key Phase Deliverables:
                  </h4>
                  <div className="space-y-2.5">
                    {steps[activeStep].deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-[#FC6603] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Visual Indicator */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-black/40 border border-white/10 text-center">
                <div className="w-20 h-20 rounded-3xl bg-[#FC6603]/10 border border-[#FC6603]/30 flex items-center justify-center text-[#FC6603] mb-4 shadow-[0_0_30px_rgba(252,102,3,0.2)]">
                  {React.createElement(steps[activeStep].icon, { className: 'w-10 h-10' })}
                </div>
                <span className="font-display text-4xl font-extrabold text-white">
                  0{activeStep + 1} / 04
                </span>
                <span className="text-xs font-mono text-zinc-400 mt-1">
                  Active Execution Stream
                </span>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FC6603] hover:bg-[#FF771E] transition-colors"
                >
                  <span>Initiate Phase 01</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
