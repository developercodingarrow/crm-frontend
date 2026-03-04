"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./modelStyle.module.css";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import FillterBar from "../project_pageCompoenents/Fillter_bar/FillterBar";
import { FillterContext } from "../../_contextApi/FillterContextProvider";

export default function FillterModel(props) {
  const {
    locationSearch,
    searchByLocation,
    filterByPropertyType,
    propertyTypeFilter,
    filterByPrice,
    priceRange,
    filterByBuilder,
    builderFilter,
    getUniqueBuilders,
    getPriceLimits,
  } = props;
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // For animation
  const {
    isopenFillter,
    setisopenFillter,
    handelCloseFillter,
    handelopenFillter,
  } = useContext(FillterContext);

  // Handle open/close animations
  useEffect(() => {
    if (isopenFillter) {
      setShouldRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300); // Match animation duration

      return () => clearTimeout(timer);
    }
  }, [isopenFillter]);

  const handleClose = () => {
    handelCloseFillter();
  };

  const handleRefresh = () => {
    router.refresh(); // Refreshes current route without full page reload
  };
  // Don't render anything if shouldn't render
  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.slideDown : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <GoGraph className={styles.headerIcon} />
            <h3>Fillter Project</h3>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>

        {/* Modal Body - We'll add RecentActivity component here later */}
        <div className={styles.body}>
          <FillterBar
            locationSearch={locationSearch}
            searchByLocation={searchByLocation}
            filterByPropertyType={filterByPropertyType}
            propertyTypeFilter={propertyTypeFilter}
            filterByPrice={filterByPrice}
            filterByBuilder={filterByBuilder}
            builderFilter={builderFilter}
            getUniqueBuilders={getUniqueBuilders}
            getPriceLimits={getPriceLimits}
          />
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleRefresh}>
            Refresh
          </button>
          <button className={styles.viewAllBtn} onClick={handleClose}>
            close
          </button>
        </div>
      </div>
    </div>
  );
}
