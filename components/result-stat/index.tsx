import React from "react";
import styles from "styles/ResultStats.module.scss";
import { Stat } from "pages/api/countries";

export default function ResultStat({
  label,
  stat,
}: {
  readonly label: string;
  readonly stat: Stat;
}) {
  return (
    <div className="flex-row">
      <div className={`${styles.label} note`}>{label}: </div>
      <div>
        {Object.entries(stat).map(([name, count]) => (
          <span className={styles.resultDataPiece} key="name">
            {name} ({count})
          </span>
        ))}
      </div>
    </div>
  );
}
