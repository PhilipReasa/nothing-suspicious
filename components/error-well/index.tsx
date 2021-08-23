import React from "react";
import styles from "styles/ErrorWell.module.scss";

export default function ErrorWell({ error }: { error: string | null }) {
  return error ? <div className={styles.errorWell}>{error}</div> : null;
}
