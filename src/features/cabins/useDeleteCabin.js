import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  // Getting the Query client by calling hook
  const queryClient = useQueryClient();

  // Getting the mutate function from the hook
  // Passing the function that executes the query and on success callback function
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      // Invalidating "cabin" query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : String(err)),
  });

  return { isDeleting, deleteCabin };
}
