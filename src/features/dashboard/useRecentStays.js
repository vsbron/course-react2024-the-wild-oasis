import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subDays } from "date-fns";

import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
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
    data: stays,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // Filtering out only the confirmed stays
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  // Error handling
  if (error) {
    console.log("ERROR", error);
    toast.error("Couldn't get the latest stays data");
  }

  return { isLoading, stays, confirmedStays };
}
