"use client";
import React, { useContext } from "react";
import styles from "./projectcard.module.css";
import { LuMapPinCheckInside } from "react-icons/lu";
import { ProjectAssignmentContext } from "../../../_contextApi/ProjectAssignmentContext";
import Link from "next/link";
export default function ProjectCard(props) {
  const { item } = props;
  const { toggleProjectSelection, isProjectSelected, selectedProjects } =
    useContext(ProjectAssignmentContext);

  const isSelected = isProjectSelected(item?._id);

  const handleCheckboxChange = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    toggleProjectSelection(item);
  };

  console.log("item--", item);

  return (
    <div className={styles.main_container}>
      <div className={styles.card_topBar}>
        <div className={styles.top_leftColumn}>
          <div className={styles.card_checkbox}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleCheckboxChange}
              onClick={(e) => e.stopPropagation()} // Extra prevention
            />
          </div>
          <div className={styles.property_type}>{item?.propertyType} </div>
          <div className={styles.builder}>{item?.builder} </div>
        </div>
        <div className={styles.createdAt_column}>Created at: 2/2/2026</div>
      </div>
      <div className={styles.card_title}>{item?.propertyName}</div>
      <div className={styles.card_footer}>
        <div className={styles.property_location}>
          <div className={styles.location_icon}>
            <LuMapPinCheckInside />
          </div>
          <div className={styles.city}>{item?.city}</div>
          <div className={styles.state}>{item?.state}</div>
        </div>
        <Link
          href={`/project-details/${item?._id}`}
          className={styles.details_btn}
        >
          details
        </Link>
      </div>
    </div>
  );
}
