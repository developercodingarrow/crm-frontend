import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { removeEmployeefromProject } from "../../../app/utils/assignActions";
import { removeUserFromProjectAction } from "../../../app/utils/projectdetailsActions";
import styles from "./assignedusercard.module.css";
import { GoPerson, GoMail, GoBriefcase } from "react-icons/go";
import { MdOutlineMessage, MdRemoveCircleOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
export default function AssignedUserCard({ user, onRemove }) {
  const params = useParams();
  const projectId = params.slug; // Get slug from URL
  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  console.log("user", user);
  const initials = getInitials(user.name);

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Call the parent handler with user ID
    onRemove(user._id);
  };

  // =========
  // Sample user data structure
  const userData = user || {
    id: 1,
    name: "Suresh Kumar",
    email: "suresh@gmail.com",
    role: "employee",
    leadCount: 12,
    unreadCount: 3,
    lastActive: "2 min ago",
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#3b82f6";
      case "Contacted":
        return "#8b5cf6";
      case "Follow-up":
        return "#f59e0b";
      case "Interested":
        return "#10b981";
      case "Not Interested":
        return "#ef4444";
      case "Converted":
        return "#8b5cf6";
      case "Lost":
        return "#64748b";
      default:
        return "#64748b";
    }
  };

  // Get status background
  const getStatusBg = (status) => {
    switch (status) {
      case "New":
        return "#e8f0fe";
      case "Contacted":
        return "#f3e8ff";
      case "Follow-up":
        return "#fff3e0";
      case "Interested":
        return "#e0f7e9";
      case "Not Interested":
        return "#fee9e9";
      case "Converted":
        return "#f3e8ff";
      case "Lost":
        return "#f1f5f9";
      default:
        return "#f1f5f9";
    }
  };

  return (
    <div className={styles.card}>
      {/* Left Section - User Info */}
      <div className={styles.leftSection}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{userData.name}</span>
          <span className={styles.role}>
            <GoBriefcase /> {userData.role}
          </span>
        </div>

        <div className={styles.emailRow}>
          <GoMail className={styles.emailIcon} />
          <span className={styles.email}>{userData.email}</span>
        </div>

        {/* Source and Status Badges */}
        {/* <div className={styles.badgesRow}>
          <span className={styles.sourceBadge}>
            <IoMdAttach className={styles.sourceIcon} />
            Website
          </span>
          <span
            className={styles.statusBadge}
            style={{
              background: getStatusBg(userData.status),
              color: getStatusColor(userData.status),
            }}
          >
            Interested
          </span>
        </div> */}

        {/* Assigned Leads Link */}
        <div className={styles.leadsLink}>
          <MdOutlineMessage className={styles.messageIcon} />
          <span>Assigned Leads</span>
          <span className={styles.leadCount}>{userData.leadCount}</span>
          {userData.unreadCount > 0 && (
            <span className={styles.unreadBadge}>{userData.unreadCount}</span>
          )}
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className={styles.rightSection}>
        <button
          className={styles.removeBtn}
          onClick={handleRemoveClick} // 👈 Use the handler
          title="Remove user from project"
        >
          <MdRemoveCircleOutline />
        </button>
      </div>
    </div>
  );
}
