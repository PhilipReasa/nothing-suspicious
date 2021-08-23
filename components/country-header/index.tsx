import React from "react";
import styles from "styles/CountryRow.module.scss";

/**
 * NOTE: It is pretty sub-optimal having the header use the CountryRow classes.
 * I did it because I wanted to have the same column/row styling, but ideally
 * I probably should have broken out the shared parts into a single abstraction
 * rather than piggybacking on one another like this
 */
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
