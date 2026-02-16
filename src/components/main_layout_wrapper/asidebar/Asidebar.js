import React from "react";
import styles from "./asidebar.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
export default function Asidebar() {
  const asidebarItems = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Projects", href: "/projects" },
    { id: 3, name: "Employess", href: "/employess" },
    { id: 4, name: "Leads", href: "/leads" },
  ];

  return (
    <div className={styles.main_container}>
      <div className={styles.asideBar_header}>
        <div className={styles.header_item}>
          <div className={styles.bold_text}>Menu</div>
          <div className={styles.asidebar_icon}>
            <IoIosArrowForward />
          </div>
        </div>
      </div>

      <div className={styles.asidebarItems_wrapper}>
        {asidebarItems.map((item, index) => {
          return (
            <Link
              href={`${item.href}`}
              className={styles.asidebar_item}
              key={index}
            >
              <div className={styles.asidebar_icon}>
                <AiOutlineHome />
              </div>
              <div className={styles.asidebar_text}>{item.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
