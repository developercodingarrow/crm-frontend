import React from "react";
import EmployeesPageLayout from "../../../components/employees/EmployeesPage_layout";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../../config";

export default async function Employeespage() {
  // ✅ Get JWT cookie safely
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  if (!token) {
    throw new Error("Not authenticated");
  }

  let apiresult;

  try {
    const response = await fetch(`${API_BASE_URL}/user/getAllUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();
    if (data.status === "success") {
      apiresult = data;
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <div>
      <EmployeesPageLayout apiData={apiresult} />
    </div>
  );
}
