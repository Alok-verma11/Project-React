import React, { useState, useEffect } from "react";
import { calculatePrice } from "../../utils/pricing";

export default function CollectionForm({
  vendors,
  onAdd,
  settings,
  isDarkMode,
}) {
  const [formData, setFormData] = useState({
    vendorId: "",
    liters: "",
    fat: "",
    snf: "",
    shift: "Morning",
  });
  const [calc, setCalc] = useState({ pricePerLiter: 0, total: 0 });

  useEffect(() => {
    if (formData.liters && formData.fat) {
      setCalc(
        calculatePrice(formData.liters, formData.fat, formData.snf, settings),
      );
    }
  }, [formData, settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.vendorId || !formData.liters) return;
    const vendorName =
      vendors.find((v) => v.id === formData.vendorId)?.name || "Anjaan";
    onAdd({ ...formData, vendorName, ...calc });
    setFormData({ ...formData, liters: "", fat: "", snf: "" });
  };

  const cardBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-100";
  const inputBg = isDarkMode
    ? "bg-slate-700 border-slate-600 text-white"
    : "bg-slate-50 border-slate-200 text-slate-900";

  return (
    <div className={`${cardBg} rounded-2xl p-6 shadow-sm border space-y-4`}>
      <div
        className={`flex gap-2 p-1 rounded-xl mb-2 ${isDarkMode ? "bg-slate-700" : "bg-slate-100"}`}
      >
        {["Morning", "Evening"].map((s) => (
          <button
            key={s}
            onClick={() => setFormData({ ...formData, shift: s })}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.shift === s ? (isDarkMode ? "bg-slate-600 text-blue-400 shadow-md" : "bg-white shadow text-blue-600") : isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            {s === "Morning" ? "Morning" : "Evening"}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase ml-1 opacity-70">
            Select Vendor
          </label>
          <select
            value={formData.vendorId}
            onChange={(e) =>
              setFormData({ ...formData, vendorId: e.target.value })
            }
            className={`w-full mt-1 p-3 rounded-xl border appearance-none outline-none ${inputBg}`}
          >
            <option value="">-- Select Vendor --</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            step="0.1"
            value={formData.liters}
            onChange={(e) =>
              setFormData({ ...formData, liters: e.target.value })
            }
            className={`p-3 rounded-xl border ${inputBg}`}
            placeholder="Litre"
          />
          <input
            type="number"
            step="0.1"
            value={formData.fat}
            onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
            className={`p-3 rounded-xl border ${inputBg}`}
            placeholder="Fat %"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!formData.vendorId || !formData.liters}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold active:scale-95 disabled:opacity-50 transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
