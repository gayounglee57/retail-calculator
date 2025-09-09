"use client";
import { HistoryItem } from "../helpers/types";
import { currencyFormatter } from "../helpers/util";

export function RetailCalculatorLedger({
  ledgerHistory = [],
}: {
  ledgerHistory: HistoryItem[];
}) {
  return (
    <table className="w-full border-collapse rounded-xl shadow-md overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-700 text-sm uppercase tracking-wide">
          <th className="px-4 py-3">Sub Total</th>
          <th className="px-4 py-3">Discount</th>
          <th className="px-4 py-3">Tax Amount</th>
          <th className="px-4 py-3">Final Price</th>
        </tr>
      </thead>
      <tbody>
        {ledgerHistory.map((historyItem: HistoryItem, index: number) => (
          <tr className="bg-white" key={index}>
            <td className="px-4 py-3 text-lg text-gray-900">
              {currencyFormatter.format(historyItem.calculatedTotal)}
            </td>
            <td className="px-4 py-3 text-lg text-gray-700">
              {currencyFormatter.format(historyItem.discountAmountDisplay)}
            </td>
            <td className="px-4 py-3 text-lg text-gray-700">
              {currencyFormatter.format(historyItem.taxAmountDisplay)}
            </td>
            <td className="px-4 py-3 text-lg font-semibold">
              {currencyFormatter.format(historyItem.finalPrice)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
