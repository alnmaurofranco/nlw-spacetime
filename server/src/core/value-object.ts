export abstract class ValueObject<ValueType> {
  readonly #value: ValueType

  get value() {
    return this.#value
  }

  get toValue() {
    return this.#value
  }

  protected constructor(value: ValueType) {
    this.#value = value
  }
}
