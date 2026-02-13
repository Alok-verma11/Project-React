import React, { useState, useEffect } from "react";
import Header from "./components/Layout/Header";
import Navigation from "./components/Layout/Navigation";
import CollectionForm from "./components/Collection/CollectionForm";
import HistoryView from "./components/History/HistoryView";
import VendorList from "./components/Vendors/VendorList";
import VendorDetailView from "./components/Vendors/VendorDetailView";
import SettingsView from "./components/Settings/SettingsView";

export default function App() {
  const [view, setView] = useState("collection");
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [entries, setEntries] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    baseRate: 40,
    stdFat: 6.0,
    stdSNF: 8.5,
    currency: "₹",
    dairyName: "My Village Dairy",
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("dairy-settings");
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    const savedVendors = localStorage.getItem("dairy-vendors");
    if (savedVendors) setVendors(JSON.parse(savedVendors));
    const savedEntries = localStorage.getItem("dairy-entries");
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    const savedTheme = localStorage.getItem("dairy-theme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  const addVendor = (name, phone) => {
    const updated = [
      ...vendors,
      { id: `v-${Date.now()}`, name, phone, createdAt: Date.now() },
    ];
    setVendors(updated);
    localStorage.setItem("dairy-vendors", JSON.stringify(updated));
  };

  const addCollection = (entry) => {
    const updated = [
      ...entries,
      {
        ...entry,
        id: `e-${Date.now()}`,
        timestamp: Date.now(),
        dateString: new Date().toISOString().split("T")[0],
      },
    ];
    setEntries(updated);
    localStorage.setItem("dairy-entries", JSON.stringify(updated));
  };

  const deleteEntry = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("dairy-entries", JSON.stringify(updated));
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("dairy-settings", JSON.stringify(newSettings));
  };

  const toggleTheme = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    localStorage.setItem("dairy-theme", newVal ? "dark" : "light");
  };

// delete vender function
  const deleteVendor = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this vendor? All their history will remain, but the vendor profile will be gone.",
      )
    ) {
      const updated = vendors.filter((v) => v.id !== id);
      setVendors(updated);
      localStorage.setItem("dairy-vendors", JSON.stringify(updated));

      if (selectedVendorId === id) {
        setView("vendors");
        setSelectedVendorId(null);
      }
    }
  };

//  for update vendor details
const updateVendor = (id, updatedName, updatedPhone) => {
  // 1. Update the Vendor List
  const updatedVendors = vendors.map((v) =>
    v.id === id ? { ...v, name: updatedName, phone: updatedPhone } : v,
  );

  // 2. Update all History Logs where this vendor appears
  const updatedEntries = entries.map((entry) =>
    entry.vendorId === id ? { ...entry, vendorName: updatedName } : entry,
  );

  // 3. Update States
  setVendors(updatedVendors);
  setEntries(updatedEntries);

  // 4. Sync to LocalStorage
  localStorage.setItem("dairy-vendors", JSON.stringify(updatedVendors));
  localStorage.setItem("dairy-entries", JSON.stringify(updatedEntries));
};

  return (
    <div
      className={`max-w-md mx-auto min-h-screen transition-colors duration-300 pb-24 font-sans ${isDarkMode ? "dark bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      <Header
        settings={settings}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        setView={setView}
      />
      <main className="px-4 mt-4">
        {view === "collection" && (
          <CollectionForm
            vendors={vendors}
            onAdd={addCollection}
            settings={settings}
            isDarkMode={isDarkMode}
          />
        )}
        {view === "history" && (
          <HistoryView
            entries={entries}
            settings={settings}
            onDelete={deleteEntry}
            isDarkMode={isDarkMode}
          />
        )}
        {view === "vendors" && (
          <VendorList
            vendors={vendors}
            onAdd={addVendor}
            onDeleteVendor={deleteVendor}
            onUpdateVendor={updateVendor}
            isDarkMode={isDarkMode}
            onSelectVendor={(id) => {
              setSelectedVendorId(id);
              setView("vendor-detail");
            }}
          />
        )}
        {view === "vendor-detail" && (
          <VendorDetailView
            vendor={vendors.find((v) => v.id === selectedVendorId)}
            entries={entries.filter((e) => e.vendorId === selectedVendorId)}
            settings={settings}
            onBack={() => setView("vendors")}
            onDeleteEntry={deleteEntry}
            isDarkMode={isDarkMode}
          />
        )}
        {view === "settings" && (
          <SettingsView
            settings={settings}
            onUpdate={updateSettings}
            isDarkMode={isDarkMode}
            onBack={() => setView("collection")}
          />
        )}
      </main>
      <Navigation view={view} setView={setView} isDarkMode={isDarkMode} />
    </div>
  );
}
