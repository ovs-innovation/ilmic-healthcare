/** Default display currency for Kure Pharma (India). */
export const DEFAULT_CURRENCY = "₹";

/** Map legacy stored symbols to INR. */
export const normalizeCurrency = (symbol) => {
  if (!symbol) return DEFAULT_CURRENCY;
  const legacy = ["$", "€", "£", "USD", "EUR", "GBP", "Dollar", "Euro", "Pound"];
  if (legacy.includes(symbol) || legacy.includes(String(symbol).trim())) {
    return DEFAULT_CURRENCY;
  }
  return symbol;
};
