import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}

export default useBookings;
