import { InMemoryMemoryRepository } from '@test/repository/database/in-memory/in-memory-memory-repository'
import { DeleteMemoryUseCase } from './delete-memory-use-case'
import { makeMemory } from '@test/factory/make-memory'

let inMemoryMemoryRepository: InMemoryMemoryRepository
let sut: DeleteMemoryUseCase
describe('Delete Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoryRepository = new InMemoryMemoryRepository()
    sut = new DeleteMemoryUseCase(inMemoryMemoryRepository)
  })

  it('should be able to delete memory', async () => {
    const memory = makeMemory()
    await inMemoryMemoryRepository.create(memory)

    const input = {
      memoryId: memory.id.value,
    }
    await sut.execute(input)
    expect(inMemoryMemoryRepository.items).toHaveLength(0)
  })

  it('should not be able to delete memory with memory does not existing', async () => {
    const input = {
      memoryId: 'memory-does-not-exisiting',
    }
    await expect(async () => sut.execute(input)).rejects.toThrow(
      'Memory not found',
    )
  })
})
