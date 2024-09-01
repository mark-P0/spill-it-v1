import { User } from "@spill-it-v1/gql/codegen/ui/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type OwnUserStore = {
  ownUser: User | null;
};
const ownUserStore: OwnUserStore = {
  ownUser: null,
};

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
