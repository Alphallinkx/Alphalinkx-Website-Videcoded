import React, { type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ease = [0.22, 1, 0.36, 1] as const;

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
  variant?: "primary" | "ghost";
  className?: string;
  dataCursor?: string;
}) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const isInternalRoute = href.startsWith("/") && !href.startsWith("/#") && !href.includes("#");

  const styles =
    variant === "primary"
      ? "bg-[#FF5A1F] text-black hover:bg-white hover:text-black font-bold shadow-[0_0_28px_rgba(255,90,31,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]"
      : "border border-white/20 text-white hover:border-[#FF5A1F] hover:text-[#FF5A1F] bg-[#111113]/70 hover:bg-[#161619] backdrop-blur-md";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isInternalRoute) {
      e.preventDefault();
      navigate(href);
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
      className={`group relative inline-flex items-center gap-3 rounded-full px-8 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${styles} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  );
}
