import React from "react";
import styles from "./projectdetailsheader.module.css";
export default function ProjectDetailsHeader(props) {
  const { projectName, projectStats } = props;
  return (
    <div className={styles.main_container}>
      <div className={styles.project_name}>{projectName}</div>
      <div className={styles.project_statsbox}>
        <div className={styles.stats_box}>
          <span>{projectStats?.totalEmployees}</span>
          <span>Assinged Employes</span>
        </div>
        <div className={styles.stats_box}>
          <span>{projectStats?.activeEmployees}</span>
          <span>Active Employes</span>
        </div>
        <div className={styles.stats_box}>
          <span>{projectStats?.inactiveEmployees}</span>
          <span>in Active Employes</span>
        </div>
      </div>
    </div>
  );
}
