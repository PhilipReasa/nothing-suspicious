import React from "react";
import styles from "styles/Search.module.scss";
import { UnopinionatedResponseType } from "lib/types";
import { changeState } from "lib/forms";

export default function Search(p: {
  search: (search: string) => UnopinionatedResponseType;
}) {
  const [searchString, setSearchString] = React.useState("");
  return (
    <form
      className={`${styles.form} flex-row`}
      onSubmit={(e) => e.preventDefault()}
    >
      <label className={styles.label}>
        Search <span className="note">by name or country code</span>
      </label>
      <input
        className={styles.input}
        onChange={changeState(setSearchString)}
        value={searchString}
        placeholder="Example: Canada or CA"
      />
      <div className="grow"></div>
      <button className={styles.button} onClick={() => p.search(searchString)}>
        Search!
      </button>
    </form>
  );
}
