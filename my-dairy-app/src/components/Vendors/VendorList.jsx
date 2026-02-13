import React, { useState } from "react";
import { Users, UserPlus, ChevronRight, Trash2 } from "lucide-react";

export default function VendorList({
  vendors,
  onAdd,
  onDeleteVendor,
  isDarkMode,
  onSelectVendor,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const cardBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-100";
  const inputBg = isDarkMode
    ? "bg-slate-700 border-slate-600 text-white"
    : "bg-slate-50 border-slate-200 text-slate-900";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Vendors
        </h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className={`p-2 rounded-full ${isDarkMode ? "bg-blue-900/40 text-blue-400" : "bg-blue-100 text-blue-600"}`}
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>
      {showAdd && (
        <div className={`${cardBg} p-4 rounded-2xl shadow-md border space-y-3`}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 rounded-xl border ${inputBg}`}
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-3 rounded-xl border ${inputBg}`}
          />
          <button
            onClick={() => {
              if (name) {
                onAdd(name, phone);
                setName("");
                setPhone("");
                setShowAdd(false);
              }
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
          >
            Add Vendor
          </button>
        </div>
      )}
      <div className="space-y-2">
        {vendors.map((v) => (
          <div
            key={v.id}
            onClick={() => onSelectVendor(v.id)}
            className={`${cardBg} p-4 rounded-2xl border flex justify-between items-center cursor-pointer active:bg-blue-500/10`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                {v.name[0]}
              </div>
              <div>
                <p className="font-bold">{v.name}</p>
                <p className="text-xs opacity-50">{v.phone || "No phone"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents opening the vendor detail
                  onDeleteVendor(v.id);
                }}
                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <ChevronRight className="w-5 h-5 opacity-30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
