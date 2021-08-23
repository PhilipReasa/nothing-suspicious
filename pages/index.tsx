import React from "react";
import type { NextPage } from "next";
import Header from "components/header";
import CountryData from "components/country-data";
import Search from "components/search";
import styles from "styles/Home.module.scss";
import axios from "axios";
import { CountryResponse, SEARCH_PARAM } from "./api/countries";
import { Result } from "lib/results";
import ErrorWell from "components/error-well";
import ResultStats from "components/result-stats";

const Home: NextPage = () => {
  const [apiData, setApiData] = React.useState<CountryResponse | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const search = async (searchString: string) => {
    if (searchString.length === 0) {
      setErrorMessage("Search String Required");
      setApiData(null);
      return;
    }

    const result = await Result.fromPromise(
      axios.get<CountryResponse>(
        `/api/countries?${SEARCH_PARAM}=${searchString}`
      )
    );

    if (Result.isFailure(result)) {
      setErrorMessage("Something went wrong");
      setApiData(null);
      return;
    }

    if (result.value.data.countries.length === 0) {
      setErrorMessage("No Results");
      setApiData(null);
      [];
      return;
    }

    // If we managed to pass all validation, then clear the error and set the data!
    setErrorMessage(null);
    setApiData(result.value.data);
  };

  return (
    <>
      <Header />
      <div className={styles.content}>
        <Search search={search} />
        <ErrorWell error={errorMessage} />
        {apiData ? (
          <>
            <CountryData data={apiData.countries} />
            <ResultStats
              countryCount={apiData.countries.length}
              regionStats={apiData.regionStats}
              subRegionStats={apiData.subRegionStats}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Home;
