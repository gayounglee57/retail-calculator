"use client";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const total = items * price;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Number of Items */}
        <div className="flex flex-col gap-2">
          <label htmlFor="items" className="text-sm font-medium">
            Number of Items
          </label>
          <input
            id="items"
            type="number"
            min="0"
            value={items}
            onChange={(e) => setItems(Number(e.target.value))}
            className="border rounded-lg p-2 w-48"
            aria-describedby="items-help"
          />
          <span id="items-help" className="text-xs text-gray-500">
            Enter how many items you want to purchase.
          </span>
        </div>

        {/* Price per Item */}
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price per Item
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border rounded-lg p-2 w-48"
            aria-describedby="price-help"
          />
          <span id="price-help" className="text-xs text-gray-500">
            Enter the cost of a single item.
          </span>
        </div>

        {/* Total */}
        <div className="mt-4 text-lg font-semibold">
          Total Price: ${total.toFixed(2)}
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
