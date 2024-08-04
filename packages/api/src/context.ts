// TODO "Add" this to codegen for types

export type ContextValue = Record<string, unknown>;

export async function context(): Promise<ContextValue> {
  return {};
}
