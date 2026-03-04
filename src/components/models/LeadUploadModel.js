"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./modelStyle.module.css";
import { useRouter } from "next/navigation";
import { AppContext } from "../../_contextApi/AppContext";
import { IoMdClose } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { GoX, GoPlus, GoUpload } from "react-icons/go";
import CreateLeadForm from "../lead_page/Create_Lead_Form/CreateLeadForm";
import BulkUpload from "../lead_page/Bulk_lead_Upload/BulkUpload";
export default function LeadUploadModel({ handleAddLead, handleBulkUpload }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // For animation
  const {
    isLeadUplodOpen,
    setisLeadUplodOpen,
    openLeadForm,
    closeLeadForm,
    showCreateForm,
    setShowCreateForm,
  } = useContext(AppContext);

  // Handle open/close animations
  useEffect(() => {
    if (isLeadUplodOpen) {
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
  }, [isLeadUplodOpen]);

  const handleClose = () => {
    closeLeadForm();
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
            <h3>Create Lead</h3>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>

        {/* Modal Body - We'll add RecentActivity component here later */}
        <div className={styles.body}>
          <div className={styles.create_leadColumn}>
            {/* Toggle Buttons */}
            <div className={styles.toggle_container}>
              <button
                className={`${styles.toggle_btn} ${showCreateForm ? styles.active : ""}`}
                onClick={() => setShowCreateForm(true)}
              >
                <GoPlus className={styles.toggle_icon} />
                <span>Create Lead</span>
              </button>
              <button
                className={`${styles.toggle_btn} ${!showCreateForm ? styles.active : ""}`}
                onClick={() => setShowCreateForm(false)}
              >
                <GoUpload className={styles.toggle_icon} />
                <span>Bulk Upload</span>
              </button>
            </div>

            {/* Content */}
            <div className={styles.content_container}>
              {showCreateForm ? (
                <CreateLeadForm onAddLead={handleAddLead} />
              ) : (
                <BulkUpload onUpload={handleBulkUpload} />
              )}
            </div>
          </div>
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
