import { UniqueEntityID } from './value-object/unique-entity-id'

export class Entity<Props> {
  readonly #id: UniqueEntityID
  protected props: Props

  get id(): UniqueEntityID {
    return this.#id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.#id = id ?? UniqueEntityID.create()
    this.props = props
  }
}
