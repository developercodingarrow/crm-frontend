"use client";
import React, { useState } from "react";
import styles from "./userActivity.module.css";
import { GoPerson, GoSearch, GoFilter } from "react-icons/go";
import { FaWhatsapp } from "react-icons/fa";
import { MdAttachFile, MdMoreVert } from "react-icons/md";
export default function UserActivity(props) {
  const { apileadsData } = props;

  const [searchTerm, setSearchTerm] = useState("");

  // Use API data if available, otherwise use dummy data
  const leadsData = apileadsData || [
    {
      id: 1,
      leadName: "Amit Kumar",
      phone: "+91 98765 43211",
      message: "Skyline Towers",
      status: "Interested",
      source: "Website",
      time: "2 days ago",
      avatar: "AK",
    },
    {
      id: 2,
      leadName: "Priya Singh",
      phone: "+91 98765 43212",
      message: "Skyline Towers",
      status: "Follow-up",
      source: "Referral",
      time: "1 day ago",
      avatar: "PS",
    },
    {
      id: 3,
      leadName: "Rajesh Gupta",
      phone: "+91 98765 43213",
      message: "Skyline Towers",
      status: "New",
      source: "Walk-in",
      time: "Today",
      avatar: "RG",
    },
    {
      id: 4,
      leadName: "Sunil Verma",
      phone: "+91 98765 43214",
      message: "Skyline Towers",
      status: "Contacted",
      source: "Social Media",
      time: "3 days ago",
      avatar: "SV",
    },
    {
      id: 5,
      leadName: "Anita Desai",
      phone: "+91 98765 43215",
      message: "Skyline Towers",
      status: "Converted",
      source: "Referral",
      time: "5 days ago",
      avatar: "AD",
    },
    {
      id: 6,
      leadName: "Vikram Rathod",
      phone: "+91 98765 43216",
      message: "Skyline Towers",
      status: "Not Interested",
      source: "Campaign",
      time: "1 week ago",
      avatar: "VR",
    },
  ];

  // Filter leads based on search
  const filteredLeads = leadsData.filter((lead) => {
    const remakes = lead.message || "No remkas";
    return (
      lead.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remakes.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "remark":
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
      case "remark":
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
          <div className={styles.headerCell}>lead Name</div>
          <div className={styles.headerCell}>Remarks</div>
          <div className={styles.headerCell}>Type</div>
          <div className={styles.headerCell}>Last Contact</div>
        </div>

        <div className={styles.tableBody}>
          {filteredLeads.map((lead) => (
            <div key={lead.id} className={styles.tableRow}>
              <div className={styles.cell}>
                <div className={styles.leadInfo}>
                  <div>
                    <div className={styles.leadName}>{lead.leadName}</div>
                  </div>
                </div>
              </div>
              <div className={styles.cell}>
                <span className={styles.projectName}>{lead.message}</span>
              </div>
              <div className={styles.cell}>
                <span
                  className={styles.statusBadge}
                  style={{
                    background: getStatusBg(lead.type),
                    color: getStatusColor(lead.type),
                  }}
                >
                  {lead.type}
                </span>
              </div>
              <div className={styles.cell}>
                <span className={styles.contactTime}>{lead.time}</span>
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
