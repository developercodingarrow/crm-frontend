import React from "react";
import styles from "./leadcard.module.css";
import { assignLeadsToProject } from "../../../app/utils/assignActions";

export default function LeadCard({
  lead,
  type = "assigned",
  projectId,
  userId,
}) {
  // Default lead data if none provided
  const leadData = lead || {
    id: 1,
    name: "Amit Kumar",
    phone: "9876543212",
    email: "amit@yahoo.com",
    source: "Referral",
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leadIds:", leadData._id);
    console.log("projectId:", projectId);
    console.log("userId:", userId);

    const formData = {
      leadIds: [leadData._id],
      projectId: projectId,
      employeeIds: [userId],
    };

    console.log("formData--", formData);
    try {
      const res = await assignLeadsToProject(formData);
      console.log("res---", res);
    } catch (error) {
      console.log("error---", error);
    }
    // Add your add logic here
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Remove lead:", leadData.id);
    // Add your remove logic here
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.card_header}>
        <div className={styles.name_section}>
          <div className={styles.name}>{leadData.name}</div>
          <div className={styles.source_badge}>{leadData.source}</div>
        </div>

        {type === "assigned" ? (
          <button
            onClick={handleRemove}
            className={styles.remove_btn}
            title="Remove lead"
          >
            ×
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className={styles.add_btn}
            title="Add lead"
          >
            +
          </button>
        )}
      </div>

      <div className={styles.details_grid}>
        <div className={`${styles.detail_item} ${styles.phone}`}>
          {leadData.phone}
        </div>
        <div className={`${styles.detail_item} ${styles.email}`}>
          {leadData.email}
        </div>
      </div>
    </div>
  );
}
