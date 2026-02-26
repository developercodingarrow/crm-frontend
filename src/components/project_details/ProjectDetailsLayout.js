"use client";
import React from "react";
import styles from "./projectdetailslayout.module.css";
import ProjectDetailsHeader from "./DetailPage_header/ProjectDetailsHeader";
import ProjectDetailsBox from "./project_detail_box/ProjectDetailsBox";
import ProjectUserTab from "./project_user_tab/ProjectUserTab";
export default function ProjectDetailsLayout(props) {
  const { apiData, availableUsers, assignedLeads } = props;
  console.log("assignedLeads--x", assignedLeads);
  return (
    <div className={styles.main_container}>
      <div className={styles.pageheader_wrapper}>
        <ProjectDetailsHeader
          projectName={apiData?.project?.propertyName}
          projectStats={apiData?.statistics}
        />
      </div>
      <div className={styles.details_container}>
        <div className={styles.project_details}>
          <ProjectDetailsBox />
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
