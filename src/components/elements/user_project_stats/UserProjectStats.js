import React from "react";
import styles from "./userprojectstats.module.css";
import StatBar from "../project_stats/Stat_bar/StatBar";
export default function UserProjectStats(props) {
  const { statsData, assignedLeads, availableLeads, userName } = props;

  const totalLeadsCount = assignedLeads + availableLeads;

  // Helper function to calculate remaining leads for a given status
  const getRemainingLeads = (statusValue) => {
    return assignedLeads - statusValue;
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h3 className={styles.sectionTitle}> {userName}'s Project Stats</h3>
        <StatBar
          label="Total Leads"
          assigned={assignedLeads}
          available={availableLeads}
          total={totalLeadsCount}
          barColor="#10b981"
        />
        {/* user stats */}
        <StatBar
          label="Converted"
          assigned={statsData.Converted}
          available={getRemainingLeads(statsData.Converted)}
          total={assignedLeads}
          barColor="#8b5cf6"
        />

        <StatBar
          label="Interested"
          assigned={statsData.Interested}
          available={getRemainingLeads(statsData.Interested)}
          total={assignedLeads}
          barColor="#10b981"
        />

        <StatBar
          label="New"
          assigned={statsData.New}
          available={getRemainingLeads(statsData.New)}
          total={assignedLeads}
          barColor="#3b82f6"
        />

        <StatBar
          label="Contacted"
          assigned={statsData.Contacted}
          available={getRemainingLeads(statsData.Contacted)}
          total={assignedLeads}
          barColor="#f59e0b"
        />

        <StatBar
          label="Follow-up"
          assigned={statsData["Follow-up"]}
          available={getRemainingLeads(statsData["Follow-up"])}
          total={assignedLeads}
          barColor="#8b5cf6"
        />

        <StatBar
          label="Not Interested"
          assigned={statsData["Not Interested"]}
          available={getRemainingLeads(statsData["Not Interested"])}
          total={assignedLeads}
          barColor="#ef4444"
        />

        <StatBar
          label="Lost"
          assigned={statsData.Lost}
          available={getRemainingLeads(statsData.Lost)}
          total={assignedLeads}
          barColor="#6b7280"
        />
      </div>
    </div>
  );
}
