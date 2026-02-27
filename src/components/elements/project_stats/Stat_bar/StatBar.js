import React from "react";
import styles from "./statbar.module.css";

export default function StatBar({
  label,
  assigned,
  available,
  total,
  barColor = "#10b981", // Default green color
}) {
  const assignedPercentage = (assigned / total) * 100;
  const availablePercentage = 100 - assignedPercentage;

  return (
    <div className={styles.statBar}>
      <div className={styles.label}>{label}</div>

      <div className={styles.barstats_wrapper}>
        <div className={styles.distributionBar}>
          <div
            style={{
              width: `${assignedPercentage}%`,
              background: barColor,
              height: "6px",
              borderRadius: "3px",
            }}
          ></div>
        </div>
        <span className={styles.value}>{assigned}</span>
      </div>

      <div className={styles.numberstats}>
        <span>
          Assigned {assigned} - {Math.round(assignedPercentage)}%
        </span>
        <span>
          Available {available} - {Math.round(availablePercentage)}%
        </span>
        <span>Total {total}</span>
      </div>
    </div>
  );
}
