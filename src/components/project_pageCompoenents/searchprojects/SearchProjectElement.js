"use client";
import React, { useState, useEffect } from "react";
import styles from "./searchprojectelement.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
export default function SearchProjectElement(props) {
  const { onSearch } = props;
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // Pass search term to parent
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="search your property "
          className={styles.inputStyle}
        />
        {searchValue && (
          <button onClick={handleClear} className={styles.clear_btn}>
            ×
          </button>
        )}
      </div>
      <div className={styles.searchIcon}>
        <FaMagnifyingGlass />
      </div>
    </div>
  );
}
