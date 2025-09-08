"use client";
import { useState } from "react";
import { NumberInputField } from "./components/NumberInputField";
import { SelectField } from "./components/SelectField";
import { formatCurrency } from "./helpers/util";

const options = [
  { value: "AUK", label: "AUK" },
  { value: "CHC", label: "CHC" },
  { value: "WAI", label: "WAI" },
  { value: "WLG", label: "WLG" },
  { value: "TAS", label: "TAS" },
];

export default function Home() {
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    const total = Number(entries.items) * Number(entries.price);
    setCalculatedTotal(total);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center sm:items-start"
        >
          <NumberInputField
            id="items"
            name="items"
            label="Number of Items"
            min={0}
            step={1}
            helpText="Enter how many items you want to purchase."
          />

          <NumberInputField
            id="price"
            name="price"
            label="Price per Item"
            min={0}
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
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Calculate final price"
          >
            Calculate Price
          </button>

          {calculatedTotal !== null && (
            <div className="mt-4 text-lg font-semibold">
              Total Price: {formatCurrency(calculatedTotal)}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
