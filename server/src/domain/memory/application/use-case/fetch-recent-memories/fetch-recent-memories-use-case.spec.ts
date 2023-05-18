import { InMemoryMemoryRepository } from '@infra/database/repository/in-memory/in-memory-memory-repository'
import { FetchRecentMemoriesUseCase } from './fetch-recent-memories-use-case'
import { makeMemory } from '@test/factory/make-memory'

let inMemoryMemoryRepository: InMemoryMemoryRepository
let sut: FetchRecentMemoriesUseCase
describe('Fetch Recent Memories Use Case', () => {
  beforeEach(() => {
    inMemoryMemoryRepository = new InMemoryMemoryRepository()
    sut = new FetchRecentMemoriesUseCase(inMemoryMemoryRepository)
  })

  it('should be able to fetch recent memories', async () => {
    const memoryOne = makeMemory()
    const memoryTwo = makeMemory()
    await inMemoryMemoryRepository.create(memoryOne)
    await inMemoryMemoryRepository.create(memoryTwo)
    const input = {}
    const output = await sut.execute(input)
    expect(output.memories).toHaveLength(2)
    expect(output.memories).toEqual(
      expect.arrayContaining([
        {
          coverUrl: memoryOne.coverUrl,
          id: memoryOne.id.value,
          excerpt: expect.any(String),
        },
        {
          coverUrl: memoryTwo.coverUrl,
          id: memoryTwo.id.value,
          excerpt: expect.any(String),
        },
      ]),
    )
  })
})
