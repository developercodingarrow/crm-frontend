"use client";
import React, { useState } from "react";
import styles from "./locationsearch.module.css";
import { FaLocationDot } from "react-icons/fa6";

export default function LocationSearch({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_wrapper}>
        <FaLocationDot className={styles.location_icon} />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search by city or state..."
          className={styles.search_input}
        />
        {searchValue && (
          <button onClick={handleClear} className={styles.clear_btn}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}
