import React from "react";
import styles from "./leadcard.module.css";
import { removeUserFromProjectAction } from "../../../app/utils/projectdetailsActions";

export default function AssignedLeadCard(props) {
  const { lead, projectId, userId } = props;

  console.log("lead--", lead, "userId", lead.assignedUsers.id);

  // Default lead data if none provided
  const leadData = lead || {
    id: 1,
    name: "Amit Kumar",
    phone: "9876543212",
    email: "amit@yahoo.com",
    source: "Referral",
  };
  const handleRemove = (e) => {
    alert("no need to add remove lead");
    console.log("no need remove button");
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.card_header}>
        <div className={styles.name_section}>
          <div className={styles.name}>{leadData.name}</div>
          <div className={styles.source_badge}>{leadData.source}</div>
        </div>

        <button
          onClick={handleRemove}
          className={styles.remove_btn}
          title="Remove lead"
        >
          ×
        </button>
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
