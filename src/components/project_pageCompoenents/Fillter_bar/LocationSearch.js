"use client";
import React, { useState } from "react";
import styles from "./locationsearch.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { GoLocation, GoX } from "react-icons/go";

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
    <div className={styles.location_search_container}>
      <div className={styles.search_wrapper}>
        <div className={styles.search_icon}>
          <GoLocation />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search by location..."
          className={styles.search_input}
        />
        {searchValue && (
          <button onClick={handleClear} className={styles.clear_btn}>
            <GoX />
          </button>
        )}
      </div>
    </div>
  );
}
