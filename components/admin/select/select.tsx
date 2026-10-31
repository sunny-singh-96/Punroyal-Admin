"use client";

import Select from "react-select";
import { useState, useMemo, useEffect } from "react";

// ✅ debounce
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

type Option = {
  label: string;
  value: string;
};

type Props = {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;

  fetchOptions: (params: {
    page: number;
    limit: number;
    search: string;
    status?: boolean;
  }) => Promise<any>;

  mapOption: (item: any) => Option;

  limit?: number;
};

export default function AsyncSelect({
  className,
  value,
  onChange,
  placeholder = "Select",
  fetchOptions,
  mapOption,
  limit = 10,
}: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔍 Load options (Filters out any inactive records)
  const loadOptions = async (inputValue = "", pageNo = 1) => {
    try {
      setLoading(true);

      const res = await fetchOptions({
        page: pageNo,
        limit,
        search: inputValue,
        status: true,
      });

      const rawList = res?.data || res?.categories || res?.occations || [];
      const activeList = Array.isArray(rawList)
        ? rawList.filter(
            (item: any) =>
              item.status !== false &&
              item.status !== "false" &&
              item.status !== 0 &&
              item.status !== "0"
          )
        : [];

      const newOptions = activeList.map((item: any) => mapOption(item));

      if (pageNo === 1) {
        setOptions(newOptions);
      } else {
        setOptions((prev) => [...prev, ...newOptions]);
      }

      setHasMore(newOptions.length === limit);
    } catch (err) {
      console.error("Dropdown fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 debounce search
  const handleInputChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setPage(1);
        loadOptions(value, 1);
      }, 400),
    []
  );

  // 📜 infinite scroll
  const handleScroll = () => {
    if (!hasMore || loading) return;

    setPage((prev) => {
      const nextPage = prev + 1;
      loadOptions(search, nextPage);
      return nextPage;
    });
  };

  // ✅ initial load
  useEffect(() => {
    loadOptions("", 1);
  }, []);

  return (
    <Select
      className={className}
      options={options}
      placeholder={placeholder}
      value={options.find((opt) => opt.value === value) || null}
      isLoading={loading}
      onInputChange={(val) => {
        handleInputChange(val);
        return val;
      }}
      onMenuScrollToBottom={handleScroll}
      onChange={(selected: any) => onChange(selected?.value)}
      menuPortalTarget={
        typeof window !== "undefined" ? document.body : null
      }
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: "46px",
          borderRadius: "12px",
          borderColor: state.isFocused ? "#6366f1" : "#e2e8f0",
          backgroundColor: state.isFocused ? "#ffffff" : "#f8fafc",
          boxShadow: state.isFocused ? "0 0 0 3px rgba(99, 102, 241, 0.15)" : "none",
          paddingLeft: "6px",
          paddingRight: "6px",
          fontSize: "14px",
          fontWeight: 500,
          transition: "all 0.2s ease",
          cursor: "pointer",
          "&:hover": {
            borderColor: state.isFocused ? "#6366f1" : "#cbd5e1",
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: "#94a3b8",
          fontSize: "14px",
          fontWeight: 400,
        }),
        singleValue: (base) => ({
          ...base,
          color: "#0f172a",
          fontWeight: 600,
          fontSize: "14px",
        }),
        menu: (base) => ({
          ...base,
          borderRadius: "14px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #f1f5f9",
          overflow: "hidden",
          zIndex: 9999,
          padding: "6px",
          backgroundColor: "#ffffff",
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        option: (base, state) => ({
          ...base,
          borderRadius: "8px",
          margin: "2px 0",
          padding: "9px 12px",
          fontSize: "13px",
          fontWeight: 500,
          backgroundColor: state.isSelected
            ? "#4f46e5"
            : state.isFocused
            ? "#eef2ff"
            : "transparent",
          color: state.isSelected ? "#ffffff" : state.isFocused ? "#3730a3" : "#334155",
          cursor: "pointer",
          transition: "all 0.15s ease",
          "&:active": {
            backgroundColor: "#4338ca",
            color: "#ffffff",
          },
        }),
        indicatorSeparator: () => ({ display: "none" }),
        dropdownIndicator: (base, state) => ({
          ...base,
          color: state.isFocused ? "#6366f1" : "#94a3b8",
          transition: "transform 0.2s ease, color 0.2s ease",
          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
          padding: "6px",
        }),
      }}
      noOptionsMessage={() =>
        loading ? "Loading..." : "No results found"
      }
    />
  );
}
