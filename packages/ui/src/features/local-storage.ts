import { z } from "zod";

const zLocalStorage = z.object({
  accessToken: z.string().optional(),
});
type LocalStorage = z.infer<typeof zLocalStorage>;
type LocalStorageKey = keyof LocalStorage;

export function getLocalStorageData() {
  const storageEntries = Object.entries(localStorage);
  const preprocessedStorageEntries = storageEntries.map(([key, value]) => [
    key,
    JSON.parse(value),
  ]);
  const preprocessedStorageObj = Object.fromEntries(preprocessedStorageEntries);

  const storage = zLocalStorage.parse(preprocessedStorageObj);

  return storage;
}

export function setLocalStorageData<T extends LocalStorageKey>(
  key: T,
  value: LocalStorage[T]
) {
  const valueOrNull = value ?? null;
  if (valueOrNull === null) {
    localStorage.removeItem(key);

    return;
  }

  const valueStr = JSON.stringify(value);
  localStorage.setItem(key, valueStr);
}
