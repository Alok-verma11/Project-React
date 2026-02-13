import React from "react";
import { Droplets, Sun, Moon, Settings as SettingsIcon } from "lucide-react";

export default function Header({ settings, isDarkMode, toggleTheme, setView }) {
  return (
    <header className="bg-blue-700 text-white px-6 py-6 shadow-lg rounded-b-3xl sticky top-0 z-20">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-200" /> {settings.dairyName}
          </h1>
          <p className="text-blue-100 text-[10px] opacity-80 uppercase tracking-widest mt-0.5">
            RV
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 bg-blue-600 rounded-full"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setView("settings")}
            className="p-2 bg-blue-600 rounded-full"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
