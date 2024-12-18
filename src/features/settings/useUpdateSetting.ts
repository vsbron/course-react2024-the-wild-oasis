import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
  // Getting the Query client by calling hook
  const queryClient = useQueryClient();

  // Edit settings
  // Getting isUpdating state and mutate function from useMutation hook
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (newSetting) => updateSettingAPI(newSetting),
    onSuccess: () => {
      toast.success("Settings successfully edited");
      // Invalidating "settings" query
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
