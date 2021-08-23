import React from "react";
import styles from "styles/CountryRow.module.scss";

export default function CountryHeader() {
  return (
    <div className={`${styles.dynamicRow} ${styles.dynamicHeader}`}>
      <div className={styles.dynamicColumn}>
        <b>Name</b>
      </div>
      <div className={styles.dynamicColumn}>Flag</div>
      <div className={styles.dynamicColumn}>Code 2</div>
      <div className={styles.dynamicColumn}>Code 3</div>
      <div className={styles.dynamicColumn}>Region</div>
      <div className={styles.dynamicColumn}>Subregion</div>
      <div className={styles.dynamicColumn}>Population</div>
      <div className={styles.dynamicColumn}>Language</div>
    </div>
  );
}
