import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shortenURL } from "./urlService";

export const useShortenUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shortenURL,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
  });
};
