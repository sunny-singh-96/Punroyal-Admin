"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, X, LayoutGrid, Table as TableIcon } from "lucide-react";

export interface Header<T = unknown> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataGridProps<T = unknown> {
  headers: Header<T>[];
  rows: T[];
  totalRecords: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch?: (search: string) => void;
  loading: boolean;
  searchEnable?: boolean;
  rightContent?: { text: string; onClick: () => void };
  setViewMode: (mode: "table" | "grid") => void;
  viewMode: "table" | "grid";
}

export default function DataGrid<T = unknown>({
  headers,
  rows,
  totalRecords,
  page,
  pageSize,
  onPageChange,
  onSearch,
  loading,
  searchEnable,
  rightContent,
  setViewMode,
  viewMode
}: DataGridProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  // here

  // SORTING
  const sortedData = useMemo(() => {
    if (!sortKey) return rows;

    return [...rows].sort((a, b) => {
      const valA = (a as Record<string, any>)[sortKey];
      const valB = (b as Record<string, any>)[sortKey];

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortKey, sortOrder]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // SEARCH (debounced)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (onSearch) onSearch(search);
    }, 400);

    return () => clearTimeout(delay);
  }, [search, onSearch]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Bar */}
      <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
        
        {/* Search */}
        {searchEnable && (
          <div className="relative w-full sm:w-72 md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <Search size={16} />
            </div>
            <input
              disabled={loading}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-9 py-2 bg-gray-50/80 hover:bg-white focus:bg-white text-sm text-gray-800 placeholder-gray-400 rounded-xl border border-gray-200 shadow-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 disabled:opacity-50"
            />
            {search && !loading && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear search"
              >
                <X size={15} className="bg-gray-200/80 hover:bg-gray-300 rounded-full p-0.5" />
              </button>
            )}
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200/70">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                viewMode === "table"
                  ? "bg-white text-blue-600 shadow-xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TableIcon size={14} />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LayoutGrid size={14} />
              <span>Grid (3 cols)</span>
            </button>
          </div>

          {/* Right Button */}
          {rightContent && (
            <button
              onClick={rightContent.onClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
            >
              {rightContent.text}
            </button>
          )}
        </div>
      </div>

      {/* Container */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden relative">
        
        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((h) => (
                      <th
                        key={String(h.key)}
                        className="px-4 py-3 text-xs font-bold uppercase cursor-pointer"
                        onClick={() => h.sortable && handleSort(h.key as string)}
                      >
                        <div className="flex items-center gap-1">
                          {h.label}
                          {sortKey === h.key &&
                            (sortOrder === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            ))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((row, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      {headers.map((h) => (
                        <td key={String(h.key)} className="px-4 py-3">
                          {h.render
                            ? h.render(row)
                            : ((row as Record<string, unknown>)[h.key as string] as React.ReactNode) ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {sortedData.length === 0 && (
                    <tr>
                      <td colSpan={headers.length} className="text-center py-6 text-gray-400">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* GRID VIEW (3 CARDS PER ROW) */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 p-1">
              {sortedData.map((row, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {headers.map((h) => (
                      <div key={String(h.key)} className="flex flex-col gap-0.5">
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{h.label}</div>
                        <div className="text-sm font-medium text-gray-800 break-words">
                          {h.render
                            ? h.render(row)
                            : ((row as Record<string, unknown>)[h.key as string] as React.ReactNode) ?? "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {sortedData.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">
                  No Data Found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 flex-wrap gap-3">
          <div className="text-sm text-gray-500">
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, totalRecords)} of {totalRecords} entries
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              disabled={page === 1 || loading}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                disabled={loading}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 border rounded ${
                  p === page ? "bg-blue-500 text-white" : ""
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === totalPages || loading}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}