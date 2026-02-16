import React from "react";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../../config";
import ProjectPageLayout from "../../../components/project_pageCompoenents/ProjectPageLayout";

export default async function Projectpage() {
  // ✅ Get JWT cookie safely
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    throw new Error("Not authenticated");
  }

  // ✅ Fetch both APIs in parallel
  const [projectsRes, usersRes] = await Promise.all([
    fetch(`${API_BASE_URL}/project/getAllProjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }),
    fetch(`${API_BASE_URL}/user/getAllUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }),
  ]);

  // Check both responses
  if (!projectsRes.ok) {
    const errorText = await projectsRes.text();
    console.error("Projects API Error:", errorText);
    throw new Error(`Failed to fetch projects: ${projectsRes.status}`);
  }

  if (!usersRes.ok) {
    const errorText = await usersRes.text();
    console.error("Users API Error:", errorText);
    throw new Error(`Failed to fetch users: ${usersRes.status}`);
  }

  // Parse both responses
  const [projectsData, usersData] = await Promise.all([
    projectsRes.json(),
    usersRes.json(),
  ]);

  return (
    <div>
      <ProjectPageLayout
        apiData={projectsData?.data}
        usersData={usersData?.data}
      />
    </div>
  );
}
