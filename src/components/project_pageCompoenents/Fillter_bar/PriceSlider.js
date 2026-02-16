"use client";
import React, { useState, useEffect } from "react";
import styles from "./priceslider.module.css";

export default function PriceSlider({ min, max, value, onChange }) {
  const [range, setRange] = useState(value || { min: 0, max: max });

  useEffect(() => {
    setRange(value || { min: 0, max: max });
  }, [value, max]);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    // Don't let min exceed max
    if (newMin > range.max) return;

    const newRange = { min: newMin, max: range.max };
    setRange(newRange);
    onChange(newRange.min, newRange.max); // Make sure this is called
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    // Don't let max go below min
    if (newMax < range.min) return;

    const newRange = { min: range.min, max: newMax };
    setRange(newRange);
    onChange(newRange.min, newRange.max); // Make sure this is called
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(1)}L`;
    if (price >= 1000) return `${(price / 1000).toFixed(0)}K`;
    return price;
  };

  return (
    <div className={styles.container}>
      <div className={styles.price_labels}>
        <span className={styles.price_label}>₹{formatPrice(range.min)}</span>
        <span className={styles.price_label}>₹{formatPrice(range.max)}</span>
      </div>

      <div className={styles.slider_container}>
        <input
          type="range"
          min={min}
          max={max}
          value={range.min}
          onChange={handleMinChange}
          className={`${styles.slider} ${styles.slider_min}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={range.max}
          onChange={handleMaxChange}
          className={`${styles.slider} ${styles.slider_max}`}
        />
        <div className={styles.slider_track}></div>
        <div
          className={styles.slider_range}
          style={{
            left: `${((range.min - min) / (max - min)) * 100}%`,
            width: `${((range.max - range.min) / (max - min)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
