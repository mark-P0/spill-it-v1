import db from "@spill-it-v1/db";

export type ContextValue = {
  db: typeof db;
};

export async function context(): Promise<ContextValue> {
  const contextValue: ContextValue = {
    db,
  };

  return contextValue;
}
