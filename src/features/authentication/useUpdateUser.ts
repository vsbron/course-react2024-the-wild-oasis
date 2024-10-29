import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  // Getting the Query client by calling hook
  const queryClient = useQueryClient();

  // Update user
  // Getting isLoading state and mutate function from useMutation hook
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({
      password,
      fullName,
      avatar,
    }: {
      password: string;
      fullName: string;
      avatar: string;
    }) => updateCurrentUser({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success("User account successfully updated");

      // Invalidating "user" query
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: unknown) =>
      toast.error(err instanceof Error ? err.message : String(err)),
  });

  return { isUpdating, updateUser };
}
