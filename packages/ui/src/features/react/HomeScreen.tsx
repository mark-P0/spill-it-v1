// import { useAccessTokenQuery } from "../../features/queries/access-tokens";
// import { useOwnUserQuery } from "../queries/own-user";
// import { SignInWithGoogleButton } from "./SignInWithGoogleButton";
//
// function UserDisplay() {
//   const { data: ownUser } = useOwnUserQuery();
//
//   return <pre>{JSON.stringify(ownUser)}</pre>;
// }
//
// export function HomeScreen() {
//   const { data: accessToken } = useAccessTokenQuery();
//
//   return (
//     <main>
//       {accessToken === undefined ? <SignInWithGoogleButton /> : <UserDisplay />}
//     </main>
//   );
// }

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

/** storage.ts */
const { setToStorage, removeFromStorage, getAllFromStorage } = (() => {
  function setToStorage(key: string, value: unknown) {
    const valueStr = JSON.stringify(value);

    localStorage.setItem(key, valueStr);
  }

  function removeFromStorage(key: string) {
    const valueStr = localStorage.getItem(key);
    if (valueStr === null) {
      throw new Error("Key does not exist");
    }

    localStorage.removeItem(key);
  }

  function getFromStorage(key: string) {
    const valueStr = localStorage.getItem(key);
    if (valueStr === null) {
      throw new Error("Key does not exist");
    }

    const value = JSON.parse(valueStr);
    return value;
  }

  function getAllFromStorage() {
    const storage = Object.fromEntries(Object.entries(localStorage));

    return storage;
  }

  return {
    setToStorage,
    removeFromStorage,
    getFromStorage,
    getAllFromStorage,
  };
})();

function LocalStorageDisplay() {
  const STORAGE_QUERY_KEY = ["storage"];

  const storageQuery = useQuery({
    queryKey: STORAGE_QUERY_KEY,

    async queryFn() {
      const storage = getAllFromStorage();

      return storage;
    },
  });

  const queryClient = useQueryClient();
  const storageMutation = useMutation({
    mutationKey: STORAGE_QUERY_KEY,

    async mutationFn(args: { key: string; value: unknown }) {
      const { key } = args;
      const value = args.value ?? null;

      if (value === null) {
        removeFromStorage(key);

        return;
      }

      setToStorage(key, value);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: STORAGE_QUERY_KEY });
    },
  });

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const { data: storage } = storageQuery;
  const { mutate: mutateStorage } = storageMutation;

  function setKeyValue() {
    mutateStorage({ key, value });
  }

  function removeKeyValue() {
    mutateStorage({ key, value: null });
  }

  const storageStr = JSON.stringify(storage, null, 2);

  return (
    <article>
      <form className="bg-stone-400 p-3">
        <div className="space-x-3">
          <input
            type="text"
            placeholder="Key"
            value={key}
            onInput={(event) => setKey(event.currentTarget.value)}
            className="px-2 py-1"
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onInput={(event) => setValue(event.currentTarget.value)}
            className="px-2 py-1"
          />

          <button
            type="button"
            onClick={setKeyValue}
            className="bg-white px-2 py-1"
          >
            Set
          </button>
          <button
            type="button"
            onClick={removeKeyValue}
            className="bg-white px-2 py-1"
          >
            Remove
          </button>
        </div>
      </form>

      <pre className="text-sm p-3">{storageStr}</pre>
    </article>
  );
}

export function HomeScreen() {
  return (
    <main className="min-h-screen bg-stone-500">
      <LocalStorageDisplay />
    </main>
  );
}
