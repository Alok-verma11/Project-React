import React, { useState } from "react";
import { ArrowLeft, Download, Upload, Save } from "lucide-react";

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

  // --- BACKUP FUNCTION ---
  const handleExportBackup = () => {
    const data = {
      vendors: JSON.parse(localStorage.getItem("dairy-vendors") || "[]"),
      entries: JSON.parse(localStorage.getItem("dairy-entries") || "[]"),
      settings: JSON.parse(localStorage.getItem("dairy-settings") || "{}"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dairy_backup_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  // --- RESTORE FUNCTION ---
  const handleImportBackup = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (
          window.confirm(
            "Restoring will delete your old local data. Are you sure?",
          )
        ) {
          localStorage.setItem(
            "dairy-vendors",
            JSON.stringify(data.vendors || []),
          );
          localStorage.setItem(
            "dairy-entries",
            JSON.stringify(data.entries || []),
          );
          localStorage.setItem(
            "dairy-settings",
            JSON.stringify(data.settings || {}),
          );
          alert("Data successfully restored please refresh the app.");
          window.location.reload(); // Refresh to load new data
        }
      } catch (err) {
        alert("Invalid file! Please upload a correct backup file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-10">
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
        {/* Dairy Info Inputs */}
        <div>
          <label
            className={`text-xs font-bold uppercase ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Dairy Name
          </label>
          <input
            value={local.dairyName}
            onChange={(e) => setLocal({ ...local, dairyName: e.target.value })}
            className={`w-full mt-1 p-3 rounded-xl border outline-none ${inputBg}`}
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
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" /> Save Config
        </button>

        <hr className={isDarkMode ? "border-slate-700" : "border-slate-100"} />

        {/* --- BACKUP & RESTORE SECTION --- */}
        <div className="space-y-3">
          <p
            className={`text-xs font-bold uppercase ml-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Data Management
          </p>

          <button
            onClick={handleExportBackup}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" /> Download Backup (.json)
          </button>

          <label className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm cursor-pointer text-center">
            <Upload className="w-4 h-4" /> Restore from File
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
          <p className="text-[10px] text-center opacity-50 px-2 italic">
            Note:To Safe the Backup file (send it to Google Drive or
            WhatsApp).
          </p>
        </div>
      </div>
    </div>
  );
}
