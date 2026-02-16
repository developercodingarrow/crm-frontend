import React from "react";
import styles from "./usercard.module.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { removeEmployeefromProject } from "../../../app/utils/assignActions";

export default function AssignedUserCard({ user }) {
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

  const handleRemove = async (employeeId) => {
    try {
      const formData = {
        employeeId: employeeId,
        projectId: projectId,
      };
      console.log("formData---", formData);
      const res = await removeEmployeefromProject(formData);
      console.log("Remove result:", res);

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
        <div className={styles.leads_badge}>
          <span className={styles.leads_number}>{user.leadCount || 0}</span>
          <span className={styles.leads_label}>Leads</span>
        </div>

        <Link
          href={`/project-details/${projectId}/user/${user.id}`}
          className={styles.view_leads_btn}
        >
          Assine Leads
        </Link>

        {/* Remove Button */}
        <button
          onClick={() => handleRemove(user.id)}
          className={styles.remove_btn}
          title="Remove user from project"
        >
          ×
        </button>
      </div>
    </div>
  );
}
