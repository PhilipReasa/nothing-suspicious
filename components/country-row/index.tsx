import React from "react";
import { Country } from "pages/api/countries";
import Image from "next/image";
import styles from "styles/CountryRow.module.scss";

export default function CountryRow({ country }: { readonly country: Country }) {
  return (
    <div className={styles.dynamicRow}>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Name: </span>
        <b>{country.name}</b>
      </div>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Flag: </span>
        <Image width="30" height="20" src={country.flagImgUrl} />
      </div>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Code 2: </span>
        {country.code2}
      </div>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Code 3: </span>
        {country.code3}
      </div>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Region: </span>
        {country.region}
      </div>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Sub Region: </span>
        {country.subregion}
      </div>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Population: </span>
        {country.population.toLocaleString()}
      </div>
      <div className={styles.dynamicColumn}>
        <span className={styles.dynamicName}>Languages: </span>
        {country.languages.join(", ")}
      </div>
    </div>
  );
}
