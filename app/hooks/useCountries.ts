import countries from "world-countries";

const countriesOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));
const useCountries = () => {
  const getAllCountries = () => countriesOptions;

  const getCountryByCode = (code: string) =>
    countriesOptions.find((country) => country.value === code);

  return {
    getAllCountries,
    getCountryByCode,
  };
};

export default useCountries;
