import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  // Getting the Query client by calling hook
  const queryClient = useQueryClient();

  // New cabin
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully added");
      // Invalidating "cabin" query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: unknown) =>
      toast.error(err instanceof Error ? err.message : String(err)),
  });

  return { isCreating, createCabin };
}
