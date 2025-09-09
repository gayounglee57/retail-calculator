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

// const applyDiscount = (orderValue: number) => {

// };

// export const calculateDiscountedPrice = (orderValue: number, index: number) => {
//   // Example of order $1200
//   // 1200 - 999 then calculate discount on 201 = discountAmount
//   // check if remainder is positive
//   // if negative, then return.
//   // output should be 1194
//   // calculateDiscountedPrice(1200, 0);

//   const orderValueTiers = [0, 1000, 5000, 7000, 10000, 50000];
//   const discountAmounts = [0, 0.03, 0.05, 0.07, 0.1, 0.15];

//   const remainder = orderValue - orderValueTiers[index]; // 1200 - 1000 = 200 // 200 - 5000 = -4800
//   console.log("remainder", remainder);
//   const discountAmount = remainder * discountAmounts[index]; // 200 * 0.03 // -4800 * 0.05
//   console.log("discountAmount", discountAmount);

//   if (remainder > 0) {
//     return calculateDiscountedPrice(remainder, index + 1);
//   } else {
//     return {
//       discountAmount,
//       remainder,
//     };
//   }
// };
