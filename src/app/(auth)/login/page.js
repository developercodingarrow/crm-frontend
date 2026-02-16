import React from "react";
import styles from "./page.module.css";
import LoginForm from "../../../components/loginform/LoginForm";
import loginBg from "../../../../public/login-bg.jpg";
import Image from "next/image";
export default function Loginpage() {
  return (
    <div className={styles.main_container}>
      {/* Crystal Background with gradient */}
      <div className={styles.crystalBackground}></div>
      {/* Background Image at Bottom */}
      <div className={styles.bottomImage}>
        <Image
          src={loginBg}
          alt="Login Background"
          fill
          style={{ objectFit: "cover" }}
          priority
          className={styles.bg_image}
        />
      </div>
      <div className={styles.inner_container}>
        <div className={styles.form_wrapper}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
