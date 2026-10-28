import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { CHAIN_LINKS, type ChainLinkItem } from '../../content/siteContent';

/**
 * THE CHAIN SECTION
 * Four links. One stronger customer journey.
 * BE FOUND → BE CLICKED → BE TRUSTED → BE CHOSEN
 *
 * Implements normal document scrolling with a sticky section heading,
 * central vertical timeline on desktop (left-aligned on mobile),
 * alternating cards with opposite decorative ghost words,
 * and restrained, smooth transitions in AlphaLinkx theme colors.
 */
export const ChainSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  // Dynamic navbar height detection for exact sticky offset
  const [navHeight, setNavHeight] = useState(76);
  const [isLgScreen, setIsLgScreen] = useState(false);

  // Precise vertical line bounds between first and last node
  const [lineBounds, setLineBounds] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  // Active stage tracking based on scroll progress
  const [activeStage, setActiveStage] = useState(0);

  // Monitor resize & navbar dimensions
  useEffect(() => {
    const handleLayoutMeasure = () => {
      setIsLgScreen(window.innerWidth >= 1024);

      const header = document.querySelector('header[role="banner"]');
      if (header) {
        setNavHeight(header.getBoundingClientRect().height || 76);
      }

      // Calculate line bounds between first node center and last node center
      const container = containerRef.current;
      const firstNode = nodeRefs.current[0];
      const lastNode = nodeRefs.current[nodeRefs.current.length - 1];

      if (container && firstNode && lastNode) {
        const containerRect = container.getBoundingClientRect();
        const firstRect = firstNode.getBoundingClientRect();
        const lastRect = lastNode.getBoundingClientRect();

        const top = firstRect.top - containerRect.top + firstRect.height / 2;
        const bottom = lastRect.top - containerRect.top + lastRect.height / 2;

        setLineBounds({
          top,
          height: Math.max(0, bottom - top),
        });
      }
    };

    handleLayoutMeasure();

    window.addEventListener('resize', handleLayoutMeasure);
    const ro = new ResizeObserver(handleLayoutMeasure);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleLayoutMeasure);
      ro.disconnect();
    };
  }, []);

  // Scroll progress through the 4 stages
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 70%'],
  });

  // Controlled, smooth spring progress
  const progressSpring = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  // Update active node stage as progress traverses down
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 0.88) {
        setActiveStage(3);
      } else if (latest >= 0.58) {
        setActiveStage(2);
      } else if (latest >= 0.28) {
        setActiveStage(1);
      } else {
        setActiveStage(0);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Sticky header offset: real navigation height + controlled gap
  const stickyTop = isLgScreen ? `${navHeight + 12}px` : undefined;

  return (
    <section
      id="chain"
      aria-labelledby="chain-heading"
      className="relative w-full bg-[#0A0A0B] text-[#F5F5F4] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 lg:px-12">
        {/*
          STICKY SECTION HEADING:
          - Enters naturally with restrained opacity and 14px upward motion
          - Becomes sticky on desktop below the navigation
          - Releases naturally when the 4th stage finishes scrolling
          - Normal relative in-flow on mobile/tablet to preserve screen space
        */}
        <div
          style={{ top: stickyTop }}
          className="relative lg:sticky z-20 pt-2 pb-8 sm:pb-10 lg:pb-12 bg-[#0A0A0B]/95 lg:backdrop-blur-md transition-all"
        >
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Small Monospace Label */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 sm:mb-2.5 flex items-center justify-center gap-2">
              <span>//</span>
              <span className="text-white/60">THE CHAIN</span>
            </div>

            {/* Heading with brand orange accent */}
            <h2
              id="chain-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] text-white tracking-[-0.03em] leading-[1.12]"
            >
              Four links.{' '}
              <span className="text-[#FC6603]">One stronger customer journey.</span>
            </h2>

            {/* Supporting Text */}
            <motion.p
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[14px] sm:text-[15px] md:text-[16px] text-[#A1A1AA] leading-[1.6] mt-3 sm:mt-4 font-normal"
            >
              From first discovery to the decision to enquire, every connection matters.
            </motion.p>
          </motion.div>

          {/* Soft ambient bottom fade so cards pass smoothly behind sticky header */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -bottom-6 left-0 right-0 h-6 bg-gradient-to-b from-[#0A0A0B]/95 to-transparent pointer-events-none"
          />
        </div>

        {/*
          TIMELINE CONTAINER:
          - Central timeline on desktop (left-aligned on mobile)
          - Neutral vertical line with animated orange progress line overlay
          - Chain link nodes sit at each stage
        */}
        <div ref={containerRef} className="relative mt-4 sm:mt-6 lg:mt-10">
          {/* Neutral Base Connector Line */}
          {lineBounds.height > 0 && (
            <div
              aria-hidden="true"
              className="absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 w-[1.5px] bg-white/10 pointer-events-none"
              style={{
                top: `${lineBounds.top}px`,
                height: `${lineBounds.height}px`,
              }}
            >
              {/* Animated Brand Orange Progress Line Overlay */}
              <motion.div
                className="w-full bg-[#FC6603] origin-top"
                style={{
                  height: '100%',
                  scaleY: prefersReduced ? 1 : progressSpring,
                }}
              />
            </div>
          )}

          {/* 4 Alternating Timeline Stages */}
          <ol className="relative list-none m-0 p-0 flex flex-col gap-6 sm:gap-8 lg:gap-14">
            {CHAIN_LINKS.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStage >= idx;

              return (
                <li
                  key={item.id}
                  className="relative py-4 sm:py-6 lg:py-8 pl-14 sm:pl-20 lg:pl-0"
                >
                  {/* Central Timeline Node */}
                  <div
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    aria-hidden="true"
                    className={`absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-[#111113] border transition-all duration-300 ease-out ${
                      isActive
                        ? 'border-[#FC6603] shadow-[0_0_18px_rgba(252,102,3,0.35)] ring-2 ring-[#FC6603]/20'
                        : 'border-white/20'
                    }`}
                  >
                    {/* Chain Link Vector Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-300 ${
                        isActive ? 'stroke-[#FC6603]' : 'stroke-white/40'
                      }`}
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>

                  {/*
                    DESKTOP 2-COLUMN ALTERNATING GRID / MOBILE 1-COLUMN:
                    - On desktop:
                      Even (0, 2): Left = Card, Right = Decorative Ghost Word
                      Odd (1, 3): Left = Decorative Ghost Word, Right = Card
                    - On mobile:
                      Ghost words are hidden, card occupies single column
                  */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 xl:gap-x-28 items-center">
                    {/* Column 1 */}
                    {isEven ? (
                      /* Left Card for Even Stages */
                      <CardComponent item={item} prefersReduced={prefersReduced} />
                    ) : (
                      /* Left Ghost Word for Odd Stages (Hidden on mobile) */
                      <GhostWordComponent item={item} isActive={isActive} />
                    )}

                    {/* Column 2 */}
                    {isEven ? (
                      /* Right Ghost Word for Even Stages (Hidden on mobile) */
                      <GhostWordComponent item={item} isActive={isActive} />
                    ) : (
                      /* Right Card for Odd Stages */
                      <CardComponent item={item} prefersReduced={prefersReduced} />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Subtle Bottom Separator Hairline */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none"
      />
    </section>
  );
};

/**
 * Stage Card Component:
 * - Informational card (no fake action buttons, cursor default, no tab-stops)
 * - Restrained 2-3px subtle lift on hover, gentle orange border transition
 * - Smooth scroll entrance fade + 30px upward motion
 */
interface CardProps {
  item: ChainLinkItem;
  prefersReduced: boolean | null;
}

const CardComponent: React.FC<CardProps> = ({ item, prefersReduced }) => {
  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-[#111113] border border-white/10 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-200 ease-out hover:-translate-y-[2.5px] hover:border-[#FC6603]/40 hover:shadow-[0_8px_30px_rgba(252,102,3,0.06)] group/card cursor-default select-text"
    >
      {/* Card Header Row */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[11px] sm:text-[12px] font-bold text-[#FC6603] uppercase tracking-[0.2em]">
          {item.stageNumber}
        </span>
        {/* Subtle decorative chain glyph that rotates slightly on hover */}
        <div
          aria-hidden="true"
          className="text-white/20 group-hover/card:text-[#FC6603]/70 group-hover/card:rotate-12 transition-all duration-200"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display font-extrabold text-[22px] sm:text-[26px] lg:text-[28px] text-white tracking-[-0.02em] leading-[1.18] mb-3">
        {item.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-[14px] sm:text-[15px] text-[#A1A1AA] leading-[1.65] mb-5 sm:mb-6">
        {item.description}
      </p>

      {/* Tags wrapped cleanly in pills */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-white/[0.06]">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/70 tracking-[0.06em] whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Opposite-side Decorative Ghost Word:
 * - Hidden on mobile/tablet (< lg)
 * - Subtle opacity, transition to slight highlight when node is reached
 * - Aria-hidden for screen-reader accessibility
 */
interface GhostWordProps {
  item: ChainLinkItem;
  isActive: boolean;
}

const GhostWordComponent: React.FC<GhostWordProps> = ({ item, isActive }) => {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex flex-col items-center justify-center text-center p-6 select-none pointer-events-none"
    >
      <span
        className={`font-display font-extrabold text-6xl xl:text-7xl 2xl:text-8xl tracking-tight uppercase transition-colors duration-500 ${
          isActive ? 'text-white/[0.13]' : 'text-white/[0.06]'
        }`}
      >
        {item.ghostWord}
      </span>
      <span className="font-mono text-[11px] xl:text-[12px] uppercase tracking-[0.25em] text-[#71717A] mt-3">
        {item.ghostCaption}
      </span>
    </div>
  );
};

export default ChainSection;

