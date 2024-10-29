import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  // Getting the Query client by calling hook
  const queryClient = useQueryClient();

  // Edit cabin
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      // Invalidating "cabin" query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : String(err)),
  });

  return { isEditing, editCabin };
}
