"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValues = {
  flag: string;
  label: string;
  value: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValues;
  onChange?: (value: CountrySelectValues) => void;
}

/* The code defines a functional component called `CountrySelect` that takes in two optional props:
`value` and `onChange`. */
const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAllCountries } = useCountries();

  return (
    <div>
      <Select
        placeholder="Select a country"
        isClearable
        options={getAllCountries()}
        value={value}
        onChange={(value) => onChange && onChange(value as CountrySelectValues)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-4">
            <div>{option?.flag}</div>
            <div>
              {option?.label},<span className="ml-1 text-primary/40"></span>
              {option?.region}
            </div>
          </div>
        )}
        classNames={{
          control: () => "border rounded-md p-1",
          option: () => "text-base",
          input: () => "text-base",
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#E5E7EB",
            primary: "#00A699",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
