"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./employeescard.module.css";

export default function EmployesCard({ user }) {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setIsActive(!isActive);
    // Add your API call here
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.cardWrapper}>
      <Link href={`/employee/${user._id}`} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.cardLeft}>
            <div className={styles.cardHeader}>
              <h3 className={styles.name}>{user.name}</h3>
              <button
                className={`${styles.toggleBtn} ${isActive ? styles.toggleActive : styles.toggleInactive}`}
                onClick={handleToggle}
                type="button"
              >
                <span className={styles.toggleCircle}></span>
              </button>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{user.email}</span>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Role</span>
                  <span className={styles.roleBadge}>{user.role}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Projects</span>
                  <span className={styles.projectCount}>
                    {/* {user?.assignedProjects.length} */}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.cardRight}>
            <div className={styles.dateBox}>
              <span className={styles.dateLabel}>Joined</span>
              <span className={styles.dateValue}>
                {formatDate(user.createdAt)}
              </span>
            </div>
            <div className={styles.statusBadge}>
              {isActive ? "Active" : "Inactive"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
