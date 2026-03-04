import React from "react";
import styles from "./pageusertopbar.module.css";
import { GoPerson, GoMail, GoBriefcase } from "react-icons/go";
import { MdOutlineMessage, MdRemoveCircleOutline } from "react-icons/md";
export default function PageUserTopBar(props) {
  const { userData, leadCount = 0 } = props;
  return (
    <div className={styles.main_container}>
      <div className={styles.inner_container}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{userData.name}</span>
          <span className={styles.role}>
            <GoBriefcase /> {userData?.role}
          </span>
        </div>
        <div className={styles.emailRow}>
          <GoMail className={styles.emailIcon} />
          <span className={styles.email}>{userData?.email}</span>
        </div>

        <div className={styles.leadsLink}>
          <MdOutlineMessage className={styles.messageIcon} />
          <span>Assigned Leads</span>
          <span className={styles.leadCount}>{leadCount}</span>
        </div>
      </div>
    </div>
  );
}
