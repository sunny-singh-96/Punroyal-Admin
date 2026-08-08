// ========================= DataGrid.tsx =========================
import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronUp, ChevronDown } from "lucide-react";

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
  rightContent?: { text: string; onClick: () => void; };
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
  rightContent
}: DataGridProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // SORT ONLY (NO PAGINATION HERE)
  const sortedData = useMemo(() => {
    if (!sortKey) return rows;

    return [...rows].sort((a, b) => {
      const valA = a[sortKey as keyof T];
      const valB = b[sortKey as keyof T];

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

  useEffect(() => {
    const delay = setTimeout(() => {
      if (onSearch) {
        onSearch(search);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [search, onSearch]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search */}
      <div className="mb-4 flex items-center justify-between">

        {searchEnable && (
          <div className="mb-4 flex items-center gap-2 w-1/4">
            <Search size={16} />
            <input
              disabled={loading}
              value={search}
              onChange={(e) => {
                console.log(`e.target.value=`,e.target.value);
                setSearch(e.target.value);
              }}
              placeholder="Search..."
              className="border px-3 py-2 rounded-xl w-full"
            />
          </div>
        )}
        <div>
          {rightContent ? (
            <button
              onClick={rightContent.onClick} // ✅ FIXED
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
            >
              {rightContent.text}
            </button>
          ) : null}
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden relative">
        {/* 🔥 LOADING OVERLAY */}
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
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
                  <td
                    colSpan={headers.length}
                    className="text-center py-6 text-gray-400"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
                className={`px-3 py-1 border rounded ${p === page ? "bg-blue-500 text-white" : ""}`}
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
