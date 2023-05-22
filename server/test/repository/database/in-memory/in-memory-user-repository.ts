import { UserRepository } from '@domain/user/application/repository/user-repository'
import { User } from '@domain/user/enterprise/entity/user'

export class InMemoryUserRepository implements UserRepository {
  public items: User[]

  constructor() {
    this.items = []
  }

  async findByGithubId(githubId: number): Promise<User | null> {
    const user = this.items.find((user) => user.githubId === githubId)
    if (!user) {
      return null
    }
    return user
  }

  async create(user: User): Promise<User> {
    this.items.push(user)
    return user
  }
}
