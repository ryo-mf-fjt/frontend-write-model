export type Result<T, E> =
  | { type: "success"; value: T }
  | { type: "failure"; error: E };

export const success = <T, E>(value: T): Result<T, E> => ({
  type: "success",
  value,
});

export const failure = <T, E>(error: E): Result<T, E> => ({
  type: "failure",
  error,
});

export const isSuccess = <T, E>(
  result: Result<T, E>
): result is { type: "success"; value: T } => result.type === "success";

export const isFailure = <T, E>(
  result: Result<T, E>
): result is { type: "failure"; error: E } => result.type === "failure";
