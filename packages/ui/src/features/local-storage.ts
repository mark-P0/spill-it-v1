import { z } from "zod";

/**
 * Record of storage keys and their schemas
 *
 * Schemas must be optional
 */
const StorageSchemaRecord = {
  accessToken: z.string(),
};

type TStorageSchemaRecord = typeof StorageSchemaRecord;
type LocalStorageKey = keyof TStorageSchemaRecord;
type LocalStorageValue<T extends LocalStorageKey> = z.infer<
  TStorageSchemaRecord[T]
>;

export function getFromStorage<T extends LocalStorageKey>(
  key: T
): LocalStorageValue<T> | null {
  const valueRawStr = localStorage.getItem(key);
  if (valueRawStr === null) {
    return null;
  }

  const valueRaw = JSON.parse(valueRawStr);
  const value = StorageSchemaRecord[key].parse(valueRaw);

  return value;
}

export function setToStorage<T extends LocalStorageKey>(
  key: T,
  value: LocalStorageValue<T>
) {
  const valueRawStr = JSON.stringify(value);
  localStorage.setItem(key, valueRawStr);
}

export function removeFromStorage(key: LocalStorageKey) {
  localStorage.removeItem(key);
}
