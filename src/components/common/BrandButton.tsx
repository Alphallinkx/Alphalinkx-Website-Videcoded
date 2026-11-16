'use client';

import React from 'react';
import Link from 'next/link';
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
  // Primary CTA (Two26 signature black pill): Deep black with white text and vibrant accent badge
  black: {
    container:
      'bg-[#000000] text-white border border-[#000000] hover:bg-[#1A1A1A] hover:border-[#FF5400] hover:scale-[1.03] active:scale-[0.98] shadow-sm focus-visible:ring-[#FF5400]',
    badge: 'bg-[#FF5400] text-white shadow-sm',
    arrow: 'text-white',
  },
  // Vibrant Brand Accent CTA: Warm vibrant Two26 orange pill
  orange: {
    container:
      'bg-[#FF5400] text-white border border-[#FF5400] hover:bg-[#EB4D00] hover:scale-[1.03] active:scale-[0.98] shadow-sm focus-visible:ring-[#FF5400]',
    badge: 'bg-white text-[#FF5400] shadow-sm',
    arrow: 'text-[#FF5400]',
  },
  // Secondary Light / Surface CTA: Two26 surface cream pill with hairline border
  white: {
    container:
      'bg-[#FDF8F5] text-[#000000] border border-[#DAD1CC] hover:bg-[#F3EEEB] hover:border-[#FF5400] hover:scale-[1.03] active:scale-[0.98] shadow-sm focus-visible:ring-[#000000]',
    badge: 'bg-[#000000] text-white shadow-sm',
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
        href={rest.to}
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

