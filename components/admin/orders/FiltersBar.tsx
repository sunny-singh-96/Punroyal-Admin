"use client";

import { useState } from "react";
import { Search, Check } from "lucide-react";
import { DateRangeDropdown } from "../datePicker/datePicker";
import { DateRange } from "react-day-picker";

type Props = {
  onApply: (filters: {
    search: string;
    status: string;
    dateRange: { from?: Date; to?: Date };
  }) => void;
  onClear?: () => void;
};

export const FiltersBar = ({ onApply, onClear }: Props) => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleClearAll = () => {
    setSearch("");
    setDateRange(undefined);
    onClear?.();
  };

  const handleApply = () => {
    onApply({
      search,
      status: "",
      dateRange: dateRange || {},
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex flex-wrap gap-3 flex-1 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by order #, customer ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Date */}
          <DateRangeDropdown
            value={dateRange}
            onChange={(range) => setDateRange(range)}
          />
        </div>

        {/* RIGHT */}
        <div className="flex gap-2 justify-end flex-wrap">
          {/* Apply */}
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700 shadow transition active:scale-95"
          >
            <Check size={16} /> Apply
          </button>

          {/* Clear */}
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm hover:bg-slate-200 transition"
          >
            ✖ Clear
          </button>
        </div>
      </div>
    </div>
  );
};
