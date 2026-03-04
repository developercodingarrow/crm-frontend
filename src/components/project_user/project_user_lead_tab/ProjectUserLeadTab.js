"use client";
import React, { useState, useMemo } from "react";
import styles from "./projectuserleadtab.module.css";
import { useRouter } from "next/navigation";
import LeadCard from "../../project_details/lead_card/LeadCard";
import UserAssinedLeadCard from "../user_assined_lead/UserAssinedLeadCard";
import {
  assignLeadToUserAction,
  removeLeadToUserAction,
} from "../../../app/utils/projectuserdetailsActions";
import SearchBar from "../../project_details/Search_Bar/SearchBar";
import FilterDropdown from "../../project_details/Filter_Dropdown/FilterDropdown";
export default function ProjectUserLeadTab(props) {
  const router = useRouter();
  const { assignedLeads, allLeads, projectId, userId } = props;
  const [activeTab, setActiveTab] = useState("assignedleads");

  const [avilableLeads, setavilableLeads] = useState(allLeads);
  const [assingedLeadList, setassingedLeadList] = useState(assignedLeads);

  console.log("assignedLeads---x-x", assignedLeads);

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

  // Filter leads
  const filteredLeads = useMemo(() => {
    return avilableLeads.filter((lead) => {
      const matchesSearch =
        lead.name?.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.phone?.includes(leadSearch) ||
        lead.email?.toLowerCase().includes(leadSearch.toLowerCase());

      const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;

      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [avilableLeads, leadSearch, sourceFilter, statusFilter]);

  // Filter leads
  const filteredassinedLeads = useMemo(() => {
    return assingedLeadList.filter((lead) => {
      const matchesSearch =
        lead.name?.toLowerCase().includes(leadSearch.toLowerCase()) ||
        lead.phone?.includes(leadSearch) ||
        lead.email?.toLowerCase().includes(leadSearch.toLowerCase());

      const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;

      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [assingedLeadList, leadSearch, sourceFilter, statusFilter]);

  const handleClearFilters = () => {
    setSourceFilter("");
    setStatusFilter("");
    setLeadSearch("");
  };

  const handleAdd = async (leadId) => {
    const formData = {
      leadId: leadId,
      projectId: projectId,
      userId: userId,
    };

    try {
      const res = await assignLeadToUserAction(formData);
      console.log("res---", res.data);
      if (res.data.status === "success") {
        setavilableLeads((prevData) =>
          prevData.filter((item) => item.id !== leadId),
        );
        router.refresh();
        console.log("User removed successfully from UI");
      }
    } catch (error) {
      console.log("error---", error);
    }
    // Add your add logic here
  };

  const handelRemove = async (leadId) => {
    const formData = {
      leadId: leadId,
      projectId: projectId,
      userId: userId,
    };

    try {
      const res = await removeLeadToUserAction(formData);
      console.log("res---", res);
      if (res.data.status === "success") {
        setassingedLeadList((prevData) =>
          prevData.filter((item) => item.id !== leadId),
        );
        console.log("User removed successfully from UI");
      }
      router.refresh();
    } catch (error) {
      console.log("error---", error);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.tab_header}>
        <div
          className={`${styles.tab} ${activeTab === "assignedleads" ? styles.active : ""}`}
          onClick={() => setActiveTab("assignedleads")}
        >
          Assigned Leads
        </div>
        <div
          className={`${styles.tab} ${activeTab === "leads" ? styles.active : ""}`}
          onClick={() => setActiveTab("leads")}
        >
          All Leads
        </div>
      </div>

      <div className={styles.fillter_wrapper}>
        {/* Search and Filter for Leads Tab */}
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
              <button className={styles.clearBtn} onClick={handleClearFilters}>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tab_body}>
        {activeTab === "assignedleads" &&
          // Show assigned users
          (filteredassinedLeads.length > 0 ? (
            filteredassinedLeads.map((item, index) => (
              <div key={item._id || index}>
                <UserAssinedLeadCard
                  lead={item}
                  projectId={projectId}
                  type="remove"
                  clickHandel={handelRemove}
                  userId={userId}
                />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No assigned users</div>
          ))}

        {activeTab === "leads" &&
          // Show assigned users
          (filteredLeads.length > 0 ? (
            filteredLeads.map((item, index) => (
              <div key={item._id || index}>
                <UserAssinedLeadCard
                  lead={item}
                  projectId={projectId}
                  type="add"
                  clickHandel={handleAdd}
                />
              </div>
            ))
          ) : (
            <div className={styles.empty_message}>No Leads</div>
          ))}
      </div>
    </div>
  );
}
