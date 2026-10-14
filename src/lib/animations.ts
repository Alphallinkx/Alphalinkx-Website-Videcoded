import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Text reveal animation: slides up from mask
 */
export function animateTextReveal(
  element: HTMLElement | string,
  options?: {
    stagger?: number;
    delay?: number;
    duration?: number;
  }
) {
  const { stagger = 0.04, delay = 0, duration = 0.9 } = options || {};

  return gsap.fromTo(
    element,
    {
      y: '110%',
      opacity: 0,
      rotateX: -15,
    },
    {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
    }
  );
}

/**
 * Magnetic button interaction utility
 */
export function initMagneticEffect(element: HTMLElement, strength = 0.35) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}

export { gsap, ScrollTrigger };
