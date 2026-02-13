import React from "react";
import { Calculator, History, Users } from "lucide-react";

export default function Navigation({ view, setView, isDarkMode }) {
  const NavBtn = ({ active, onClick, icon: Icon, label }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${active ? "text-blue-500 scale-105" : isDarkMode ? "text-slate-500" : "text-slate-400"}`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-[10px] font-bold uppercase tracking-tighter">
        {label}
      </span>
    </button>
  );

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto border-t flex justify-around py-3 px-4 shadow-2xl z-50 transition-colors ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`}
    >
      <NavBtn
        active={view === "collection"}
        onClick={() => setView("collection")}
        icon={Calculator}
        label="Register"
      />
      <NavBtn
        active={view === "history"}
        onClick={() => setView("history")}
        icon={History}
        label="Logs"
      />
      <NavBtn
        active={view === "vendors" || view === "vendor-detail"}
        onClick={() => setView("vendors")}
        icon={Users}
        label="Vendors"
      />
    </nav>
  );
}
