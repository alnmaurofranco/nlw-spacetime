import { User } from '@domain/user/enterprise/entity/user'

type AuthenticationByGithubInput = {
  code: string
}

type AuthenticationByGithubOutput = {
  user: User
}

export { AuthenticationByGithubInput, AuthenticationByGithubOutput }
