import { Entity } from '@core/entity'
import { UniqueEntityID } from '@core/value-object/unique-entity-id'
import { Memory } from '@domain/memory/enterprise/entity/memory'

export type UserProps = {
  name: string
  githubId: number
  login: string
  avatarUrl: string
  memories: Memory[]
}

export class User extends Entity<UserProps> {
  get name(): UserProps['name'] {
    return this.props.name
  }

  get githubId(): UserProps['githubId'] {
    return this.props.githubId
  }

  get login(): UserProps['login'] {
    return this.props.login
  }

  get avatarUrl(): UserProps['avatarUrl'] {
    return this.props.avatarUrl
  }

  get memories(): UserProps['memories'] {
    return this.props.memories
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    const user = new User(props, id)
    return user
  }
}
