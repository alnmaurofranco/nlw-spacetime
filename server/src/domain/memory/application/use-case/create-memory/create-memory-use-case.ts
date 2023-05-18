import { UseCase } from '@core/use-case'
import { MemoryRepository } from '../../repository/memory-repository'
import { CreateMemoryInput, CreateMemoryOutput } from './create-memory-dto'
import { Memory } from '@domain/memory/enterprise/entity/memory'

export class CreateMemoryUseCase
  implements UseCase<CreateMemoryInput, CreateMemoryOutput>
{
  readonly #memoryRepository: MemoryRepository

  constructor(memoryRepository: MemoryRepository) {
    this.#memoryRepository = memoryRepository
  }

  async execute(input: CreateMemoryInput): Promise<CreateMemoryOutput> {
    const { content, coverUrl, isPublic, userId } = input
    const memoryOrError = Memory.create({
      content,
      coverUrl,
      userId,
      isPublic,
    })
    await this.#memoryRepository.create(memoryOrError)
    return {}
  }
}
