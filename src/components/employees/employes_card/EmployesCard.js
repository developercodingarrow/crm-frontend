"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./employeescard.module.css";
import { GoMail, GoDeviceMobile, GoTag } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { MdMessage, MdGroup, MdArrowForward } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";

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

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "admin":
        return "#3b82f6";
      case "employee":
        return "#10b981";
      default:
        return "#64748b";
    }
  };

  // Get status background
  const getStatusBg = (status) => {
    switch (status) {
      case "admin":
        return "#e8f0fe";
      case "employee":
        return "#e0f7e9";
      default:
        return "#f1f5f9";
    }
  };

  return (
    <div className={styles.card}>
      {/* Left Section - Lead Info */}
      <div className={styles.leftSection}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.userCount}>
            <GoPerson />
          </span>
        </div>

        <div className={styles.contactInfo}>
          <span className={styles.email}>
            <GoMail /> {formatDate(user.createdAt)}
          </span>
          <span className={styles.email}>
            <GoMail /> {user.email}
          </span>
        </div>

        <div className={styles.badgesRow}>
          <span
            className={styles.statusBadge}
            style={{
              background: getStatusBg(user.isActive),
              color: getStatusColor(user.isActive),
            }}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
          <span
            className={styles.statusBadge}
            style={{
              background: getStatusBg(user.role),
              color: getStatusColor(user.role),
            }}
          >
            {user.role}
          </span>
        </div>
      </div>

      {/* Right Section - Action Links */}
      <div className={styles.rightSection}>
        <div
          className={styles.toggleWrapper}
          onClick={() => setIsActive(!isActive)}
        >
          <div
            className={`${styles.toggleSlider} ${isActive ? styles.active : ""}`}
          >
            <div className={styles.toggleKnob}></div>
          </div>
        </div>
        <Link href={`/user-details/${user._id}`} className={styles.actionLink}>
          <MdGroup className={styles.actionIcon} />
          <span>detail</span>
          <MdArrowForward className={styles.arrowIcon} />
        </Link>
      </div>
    </div>
  );
}
