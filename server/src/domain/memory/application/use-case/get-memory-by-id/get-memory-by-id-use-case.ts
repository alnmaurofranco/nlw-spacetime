import { UseCase } from '@core/use-case'
import { MemoryRepository } from '../../repository/memory-repository'
import { GetMemoryByIdInput, GetMemoryByIdOutput } from './get-memory-by-id-dto'

export class GetMemoryByIdUseCase
  implements UseCase<GetMemoryByIdInput, GetMemoryByIdOutput>
{
  readonly #memoryRepository: MemoryRepository

  constructor(memoryRepository: MemoryRepository) {
    this.#memoryRepository = memoryRepository
  }

  async execute(input: GetMemoryByIdInput): Promise<GetMemoryByIdOutput> {
    const { memoryId } = input
    const memory = await this.#memoryRepository.findById(memoryId)
    if (!memory) {
      throw new Error('Memory not found')
    }
    return {
      memory,
    }
  }
}
