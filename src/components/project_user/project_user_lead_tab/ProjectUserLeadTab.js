"use client";
import React, { useState } from "react";
import styles from "./projectuserleadtab.module.css";
import LeadCard from "../../project_details/lead_card/LeadCard";
export default function ProjectUserLeadTab(props) {
  const { assignedLeads, allLeads, projectId, userId } = props;
  const [activeTab, setActiveTab] = useState("assignedleads");

  return (
    <div className={styles.main_container}>
      <div className={styles.tab_header}>
        <div
          className={`${styles.tab} ${activeTab === "assignedleads" ? styles.active : ""}`}
          onClick={() => setActiveTab("assignedleads")}
        >
          Assigned Leads
        </div>
        <div
          className={`${styles.tab} ${activeTab === "leads" ? styles.active : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          All Leads
        </div>
      </div>

      <div className={styles.tab_body}>
        {activeTab === "assignedleads" &&
          // Show assigned users
          (assignedLeads.length > 0 ? (
            assignedLeads.map((item, index) => (
              <div key={item._id || index}>
                <LeadCard
                  lead={item}
                  type="assigned"
                  projectId={projectId}
                  userId={userId}
                />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No assigned users</div>
          ))}

        {activeTab === "leads" &&
          // Show assigned users
          (allLeads.length > 0 ? (
            allLeads.map((item, index) => (
              <div key={item._id || index}>
                <LeadCard
                  lead={item}
                  type="available"
                  projectId={projectId}
                  userId={userId}
                />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No Leads</div>
          ))}
      </div>
    </div>
  );
}
