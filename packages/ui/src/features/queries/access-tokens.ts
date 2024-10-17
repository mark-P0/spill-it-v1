import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
} from "../local-storage";

type AccessTokenMutationArgs =
  | {
      action: "set";
      accessToken: string;
    }
  | {
      action: "remove";
    };

const ACCESS_TOKEN_QUERY_KEY = ["access-token"];
const LOGOUT_EVENT_NAME = crypto.randomUUID();

export function useAccessTokenQuery() {
  const accessTokenQuery = useQuery({
    queryKey: ACCESS_TOKEN_QUERY_KEY,

    async queryFn() {
      const token = getFromStorage("accessToken");

      return token;
    },
  });

  return accessTokenQuery;
}

export function useAccessTokenMutation() {
  const queryClient = useQueryClient();

  const accessTokenMutation = useMutation({
    mutationKey: ACCESS_TOKEN_QUERY_KEY,

    async mutationFn(args: AccessTokenMutationArgs) {
      const { action } = args;

      if (action === "set") {
        const { accessToken } = args;

        setToStorage("accessToken", accessToken);

        return;
      }

      if (action === "remove") {
        removeFromStorage("accessToken");

        return;
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ACCESS_TOKEN_QUERY_KEY });
    },
  });

  return accessTokenMutation;
}

export function useLogoutEvent() {
  const queryClient = useQueryClient();

  useEffect(() => {
    /**
     * Basically `accessTokenMutation.mutate({ action: "remove" })` but manual...
     *
     * Maybe there's a more "elegant" way for this?
     */
    function logoutEventCallback() {
      removeFromStorage("accessToken");

      queryClient.invalidateQueries({ queryKey: ACCESS_TOKEN_QUERY_KEY });
    }

    window.addEventListener(LOGOUT_EVENT_NAME, logoutEventCallback);

    return () => {
      window.removeEventListener(LOGOUT_EVENT_NAME, logoutEventCallback);
    };
  }, [queryClient]);
}

export function triggerLogoutEvent() {
  window.dispatchEvent(new Event(LOGOUT_EVENT_NAME));
}
