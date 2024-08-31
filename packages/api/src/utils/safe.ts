/**
 * - https://old.reddit.com/r/reactjs/comments/dvpdgc/how_to_avoid_trycatch_statements_nestingchaining/
 * - https://fsharpforfunandprofit.com/posts/recipe-part2/
 * - https://javascript.plainenglish.io/how-to-avoid-try-catch-statements-nesting-chaining-in-javascript-a79028b325c5
 * - https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5
 * - https://www.youtube.com/watch?v=J-HWmoTKhC8
 */

/** Inspired by Zod's `.safeParse()` */
export type Result<TData, TError extends Error = Error> =
  | { success: true; data: TData; error?: never }
  | { success: false; data?: never; error: TError };

function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let valueStr: string;
  try {
    valueStr = JSON.stringify(value);
  } catch {
    valueStr = "[Thrown value cannot be stringified]";
  }

  return new Error(`A non-Error was thrown, stringified as: ${valueStr}`);
}

/**
 * try-catch wrapper
 *
 * Used primarily to "denest" a try-catch block
 */
export function safe<T>(action: () => T): Result<T> {
  try {
    const data = action();
    return { success: true, data };
  } catch (possibleError) {
    const error = ensureError(possibleError);
    return { success: false, error };
  }
}

/** Async version of {@link safe()} */
export async function safeAsync<T>(
  action: () => Promise<T>
): Promise<Result<T>> {
  try {
    const data = await action();
    return { success: true, data };
  } catch (possibleError) {
    const error = ensureError(possibleError);
    return { success: false, error };
  }
}
