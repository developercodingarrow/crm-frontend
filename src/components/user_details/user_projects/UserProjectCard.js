import React from "react";
import styles from "./userprojectcard.module.css";
import { GoLocation, GoBriefcase } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";

export default function UserProjectCard({ project }) {
  console.log("project--", project);
  // Get status class for distribution bar
  const getStatusClass = (key) => {
    const classes = {
      new: styles.statusNew,
      contacted: styles.statusContacted,
      followup: styles.statusFollowup,
      interested: styles.statusInterested,
      notInterested: styles.statusNotInterested,
      converted: styles.statusConverted,
      lost: styles.statusLost,
    };
    return classes[key] || styles.statusNew;
  };

  // Get status label
  const getStatusLabel = (key) => {
    const labels = {
      new: "New",
      contacted: "Contacted",
      followup: "Follow-up",
      interested: "Interested",
      notInterested: "Not Interested",
      converted: "Converted",
      lost: "Lost",
    };
    return labels[key] || key;
  };

  // Calculate percentage for distribution bar
  const getPercentage = (value, total) => {
    if (!total || total === 0) return 0;
    return Math.round((value / total) * 100);
  };

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
      default:
        return "#f1f5f9";
    }
  };

  return (
    <div key={project.id} className={styles.projectDetailCard}>
      {/* Header */}
      <div className={styles.projectDetailHeader}>
        <h4>{project.name}</h4>
        <span className={styles.projectLocation}>{project.location}</span>
      </div>
      {/* Matric */}
      <div className={styles.projectMetrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Total Leads</span>
          <span className={styles.metricValue}>{project.leadCount}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Progress</span>
          <span className={styles.metricValue}>{project.progress}%</span>
        </div>
      </div>

      <div className={styles.statusDistribution}>
        <div className={styles.distributionItem}>
          <span className={styles.distributionLabel}>New</span>
          <div className={styles.distributionBar}>
            <div
              style={{
                width: `${(project.stats.new / project.leadCount) * 100}%`,
                background: "#3b82f6",
                height: "6px",
                borderRadius: "3px",
              }}
            ></div>
          </div>
          <span className={styles.distributionValue}>{project.stats.new}</span>
        </div>

        <div className={styles.distributionItem}>
          <span className={styles.distributionLabel}>contacted</span>
          <div className={styles.distributionBar}>
            <div
              style={{
                width: `${
                  (project.stats.contacted / project.leadCount) * 100
                }%`,
                background: "#8b5cf6",
                height: "6px",
                borderRadius: "3px",
              }}
            ></div>
          </div>
          <span className={styles.distributionValue}>
            {project.stats.contacted}
          </span>
        </div>

        <div className={styles.distributionItem}>
          <span className={styles.distributionLabel}>followup</span>
          <div className={styles.distributionBar}>
            <div
              style={{
                width: `${(project.stats.followup / project.leadCount) * 100}%`,
                background: "#f59e0b",
                height: "6px",
                borderRadius: "3px",
              }}
            ></div>
          </div>
          <span className={styles.distributionValue}>
            {project.stats.followup}
          </span>
        </div>

        <div className={styles.distributionItem}>
          <span className={styles.distributionLabel}>interested</span>
          <div className={styles.distributionBar}>
            <div
              style={{
                width: `${
                  (project.stats.interested / project.leadCount) * 100
                }%`,
                background: "#10b981",
                height: "6px",
                borderRadius: "3px",
              }}
            ></div>
          </div>
          <span className={styles.distributionValue}>
            {project.stats.interested}
          </span>
        </div>
      </div>

      <button className={styles.viewProjectBtn}>View Details →</button>
    </div>
  );
}
