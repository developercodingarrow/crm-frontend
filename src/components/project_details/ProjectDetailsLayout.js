"use client";
import React from "react";
import styles from "./projectdetailslayout.module.css";
import ProjectDetailsHeader from "./DetailPage_header/ProjectDetailsHeader";
import ProjectDetailsBox from "./project_detail_box/ProjectDetailsBox";
import ProjectUserTab from "./project_user_tab/ProjectUserTab";
import PageDetailHeader from "../elements/page_detail_header/PageDetailHeader";
import ProjectStats from "../elements/project_stats/ProjectStats";
export default function ProjectDetailsLayout(props) {
  const {
    apiData,
    availableUsers,
    assignedLeads,
    avilableuserCount,
    leadStats,
  } = props;

  return (
    <div className={styles.main_container}>
      <div className={styles.page_header}>
        <PageDetailHeader projectData={apiData?.project} />
      </div>
      <div className={styles.details_container}>
        <div className={styles.project_details}>
          {/* <ProjectDetailsBox /> */}
          <ProjectStats
            assignedUsers={apiData.totalUsers}
            avilableuserCount={avilableuserCount}
            leadStats={leadStats}
            assignedLeadsList={assignedLeads}
          />
        </div>
        <div className={styles.tab_column}>
          <ProjectUserTab
            assiedUsers={apiData?.users}
            allUsers={availableUsers}
            assignedLeads={assignedLeads}
          />
        </div>
      </div>
    </div>
  );
}
