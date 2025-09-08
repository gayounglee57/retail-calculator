export function formatCurrency(amount: number, locale = "en-NZ", currency = "NZD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
