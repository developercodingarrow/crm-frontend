"use client";
import React, { useState, useMemo } from "react";
import styles from "./projectusertab.module.css";
import { useParams } from "next/navigation";
import AssiendUserCard from "../user_cards/AssiendUserCard";
import UserCard from "../user_cards/UserCard";
import LeadCard from "../lead_card/LeadCard";
import AssignedLeadCard from "../lead_card/AssignedLeadCard";
import {
  assignUserToProjectAction,
  removeUserFromProjectAction,
} from "../../../app/utils/projectdetailsActions";
import SearchBar from "../Search_Bar/SearchBar";
import FilterDropdown from "../Filter_Dropdown/FilterDropdown";

export default function ProjectUserTab(props) {
  const params = useParams();
  const projectId = params.slug; // Get slug from URL
  const { assiedUsers = [], allUsers, assignedLeads = [], allLeads } = props;
  const [activeTab, setActiveTab] = useState("users");
  const [assiendUserList, setassiendUserList] = useState(assiedUsers);
  const [avilableUsers, setavilableUsers] = useState(allUsers);

  // Search and filter states
  const [userSearch, setUserSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filter options
  const sourceOptions = [
    { value: "Website", label: "Website" },
    { value: "Walk-in", label: "Walk-in" },
    { value: "Referral", label: "Referral" },
    { value: "Phone Call", label: "Phone Call" },
    { value: "Social Media", label: "Social Media" },
    { value: "Campaign", label: "Campaign" },
    { value: "Other", label: "Other" },
  ];

  const statusOptions = [
    { value: "New", label: "New" },
    { value: "Contacted", label: "Contacted" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "Interested", label: "Interested" },
    { value: "Not Interested", label: "Not Interested" },
    { value: "Converted", label: "Converted" },
    { value: "Lost", label: "Lost" },
  ];

  // Filter assigned users
  const filteredAssignedUsers = useMemo(() => {
    return assiendUserList.filter(
      (user) =>
        user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email?.toLowerCase().includes(userSearch.toLowerCase()),
    );
  }, [assiendUserList, userSearch]);

  // Filter available users
  const filteredAvailableUsers = useMemo(() => {
    return avilableUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email?.toLowerCase().includes(userSearch.toLowerCase()),
    );
  }, [avilableUsers, userSearch]);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return assignedLeads.filter((lead) => {
      const matchesSearch =
        lead.name?.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.phone?.includes(leadSearch) ||
        lead.email?.toLowerCase().includes(leadSearch.toLowerCase());

      const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;

      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [assignedLeads, leadSearch, sourceFilter, statusFilter]);

  const handleRemoveUser = async (employeeId) => {
    try {
      const formData = {
        userId: employeeId,
        projectId: projectId,
      };
      const res = await removeUserFromProjectAction(formData);

      if (res.data.status === "success") {
        // ✅ Remove user from UI by filtering out the deleted user
        setassiendUserList((prevUsers) =>
          prevUsers.filter((user) => user._id !== employeeId),
        );
        console.log("User removed successfully from UI");
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const handleAddUser = async (employeeId) => {
    try {
      const formData = {
        userId: employeeId,
        projectId: projectId,
      };
      console.log("formData---", formData);
      const res = await assignUserToProjectAction(formData);
      console.log("assign result:", res.data);

      if (res.data.status === "success") {
        // ✅ Remove user from UI by filtering out the deleted user
        setavilableUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== employeeId),
        );
        console.log("User removed successfully from UI");
      }
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const handleClearFilters = () => {
    setSourceFilter("");
    setStatusFilter("");
    setLeadSearch("");
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.tab_header}>
        <div
          className={`${styles.tab} ${activeTab === "assignedusers" ? styles.active : ""}`}
          onClick={() => setActiveTab("assignedusers")}
        >
          <span>Assigned Users</span>
          <span className={styles.tab_badge}>{assiendUserList.length}</span>
        </div>
        <div
          className={`${styles.tab} ${activeTab === "users" ? styles.active : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <span>All Users</span>
          <span className={styles.tab_badge}>{avilableUsers.length}</span>
        </div>
        <div
          className={`${styles.tab} ${activeTab === "assignedleads" ? styles.active : ""}`}
          onClick={() => setActiveTab("assignedleads")}
        >
          <span>Assigned Leads</span>
          <span className={styles.tab_badge}>{assignedLeads.length}</span>
        </div>
      </div>
      <div className={styles.fillter_wrapper}>
        {/* Search Bar - Shows for all tabs */}
        {(activeTab === "assignedusers" || activeTab === "users") && (
          <div className={styles.searchWrapper}>
            <SearchBar
              value={userSearch}
              onChange={setUserSearch}
              placeholder="Search users by name or email..."
            />
          </div>
        )}

        {/* Search and Filter for Leads Tab */}
        {activeTab === "assignedleads" && (
          <div className={styles.filterWrapper}>
            <SearchBar
              value={leadSearch}
              onChange={setLeadSearch}
              placeholder="Search leads by name, phone or email..."
            />
            <div className={styles.filterRow}>
              <FilterDropdown
                options={sourceOptions}
                value={sourceFilter}
                onChange={setSourceFilter}
                placeholder="All Sources"
              />
              <FilterDropdown
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="All Status"
              />
              {(sourceFilter || statusFilter || leadSearch) && (
                <button
                  className={styles.clearBtn}
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.tab_body}>
        {activeTab === "assignedusers" &&
          // Show assigned users
          (filteredAssignedUsers.length > 0 ? (
            filteredAssignedUsers.map((item, index) => (
              <div key={item.id || index}>
                <AssiendUserCard
                  user={item}
                  onRemove={handleRemoveUser} // 👈 Pass the handler
                />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No assigned users</div>
          ))}

        {activeTab === "users" &&
          // Show assigned users
          (filteredAvailableUsers.length > 0 ? (
            filteredAvailableUsers.map((item, index) => (
              <div key={item._id || index}>
                <UserCard
                  user={item}
                  onAdd={handleAddUser} // 👈 Pass the handler
                />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>There is active users</div>
          ))}

        {activeTab === "assignedleads" &&
          // Show assigned users
          (filteredLeads.length > 0 ? (
            filteredLeads.map((item, index) => (
              <div key={item._id || index}>
                <AssignedLeadCard lead={item} />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No assigned users</div>
          ))}
      </div>
    </div>
  );
}
