import React from "react";
import { Country } from "pages/api/countries";
import CountryRow from "components/country-row";
import CountryHeader from "components/country-header";

export default function CountryData(p: { readonly data: readonly Country[] }) {
  return p.data.length ? (
    <div>
      <CountryHeader />
      {p.data.map((country) => (
        <CountryRow key={country.name} country={country} />
      ))}
    </div>
  ) : null;
}
