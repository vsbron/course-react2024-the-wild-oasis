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

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // Adding filter object to make an app refetch the data when filter is changed (works like dependency array)
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, error, bookings };
}

export default useBookings;
