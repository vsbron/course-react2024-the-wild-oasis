import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";

import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  // Getting the query client for pre-fetching
  const queryClient = useQueryClient();

  // Getting thet state from URL
  const [searchParams] = useSearchParams();

  //// FILTERING
  // Getting the filtered value from the search params
  const filterValue = searchParams.get("status");

  // Assigning the value to filter object if it's not null or not equal to "all"
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //// SORTING
  // Getting the sortBy value from the search params and splitting it
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //// PAGINATION
  // Getting the current page number
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //// QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // Adding filter object to make an app refetch the data when filter is changed (works like dependency array)
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //// PRE-FETCHING
  const pageCount = Math.ceil((count ?? 1) / PAGE_SIZE);

  // Adding the query, but with increased page number (if not on the last page)
  page < pageCount &&
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  // Adding the query, but with decreased page number (if not on the first page)
  page > 1 &&
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  // Return the data
  return { isLoading, error, bookings, count };
}
