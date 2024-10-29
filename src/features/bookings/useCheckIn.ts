import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  // Getting the Query client and navigate functions from the hooks
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Edit booking
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast: {
        hasBreakfast: boolean;
        extrasPrice: number;
        totalPrice: number;
      };
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // Invalidating all the active queries
      queryClient.invalidateQueries({
        predicate: (query) => query.state.status === "success",
      });
      navigate("/");
    },
    onError: (err: unknown) =>
      toast.error(err instanceof Error ? err.message : String(err)),
  });

  return { isCheckingIn, checkIn };
}
