"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker"; // ✅ use built-in type
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import "react-day-picker/dist/style.css";

type Props = {
  value: DateRange | undefined; // ✅ correct type
  onChange: (range: DateRange | undefined) => void; // ✅ correct type
};

export const DateRangeDropdown = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [months, setMonths] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? 1 : 2;
    }
    return 2; // default for SSR
  });
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setMonths(window.innerWidth < 768 ? 1 : 2);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Close on outside click (FIXED TYPE)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // ✅ FIXED
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const presets = [
    {
      label: "Last 7 Days",
      getRange: (): DateRange => ({
        from: subDays(new Date(), 6),
        to: new Date(),
      }),
    },
    {
      label: "Last 30 Days",
      getRange: (): DateRange => ({
        from: subDays(new Date(), 29),
        to: new Date(),
      }),
    },
    {
      label: "This Month",
      getRange: (): DateRange => ({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
      }),
    },
  ];

  const label =
    value?.from && value?.to
      ? `${format(value.from, "dd MMM")} - ${format(value.to, "dd MMM")}`
      : "Select Date";

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm flex items-center gap-2 hover:bg-slate-100 transition"
      >
        📅 {label}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-4 w-[320px] md:w-[560px] animate-in fade-in zoom-in-95">
          {/* Presets */}
          <div className="flex md:flex-col gap-2 md:min-w-[140px] border-b md:border-b-0 md:border-r pb-2 md:pb-0 md:pr-3">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  onChange(preset.getRange());
                  setOpen(false);
                }}
                className="text-left px-3 py-2 text-sm rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="flex justify-center">
            <DayPicker
              mode="range"
              selected={value}
              onSelect={(range) => onChange(range)} // ✅ FIXED
              numberOfMonths={months} // ✅ SSR safe
            />
          </div>
        </div>
      )}
    </div>
  );
};
