import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  // Getting the URL state and its setter
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting the currently selected source method
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";

  // Sort select element change handler
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

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
