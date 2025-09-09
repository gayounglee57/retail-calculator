"use client";
import { useEffect, useState } from "react";
import { RetailCalculatorForm } from "./components/RetailCalculatorForm";
import { RetailCalculatorLedger } from "./components/RetailCalculatorLedger";
import { HistoryItem } from "./helpers/types";

export default function Home() {
  const [ledgerHistory, setLedgerHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setLedgerHistory(
      JSON.parse(localStorage.getItem("retailCalculatorData") || "[]")
    );
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex gap-[32px] row-start-2 items-center sm:items-start">
        <RetailCalculatorForm setLedgerHistory={setLedgerHistory} />
        <RetailCalculatorLedger ledgerHistory={ledgerHistory} />
      </main>
    </div>
  );
}
