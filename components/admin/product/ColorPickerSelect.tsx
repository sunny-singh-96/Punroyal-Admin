"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, Check, Palette, X } from "lucide-react";

export interface ColorItem {
  id: string;
  name: string;
  hex?: string;
  color_code?: string;
  status?: boolean | number | string;
}

interface ColorPickerSelectProps {
  colors: ColorItem[];
  selectedColorId: string;
  onSelect: (colorId: string) => void;
  disabled?: boolean;
  unavailableColorIds?: string[];
  placeholder?: string;
}

export default function ColorPickerSelect({
  colors,
  selectedColorId,
  onSelect,
  disabled = false,
  unavailableColorIds = [],
  placeholder = "Select Color",
}: ColorPickerSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedColor = useMemo(
    () => colors.find((c) => c.id === selectedColorId),
    [colors, selectedColorId]
  );

  const availableColors = useMemo(() => {
    return colors
      .filter((c: any) => c.status !== false && c.status !== "false" && c.status !== 0 && c.status !== "0")
      .filter((c) => !unavailableColorIds.includes(c.id) || c.id === selectedColorId);
  }, [colors, unavailableColorIds, selectedColorId]);

  const filteredColors = useMemo(() => {
    if (!search.trim()) return availableColors;
    const q = search.toLowerCase().trim();
    return availableColors.filter(
      (c) => c.name.toLowerCase().includes(q) || (c.hex && c.hex.toLowerCase().includes(q))
    );
  }, [availableColors, search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedHex = selectedColor?.hex || selectedColor?.color_code;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 shadow-xs cursor-pointer ${
          selectedColor
            ? "bg-slate-800/90 hover:bg-slate-800 text-white border-slate-600/80 hover:border-slate-400"
            : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "active:scale-98"}`}
        title="Choose variant color"
      >
        {selectedHex ? (
          <span
            className="w-4 h-4 rounded-full border border-white/60 shadow-sm shrink-0 transition-transform"
            style={{ backgroundColor: selectedHex }}
          />
        ) : (
          <Palette size={14} className="text-slate-400 shrink-0" />
        )}

        <span className="truncate max-w-[130px] font-bold">
          {selectedColor ? selectedColor.name : placeholder}
        </span>

        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md">
          {/* Header / Search */}
          <div className="p-2.5 border-b border-slate-800 bg-slate-950/60">
            <div className="relative flex items-center">
              <Search size={13} className="absolute left-2.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Search colors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 bg-slate-800/90 text-white text-xs rounded-lg border border-slate-700 focus:border-indigo-500 focus:outline-hidden placeholder-slate-400 transition"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 text-slate-400 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Color Options List */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-700">
            {filteredColors.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No matching colors found
              </div>
            ) : (
              filteredColors.map((c) => {
                const isSelected = c.id === selectedColorId;
                const hex = c.hex || c.color_code || "#94a3b8";
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onSelect(c.id);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors duration-150 text-left ${
                      isSelected
                        ? "bg-indigo-600/30 text-white font-bold border border-indigo-500/50"
                        : "text-slate-200 hover:bg-slate-800 hover:text-white font-medium"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/40 shadow-xs shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="truncate flex-1">{c.name}</span>
                    {hex && (
                      <span className="text-[10px] text-slate-400 font-mono tracking-tighter">
                        {hex}
                      </span>
                    )}
                    {isSelected && (
                      <Check size={14} className="text-indigo-400 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

