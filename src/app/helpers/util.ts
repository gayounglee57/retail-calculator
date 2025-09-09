import { DiscountAmount, TaxRates } from "./types";

export const currencyFormatter = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
});

export const calculateDiscount = (orderValue: number): number => {
  if (orderValue >= 1000 && orderValue < 5000) {
    return orderValue * DiscountAmount.FROM_1000_TO_4999;
  } else if (orderValue >= 5000 && orderValue < 7000) {
    return orderValue * DiscountAmount.FROM_5000_TO_6999;
  } else if (orderValue >= 7000 && orderValue < 10_000) {
    return orderValue * DiscountAmount.FROM_7000_TO_9999;
  } else if (orderValue >= 10_000 && orderValue < 50_000) {
    return orderValue * DiscountAmount.FROM_10000_TO_49999;
  } else if (orderValue >= 50_000) {
    return orderValue * DiscountAmount.FROM_50000;
  } else {
    return 0;
  }
};

export const getTaxAmount = (orderValue: number, region: string): number => {
  switch (region) {
    case "AUK":
      return orderValue * TaxRates.AUK;
    case "CHC":
      return orderValue * TaxRates.CHC;
    case "WAI":
      return orderValue * TaxRates.WAI;
    case "WLG":
      return orderValue * TaxRates.WLG;
    case "TAS":
      return orderValue * TaxRates.TAS;
    default:
      return 0;
  }
};

export const calculateDiscountedPrice = (orderValue: number): string => {
  const tiers = [0, 1000, 5000, 7000, 10000, 50000, Number.MAX_SAFE_INTEGER]; // tiers define the lower bound of each bracket
  const rates = [0, 0.03, 0.05, 0.07, 0.1, 0.15]; // progressive discount rates

  let discountedTotal = 0;

  for (let i = 0; i < rates.length; i++) {
    const lower = tiers[i];
    const upper = tiers[i + 1];

    if (orderValue > lower) {
      const portion = Math.min(orderValue, upper) - lower;

      // apply discount rate to this portion
      const discountedPortion = portion * (1 - rates[i]);
      discountedTotal += discountedPortion;
    }
  }

  return currencyFormatter.format(discountedTotal);
};

