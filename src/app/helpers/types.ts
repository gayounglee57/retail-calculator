export enum DiscountAmount {
    UP_TO_999 = 0,
    FROM_1000_TO_4999 = 0.03,
    FROM_5000_TO_6999 = 0.05,
    FROM_7000_TO_9999 = 0.07,
    FROM_10000_TO_49999 = 0.10,
    FROM_50000 = 0.15,
}

export enum TaxRates {
    AUK = 0.0685,
    CHC = 0.08,
    WAI = 0.0625,
    WLG = 0.04,
    TAS = 0.0825,
}

export type HistoryItem = {
  calculatedTotal: number;
  discountAmountDisplay: number;
  taxAmountDisplay: number;
  finalPrice: number;
};