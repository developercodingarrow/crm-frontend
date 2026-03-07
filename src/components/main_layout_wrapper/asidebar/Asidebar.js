"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./asidebar.module.css";
import {
  GoHome,
  GoProject,
  GoPeople,
  GoGraph,
  GoGear,
  GoSignOut,
} from "react-icons/go";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Asidebar() {
  const router = useRouter(); // ✅ Now defined
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigationItems = [
    { id: 1, name: "Dashboard", href: "/", icon: <GoHome /> },
    { id: 2, name: "Projects", href: "/projects", icon: <GoProject /> },
    { id: 3, name: "Leads", href: "/leads", icon: <GoPeople /> },

    { id: 4, name: "Users", href: "/employees", icon: <GoPeople /> },
    {
      id: 5,
      name: "Create Project",
      href: "/create-project",
      icon: <GoGraph />,
    },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // ✅ Client-side cookie deletion
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Optional: Call backend logout API (fire and forget)
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        console.log("Backend logout error:", err);
        setIsLoggingOut(false);
      }
      toast.success("Logged out successfully");
      // Redirect to login
      router.push("/auth/login");
      router.refresh();
      setIsLoggingOut(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to logout");
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className={styles.asidebar}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          zIndex: 99999,
          fontSize: "14px",
        }}
      />
      <div className={styles.navigation}>
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.nav_item} ${
              pathname === item.href ? styles.active : ""
            }`}
          >
            <span className={styles.nav_icon}>{item.icon}</span>
            <span className={styles.nav_name}>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className={styles.logout_container}>
        <button onClick={handleLogout} className={styles.logout_btn}>
          <span className={styles.logout_icon}>
            <GoSignOut />
          </span>
          <span className={styles.logout_text}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
