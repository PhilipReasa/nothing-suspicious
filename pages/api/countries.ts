import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Result } from "../../lib/results";

const fields = [
  "name",
  "alpha2Code",
  "alpha3Code",
  "region",
  "subregion",
  "population",
  "languages",
  "flag",
];
const REST_COUNTRIES_API_ENDPOINT = `https://restcountries.eu/rest/v2/all?fields=${fields.join(
  ";"
)}`;

export const SEARCH_PARAM = "search";

interface RestCountriesCountry {
  readonly name: string;
  readonly alpha2Code: string;
  readonly alpha3Code: string;
  readonly region: string;
  readonly subregion: string;
  readonly population: number;
  readonly languages: readonly { name: string }[];
  readonly flag: string;
}

export interface Country {
  readonly name: string;
  readonly code2: string;
  readonly code3: string;
  readonly flagImgUrl: string;
  readonly region: string;
  readonly subregion: string;
  readonly population: number;
  readonly languages: string[];
}

export type Stat = Record<string, number>;

export interface CountryResponse {
  readonly countries: readonly Country[];
  readonly regionStats: Stat;
  readonly subRegionStats: Stat;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountryResponse>
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const queryResult = await Result.fromPromise(
    axios.get<readonly RestCountriesCountry[]>(REST_COUNTRIES_API_ENDPOINT)
  );
  if (Result.isFailure(queryResult)) {
    res.status(500).end();
    return;
  }

  const searchString = req.query[SEARCH_PARAM];
  if (typeof searchString !== "string") {
    res.status(500).end();
    return;
  }

  const countries = queryResult.value.data.map(transformCountry_apiToLocal);

  const filteredCountries = countries.filter(countrySearch(searchString));

  const sortedCountries = filteredCountries.sort(countrySort);

  res.status(200).json({
    countries: sortedCountries,
    regionStats: statsByProperty(sortedCountries, "region"),
    subRegionStats: statsByProperty(sortedCountries, "subregion"),
  });
}

function transformCountry_apiToLocal(api: RestCountriesCountry): Country {
  return {
    name: api.name,
    code2: api.alpha2Code,
    code3: api.alpha3Code,
    flagImgUrl: api.flag,
    population: api.population,
    languages: api.languages.map((lang) => lang.name),

    // These two fields can be the null string, so map them to a more user friendly value
    region: api.region.length ? api.region : "Unknown",
    subregion: api.subregion.length ? api.subregion : "Unknown",
  };
}

function countrySearch(searchString: string) {
  return (country: Country) => countryFilter(searchString, country);
}

function countryFilter(searchString: string, country: Country) {
  const lowerSearchString = searchString.toLowerCase();
  return (
    country.name.toLowerCase().includes(lowerSearchString) ||
    country.code2.toLowerCase().includes(lowerSearchString) ||
    country.code3.toLowerCase().includes(lowerSearchString)
  );
}

function countrySort(a: Country, b: Country) {
  return b.population - a.population;
}

function statsByProperty(
  countries: Country[],
  property: keyof Pick<Country, "region" | "subregion">
): Stat {
  return countries.reduce((acc, country) => {
    acc[country[property]] = (acc[country[property]] ?? 0) + 1;
    return acc;
  }, {} as Stat);
}
