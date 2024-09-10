import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocalStorageData, setLocalStorageData } from "../local-storage";

const ACCESS_TOKEN_QUERY_KEY = ["access-token"];

export function useAccessTokenQuery() {
  const accessTokenQuery = useQuery({
    queryKey: ACCESS_TOKEN_QUERY_KEY,
    queryFn: () => getLocalStorageData(),
    select: (data) => data.accessToken,
  });

  return accessTokenQuery;
}

export function useAccessTokenMutation() {
  const queryClient = useQueryClient();
  const accessTokenMutation = useMutation({
    mutationKey: ACCESS_TOKEN_QUERY_KEY,

    async mutationFn(args: { accessToken: string | undefined }) {
      setLocalStorageData("accessToken", args.accessToken);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ACCESS_TOKEN_QUERY_KEY });
    },
  });

  return accessTokenMutation;
}
