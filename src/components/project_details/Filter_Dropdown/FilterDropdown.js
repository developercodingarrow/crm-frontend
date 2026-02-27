import React from "react";
import styles from "./filterdropdown.module.css";
import { GoFilter } from "react-icons/go";

export default function FilterDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Filter by",
  icon,
}) {
  return (
    <div className={styles.filterContainer}>
      {icon || <GoFilter className={styles.filterIcon} />}
      <select
        className={styles.filterSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label} {opt.count ? `(${opt.count})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
