import React from "react";
import styles from "styles/Header.module.scss";
import logo from "public/infosec_logo.svg";
import Image from "next/image";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Image src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}
