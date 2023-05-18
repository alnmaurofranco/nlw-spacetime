import { Memory } from '@domain/memory/enterprise/entity/memory'

export interface MemoryRepository {
  findManyRecent(): Promise<Memory[]>
  findById(id: string): Promise<Memory | null>
  create(memory: Memory): Promise<void>
  delete(memory: Memory): Promise<void>
  save(memory: Memory): Promise<void>
}
