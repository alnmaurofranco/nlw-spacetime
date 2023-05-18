import { MemoryRepository } from '@domain/memory/application/repository/memory-repository'
import { Memory } from '@domain/memory/enterprise/entity/memory'

export class InMemoryMemoryRepository implements MemoryRepository {
  public items: Memory[]

  constructor() {
    this.items = []
  }

  async findManyRecent(): Promise<Memory[]> {
    const memories = this.items.sort((memoryA, memoryB) => {
      return memoryB.createdAt < memoryA.createdAt ? -1 : 1
    })
    return memories
  }

  async findById(id: string): Promise<Memory | null> {
    const memory = this.items.find((memory) => memory.id.value === id)
    if (!memory) {
      return null
    }
    return memory
  }

  async create(memory: Memory): Promise<void> {
    this.items.push(memory)
  }

  async delete(memory: Memory): Promise<void> {
    const memoryIndex = this.items.findIndex(
      (memoryFind) => memoryFind.id.value === memory.id.value,
    )
    if (memoryIndex < -1) {
      return
    }
    this.items.splice(memoryIndex, 1)
  }

  async save(memory: Memory): Promise<void> {
    const memoryIndex = this.items.findIndex(
      (memoryFind) => memoryFind.id.value === memory.id.value,
    )
    if (memoryIndex < -1) {
      return
    }
    this.items[memoryIndex] = memory
  }
}
