import React from "react";
import { Trash2 } from "lucide-react";

export default function HistoryCard({
  entry,
  settings,
  onDelete,
  showDate = true,
  isDarkMode,
}) {
  const cardBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-100";
  const mainText = isDarkMode ? "text-slate-100" : "text-slate-800";
  const subText = isDarkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div
      className={`${cardBg} p-4 rounded-2xl shadow-sm border flex justify-between items-center transition-all hover:border-blue-400`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className={`font-bold ${mainText}`}>{entry.vendorName}</p>
          <span
            className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${entry.shift === "Morning" ? "bg-orange-100 text-orange-800" : "bg-indigo-100 text-indigo-800"}`}
          >
            {entry.shift === "Morning" ? "Morning" : "Evening"}
          </span>
        </div>
        <p className={`text-xs mt-1 ${subText}`}>
          <span
            className={`font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
          >
            {entry.liters}L
          </span>{" "}
          @ {entry.fat}% Fat •{" "}
          {new Date(entry.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="text-right flex items-center gap-4">
        <div>
          <p
            className={`font-black ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}
          >
            {settings.currency}
            {entry.total}
          </p>
          {showDate && (
            <p className="text-[10px] font-bold text-slate-400">
              {entry.dateString}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-slate-300 hover:text-red-500 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
