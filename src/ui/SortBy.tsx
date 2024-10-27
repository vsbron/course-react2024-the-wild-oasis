import { useSearchParams } from "react-router-dom";

import Select from "./Select";
import { SortByProps } from "../lib/types";

function SortBy({ options }: SortByProps) {
  // Getting the URL state and its setter
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting the currently selected source method
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";

  // Sort select element change handler
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  // Returned JSX
  return (
    <Select
      type="white"
      options={options}
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
