import React from "react";
import styles from "./userprojectleadremarks.module.css";
import LeadMessenger from "../elements/lead messenger/LeadMessenger";
export default function UserProjectLeadRemarks(props) {
  const { apiData } = props;

  console.log("apiData--", apiData?.leads);
  return (
    <div className={styles.main_container}>
      <section className={styles.pageHeader_section}>
        <div className={styles.page_topBar}>
          <div className={styles.page_title}>Royal Gardens</div>
        </div>
        {/* Stats Bar */}
        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <div className={styles.stat_box}>
              <span className={styles.stat_number}>3</span>
              <span className={styles.stat_label}>Total Leads</span>
            </div>
            <div className={styles.stat_box}>
              <span className={styles.stat_label}>Maharashtra</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <LeadMessenger projectLeads={apiData?.leads} />
      </section>
    </div>
  );
}
