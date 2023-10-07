import { UseCase } from '@core/use-case'
import { MemoryRepository } from '../../repository/memory-repository'
import { UpdateMemoryInput, UpdateMemoryOutput } from './update-memory-dto'

export class UpdateMemoryUseCase
  implements UseCase<UpdateMemoryInput, UpdateMemoryOutput>
{
  readonly #memoryRepository: MemoryRepository

  constructor(memoryRepository: MemoryRepository) {
    this.#memoryRepository = memoryRepository
  }

  async execute(input: UpdateMemoryInput): Promise<UpdateMemoryOutput> {
    const { userId, memoryId, content, coverUrl, isPublic } = input
    const memory = await this.#memoryRepository.findById(memoryId)
    if (!memory) {
      throw new Error('Memory not found')
    }
    if (memory.userId !== userId) {
      throw new Error('Forbbiden')
    }
    memory.update({
      content,
      coverUrl,
      isPublic,
    })
    await this.#memoryRepository.save(memory)
    return {}
  }
}
