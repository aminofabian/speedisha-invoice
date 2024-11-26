export interface CountryData {
  name: string;
  code: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
}

export const defaultCountry: CountryData = {
  name: "Kenya",
  code: "KE",
  currency: {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
  },
};

export const countriesData: CountryData[] = [
  defaultCountry,
  {
    name: "United States",
    code: "US",
    currency: {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
    },
  },
  {
    name: "United Kingdom",
    code: "GB",
    currency: {
      code: "GBP",
      name: "British Pound",
      symbol: "£",
    },
  },
  {
    name: "European Union",
    code: "EU",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€",
    },
  },
  {
    name: "Tanzania",
    code: "TZ",
    currency: {
      code: "TZS",
      name: "Tanzanian Shilling",
      symbol: "TSh",
    },
  },
  {
    name: "Uganda",
    code: "UG",
    currency: {
      code: "UGX",
      name: "Ugandan Shilling",
      symbol: "USh",
    },
  },
  {
    name: "South Africa",
    code: "ZA",
    currency: {
      code: "ZAR",
      name: "South African Rand",
      symbol: "R",
    },
  },
  {
    name: "Nigeria",
    code: "NG",
    currency: {
      code: "NGN",
      name: "Nigerian Naira",
      symbol: "₦",
    },
  },
  {
    name: "China",
    code: "CN",
    currency: {
      code: "CNY",
      name: "Chinese Yuan",
      symbol: "¥",
    },
  },
  {
    name: "Japan",
    code: "JP",
    currency: {
      code: "JPY",
      name: "Japanese Yen",
      symbol: "¥",
    },
  },
  {
    name: "India",
    code: "IN",
    currency: {
      code: "INR",
      name: "Indian Rupee",
      symbol: "₹",
    },
  },
  {
    name: "Australia",
    code: "AU",
    currency: {
      code: "AUD",
      name: "Australian Dollar",
      symbol: "A$",
    },
  },
  {
    name: "Canada",
    code: "CA",
    currency: {
      code: "CAD",
      name: "Canadian Dollar",
      symbol: "C$",
    },
  },
  {
    name: "Switzerland",
    code: "CH",
    currency: {
      code: "CHF",
      name: "Swiss Franc",
      symbol: "Fr",
    },
  },
  {
    name: "Brazil",
    code: "BR",
    currency: {
      code: "BRL",
      name: "Brazilian Real",
      symbol: "R$",
    },
  },
  {
    name: "Russia",
    code: "RU",
    currency: {
      code: "RUB",
      name: "Russian Ruble",
      symbol: "₽",
    },
  },
  {
    name: "South Korea",
    code: "KR",
    currency: {
      code: "KRW",
      name: "South Korean Won",
      symbol: "₩",
    },
  },
  {
    name: "Singapore",
    code: "SG",
    currency: {
      code: "SGD",
      name: "Singapore Dollar",
      symbol: "S$",
    },
  },
  {
    name: "New Zealand",
    code: "NZ",
    currency: {
      code: "NZD",
      name: "New Zealand Dollar",
      symbol: "NZ$",
    },
  },
  {
    name: "Mexico",
    code: "MX",
    currency: {
      code: "MXN",
      name: "Mexican Peso",
      symbol: "$",
    },
  },
  {
    name: "Ethiopia",
    code: "ET",
    currency: {
      code: "ETB",
      name: "Ethiopian Birr",
      symbol: "Br",
    },
  },
  {
    name: "Ghana",
    code: "GH",
    currency: {
      code: "GHS",
      name: "Ghanaian Cedi",
      symbol: "₵",
    },
  },
  {
    name: "Rwanda",
    code: "RW",
    currency: {
      code: "RWF",
      name: "Rwandan Franc",
      symbol: "FRw",
    },
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    currency: {
      code: "AED",
      name: "UAE Dirham",
      symbol: "د.إ",
    },
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    currency: {
      code: "SAR",
      name: "Saudi Riyal",
      symbol: "﷼",
    },
  }
];

// Helper function to get currency data by country code
export function getCurrencyByCountryCode(countryCode: string): CountryData["currency"] {
  const country = countriesData.find(c => c.code === countryCode);
  return country?.currency || defaultCountry.currency;
}

// Helper function to get currency data by currency code
export function getCurrencyByCode(currencyCode: string): CountryData["currency"] {
  const country = countriesData.find(c => c.currency.code === currencyCode);
  return country?.currency || defaultCountry.currency;
}

// Helper function to format amount in specific currency
export function formatAmount(amount: number, currencyCode: string): string {
  const currency = getCurrencyByCode(currencyCode);
  return `${currency.symbol}${amount.toLocaleString()}`;
}
