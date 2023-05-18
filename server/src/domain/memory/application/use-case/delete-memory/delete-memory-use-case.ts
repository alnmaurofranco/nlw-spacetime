import { UseCase } from '@core/use-case'
import { MemoryRepository } from '../../repository/memory-repository'
import { DeleteMemoryInput, DeleteMemoryOutput } from './delete-memory-dto'

export class DeleteMemoryUseCase
  implements UseCase<DeleteMemoryInput, DeleteMemoryOutput>
{
  readonly #memoryRepository: MemoryRepository

  constructor(memoryRepository: MemoryRepository) {
    this.#memoryRepository = memoryRepository
  }

  async execute(input: DeleteMemoryInput): Promise<DeleteMemoryOutput> {
    const { memoryId } = input
    const memory = await this.#memoryRepository.findById(memoryId)
    if (!memory) {
      throw new Error('Memory not found')
    }
    await this.#memoryRepository.delete(memory)
    return {}
  }
}
