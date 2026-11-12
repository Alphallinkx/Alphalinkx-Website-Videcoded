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
  { container: string; badge: string }
> = {
  // Primary CTA on dark/black backgrounds
  orange: {
    container:
      'bg-[#FC6603] text-white shadow-[0_4px_20px_rgba(252,102,3,0.32)] hover:bg-[#FF6E12] hover:shadow-[0_8px_28px_rgba(252,102,3,0.52)] focus-visible:ring-[#FC6603]',
    badge: 'bg-white text-[#0A0A0B]',
  },
  // High-contrast light CTA on dark/orange backgrounds
  white: {
    container:
      'bg-white text-[#0A0A0B] shadow-[0_4px_20px_rgba(255,255,255,0.14)] hover:bg-[#F4F4F5] hover:shadow-[0_8px_26px_rgba(255,255,255,0.26)] focus-visible:ring-white',
    badge: 'bg-[#FC6603] text-white',
  },
  // High-contrast dark CTA on orange, cream, or white backgrounds (shadow-only ring keeps exact 50px height)
  black: {
    container:
      'bg-[#0A0A0B] text-white shadow-[0_6px_20px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(255,255,255,0.12)] hover:bg-[#16161A] hover:shadow-[0_10px_28px_rgba(0,0,0,0.38),inset_0_0_0_1px_rgba(255,255,255,0.2)] focus-visible:ring-[#0A0A0B]',
    badge: 'bg-white text-[#0A0A0B]',
  },
};

export const BRAND_BUTTON_BASE_CLASS =
  'group relative inline-flex items-center justify-center gap-3 pt-[10px] pr-[10px] pb-[10px] pl-[20px] rounded-full border-0 font-mono text-[14px] font-semibold uppercase tracking-[0.14em] leading-none whitespace-nowrap antialiased transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709] disabled:opacity-45 disabled:pointer-events-none';

/**
 * Site-wide canonical pill CTA button:
 * - Uniform 14px JetBrains Mono 600 typography
 * - Exact 10px 10px 10px 20px padding
 * - Identical 30px circular arrow badge (strictly 50px total height everywhere)
 * - Adaptive high-contrast surface variants ('orange' | 'white' | 'black')
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
      <span className="leading-none">{children}</span>
      <span
        aria-hidden="true"
        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm ${styles.badge}`}
      >
        <ArrowUpRight className="w-4 h-4 stroke-[2.25]" />
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

