import React from "react";
import styles from "./mainnavbar.module.css";
import { GoBell } from "react-icons/go";
import Link from "next/link";
import navlogo from "../../../../public/layer-thick-icon.png";
import Image from "next/image";
export default function MainNavbar() {
  const userName = "Sandeep Chauhan";
  const navigationItems = [
    { id: 1, name: "Projects", href: "/projects" },
    { id: 2, name: "Employess", href: "/employess" },
    { id: 3, name: "Leads", href: "/leads" },
  ];

  return (
    <div className={styles.main_container}>
      <div className={styles.inner_container}>
        <div className={styles.navbar_logo}>
          <div className={styles.nav_logo}>
            <Image
              src={navlogo}
              alt="nav-logo"
              width={50}
              height={50}
              className={styles.navlogo_img}
            />
          </div>
          <div className={styles.logo_text}>Office</div>
          <div className={styles.logo_sub}>CRM</div>
        </div>
        {/* Navigation Section */}
        <div className={styles.navigation}>
          {navigationItems.map((item) => (
            <a key={item.id} href={item.href} className={styles.nav_item}>
              {item.name}
            </a>
          ))}
        </div>

        <div className={styles.right_column}>
          <div className={styles.notification}>
            <GoBell />
          </div>
          <div className={styles.user_avtar}>Sc</div>
        </div>
      </div>
    </div>
  );
}
