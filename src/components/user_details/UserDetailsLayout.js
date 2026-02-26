"use client";
import React, { useState } from "react";
import styles from "./userdetailslayout.module.css";
import HeaderTopBar from "../elements/header_top_bar/HeaderTopBar";
import ProfileCard from "./profile_card/ProfileCard";
import StatTab from "../elements/stat_tab/StatTab";
import PageTab from "./page_tab/PageTab";
import { GoProject, GoPerson, GoGraph } from "react-icons/go";
import UserLeads from "./user_leads/UserLeads";
import UserProjectCard from "./user_projects/UserProjectCard";
// Define your tabs
const tabs = [
  { id: "overview", label: "Overview", icon: <GoGraph />, count: 3 },
  { id: "projects", label: "Projects", icon: <GoProject />, count: 3 },
  { id: "leads", label: "All Leads", icon: <GoPerson />, count: 42 },
];
export default function UserDetailsLayout(props) {
  const { apiData } = props;

  const [activeTab, setActiveTab] = useState("projects");

  console.log("user details", apiData.stats);
  return (
    <div className={styles.main_container}>
      <div className={styles.page_header}>
        <HeaderTopBar
          pageTitle="User Details"
          pageSubtitle="Manage system User and Details"
        />

        <ProfileCard userProfile={apiData.profile} />

        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <StatTab
              statNumber={apiData.stats.projects.total}
              statLabel={apiData.stats.projects.label}
            />
            <StatTab
              statNumber={apiData.stats.leads.total}
              statLabel={apiData.stats.leads.label}
            />
            <StatTab statNumber={"8"} statLabel="Converted" />
            <StatTab
              statNumber={apiData.stats.followups.total}
              statLabel={apiData.stats.followups.label}
            />
          </div>
        </div>
        <div className={styles.tab_wrraper}>
          <PageTab
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Leads Tab */}

          {activeTab === "projects" && (
            <div className={styles.projectsContainer}>
              {apiData.projects.map((project) => (
                <UserProjectCard key={project.id} project={project} />
              ))}
              {apiData.projects.length === 0 && (
                <div className={styles.emptyMessage}>No projects assigned</div>
              )}
            </div>
          )}
          {activeTab === "leads" && <UserLeads apileadsData={apiData.leads} />}
        </div>
      </div>
    </div>
  );
}
