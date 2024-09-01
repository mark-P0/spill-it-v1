import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setLocalStorageData } from "../local-storage";

const ACCESS_TOKEN_QUERY_KEY = ["access-token"];

export function useAccessTokenMutation() {
  const queryClient = useQueryClient();
  const accessTokenMutation = useMutation({
    mutationKey: ACCESS_TOKEN_QUERY_KEY,
    async mutationFn(args: { accessToken: string }) {
      setLocalStorageData("accessToken", args.accessToken);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ACCESS_TOKEN_QUERY_KEY });
    },
  });

  return accessTokenMutation;
}
