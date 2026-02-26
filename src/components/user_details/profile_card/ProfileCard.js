import React from "react";
import styles from "./profilecard.module.css";
import { GoMail, GoDeviceMobile, GoBriefcase } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

export default function ProfileCard(props) {
  const { userProfile } = props;
  // Static user data
  const userData = {
    name: "Rahul Sharma",
    role: "Senior Sales Executive",
    email: "rahul.sharma@realestate.com",
    phone: "+91 98765 43210",
    employeeId: "EMP-2024-042",
    joinDate: "15 Jan 2024",
    status: "active",
    avatar: "RS",
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileLeft}>
        <div className={styles.avatar}>{userProfile.avatar}</div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{userProfile.name}</h2>
          <div className={styles.userRole}>
            <GoBriefcase className={styles.roleIcon} /> {userProfile.role}
          </div>
          <div className={styles.userMeta}>
            <span>
              <GoMail /> {userProfile.email}
            </span>
            <span>
              <GoDeviceMobile /> {userProfile.phone}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.profileRight}>
        <div className={`${styles.statusBadge} ${styles[userProfile.status]}`}>
          ● <span className={styles.active_text}> {userProfile.status}</span>
        </div>
        <button className={styles.messageBtn}>
          <FaWhatsapp /> <span className={styles.message_text}>Message</span>
        </button>
      </div>
    </div>
  );
}
