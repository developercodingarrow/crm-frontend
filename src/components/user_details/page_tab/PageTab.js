import React from "react";
import styles from "./pagetab.module.css";
export default function PageTab({ tabs, activeTab, onTabChange }) {
  return (
    <div className={styles.tabs_container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.count !== undefined && (
            <span className={styles.tabCount}>{tab.count}</span>
          )}
          <span className={styles.tabLabel}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
