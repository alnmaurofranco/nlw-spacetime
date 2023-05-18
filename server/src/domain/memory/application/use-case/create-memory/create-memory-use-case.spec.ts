import { InMemoryMemoryRepository } from '@infra/database/repository/in-memory/in-memory-memory-repository'
import { CreateMemoryUseCase } from './create-memory-use-case'

let inMemoryMemoryRepository: InMemoryMemoryRepository
let sut: CreateMemoryUseCase
describe('Create Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoryRepository = new InMemoryMemoryRepository()
    sut = new CreateMemoryUseCase(inMemoryMemoryRepository)
  })

  it('should be able to create memory', async () => {
    const input = {
      isPublic: false,
      content:
        'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
      coverUrl: 'https://johndoe.com.br/url',
      userId: 'user-1',
    }
    const output = await sut.execute(input)
    expect(output).toBeTruthy()
    expect(inMemoryMemoryRepository.items[0].userId).toEqual('user-1')
  })
})
