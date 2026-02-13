import React, { useState } from "react";
import {
  Users,
  UserPlus,
  ChevronRight,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";

export default function VendorList({
  vendors,
  onAdd,
  onDeleteVendor,
  onUpdateVendor,
  isDarkMode,
  onSelectVendor,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // State for handling inline editing
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const cardBg = isDarkMode
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-100";
  const inputBg = isDarkMode
    ? "bg-slate-700 border-slate-600 text-white"
    : "bg-slate-50 border-slate-200 text-slate-900";

  const startEditing = (v) => {
    setEditingId(v.id);
    setEditName(v.name);
    setEditPhone(v.phone);
  };

  const handleUpdate = (id) => {
    if (editName.trim()) {
      onUpdateVendor(id, editName, editPhone);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Vendors
        </h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className={`p-2 rounded-full ${
            isDarkMode
              ? "bg-blue-900/40 text-blue-400"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {showAdd ? (
            <X className="w-5 h-5" />
          ) : (
            <UserPlus className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Add New Vendor Form */}
      {showAdd && (
        <div className={`${cardBg} p-4 rounded-2xl shadow-md border space-y-3`}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
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
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold active:scale-95 transition-transform"
          >
            Add Vendor
          </button>
        </div>
      )}

      {/* Vendors List */}
      <div className="space-y-2">
        {vendors.map((v) => (
          <div key={v.id}>
            {editingId === v.id ? (
              /* Inline Edit Mode */
              <div
                className={`${cardBg} p-4 rounded-2xl border-2 border-blue-500 space-y-3 shadow-lg`}
              >
                <div className="space-y-2">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={`w-full p-2 rounded-lg border text-sm ${inputBg}`}
                    placeholder="Vendor Name"
                  />
                  <input
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className={`w-full p-2 rounded-lg border text-sm ${inputBg}`}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(v.id)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-bold"
                  >
                    <Check className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-bold ${
                      isDarkMode
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Normal View Mode */
              <div
                onClick={() => onSelectVendor(v.id)}
                className={`${cardBg} p-4 rounded-2xl border flex justify-between items-center cursor-pointer active:bg-blue-500/10 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                    {v.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{v.name}</p>
                    <p className="text-xs opacity-50">
                      {v.phone || "No phone"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents navigating to DetailView
                      startEditing(v);
                    }}
                    className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteVendor(v.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-5 h-5 opacity-20 ml-1" />
                </div>
              </div>
            )}
          </div>
        ))}
        {vendors.length === 0 && !showAdd && (
          <p className="text-center text-slate-400 py-10 text-sm italic">
            No vendors added yet.
          </p>
        )}
      </div>
    </div>
  );
}
