import React from "react";
import styles from "./projectuserheader.module.css";
export default function ProjectUserHeader(props) {
  const { projectuser } = props;
  return (
    <div className={styles.main_container}>
      <div className={styles.project_name}>{projectuser.name}</div>
      <div className={styles.project_statsbox}>
        <div className={styles.stats_box}>
          <span>10</span>
          <span>Assinged Employes</span>
        </div>
        <div className={styles.stats_box}>
          <span>12</span>
          <span>Active Employes</span>
        </div>
        <div className={styles.stats_box}>
          <span>3</span>
          <span>in Active Employes</span>
        </div>
      </div>
    </div>
  );
}
