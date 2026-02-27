import React from "react";
import styles from "./pagedetailheader.module.css";
import { GoHome } from "react-icons/go";
import { LuMapPinCheckInside } from "react-icons/lu";
import { BiRupee } from "react-icons/bi";

export default function PageDetailHeader(props) {
  const { projectData } = props;

  // Format price in Crores
  const formatPrice = (price) => {
    const inCrores = price / 10000000;
    return `₹${inCrores} Cr`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.inner_container}>
        <div className={styles.left_column}>
          <div className={styles.project_title}>
            <h2>{projectData.propertyName}</h2>
          </div>
          <div className={styles.filed_meta}>
            <span>
              <GoHome />
              <span className={styles.metaText}>{projectData.builder},</span>
            </span>
            <span>
              <span className={styles.metaText}>{projectData.type}</span>
            </span>
          </div>
          <div className={styles.filed_meta}>
            <span>
              <LuMapPinCheckInside />
              <span className={styles.metaText}>{projectData.city},</span>
            </span>
            <span>
              <span className={styles.metaText}>{projectData.state}</span>
            </span>
          </div>
        </div>

        <div className={styles.right_column}>
          {/* Date at top right */}
          <div className={styles.date_text}>
            {formatDate(projectData.updatedAt)}
          </div>

          {/* Price Range */}
          <div className={styles.price_box}>
            <span className={styles.min_price}>
              {formatPrice(projectData.minPrice)}
            </span>
            <span className={styles.price_separator}>-</span>
            <span className={styles.max_price}>
              {formatPrice(projectData.maxPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
