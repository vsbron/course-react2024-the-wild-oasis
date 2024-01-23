import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  // Getting the Query client and navigate functions from the hooks
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Edit booking
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // Invalidating all the active queries
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCheckingIn, checkin };
}

export default useCheckin;
