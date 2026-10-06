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
  value?: string | string[];
  isMulti?: boolean;
  onChange: (value: any) => void;
  placeholder?: string;

  fetchOptions: (params: {
    page: number;
    limit: number;
    search: string;
  }) => Promise<any>;

  mapOption: (item: any) => Option;

  limit?: number;
  initialOptions?: Option[];
};

export default function AsyncSelect({
  className,
  value,
  isMulti = false,
  onChange,
  placeholder = "Select",
  fetchOptions,
  mapOption,
  limit = 20,
  initialOptions = [],
}: Props) {
  const [options, setOptions] = useState<Option[]>(() => initialOptions || []);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Sync initialOptions if they change
  useEffect(() => {
    if (initialOptions && initialOptions.length > 0) {
      setOptions((prev) => {
        const existingValues = new Set(prev.map((o) => o.value));
        const toAdd = initialOptions.filter((o) => !existingValues.has(o.value));
        return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
      });
    }
  }, [initialOptions]);

  // 🔍 Load options
  const loadOptions = async (inputValue = "", pageNo = 1) => {
    try {
      setLoading(true);

      const res = await fetchOptions({
        page: pageNo,
        limit,
        search: inputValue,
      });

      const newOptions: Option[] =
        res?.data?.map((item: any) => mapOption(item)) || [];

      if (pageNo === 1) {
        // Keep currently selected options so their badges remain visible even when searching
        setOptions((prev) => {
          const selectedVals = isMulti
            ? Array.isArray(value)
              ? value
              : value
              ? [value]
              : []
            : value
            ? [value]
            : [];
          const currentlySelected = prev.filter((opt) =>
            selectedVals.includes(opt.value)
          );
          const newMap = new Map<string, Option>();
          currentlySelected.forEach((opt) => newMap.set(opt.value, opt));
          newOptions.forEach((opt) => newMap.set(opt.value, opt));
          return Array.from(newMap.values());
        });
      } else {
        setOptions((prev) => {
          const newMap = new Map<string, Option>();
          prev.forEach((opt) => newMap.set(opt.value, opt));
          newOptions.forEach((opt) => newMap.set(opt.value, opt));
          return Array.from(newMap.values());
        });
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

  // Compute selected value object(s)
  const selectedValue = useMemo(() => {
    if (isMulti) {
      const valArr = Array.isArray(value) ? value : value ? [value] : [];
      return options.filter((opt) => valArr.includes(opt.value));
    }
    return options.find((opt) => opt.value === value) || null;
  }, [isMulti, value, options]);

  return (
    <Select
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      className={className}
      options={options}
      placeholder={placeholder}
      value={selectedValue}
      isLoading={loading}
      onInputChange={(val, actionMeta) => {
        if (actionMeta.action === "input-change") {
          handleInputChange(val);
        }
        return val;
      }}
      onMenuScrollToBottom={handleScroll}
      onChange={(selected: any) => {
        if (isMulti) {
          const vals = Array.isArray(selected)
            ? selected.map((s: any) => s.value)
            : [];
          onChange(vals);
        } else {
          onChange(selected?.value || "");
        }
      }}
      menuPortalTarget={
        typeof window !== "undefined" ? document.body : null
      }
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (base) => ({
          ...base,
          backgroundColor: "transparent",
          borderColor: "transparent",
          boxShadow: "none",
          minHeight: "42px",
          "&:hover": {
            borderColor: "transparent",
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#EEF2FF",
          borderRadius: "8px",
          border: "1px solid #C7D2FE",
          padding: "1px 4px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "#4338CA",
          fontWeight: 600,
          fontSize: "12px",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "#6366F1",
          borderRadius: "4px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#E0E7FF",
            color: "#3730A3",
          },
        }),
      }}
      noOptionsMessage={() =>
        loading ? "Loading..." : "No results found"
      }
    />
  );
}