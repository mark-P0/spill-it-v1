import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const OWN_USER_QUERY_KEY = ["own-user"];

export function useOwnUserQuery() {
  const ownUserQuery = useQuery({
    queryKey: OWN_USER_QUERY_KEY,
    queryFn: () => ownUserStore,
  });

  return ownUserQuery;
}

export function useOwnUserMutation() {
  const queryClient = useQueryClient();

  const ownUserMutation = useMutation({
    mutationKey: OWN_USER_QUERY_KEY,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: OWN_USER_QUERY_KEY });
    },

    async mutationFn(ownUser: OwnUserStore["ownUser"]) {
      ownUserStore.ownUser = ownUser;
    },
  });

  return ownUserMutation;
}
