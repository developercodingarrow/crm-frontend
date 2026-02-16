"use client";
import React, { useContext } from "react";
import styles from "./mainlayoutwrapper.module.css";
import MainNavbar from "./main_navbar/MainNavbar";
import Asidebar from "./asidebar/Asidebar";
import { AppContext } from "../../_contextApi/AppContext";
export default function MainLayoutWrapper({ children }) {
  const { isSidebarCollapsed, handelToggleAsidebar } = useContext(AppContext);
  return (
    <div className={styles.main_conatiner}>
      <div className={styles.navbar_wrapper} onClick={handelToggleAsidebar}>
        <MainNavbar />
      </div>
      <div className={styles.inner_layout}>
        <div
          className={`${styles.asidebar_wrapper} ${
            isSidebarCollapsed ? styles.asidbar_wrapper_collapsed : ""
          }`}
        >
          <Asidebar />
        </div>

        <div className={styles.content_wrapper}>{children}</div>
      </div>
    </div>
  );
}
