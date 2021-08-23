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

  // Utility to always clear api data when setting the error message
  const error = (message: string) => {
    setErrorMessage(message);
    setApiData(null);
  };

  const search = async (searchString: string) => {
    if (searchString.length === 0) {
      error("Search String Required");
      return;
    }

    const result = await Result.fromPromise(
      axios.get<CountryResponse>(
        `/api/countries?${SEARCH_PARAM}=${searchString}`
      )
    );

    if (Result.isFailure(result)) {
      error("Something went wrong");
      return;
    }

    if (result.value.data.countries.length === 0) {
      error("No Results");
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
