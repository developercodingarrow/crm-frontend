import React from "react";
import styles from "./projectuserlayout.module.css";
import ProjectDetailsBox from "../project_details/project_detail_box/ProjectDetailsBox";
import ProjectUserLeadTab from "./project_user_lead_tab/ProjectUserLeadTab";
import PageDetailHeader from "../elements/page_detail_header/PageDetailHeader";
import PageUserTopBar from "../elements/page_user_topbar/PageUserTopBar";
import UserProjectStats from "../elements/user_project_stats/UserProjectStats";
export default function ProjectUserLayout(props) {
  const { apiData, allLeads, projectId, userId } = props;

  return (
    <div className={styles.main_container}>
      <div className={styles.pageheader_wrapper}>
        <PageDetailHeader projectData={apiData?.project} />
        <div className="">
          <PageUserTopBar
            userData={apiData?.user}
            leadCount={apiData?.leads.length}
          />
        </div>
      </div>
      <div className={styles.details_container}>
        <div className={styles.project_details}>
          {/* <ProjectDetailsBox /> */}
          <UserProjectStats
            statsData={apiData.statistics.statusCounts}
            assignedLeads={apiData.statistics.totalLeads}
            availableLeads={allLeads?.length}
            userName={apiData?.user?.name}
          />
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
