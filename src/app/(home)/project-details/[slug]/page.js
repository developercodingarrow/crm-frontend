import React from "react";
import ProjectDetailsLayout from "../../../../components/project_details/ProjectDetailsLayout";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../../../config";

export default async function ProjectDetailspage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const { slug } = await params;

  let project = [];
  let allUsers = [];
  let allLeads = [];
  let assignedLeads = [];

  try {
    // 1. First API - Fetch project employees (already done)
    const response = await fetch(
      `${API_BASE_URL}/assignmentProject/getProjectEmployees/${slug}/employees`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }

    const data = await response.json();
  

    if (data.status === "success") {
      project = data?.data;
    }

    // 2. Now fetch remaining APIs with Promise.all
    const [usersRes, leadsRes, assignedLeadsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/user/getAllUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }),

      fetch(`${API_BASE_URL}/lead/getAllLeads`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }),

      fetch(`${API_BASE_URL}/lead/getAssinedLeadsByProject/${slug}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }),
    ]);

    // Check responses
    if (!usersRes.ok) {
      throw new Error(`Failed to fetch users: ${usersRes.statusText}`);
    }
    if (!leadsRes.ok) {
      throw new Error(`Failed to fetch leads: ${leadsRes.statusText}`);
    }
    if (!assignedLeadsRes.ok) {
      throw new Error(
        `Failed to fetch assigned leads: ${assignedLeadsRes.statusText}`,
      );
    }

    // Parse JSON
    const [usersData, leadsData, assignedLeadsData] = await Promise.all([
      usersRes.json(),
      leadsRes.json(),
      assignedLeadsRes.json(),
    ]);

    if (usersData.status === "success") {
      allUsers = usersData?.data || [];
    }

    if (leadsData.status === "success") {
      allLeads = leadsData?.data || [];
    }

    if (assignedLeadsData.status === "success") {
      assignedLeads = assignedLeadsData?.data || [];
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <div>
      <ProjectDetailsLayout
        apiData={project}
        allUsers={allUsers?.users}
        allLeads={allLeads}
        assignedLeads={assignedLeads}
      />
    </div>
  );
}
