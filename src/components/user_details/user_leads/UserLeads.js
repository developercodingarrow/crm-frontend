"use client";
import React, { useState } from "react";
import styles from "./userLeads.module.css";
import { GoPerson, GoSearch, GoFilter } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import { MdAttachFile, MdMoreVert } from "react-icons/md";

export default function UserLeads(props) {
  const { apileadsData } = props;

  console.log("leads---", apileadsData);
  const [searchTerm, setSearchTerm] = useState("");

  // Use API data if available, otherwise use dummy data
  const leadsData = apileadsData?.all || [
    {
      id: 1,
      name: "Amit Kumar",
      phone: "+91 98765 43211",
      project: { name: "Skyline Towers" },
      status: "Interested",
      source: "Website",
      lastContact: "2 days ago",
      avatar: "AK",
    },
    {
      id: 2,
      name: "Priya Singh",
      phone: "+91 98765 43212",
      project: { name: "Green Valley Estate" },
      status: "Follow-up",
      source: "Referral",
      lastContact: "1 day ago",
      avatar: "PS",
    },
    {
      id: 3,
      name: "Rajesh Gupta",
      phone: "+91 98765 43213",
      project: { name: "Skyline Towers" },
      status: "New",
      source: "Walk-in",
      lastContact: "Today",
      avatar: "RG",
    },
    {
      id: 4,
      name: "Sunil Verma",
      phone: "+91 98765 43214",
      project: { name: "Downtown Plaza" },
      status: "Contacted",
      source: "Social Media",
      lastContact: "3 days ago",
      avatar: "SV",
    },
    {
      id: 5,
      name: "Anita Desai",
      phone: "+91 98765 43215",
      project: { name: "Green Valley Estate" },
      status: "Converted",
      source: "Referral",
      lastContact: "5 days ago",
      avatar: "AD",
    },
    {
      id: 6,
      name: "Vikram Rathod",
      phone: "+91 98765 43216",
      project: { name: "Skyline Towers" },
      status: "Not Interested",
      source: "Campaign",
      lastContact: "1 week ago",
      avatar: "VR",
    },
  ];

  // Filter leads based on search
  const filteredLeads = leadsData.filter((lead) => {
    const projectName = lead.project?.name || lead.project || "No Project";
    return (
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    );
  });

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

  // Format last contact time
  const formatLastContact = (lead) => {
    if (lead.lastContact && lead.lastContact !== "Not contacted") {
      return lead.lastContact;
    }
    return "Not contacted";
  };

  // Get project name
  const getProjectName = (lead) => {
    if (lead.project?.name) return lead.project.name;
    if (typeof lead.project === "string") return lead.project;
    if (lead.project === null) return "No Project";
    return "No Project";
  };

  // Get avatar initials
  const getAvatar = (lead) => {
    if (lead.avatar) return lead.avatar;
    return lead.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
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
                  <div className={styles.leadAvatar}>{getAvatar(lead)}</div>
                  <div>
                    <div className={styles.leadName}>{lead.name}</div>
                    <div className={styles.leadPhone}>{lead.phone}</div>
                  </div>
                </div>
              </div>
              <div className={styles.cell}>
                <span className={styles.projectName}>
                  {getProjectName(lead)}
                </span>
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
                  {formatLastContact(lead)}
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
  );
}
