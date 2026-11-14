'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRIES, CountryPhoneConfig, formatWithMask } from '../../lib/countryPhoneData';

interface CountryPhoneInputProps {
  value: string;
  onChange: (fullPhoneNumber: string, country: CountryPhoneConfig, rawDigits: string) => void;
  required?: boolean;
}

export const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  onChange,
  required = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryPhoneConfig>(COUNTRIES[0]); // Default to US
  const [rawDigits, setRawDigits] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Guarantee mouse-wheel / trackpad scrolling works smoothly without Lenis page scroll hijacking
  useEffect(() => {
    const listEl = listRef.current;
    if (!isOpen || !listEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      listEl.scrollTop += e.deltaY;
      e.preventDefault();
    };

    listEl.addEventListener('wheel', handleWheel, { passive: false });

    // Auto-scroll to selected country
    const selectedBtn = listEl.querySelector<HTMLElement>('[aria-selected="true"]');
    if (selectedBtn) {
      selectedBtn.scrollIntoView({ block: 'nearest' });
    }

    return () => {
      listEl.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  // Close dropdown on outside click or escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        phoneInputRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // Auto-focus search input
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Handle phone input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    // Extract only digits
    const digits = inputVal.replace(/\D/g, '').slice(0, selectedCountry.digits);
    setRawDigits(digits);

    const formatted = formatWithMask(digits, selectedCountry.format);
    const fullNumber = digits ? `${selectedCountry.dialCode} ${formatted}` : '';
    onChange(fullNumber, selectedCountry, digits);
  };

  // Handle country selection
  const handleSelectCountry = (country: CountryPhoneConfig) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');

    // Re-format current raw digits for new country's mask and digit limit
    const trimmedDigits = rawDigits.slice(0, country.digits);
    setRawDigits(trimmedDigits);
    const formatted = formatWithMask(trimmedDigits, country.format);
    const fullNumber = trimmedDigits ? `${country.dialCode} ${formatted}` : '';
    onChange(fullNumber, country, trimmedDigits);

    phoneInputRef.current?.focus();
  };

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  const formattedDisplay = formatWithMask(rawDigits, selectedCountry.format);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center w-full rounded-xl bg-white/5 border border-white/10 text-white font-sans text-[15px] transition-colors focus-within:border-[#FF5A1F] focus-within:ring-1 focus-within:ring-[#FF5A1F]/30">
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center gap-1.5 px-3 py-3 rounded-l-xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border-r border-white/10 shrink-0 text-white select-none focus:outline-none"
        >
          <span className="text-lg leading-none" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <span className="font-mono text-[13px] font-semibold text-white/90">
            {selectedCountry.dialCode}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#FF5A1F]' : ''
            }`}
          />
        </button>

        {/* Formatted Phone Input with exact digit limit */}
        <input
          ref={phoneInputRef}
          type="tel"
          required={required}
          value={formattedDisplay}
          onChange={handleInputChange}
          placeholder={selectedCountry.placeholder}
          className="flex-1 min-w-0 px-3.5 py-3 bg-transparent text-white font-sans text-[15px] focus:outline-none placeholder:text-white/30"
        />

        {/* Digit count badge */}
        <div className="pr-3 pl-1 font-mono text-[11px] text-white/40 shrink-0 select-none">
          {rawDigits.length}/{selectedCountry.digits}
        </div>
      </div>

      {/* Floating Country Dropdown Popover */}
      {isOpen && (
        <div
          role="listbox"
          data-lenis-prevent
          className="absolute left-0 top-full mt-2 z-50 w-full sm:w-[330px] max-h-[290px] rounded-2xl bg-[#141519] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Search Bar */}
          <div className="p-2.5 border-b border-white/10 bg-[#16171D] flex items-center gap-2 shrink-0">
            <Search className="w-4 h-4 text-white/40 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full bg-transparent text-white font-sans text-[13.5px] placeholder:text-white/35 focus:outline-none"
            />
          </div>

          {/* Scrollable Country List */}
          <div
            ref={listRef}
            data-lenis-prevent
            className="overflow-y-auto flex-1 divide-y divide-white/[0.04] p-1.5 custom-scrollbar"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-xs font-mono text-white/40">
                No matching country found
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                      isSelected
                        ? 'bg-[#FF5A1F] text-black font-semibold'
                        : 'text-white/85 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{c.flag}</span>
                      <span className="text-[13px] truncate">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 font-mono text-[12px]">
                      <span className={isSelected ? 'text-black/80' : 'text-white/50'}>
                        {c.dialCode}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-black/20 text-black' : 'bg-white/5 text-white/40'
                        }`}
                      >
                        {c.digits}d
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
