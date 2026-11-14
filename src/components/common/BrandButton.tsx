'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export type BrandButtonVariant = 'orange' | 'white' | 'black';

interface BaseProps {
  children: React.ReactNode;
  variant?: BrandButtonVariant;
  className?: string;
  dataCursor?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
}

interface LinkButtonProps extends BaseProps {
  to: string;
  href?: never;
  type?: never;
  disabled?: never;
}

interface AnchorButtonProps extends BaseProps {
  href: string;
  to?: never;
  type?: never;
  disabled?: never;
  target?: string;
  rel?: string;
}

interface NativeButtonProps extends BaseProps {
  to?: never;
  href?: never;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export type BrandButtonProps = LinkButtonProps | AnchorButtonProps | NativeButtonProps;

const VARIANT_CLASSES: Record<
  BrandButtonVariant,
  { container: string; badge: string; arrow: string }
> = {
  // Primary CTA (On dark/black backgrounds): Radiant theme orange pill with white circular badge & orange arrow
  orange: {
    container:
      'bg-gradient-to-r from-[#FF5A1F] via-[#FF6926] to-[#FC6603] text-white shadow-[0_4px_24px_rgba(255,90,31,0.45)] hover:shadow-[0_6px_32px_rgba(255,90,31,0.7)] hover:brightness-105 focus-visible:ring-[#FF5A1F]',
    badge: 'bg-white text-[#FC6603] shadow-[0_2px_8px_rgba(0,0,0,0.2)]',
    arrow: 'text-[#FC6603]',
  },
  // Dark CTA (For orange, peach, cream, or light backgrounds): Deep black pill with theme orange circular badge & white arrow
  black: {
    container:
      'bg-[#0A0A0B] text-white border border-white/15 shadow-[0_6px_24px_rgba(0,0,0,0.45)] hover:bg-[#141416] hover:border-[#FF5A1F]/60 hover:shadow-[0_8px_28px_rgba(255,90,31,0.3)] focus-visible:ring-[#FF5A1F]',
    badge: 'bg-[#FF5A1F] text-white shadow-[0_0_14px_rgba(255,90,31,0.5)]',
    arrow: 'text-white',
  },
  // Light CTA (For dark or orange backgrounds where a white pill is desired): Crisp white pill with theme orange circular badge & white arrow
  white: {
    container:
      'bg-white text-[#0A0A0B] border border-white/20 shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:bg-[#F4F4F5] hover:shadow-[0_8px_26px_rgba(255,255,255,0.3)] focus-visible:ring-white',
    badge: 'bg-[#FF5A1F] text-white shadow-[0_0_14px_rgba(255,90,31,0.45)]',
    arrow: 'text-white',
  },
};

export const BRAND_BUTTON_BASE_CLASS =
  'group relative inline-flex items-center justify-center gap-3.5 pt-[7px] pr-[7px] pb-[7px] pl-[22px] rounded-full font-sans text-[14.5px] font-semibold leading-none whitespace-nowrap antialiased transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709] disabled:opacity-50 disabled:pointer-events-none select-none';

/**
 * Site-wide canonical pill CTA button:
 * - Adapts intelligently to background colors for maximum contrast & beauty:
 *   - 'orange' (default on dark/black backgrounds): Radiant theme orange pill with white circular badge
 *   - 'black' (on orange or light backgrounds): Deep black pill with theme orange circular badge (user reference)
 *   - 'white' (on dark or orange backgrounds): Crisp white pill with theme orange circular badge
 */
export const BrandButton: React.FC<BrandButtonProps> = ({
  children,
  variant = 'orange',
  className = '',
  dataCursor,
  onClick,
  ariaLabel,
  ...rest
}) => {
  const styles = VARIANT_CLASSES[variant];
  const mergedClass = `${BRAND_BUTTON_BASE_CLASS} ${styles.container} ${className}`.trim();

  const innerContent = (
    <>
      <span className="leading-none tracking-[-0.01em]">{children}</span>
      <span
        aria-hidden="true"
        className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm ${styles.badge}`}
      >
        <ArrowUpRight className={`w-4 h-4 stroke-[2.5] ${styles.arrow}`} />
      </span>
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link
        to={rest.to}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor={dataCursor}
        className={mergedClass}
      >
        {innerContent}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a
        href={rest.href}
        onClick={onClick}
        aria-label={ariaLabel}
        data-cursor={dataCursor}
        target={rest.target}
        rel={rest.rel}
        className={mergedClass}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type={(rest as NativeButtonProps).type || 'button'}
      disabled={(rest as NativeButtonProps).disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor={dataCursor}
      className={mergedClass}
    >
      {innerContent}
    </button>
  );
};

export default BrandButton;

