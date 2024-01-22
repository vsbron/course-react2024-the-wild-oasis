import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";

function useBookings() {
  // Getting thet state from URL
  const [searchParams] = useSearchParams();

  // Getting the filtered value from the search params
  const filterValue = searchParams.get("status");

  // Assigning the value to filter object if it's not null or not equal to "all"
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // Getting the sortBy value from the search params and splitting it
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Getting the current page number
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // Adding filter object to make an app refetch the data when filter is changed (works like dependency array)
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, error, bookings, count };
}

export default useBookings;
