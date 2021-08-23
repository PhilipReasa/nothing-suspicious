/**
 * A Useful type for easily referencing both the success and failure values of a response.
 * Kind of like a promise that is safe to `await` on and does not have to be .then/.catch chained
 */
export namespace Result {
  interface SuccessType<S> {
    type: "SUCCESS";
    value: S;
  }
  interface FailureType<F> {
    type: "FAILURE";
    value: F;
  }
  export type Type<S, F> = SuccessType<S> | FailureType<F>;

  export function isSuccess<S, F>(
    resultType: Type<S, F>
  ): resultType is SuccessType<S> {
    return resultType.type === "SUCCESS";
  }

  export function isFailure<S, F>(
    resultType: Type<S, F>
  ): resultType is FailureType<F> {
    return resultType.type === "FAILURE";
  }

  export function success<S>(value: S): SuccessType<S> {
    return { type: "SUCCESS", value };
  }

  export function failure<F>(value: F): FailureType<F> {
    return { type: "FAILURE", value };
  }

  export function fromPromise<S, F>(
    promise: Promise<S>
  ): Promise<Result.Type<S, F>> {
    return promise
      .then((success) => Result.success(success))
      .catch((failure) => Result.failure(failure));
  }
}
