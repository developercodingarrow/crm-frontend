import React from "react";
import styles from "./authnavbar.module.css";
import navLogo from "../../../public/layer-thick-icon.png";
import Image from "next/image";
export default function AuthNavbar() {
  return (
    <div className={styles.main_container}>
      <div className={styles.logo_wraaper}>
        <Image
          src={navLogo}
          alt="logo-image"
          width={100}
          height={100}
          className={styles.logoStyle}
        />
      </div>
    </div>
  );
}
