import React from "react";
import styles from "./projectuserlayout.module.css";
import ProjectUserHeader from "./projectuser_header/ProjectUserHeader";
import ProjectDetailsBox from "../project_details/project_detail_box/ProjectDetailsBox";
import ProjectUserLeadTab from "./project_user_lead_tab/ProjectUserLeadTab";
export default function ProjectUserLayout(props) {
  const { apiData, allLeads } = props;
  return (
    <div className={styles.main_container}>
      <div className={styles.pageheader_wrapper}>
        <ProjectUserHeader />
      </div>
      <div className={styles.details_container}>
        <div className={styles.project_details}>
          <ProjectDetailsBox />
        </div>
        <div className={styles.tab_column}>
          <ProjectUserLeadTab
            assignedLeads={apiData?.leads}
            allLeads={allLeads}
          />
        </div>
      </div>
    </div>
  );
}
