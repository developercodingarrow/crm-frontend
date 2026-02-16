"use client";
import React from "react";
import styles from "./filtercheckbox.module.css";

export default function FilterCheckbox({
  label,
  value,
  selectedValues = [],
  onChange,
}) {
  const isChecked = selectedValues.includes(value);

  const handleChange = () => {
    let newSelectedValues;

    if (isChecked) {
      newSelectedValues = selectedValues.filter((v) => v !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }

    onChange(newSelectedValues);
  };

  return (
    <label
      className={`${styles.checkbox_label} ${isChecked ? styles.checked : ""}`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={styles.checkbox_input}
      />
      <span className={styles.checkbox_custom}></span>
      <span className={styles.checkbox_text}>{label}</span>
    </label>
  );
}
