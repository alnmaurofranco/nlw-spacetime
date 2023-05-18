import { InMemoryMemoryRepository } from '@infra/database/repository/in-memory/in-memory-memory-repository'
import { makeMemory } from '@test/factory/make-memory'
import { GetMemoryByIdUseCase } from './get-memory-by-id-use-case'

let inMemoryMemoryRepository: InMemoryMemoryRepository
let sut: GetMemoryByIdUseCase
describe('Get Memory By Id Use Case', () => {
  beforeEach(() => {
    inMemoryMemoryRepository = new InMemoryMemoryRepository()
    sut = new GetMemoryByIdUseCase(inMemoryMemoryRepository)
  })

  it('should be able to get memory by id', async () => {
    const memory = makeMemory()
    await inMemoryMemoryRepository.create(memory)
    const input = {
      memoryId: memory.id.value,
    }
    const output = await sut.execute(input)
    expect(output.memory).toBeTruthy()
    expect(output.memory.isPublic).toBeFalsy()
  })

  it('should not be able to get memory by id with memory does not existing', async () => {
    const input = {
      memoryId: 'memory-does-not-exisiting',
    }
    await expect(async () => sut.execute(input)).rejects.toThrow(
      'Memory not found',
    )
  })
})
