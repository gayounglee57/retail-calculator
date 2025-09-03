"use client";
import { useState } from "react";
import { NumberInputField } from "./components/NumberInputField";
import { SelectField } from "./components/SelectField";

export default function Home() {
  const [items, setItems] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [region, setRegion] = useState<string>("AUK");
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = items * price;
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
            label="Number of Items"
            value={items}
            onChange={setItems}
            min={0}
            step={1}
            helpText="Enter how many items you want to purchase."
          />

          <NumberInputField
            id="price"
            label="Price per Item"
            value={price}
            onChange={setPrice}
            min={0}
            step={0.01}
            helpText="Enter the cost of a single item."
          />

          <SelectField
            id="region"
            label="Region"
            value={region}
            onChange={setRegion}
            options={[
              { value: "AUK", label: "AUK" },
              { value: "CHC", label: "CHC" },
              { value: "WAI", label: "WAI" },
              { value: "WLG", label: "WLG" },
              { value: "TAS", label: "TAS" },
            ]}
            helpText="Select your region."
          />

          <button
            data-testid="calculateButton"
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Calculate final price"
          >
            Calculate Price
          </button>

          {calculatedTotal !== null && (
            <div className="mt-4 text-lg font-semibold">
              Total Price: ${calculatedTotal.toFixed(2)}
            </div>
          )}
        </form>
      </main>
    </div>
  );
}