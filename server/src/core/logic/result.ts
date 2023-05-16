export class Result<T> {
  readonly #value: T | null
  readonly #error: string | null
  readonly #isSuccess: boolean

  get isSuccess(): boolean {
    return this.#isSuccess
  }

  get isFailure(): boolean {
    return !this.#isSuccess
  }

  public value(): T {
    if (!this.#isSuccess)
      throw new Error(
        'Cannot get the value of an error result. Use errorValue instead.',
      )
    return this.#value as T
  }

  public errorValue(): string {
    if (this.#isSuccess)
      throw new Error(
        'Cannot get the error of a success result. Use value instead.',
      )
    return this.#error as string
  }

  private constructor(
    isSuccess: boolean,
    value: T | null,
    error: string | null,
  ) {
    this.#isSuccess = isSuccess
    this.#value = value
    this.#error = error

    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      )
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      )
    }
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, value, null)
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, null, error)
  }

  public static combine<Type>(results: Result<Type>[]): Result<Type | null> {
    const errors = results.reduce((acc, cur) => {
      if (cur.isFailure) {
        return [...acc, cur.errorValue()]
      }
      return acc
    }, [] as string[])

    if (errors.length) {
      return Result.fail<Type>(errors.join(', '))
    }

    return Result.ok<Type | null>(null)
  }
}
