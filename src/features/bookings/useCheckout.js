import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  // Getting the Query client and navigate functions from the hooks
  const queryClient = useQueryClient();

  // Edit booking
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // Invalidating all the active queries
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCheckingOut, checkout };
}
