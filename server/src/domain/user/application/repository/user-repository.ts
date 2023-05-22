import { User } from '@domain/user/enterprise/entity/user'

export interface UserRepository {
  findByGithubId(githubId: number): Promise<User | null>
  create(user: User): Promise<User>
}
