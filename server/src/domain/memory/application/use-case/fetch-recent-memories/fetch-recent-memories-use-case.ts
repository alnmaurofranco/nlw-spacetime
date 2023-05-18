import { UseCase } from '@core/use-case'
import { MemoryRepository } from '../../repository/memory-repository'
import {
  FetchRecentMemoriesInput,
  FetchRecentMemoriesOutput,
} from './fetch-recent-memories-dto'
import { Memory } from '@domain/memory/enterprise/entity/memory'

export class FetchRecentMemoriesUseCase
  implements UseCase<FetchRecentMemoriesInput, FetchRecentMemoriesOutput>
{
  readonly #memoryRepository: MemoryRepository

  constructor(memoryRepository: MemoryRepository) {
    this.#memoryRepository = memoryRepository
  }

  async execute(
    input: FetchRecentMemoriesInput,
  ): Promise<FetchRecentMemoriesOutput> {
    const recentMemories = await this.#memoryRepository.findManyRecent()
    return {
      memories: recentMemories.map((memory) => {
        return {
          id: memory.id.value,
          coverUrl: memory.coverUrl,
          excerpt: memory.excerpt(),
        }
      }) as unknown as Memory[],
    }
  }
}
