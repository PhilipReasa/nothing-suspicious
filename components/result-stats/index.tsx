import React from "react";
import { Stat } from "pages/api/countries";
import styles from "styles/ResultStats.module.scss";
import ResultStat from "components/result-stat";

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
        <div className={`${styles.label} note`}>Total Countries Displayed:</div>
        <div>{countryCount}</div>
      </div>

      <ResultStat label="Regions" stat={regionStats} />
      <ResultStat label="SubRegions" stat={subRegionStats} />
    </div>
  );
}
