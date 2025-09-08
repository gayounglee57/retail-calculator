"use client";
import { useState } from "react";
import { NumberInputField } from "./NumberInputField";
import { SelectField } from "./SelectField";
import { formatCurrency } from "../helpers/util";

export function RetailCalculatorForm() {
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null);
  const itemsIdentifier = "items";
  const priceIdentifier = "price";
  const regionIdentifier = "region";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const items = Number(formData.get(itemsIdentifier));
    const price = Number(formData.get(priceIdentifier));

    const total = items * price;
    setCalculatedTotal(total);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 items-center sm:items-start"
    >
      <NumberInputField
        id={itemsIdentifier}
        name={itemsIdentifier}
        label="Number of Items"
        min={0}
        step={1}
        helpText="Enter how many items you want to purchase."
      />

      <NumberInputField
        id={priceIdentifier}
        name={priceIdentifier}
        label="Price per Item"
        min={0}
        step={0.01}
        helpText="Enter the cost of a single item."
      />

      <SelectField
        id={regionIdentifier}
        name={regionIdentifier}
        label="Region"
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
        <div className="mt-4 text-lg">
          Total Price: {formatCurrency(calculatedTotal)}
        </div>
      )}
    </form>
  );
}
