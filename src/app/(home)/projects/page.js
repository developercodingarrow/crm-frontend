// app/admin/projects/page.js
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "../../../../config";
import ProjectPageLayout from "../../../components/project_pageCompoenents/ProjectPageLayout";

export default async function Projectpage() {
  // 1. Get cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const userString = cookieStore.get("user")?.value;

  // 2. Check authentication
  if (!token) {
    redirect("/auth/login");
  }

  // 3. Parse user and verify superadmin role
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch {
    redirect("/auth/login");
  }

  // 4. Verify superadmin role
  if (user?.role !== "superadmin") {
    redirect("/auth/login");
  }

  // 5. Fetch projects data
  let projectsArray = [];
  let error = null;

  try {
    const response = await fetch(`${API_BASE_URL}/project/getAllProjects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", result);

    if (result.status === "success") {
      // ✅ Extract the data array from the response
      projectsArray = result.data || [];
    } else {
      throw new Error(result.message || "Failed to fetch projects");
    }
  } catch (err) {
    console.error("Error fetching projects:", err);
    error = err.message;
  }

  // 6. If fetch failed, throw error
  if (error) {
    throw new Error(error);
  }

  // 7. Render page with data (pass the array directly)
  return (
    <div>
      <ProjectPageLayout
        apiData={projectsArray} // ✅ Pass the array, not the whole response
      />
    </div>
  );
}
