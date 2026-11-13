export interface CountryPhoneConfig {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  digits: number;
  format: string;
  placeholder: string;
}

export const COUNTRIES: CountryPhoneConfig[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
    digits: 10,
    format: '(###) ###-####',
    placeholder: '(555) 000-0000',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44',
    digits: 10,
    format: '#### ######',
    placeholder: '7911 123456',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    dialCode: '+1',
    digits: 10,
    format: '(###) ###-####',
    placeholder: '(555) 000-0000',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    dialCode: '+61',
    digits: 9,
    format: '### ### ###',
    placeholder: '412 345 678',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    dialCode: '+971',
    digits: 9,
    format: '## ### ####',
    placeholder: '50 123 4567',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    dialCode: '+966',
    digits: 9,
    format: '## ### ####',
    placeholder: '50 123 4567',
  },
  {
    code: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    dialCode: '+92',
    digits: 10,
    format: '### #######',
    placeholder: '300 1234567',
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    dialCode: '+91',
    digits: 10,
    format: '##### #####',
    placeholder: '98765 43210',
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    dialCode: '+49',
    digits: 11,
    format: '### #######',
    placeholder: '170 1234567',
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    dialCode: '+33',
    digits: 9,
    format: '## ## ## ## ##',
    placeholder: '6 12 34 56 78',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    dialCode: '+65',
    digits: 8,
    format: '#### ####',
    placeholder: '8123 4567',
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    dialCode: '+353',
    digits: 9,
    format: '## ### ####',
    placeholder: '85 123 4567',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    dialCode: '+31',
    digits: 9,
    format: '## ########',
    placeholder: '6 12345678',
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    dialCode: '+41',
    digits: 9,
    format: '## ### ## ##',
    placeholder: '79 123 45 67',
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    dialCode: '+34',
    digits: 9,
    format: '### ## ## ##',
    placeholder: '612 34 56 78',
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    dialCode: '+39',
    digits: 10,
    format: '### #######',
    placeholder: '320 1234567',
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    dialCode: '+64',
    digits: 9,
    format: '### ### ###',
    placeholder: '21 123 4567',
  },
  {
    code: 'QA',
    name: 'Qatar',
    flag: '🇶🇦',
    dialCode: '+974',
    digits: 8,
    format: '#### ####',
    placeholder: '3312 3456',
  },
  {
    code: 'KW',
    name: 'Kuwait',
    flag: '🇰🇼',
    dialCode: '+965',
    digits: 8,
    format: '#### ####',
    placeholder: '5123 4567',
  },
  {
    code: 'BH',
    name: 'Bahrain',
    flag: '🇧🇭',
    dialCode: '+973',
    digits: 8,
    format: '#### ####',
    placeholder: '3612 3456',
  },
  {
    code: 'OM',
    name: 'Oman',
    flag: '🇴🇲',
    dialCode: '+968',
    digits: 8,
    format: '#### ####',
    placeholder: '9123 4567',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    dialCode: '+27',
    digits: 9,
    format: '## ### ####',
    placeholder: '71 123 4567',
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    dialCode: '+55',
    digits: 11,
    format: '(##) #####-####',
    placeholder: '(11) 98765-4321',
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    dialCode: '+81',
    digits: 10,
    format: '## #### ####',
    placeholder: '90 1234 5678',
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    dialCode: '+60',
    digits: 10,
    format: '## ### ####',
    placeholder: '12 345 6789',
  },
  {
    code: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    dialCode: '+90',
    digits: 10,
    format: '### ### ## ##',
    placeholder: '532 123 45 67',
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    dialCode: '+46',
    digits: 9,
    format: '## ### ## ##',
    placeholder: '70 123 45 67',
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    dialCode: '+47',
    digits: 8,
    format: '### ## ###',
    placeholder: '412 34 567',
  },
  {
    code: 'DK',
    name: 'Denmark',
    flag: '🇩🇰',
    dialCode: '+45',
    digits: 8,
    format: '## ## ## ##',
    placeholder: '20 12 34 56',
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    dialCode: '+52',
    digits: 10,
    format: '### ### ####',
    placeholder: '55 1234 5678',
  },
  {
    code: 'OTHER',
    name: 'Other Country',
    flag: '🌐',
    dialCode: '+',
    digits: 15,
    format: '###############',
    placeholder: 'Country code & number',
  },
];

export function formatWithMask(digitsOnly: string, mask: string): string {
  if (!digitsOnly) return '';
  let digitIndex = 0;
  let formatted = '';

  for (let i = 0; i < mask.length; i++) {
    const char = mask[i];
    if (char === '#') {
      if (digitIndex < digitsOnly.length) {
        formatted += digitsOnly[digitIndex];
        digitIndex++;
      } else {
        break;
      }
    } else {
      if (digitIndex < digitsOnly.length) {
        formatted += char;
      } else {
        break;
      }
    }
  }

  return formatted;
}

