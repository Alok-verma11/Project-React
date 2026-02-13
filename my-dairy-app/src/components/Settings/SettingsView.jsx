import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function SettingsView({
  settings,
  onUpdate,
  onBack,
  isDarkMode,
}) {
  const [local, setLocal] = useState(settings);
  const cardBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-100";
  const inputBg = isDarkMode
    ? "bg-slate-700 border-slate-600 text-white"
    : "bg-slate-50 border-slate-200 text-slate-900";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className={`p-2 rounded-full shadow-sm border ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-white border-slate-100 text-slate-600"}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}
        >
          Settings
        </h2>
      </div>

      <div className={`${cardBg} p-6 rounded-2xl shadow-sm border space-y-4`}>
        <div>
          <label
            className={`text-xs font-bold uppercase ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Dairy Name
          </label>
          <input
            value={local.dairyName}
            onChange={(e) => setLocal({ ...local, dairyName: e.target.value })}
            className={`w-full mt-1 p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none ${inputBg}`}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            value={local.baseRate}
            onChange={(e) => setLocal({ ...local, baseRate: e.target.value })}
            className={`p-3 rounded-xl border ${inputBg}`}
            placeholder="Base Rate"
          />
          <input
            type="number"
            value={local.stdFat}
            onChange={(e) => setLocal({ ...local, stdFat: e.target.value })}
            className={`p-3 rounded-xl border ${inputBg}`}
            placeholder="Std Fat"
          />
        </div>
        <button
          onClick={() => {
            onUpdate(local);
            onBack();
          }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold"
        >
          Save Config
        </button>
      </div>
    </div>
  );
}
