"use client";
import React, { useState } from "react";
import styles from "./projectusertab.module.css";
import AssiendUserCard from "../user_cards/AssiendUserCard";
import UserCard from "../user_cards/UserCard";
import LeadCard from "../lead_card/LeadCard";

export default function ProjectUserTab(props) {
  const { assiedUsers = [], allUsers, assignedLeads = [], allLeads } = props;
  const [activeTab, setActiveTab] = useState("assignedusers");

  return (
    <div className={styles.main_container}>
      <div className={styles.tab_header}>
        <div
          className={`${styles.tab} ${activeTab === "assignedusers" ? styles.active : ""}`}
          onClick={() => setActiveTab("assignedusers")}
        >
          Assigned Users
        </div>
        <div
          className={`${styles.tab} ${activeTab === "users" ? styles.active : ""}`}
          onClick={() => setActiveTab("users")}
        >
          All Users
        </div>
        <div
          className={`${styles.tab} ${activeTab === "assignedleads" ? styles.active : ""}`}
          onClick={() => setActiveTab("assignedleads")}
        >
          Assigned Leads
        </div>
      </div>

      <div className={styles.tab_body}>
        {activeTab === "assignedusers" &&
          // Show assigned users
          (assiedUsers.length > 0 ? (
            assiedUsers.map((item, index) => (
              <div key={item.id || index}>
                <AssiendUserCard user={item} />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No assigned users</div>
          ))}

        {activeTab === "users" &&
          // Show assigned users
          (allUsers.length > 0 ? (
            allUsers.map((item, index) => (
              <div key={item._id || index}>
                <UserCard user={item} />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>There is active users</div>
          ))}

        {activeTab === "assignedleads" &&
          // Show assigned users
          (assignedLeads.length > 0 ? (
            assignedLeads.map((item, index) => (
              <div key={item._id || index}>
                <LeadCard lead={item} type="assigned" />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No assigned users</div>
          ))}
      </div>
    </div>
  );
}
