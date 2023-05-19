import { InMemoryMemoryRepository } from '@test/repository/database/in-memory/in-memory-memory-repository'
import { UpdateMemoryUseCase } from './update-memory-use-case'
import { makeMemory } from '@test/factory/make-memory'

let inMemoryMemoryRepository: InMemoryMemoryRepository
let sut: UpdateMemoryUseCase
describe('Update Memory Use Case', () => {
  beforeEach(() => {
    inMemoryMemoryRepository = new InMemoryMemoryRepository()
    sut = new UpdateMemoryUseCase(inMemoryMemoryRepository)
  })

  it('should be able to update memory', async () => {
    const memory = makeMemory()
    await inMemoryMemoryRepository.create(memory)
    const input = {
      memoryId: memory.id.value,
      isPublic: true,
      coverUrl: 'https://linking-image.com.br/images.png',
      content:
        'is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
    }
    const output = await sut.execute(input)
    expect(output).toBeTruthy()
    expect(inMemoryMemoryRepository.items[0].isPublic).toEqual(true)
    expect(inMemoryMemoryRepository.items[0].coverUrl).toEqual(
      'https://linking-image.com.br/images.png',
    )
  })

  it('should not be able to update memory with memory does not existing', async () => {
    const input = {
      memoryId: 'memory-does-not-exisiting',
      isPublic: true,
      coverUrl: 'https://linking-image.com.br/images.png',
      content:
        'is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
    }
    await expect(async () => sut.execute(input)).rejects.toThrow(
      'Memory not found',
    )
  })
})
