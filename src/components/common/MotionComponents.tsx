'use client';

import React, { type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { BRAND_BUTTON_BASE_CLASS } from "./BrandButton";

export const ease = [0.22, 1, 0.36, 1] as const;
export const smoothEase = [0.16, 1, 0.3, 1] as const;

export function SmoothReveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className = "",
  amount = 0.15,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: smoothEase, delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  stagger = 0.08,
  delayChildren = 0.05,
  className = "",
  amount = 0.15,
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 20,
  duration = 0.55,
  className = "",
}: {
  children: ReactNode;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: smoothEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLine({
  children,
  delay = 0,
  inView = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  inView?: boolean;
  className?: string;
}) {
  const anim = { y: "0%" };
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className || ""}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        {...(inView ? { whileInView: anim, viewport: { once: true } } : { animate: anim })}
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  dataCursor,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "white" | "black";
  className?: string;
  dataCursor?: string;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const isInternalRoute = href.startsWith("/") && !href.startsWith("/#") && !href.includes("#");

  const styles =
    variant === "black"
      ? {
          container:
            "bg-[#000000] text-white border border-[#000000] hover:bg-[#1A1A1A] hover:border-[#FF5400] shadow-sm focus-visible:ring-[#FF5400]",
          badge: "bg-[#FF5400] text-white shadow-sm",
          arrow: "text-white",
        }
      : variant === "white"
        ? {
          container:
            "bg-[#FDF8F5] text-[#000000] border border-[#DAD1CC] hover:bg-[#F3EEEB] hover:border-[#FF5400] shadow-sm focus-visible:ring-[#000000]",
          badge: "bg-[#000000] text-white shadow-sm",
          arrow: "text-white",
        }
        : {
          container:
            "bg-[#FF5400] text-white border border-[#FF5400] hover:bg-[#EB4D00] shadow-sm focus-visible:ring-[#FF5400]",
          badge: "bg-white text-[#FF5400] shadow-sm",
          arrow: "text-[#FF5400]",
        };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInternalRoute) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      style={{ x: sx, y: sy }}
      data-cursor={dataCursor}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.2);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`${BRAND_BUTTON_BASE_CLASS} ${styles.container} ${className}`}
    >
      <span className="leading-none tracking-[-0.01em]">{children}</span>
      <span
        aria-hidden="true"
        className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm ${styles.badge}`}
      >
        <ArrowUpRight className={`w-4 h-4 stroke-[2.5] ${styles.arrow}`} />
      </span>
    </motion.a>
  );
}
