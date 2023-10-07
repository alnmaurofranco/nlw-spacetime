import { UseCase } from '@core/use-case'
import { UserRepository } from '../../repository/user-repository'
import {
  AuthenticationByGithubInput,
  AuthenticationByGithubOutput,
} from './authentication-by-github-dto'
import { ClientAdapter } from '@infra/adapter/http/client/client'
import { environment } from 'src/config/env'
import { User } from '@domain/user/enterprise/entity/user'

type GitHubAccessTokenResponse = {
  access_token: string
}

type GitHubUserData = {
  login: string
  id: number
  avatar_url: string
  name: string
}

export class AuthenticationByGithubUseCase
  implements UseCase<AuthenticationByGithubInput, AuthenticationByGithubOutput>
{
  readonly #userRepository: UserRepository
  readonly #clientAdapter: ClientAdapter

  constructor(userRepository: UserRepository, clientAdapter: ClientAdapter) {
    this.#userRepository = userRepository
    this.#clientAdapter = clientAdapter
  }

  async execute(
    input: AuthenticationByGithubInput,
  ): Promise<AuthenticationByGithubOutput> {
    const { code } = input
    const options = {
      params: {
        client_id: environment.GITHUB_CLIENT_ID,
        client_secret: environment.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    }
    const accessTokenResponse = await this.#clientAdapter.post<
      any,
      GitHubAccessTokenResponse
    >('https://github.com/login/oauth/access_token', null, options)
    const { access_token } = accessTokenResponse
    const userResponse = await this.#clientAdapter.get<GitHubUserData>(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
    const { id: githubId, name, login, avatar_url } = userResponse
    let userExisting = await this.#userRepository.findByGithubId(githubId)

    if (!userExisting) {
      const user = User.create({
        githubId,
        avatarUrl: avatar_url,
        login,
        name,
        memories: [],
      })
      userExisting = await this.#userRepository.create(user)
    }
    return {
      user: userExisting,
    }
  }
}
