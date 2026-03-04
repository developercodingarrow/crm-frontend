"use client";
import React, { useContext } from "react";
import styles from "./mainlayoutwrapper.module.css";
import MainNavbar from "./main_navbar/MainNavbar";
import Asidebar from "./asidebar/Asidebar";
import { AppContext } from "../../_contextApi/AppContext";
import MobileFooter from "../footer/MobileFooter";
export default function MainLayoutWrapper({ children }) {
  const { isSidebarCollapsed, handelToggleAsidebar } = useContext(AppContext);
  return (
    <div className={styles.main_container}>
      <section className={styles.mainnavbar_wrapper}>
        <MainNavbar />
      </section>
      <section className={styles.inner_section}>
        <div className={styles.asidebar_wrapper}>
          <Asidebar />
        </div>
        <div className={styles.children_wrapper}>{children}</div>
      </section>

      <section className={styles.footer_wrapper}>
        <MobileFooter />
      </section>
    </div>
  );
}
