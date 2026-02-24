import React from "react";
import { cookies } from "next/headers";
import ProjectUserLayout from "../../../../../../components/project_user/ProjectUserLayout";
import { API_BASE_URL } from "../../../../../../../config";

export default async function ProjectLeadAssingeToUsertpage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const { slug, userId } = await params;
  let apiresult;
  let allLeads = [];
  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    // 1. First API - Fetch project employees (already done)
    const response = await fetch(
      `${API_BASE_URL}/lead/employee/${userId}/project/${slug}/leads`,
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
      apiresult = data?.data;
    }

    const leadsRes = await fetch(`${API_BASE_URL}/lead/getAllLeads`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!leadsRes.ok) {
      throw new Error(`Failed to fetch leads: ${leadsRes.statusText}`);
    }

    const leadData = await leadsRes.json();

    console.log("leadData--", leadData);

    if (leadData.status === "success") {
      allLeads = leadData?.data;
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
  return (
    <div>
      <ProjectUserLayout
        apiData={apiresult}
        allLeads={allLeads}
        projectId={slug}
        userId={userId}
      />
    </div>
  );
}
