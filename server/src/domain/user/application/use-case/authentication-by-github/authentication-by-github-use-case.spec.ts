import { InMemoryUserRepository } from '@test/repository/database/in-memory/in-memory-user-repository'
import { AuthenticationByGithubUseCase } from './authentication-by-github-use-case'
import { InMemoryClientAdapter } from '@test/adapter/http/in-memory-client-adapter'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryClientAdapters: InMemoryClientAdapter
let sut: AuthenticationByGithubUseCase
describe('AuthenticationByGithub Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryClientAdapters = new InMemoryClientAdapter()
    sut = new AuthenticationByGithubUseCase(
      inMemoryUserRepository,
      inMemoryClientAdapters,
    )
  })

  it('should be able', async () => {
    const input = {
      code: '123321213',
    }
    const output = await sut.execute(input)
    expect(output).toBeTruthy()
  })
})
