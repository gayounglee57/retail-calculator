"use client";
import { useState } from "react";
import { NumberInputField } from "./components/NumberInputField";
import { SelectField } from "./components/SelectField";

const MAX_INTEGER = 1_000_000;
const MIN_INTEGER = 0;

export default function Home() {
  const [items, setItems] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [region, setRegion] = useState<string>("AUK");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <NumberInputField
          id="items"
          label="Number of Items"
          value={items}
          onChange={setItems}
          min={MIN_INTEGER}
          max={MAX_INTEGER}
          step={1}
          helpText="Enter how many items you want to purchase."
        />

        <NumberInputField
          id="price"
          label="Price per Item"
          value={price}
          onChange={setPrice}
          min={MIN_INTEGER}
          max={MAX_INTEGER}
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
      </main>
    </div>
  );
}