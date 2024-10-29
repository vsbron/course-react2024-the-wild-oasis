import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subDays } from "date-fns";

import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  // Getting the params from the URL using hook
  const [searchParams] = useSearchParams();

  // Getting the number of days needed for filter or assigning default 7
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // Calculating the date from the current one (today)
  const queryDate = subDays(new Date(), numDays).toISOString();

  // Getting the mutation function and isLoading status
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  // Error handling
  if (error) {
    console.log("ERROR", error);
    toast.error("Couldn't get the latest booking data");
  }

  return { isLoading, bookings };
}
