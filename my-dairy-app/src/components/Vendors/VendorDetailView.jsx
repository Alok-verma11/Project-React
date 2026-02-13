import React, { useMemo } from "react";
import { ArrowLeft, History } from "lucide-react";
import HistoryCard from "../History/HistoryCard";

export default function VendorDetailView({
  vendor,
  entries,
  settings,
  onBack,
  onDeleteEntry,
  isDarkMode,
}) {
  if (!vendor) return null;

  const totals = useMemo(() => {
    return entries.reduce(
      (acc, entry) => {
        acc.liters += parseFloat(entry.liters) || 0;
        acc.totalPrice += parseFloat(entry.total) || 0;
        return acc;
      },
      { liters: 0, totalPrice: 0 },
    );
  }, [entries]);

  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);
  const cardBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-100";

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className={`p-2 rounded-full shadow-sm border active:scale-90 transition-transform ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-white border-slate-100 text-slate-600"}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2
            className={`text-xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}
          >
            {vendor.name}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {vendor.phone || "Profile Details"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`${cardBg} p-4 rounded-2xl shadow-sm border`}>
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
             Total Milk Quantity
          </p>
          <p
            className={`text-xl font-black ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
          >
            {totals.liters.toFixed(2)} L
          </p>
        </div>
        <div className={`${cardBg} p-4 rounded-2xl shadow-sm border`}>
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
            Total Payment
          </p>
          <p
            className={`text-xl font-black ${isDarkMode ? "text-green-400" : "text-green-600"}`}
          >
            {settings.currency}
            {totals.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3
            className={`text-sm font-bold uppercase flex items-center gap-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            <History className="w-4 h-4" /> History
          </h3>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-600"}`}
          >
            {entries.length} Entries
          </span>
        </div>

        <div className="space-y-3">
          {sortedEntries.map((entry) => (
            <HistoryCard
              key={entry.id}
              entry={entry}
              settings={settings}
              onDelete={onDeleteEntry}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
