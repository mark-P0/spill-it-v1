import { useEffect, useState } from "react";

export function useAsync<TData, TError = unknown>(fn: () => Promise<TData>) {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  useEffect(() => {
    fn()
      .then((data) => setData(data))
      .catch((error) => setError(error));
  });

  return { data, error };
}
