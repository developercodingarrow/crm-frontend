import React from "react";
import { cookies } from "next/headers";
import UserProjectLeadRemarks from "../../../../../../components/user_project_lead_remarks/UserProjectLeadRemarks";
import { API_BASE_URL } from "../../../../../../../config";

export default async function UserProjectLeadRemakspage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const { slug, userid } = await params;

  let apiresult;
  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    // 1. First API - Fetch project employees (already done)
    const response = await fetch(
      `${API_BASE_URL}/lead/employee/${userid}/project/${slug}/leads`,
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
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
  return (
    <div>
      <UserProjectLeadRemarks apiData={apiresult} userid={userid} />
    </div>
  );
}
