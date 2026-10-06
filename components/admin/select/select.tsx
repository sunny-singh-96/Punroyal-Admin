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

  // 🔍 Load options
  const loadOptions = async (inputValue = "", pageNo = 1) => {
    try {
      setLoading(true);

      const res = await fetchOptions({
        page: pageNo,
        limit,
        search: inputValue,
      });

      const newOptions =
        res?.data?.map((item: any) => mapOption(item)) || [];

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
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      noOptionsMessage={() =>
        loading ? "Loading..." : "No results found"
      }
    />
  );
}