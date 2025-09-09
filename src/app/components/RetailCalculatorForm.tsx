"use client";
import { useEffect, useState } from "react";
import { NumberInputField } from "./NumberInputField";
import { SelectField } from "./SelectField";
import {
  calculateDiscount,
  currencyFormatter,
  getTaxAmount,
} from "../helpers/util";
import { HistoryItem, RetailCalculatorLedger } from "./RetailCalculatorLedger";

const options = [
  { value: "AUK", label: "AUK" },
  { value: "CHC", label: "CHC" },
  { value: "WAI", label: "WAI" },
  { value: "WLG", label: "WLG" },
  { value: "TAS", label: "TAS" },
];

const MAX_INTEGER = 1_000_000;
const MIN_INTEGER = 0;

export function RetailCalculatorForm() {
  const [calculatedSubTotal, setCalculatedSubTotal] = useState<number | null>(
    null
  );
  const [taxAmountDisplay, setTaxAmountDisplay] = useState<number | null>(null);
  const [calculatedFinalPrice, setCalculatedFinalPrice] = useState<
    number | null
  >(null);
  const [discountAmountDisplay, setDiscountAmountDisplay] = useState<
    number | null
  >(null);
  const [ledgerHistory, setLedgerHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setLedgerHistory(
      JSON.parse(localStorage.getItem("retailCalculatorData") || "[]")
    );
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    // Sub total which is the raw amount
    const subTotal = Number(entries.items) * Number(entries.priceDollars);
    setCalculatedSubTotal(subTotal);

    // Amount which will be the discount
    const discount = calculateDiscount(subTotal);
    setDiscountAmountDisplay(discount);

    // Amount which will be the tax
    const discountedPrice = subTotal - discount;
    const taxedAmount = getTaxAmount(discountedPrice, entries.region as string);
    setTaxAmountDisplay(taxedAmount);

    // Final price
    const finalPrice = subTotal - discount + taxedAmount;
    setCalculatedFinalPrice(finalPrice);

    // Fetch existing history from local storage
    const existingHistory = JSON.parse(
      localStorage.getItem("retailCalculatorData") || "[]"
    );

    // Set new history entry in local storage
    const newHistory = [
      ...existingHistory,
      {
        calculatedTotal: subTotal,
        discountAmountDisplay: discountedPrice,
        taxAmountDisplay: taxedAmount,
        finalPrice,
      },
    ];

    setLedgerHistory(newHistory);
    localStorage.setItem("retailCalculatorData", JSON.stringify(newHistory));
  };

  return (
    <div className="flex items-center sm:items-start">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center sm:items-start"
      >
        <NumberInputField
          id="items"
          name="items"
          label="Number of Items"
          min={MIN_INTEGER}
          max={MAX_INTEGER}
          step={1}
          helpText="Enter how many items you want to purchase."
        />

        <NumberInputField
          id="priceDollars"
          name="priceDollars"
          label="Price per Item"
          min={MIN_INTEGER}
          max={MAX_INTEGER}
          step={0.01}
          helpText="Enter the cost of a single item."
        />

        <SelectField
          id="region"
          name="region"
          label="Region"
          options={options}
          helpText="Select your region."
        />

        <button
          data-testid="calculateButton"
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Calculate Price
        </button>
        <button
          type="reset"
          className="text-gray-600 underline"
          onClick={() => setCalculatedSubTotal(null)}
        >
          Reset
        </button>

        {calculatedSubTotal !== null && (
          <div className="mt-4 text-lg">
            Sub Total: {currencyFormatter.format(calculatedSubTotal)}
          </div>
        )}
        {discountAmountDisplay !== null && (
          <div className="mt-4 text-lg">
            Discount Amount: {currencyFormatter.format(discountAmountDisplay)}
          </div>
        )}
        {taxAmountDisplay !== null && (
          <div className="mt-4 text-lg">
            Tax Amount: {currencyFormatter.format(taxAmountDisplay)}
          </div>
        )}
        {calculatedFinalPrice !== null && (
          <div className="mt-4 text-lg">
            Final Price: {currencyFormatter.format(calculatedFinalPrice)}
          </div>
        )}
      </form>
      <RetailCalculatorLedger ledgerHistory={ledgerHistory} />
    </div>
  );
}
