import React from "react";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../config";
import HomeDashbord from "../../components/home_dashboard/HomeDashbord";

export default async function Homepage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  let overviewData = null;
  let activitiesData = null;
  let overviewError = null;
  let activitiesError = null;

  try {
    // Fetch overview stats
    const overviewRes = await fetch(`${API_BASE_URL}/stats/overviewStats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (overviewRes.ok) {
      const overviewJson = await overviewRes.json();
      if (overviewJson.status === "success") {
        overviewData = overviewJson.data;
      }
    } else {
      overviewError = `Failed to fetch overview stats: ${overviewRes.statusText}`;
    }
  } catch (error) {
    overviewError = error.message;
    console.error("Overview stats error:", error);
  }

  try {
    // Fetch recent activities
    const activitiesRes = await fetch(
      `${API_BASE_URL}/stats/recentActivities?limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (activitiesRes.ok) {
      const activitiesJson = await activitiesRes.json();
      if (activitiesJson.status === "success") {
        activitiesData = activitiesJson.data;
      }
    } else {
      activitiesError = `Failed to fetch activities: ${activitiesRes.statusText}`;
    }
  } catch (error) {
    activitiesError = error.message;
    console.error("Activities error:", error);
  }

  return (
    <div>
      <HomeDashbord
        overviewData={overviewData}
        activitiesData={activitiesData}
      />
    </div>
  );
}
