import React from "react";
import { Stat } from "pages/api/countries";
import styles from "styles/ResultStats.module.scss";

export default function ResultStats({
  countryCount,
  regionStats,
  subRegionStats,
}: {
  readonly countryCount: number;
  readonly regionStats: Stat;
  readonly subRegionStats: Stat;
}) {
  return (
    <div className={styles.stats}>
      <div className="flex-row">
        <div className={`${styles.label} note`}>
          Total Countries Displayed:{" "}
        </div>
        <div>{countryCount}</div>
      </div>
      <div className="flex-row">
        <div className={`${styles.label} note`}>Regions: </div>
        <div>
          {Object.entries(regionStats).map(([name, count]) => (
            <span className={styles.resultDataPiece} key="name">
              {name} ({count})
            </span>
          ))}
        </div>
      </div>
      <div className="flex-row">
        <div className={`${styles.label} note`}>SubRegions: </div>
        <div>
          {Object.entries(subRegionStats).map(([name, count]) => (
            <span className={styles.resultDataPiece} key="name">
              {name} ({count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
