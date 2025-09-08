"use client";
import { useState } from "react";
import { NumberInputField } from "./NumberInputField";
import { SelectField } from "./SelectField";
import { currencyFormatter } from "../helpers/util";

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
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    const total = Number(entries.items) * Number(entries.priceDollars);
    setCalculatedTotal(total);
  };

  return (
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
        onClick={() => setCalculatedTotal(null)}
      >
        Reset
      </button>

      {calculatedTotal !== null && (
        <div className="mt-4 text-lg">
          Total Price: {currencyFormatter.format(calculatedTotal)}
        </div>
      )}
    </form>
  );
}
