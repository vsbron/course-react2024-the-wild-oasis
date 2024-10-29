import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  // Getting the Query client and navigate functions from the hooks
  const queryClient = useQueryClient();

  // Delete booking
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`Booking was successfully deleted`);
      // Invalidating all the active queries
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err: unknown) =>
      toast.error(err instanceof Error ? err.message : String(err)),
  });

  return { isDeleting, deleteBooking };
}
