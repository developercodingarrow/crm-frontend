import React from "react";
import styles from "./usercard.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assignProjectToEmployee } from "../../../app/utils/assignActions";
import { assignUserToProjectAction } from "../../../app/utils/projectdetailsActions";

export default function UserCard({ user }) {
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

  const initials = getInitials(user.name);

  const handleAdd = async (employeeId) => {
    try {
      const formData = {
        userId: employeeId,
        projectId: projectId,
      };
      console.log("formData---", formData);
      const res = await assignUserToProjectAction(formData);
      console.log("assign result:", res);

      if (res?.success) {
        // Optional: Show success message or refresh data
        console.log("User removed successfully");
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.user_info_section}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.user_details}>
          <div className={styles.user_name}>{user.name}</div>
          <div className={styles.user_email}>{user.email}</div>
        </div>
      </div>

      <div className={styles.leads_section}>
        {/* Remove Button */}
        <button
          onClick={() => handleAdd(user.id)}
          className={styles.add_btn}
          title="Remove user from project"
        >
          +
        </button>

        <Link
          href={`/project-details/${projectId}/user/${user._id}`}
          className={styles.view_leads_btn}
        >
          Assine Leads
        </Link>
      </div>
    </div>
  );
}
