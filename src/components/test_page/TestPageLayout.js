"use client";
import React, { useState } from "react";
import styles from "./testpage.module.css";
import {
  GoPerson,
  GoMail,
  GoDeviceMobile,
  GoBriefcase,
  GoGraph,
  GoProject,
  GoCheckCircle,
  GoClock,
  GoSearch,
  GoFilter,
  GoThreeBars,
  GoCalendar,
  GoTag,
  GoLocation,
  GoStar,
  GoPeople,
} from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import { MdAttachFile, MdMoreVert } from "react-icons/md";
export default function TestPageLayout() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy user data
  const userData = {
    name: "Rahul Sharma",
    email: "rahul.sharma@realestate.com",
    phone: "+91 98765 43210",
    role: "Senior Sales Executive",
    employeeId: "EMP-2024-042",
    joinDate: "15 Jan 2024",
    status: "active",
    avatar: "RS",
    performance: {
      projects: 3,
      totalLeads: 42,
      convertedLeads: 8,
      conversionRate: "19%",
      pendingFollowups: 12,
      monthlyTarget: "70%",
    },
  };

  // Dummy projects data
  const projectsData = [
    {
      id: 1,
      name: "Skyline Towers",
      location: "Mumbai",
      leadCount: 18,
      status: "active",
      progress: 70,
      stats: {
        new: 5,
        interested: 5,
        converted: 3,
        followup: 4,
        contacted: 2,
      },
    },
    {
      id: 2,
      name: "Green Valley Estate",
      location: "Pune",
      leadCount: 15,
      status: "active",
      progress: 45,
      stats: {
        new: 4,
        interested: 5,
        converted: 2,
        followup: 3,
        contacted: 1,
      },
    },
    {
      id: 3,
      name: "Downtown Plaza",
      location: "Delhi",
      leadCount: 9,
      status: "active",
      progress: 30,
      stats: {
        new: 2,
        interested: 3,
        converted: 1,
        followup: 2,
        contacted: 1,
      },
    },
  ];

  // Dummy leads data
  const leadsData = [
    {
      id: 1,
      name: "Amit Kumar",
      phone: "+91 98765 43211",
      project: "Skyline Towers",
      status: "Interested",
      source: "Website",
      lastContact: "2 days ago",
      avatar: "AK",
    },
    {
      id: 2,
      name: "Priya Singh",
      phone: "+91 98765 43212",
      project: "Green Valley Estate",
      status: "Follow-up",
      source: "Referral",
      lastContact: "1 day ago",
      avatar: "PS",
    },
    {
      id: 3,
      name: "Rajesh Gupta",
      phone: "+91 98765 43213",
      project: "Skyline Towers",
      status: "New",
      source: "Walk-in",
      lastContact: "Today",
      avatar: "RG",
    },
    {
      id: 4,
      name: "Sunil Verma",
      phone: "+91 98765 43214",
      project: "Downtown Plaza",
      status: "Contacted",
      source: "Social Media",
      lastContact: "3 days ago",
      avatar: "SV",
    },
    {
      id: 5,
      name: "Anita Desai",
      phone: "+91 98765 43215",
      project: "Green Valley Estate",
      status: "Converted",
      source: "Referral",
      lastContact: "5 days ago",
      avatar: "AD",
    },
    {
      id: 6,
      name: "Vikram Rathod",
      phone: "+91 98765 43216",
      project: "Skyline Towers",
      status: "Not Interested",
      source: "Campaign",
      lastContact: "1 week ago",
      avatar: "VR",
    },
  ];

  // Filter leads based on search
  const filteredLeads = leadsData.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm),
  );

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
    <div className={styles.container}>
      {/* Header with back button */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn}>←</button>
          <h1>User Details</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.editBtn}>Edit Profile</button>
          <button className={styles.moreBtn}>
            <MdMoreVert />
          </button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileLeft}>
          <div className={styles.avatar}>{userData.avatar}</div>
          <div className={styles.userInfo}>
            <h2>{userData.name}</h2>
            <div className={styles.userRole}>
              <GoBriefcase /> {userData.role}
            </div>
            <div className={styles.userMeta}>
              <span>
                <GoMail /> {userData.email}
              </span>
              <span>
                <GoDeviceMobile /> {userData.phone}
              </span>
            </div>
            <div className={styles.userMeta}>
              <span>
                <GoTag /> {userData.employeeId}
              </span>
              <span>
                <GoCalendar /> Joined {userData.joinDate}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.profileRight}>
          <div className={`${styles.statusBadge} ${styles[userData.status]}`}>
            ● {userData.status}
          </div>
          <button className={styles.messageBtn}>
            <FaWhatsapp /> Message
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#e8f0fe", color: "#3b82f6" }}
          >
            <GoProject />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>
              {userData.performance.projects}
            </span>
            <span className={styles.statLabel}>Projects</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#e0f7e9", color: "#10b981" }}
          >
            <GoPeople />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>
              {userData.performance.totalLeads}
            </span>
            <span className={styles.statLabel}>Total Leads</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#f3e8ff", color: "#8b5cf6" }}
          >
            <GoCheckCircle />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>
              {userData.performance.convertedLeads}
            </span>
            <span className={styles.statLabel}>Converted</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ background: "#fff3e0", color: "#f59e0b" }}
          >
            <GoClock />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>
              {userData.performance.pendingFollowups}
            </span>
            <span className={styles.statLabel}>Follow-ups</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "overview" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === "projects" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`${styles.tab} ${activeTab === "leads" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          All Leads
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className={styles.overviewTab}>
            {/* Projects Overview */}
            <div className={styles.section}>
              <h3>Assigned Projects</h3>
              <div className={styles.projectList}>
                {projectsData.map((project) => (
                  <div key={project.id} className={styles.projectCard}>
                    <div className={styles.projectHeader}>
                      <div>
                        <h4>{project.name}</h4>
                        <span className={styles.projectLocation}>
                          <GoLocation /> {project.location}
                        </span>
                      </div>
                      <span className={styles.projectBadge}>
                        {project.leadCount} leads
                      </span>
                    </div>

                    <div className={styles.projectProgress}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className={styles.progressText}>
                        {project.progress}%
                      </span>
                    </div>

                    <div className={styles.projectStats}>
                      <div className={styles.statItem}>
                        <span
                          className={styles.statDot}
                          style={{ background: "#3b82f6" }}
                        ></span>
                        <span>New {project.stats.new}</span>
                      </div>
                      <div className={styles.statItem}>
                        <span
                          className={styles.statDot}
                          style={{ background: "#10b981" }}
                        ></span>
                        <span>Int {project.stats.interested}</span>
                      </div>
                      <div className={styles.statItem}>
                        <span
                          className={styles.statDot}
                          style={{ background: "#8b5cf6" }}
                        ></span>
                        <span>Conv {project.stats.converted}</span>
                      </div>
                      <div className={styles.statItem}>
                        <span
                          className={styles.statDot}
                          style={{ background: "#f59e0b" }}
                        ></span>
                        <span>F/up {project.stats.followup}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className={styles.projectsTab}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>All Projects ({projectsData.length})</h3>
                <button className={styles.viewAllBtn}>View All</button>
              </div>
              <div className={styles.projectsGrid}>
                {projectsData.map((project) => (
                  <div key={project.id} className={styles.projectDetailCard}>
                    <div className={styles.projectDetailHeader}>
                      <h4>{project.name}</h4>
                      <span className={styles.projectLocation}>
                        {project.location}
                      </span>
                    </div>

                    <div className={styles.projectMetrics}>
                      <div className={styles.metric}>
                        <span className={styles.metricLabel}>Total Leads</span>
                        <span className={styles.metricValue}>
                          {project.leadCount}
                        </span>
                      </div>
                      <div className={styles.metric}>
                        <span className={styles.metricLabel}>Progress</span>
                        <span className={styles.metricValue}>
                          {project.progress}%
                        </span>
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
                        <span className={styles.distributionValue}>
                          {project.stats.new}
                        </span>
                      </div>
                      <div className={styles.distributionItem}>
                        <span className={styles.distributionLabel}>
                          Interested
                        </span>
                        <div className={styles.distributionBar}>
                          <div
                            style={{
                              width: `${(project.stats.interested / project.leadCount) * 100}%`,
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
                      <div className={styles.distributionItem}>
                        <span className={styles.distributionLabel}>
                          Converted
                        </span>
                        <div className={styles.distributionBar}>
                          <div
                            style={{
                              width: `${(project.stats.converted / project.leadCount) * 100}%`,
                              background: "#8b5cf6",
                              height: "6px",
                              borderRadius: "3px",
                            }}
                          ></div>
                        </div>
                        <span className={styles.distributionValue}>
                          {project.stats.converted}
                        </span>
                      </div>
                    </div>

                    <button className={styles.viewProjectBtn}>
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <div className={styles.leadsTab}>
            <div className={styles.searchBar}>
              <GoSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search leads by name, project or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.filterBtn}>
                <GoFilter /> Filter
              </button>
            </div>

            <div className={styles.leadsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.headerCell}>Lead</div>
                <div className={styles.headerCell}>Project</div>
                <div className={styles.headerCell}>Status</div>
                <div className={styles.headerCell}>Source</div>
                <div className={styles.headerCell}>Last Contact</div>
                <div className={styles.headerCell}>Actions</div>
              </div>

              <div className={styles.tableBody}>
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className={styles.tableRow}>
                    <div className={styles.cell}>
                      <div className={styles.leadInfo}>
                        <div className={styles.leadAvatar}>{lead.avatar}</div>
                        <div>
                          <div className={styles.leadName}>{lead.name}</div>
                          <div className={styles.leadPhone}>{lead.phone}</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.cell}>
                      <span className={styles.projectName}>{lead.project}</span>
                    </div>
                    <div className={styles.cell}>
                      <span
                        className={styles.statusBadge}
                        style={{
                          background: getStatusBg(lead.status),
                          color: getStatusColor(lead.status),
                        }}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className={styles.cell}>
                      <span className={styles.sourceBadge}>{lead.source}</span>
                    </div>
                    <div className={styles.cell}>
                      <span className={styles.contactTime}>
                        {lead.lastContact}
                      </span>
                    </div>
                    <div className={styles.cell}>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionBtn} title="Message">
                          <FaWhatsapp />
                        </button>
                        <button className={styles.actionBtn} title="Details">
                          <GoPerson />
                        </button>
                        <button className={styles.actionBtn} title="More">
                          <MdAttachFile />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredLeads.length === 0 && (
              <div className={styles.noResults}>
                <GoSearch size={40} />
                <p>No leads found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
