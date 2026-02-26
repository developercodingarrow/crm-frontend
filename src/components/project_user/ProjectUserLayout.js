import React from "react";
import styles from "./projectuserlayout.module.css";
import ProjectUserHeader from "./projectuser_header/ProjectUserHeader";
import ProjectDetailsBox from "../project_details/project_detail_box/ProjectDetailsBox";
import ProjectUserLeadTab from "./project_user_lead_tab/ProjectUserLeadTab";
export default function ProjectUserLayout(props) {
  const { apiData, allLeads, projectId, userId } = props;
  console.log("project user -", apiData);
  return (
    <div className={styles.main_container}>
      <div className={styles.pageheader_wrapper}>
        <ProjectUserHeader projectuser={apiData.user} />
      </div>
      <div className={styles.details_container}>
        <div className={styles.project_details}>
          <ProjectDetailsBox />
        </div>
        <div className={styles.tab_column}>
          <ProjectUserLeadTab
            assignedLeads={apiData?.leads}
            allLeads={allLeads}
            projectId={projectId}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}
