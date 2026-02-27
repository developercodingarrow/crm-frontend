import React from "react";
import styles from "./usercard.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assignProjectToEmployee } from "../../../app/utils/assignActions";
import { assignUserToProjectAction } from "../../../app/utils/projectdetailsActions";
import { GoPerson, GoMail, GoBriefcase } from "react-icons/go";
import {
  MdOutlineMessage,
  MdRemoveCircleOutline,
  MdAddCircleOutline,
} from "react-icons/md";

export default function UserCard({ user, onAdd }) {
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

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Call the parent handler with user ID
    onAdd(user.id);
  };

  return (
    <div className={styles.card}>
      {/* Left Section - User Info */}
      <div className={styles.leftSection}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.role}>
            <GoBriefcase /> {user.role}
          </span>
        </div>
        <div className={styles.emailRow}>
          <GoMail className={styles.emailIcon} />
          <span className={styles.email}>{user.email}</span>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className={styles.rightSection}>
        <button
          className={styles.addBtn}
          onClick={handleAddClick} // 👈 Use the handler
          title="Add user to project"
        >
          <MdAddCircleOutline />
        </button>
      </div>
    </div>
  );
}
