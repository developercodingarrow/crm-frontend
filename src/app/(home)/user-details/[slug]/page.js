import React from "react";
import UserDetailsLayout from "../../../../components/user_details/UserDetailsLayout";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../../../../../config";
export default async function UserDetailpage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }
  const { slug } = await params;

  let apiData;

  try {
    const response = await fetch(
      `${API_BASE_URL}/userDetails/dashboard/${slug}`,
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
      apiData = data?.data;
    }

    console.log("user details", apiData);
  } catch (error) {
    console.log("error--", error);
  }
  return (
    <div>
      <UserDetailsLayout apiData={apiData} />
    </div>
  );
}
