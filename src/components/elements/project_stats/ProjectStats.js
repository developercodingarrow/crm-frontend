import React from "react";
import styles from "./projectstats.module.css";
import StatBar from "./Stat_bar/StatBar";

export default function ProjectStats(props) {
  const { assignedUsers, avilableuserCount, leadStats, assignedLeadsList } =
    props;
  // Sample data - replace with props later
  const statsData = {
    leads: {
      assigned: 3,
      available: 7,
      total: 10,
    },
    facebookLeads: {
      assigned: 1,
      available: 9,
      total: 10,
      color: "#3b82f6", // Blue for facebook
    },
    websiteLeads: {
      assigned: 5,
      available: 5,
      total: 10,
      color: "#8b5cf6", // Purple for website
    },
    users: {
      assigned: 3,
      available: 7,
      total: 10,
      color: "#f59e0b", // Orange for users
    },
  };

  console.log("assignedLeadsList--", assignedLeadsList);

  const totalusers = avilableuserCount + assignedUsers;
  const totalLeads = assignedLeadsList.length;

  // Color mappings
  const sourceColors = {
    Website: "#3b82f6", // Blue
    "Walk-in": "#10b981", // Green
    Referral: "#8b5cf6", // Purple
    "Phone Call": "#f59e0b", // Orange
    "Social Media": "#ec4899", // Pink
    Campaign: "#ef4444", // Red
    Other: "#6b7280", // Gray
  };

  const statusColors = {
    New: "#3b82f6", // Blue
    Contacted: "#8b5cf6", // Purple
    "Follow-up": "#f59e0b", // Orange
    Interested: "#10b981", // Green
    "Not Interested": "#ef4444", // Red
    Converted: "#8b5cf6", // Purple
    Lost: "#6b7280", // Gray
  };

  // Calculate stats by source
  const getSourceStats = () => {
    const sourceCounts = {};

    assignedLeadsList.forEach((lead) => {
      const source = lead.source || "Other";
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    return Object.entries(sourceCounts).map(([source, count]) => ({
      label: source,
      count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
      color: sourceColors[source] || "#6b7280",
    }));
  };

  // Calculate stats by status
  const getStatusStats = () => {
    const statusCounts = {};

    assignedLeadsList.forEach((lead) => {
      const status = lead.status || "New";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([status, count]) => ({
      label: status,
      count,
      percentage: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
      color: statusColors[status] || "#6b7280",
    }));
  };

  const sourceStats = getSourceStats();
  const statusStats = getStatusStats();

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h3 className={styles.sectionTitle}>Project Overview</h3>
        <StatBar
          label="Assigned Users"
          assigned={assignedUsers}
          available={avilableuserCount}
          total={totalusers}
          barColor="#f59e0b"
        />

        <StatBar
          label="Total Leads"
          assigned={leadStats.assignedLeads}
          available={leadStats.unassignedLeads}
          total={leadStats?.totalLeads}
          barColor="#10b981"
        />

        {/* Source Statistics */}
        {sourceStats.length > 0 && (
          <>
            <div className={styles.sectionDivider}>
              <span>Leads by Source</span>
            </div>

            {sourceStats.map((item, index) => (
              <StatBar
                key={`source-${index}`}
                label={item.label}
                assigned={item.count}
                available={totalLeads - item.count}
                total={totalLeads}
                barColor={item.color}
              />
            ))}
          </>
        )}

        {/* Status Statistics */}
        {statusStats.length > 0 && (
          <>
            <div className={styles.sectionDivider}>
              <span>Leads by Status</span>
            </div>

            {statusStats.map((item, index) => (
              <StatBar
                key={`status-${index}`}
                label={item.label}
                assigned={item.count}
                available={totalLeads - item.count}
                total={totalLeads}
                barColor={item.color}
              />
            ))}
          </>
        )}

        {/* Empty State */}
        {totalLeads === 0 && (
          <p className={styles.emptyMessage}>
            No leads assigned to this project
          </p>
        )}
      </div>
    </div>
  );
}
