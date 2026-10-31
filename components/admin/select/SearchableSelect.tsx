"use client";

import Select from "react-select";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isClearable?: boolean;
};

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "w-full text-sm",
  disabled = false,
  isClearable = false,
}: Props) {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <Select
      className={className}
      options={options}
      placeholder={placeholder}
      value={selectedOption}
      isDisabled={disabled}
      isClearable={isClearable}
      isSearchable={true}
      onChange={(selected: any) => onChange(selected ? selected.value : "")}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
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
          cursor: disabled ? "not-allowed" : "pointer",
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
        input: (base) => ({
          ...base,
          color: "#0f172a",
          fontSize: "14px",
          fontWeight: 500,
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
      noOptionsMessage={({ inputValue }) =>
        inputValue ? `No results for "${inputValue}"` : "No options available"
      }
    />
  );
}

