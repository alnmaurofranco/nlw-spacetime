import { randomUUID as uuid } from 'node:crypto'
import { ValueObject } from '../value-object'

export class UniqueEntityID extends ValueObject<string> {
  public toString() {
    return this.value
  }

  private constructor(value?: string) {
    super(value ?? uuid())
  }

  public static create(value?: string) {
    return new UniqueEntityID(value)
  }
}
