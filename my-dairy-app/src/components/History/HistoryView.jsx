import React from "react";
import { ClipboardList } from "lucide-react";
import HistoryCard from "./HistoryCard";

export default function HistoryView({
  entries,
  settings,
  onDelete,
  isDarkMode,
}) {
  const sorted = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-4">
      <h2
        className={`text-lg font-bold px-2 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}
      >
        <ClipboardList className="w-5 h-5 text-blue-600" /> Recent Collection
      </h2>
      <div className="space-y-3 pb-4">
        {sorted.length === 0 && (
          <p className="text-center text-slate-400 py-10">
            No Data Available.
          </p>
        )}
        {sorted.map((entry) => (
          <HistoryCard
            key={entry.id}
            entry={entry}
            settings={settings}
            onDelete={onDelete}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}
