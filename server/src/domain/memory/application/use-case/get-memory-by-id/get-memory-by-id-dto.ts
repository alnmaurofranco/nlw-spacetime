import { Memory } from '@domain/memory/enterprise/entity/memory'

type GetMemoryByIdInput = {
  memoryId: string
}

type GetMemoryByIdOutput = {
  memory: Memory
}

export { GetMemoryByIdInput, GetMemoryByIdOutput }
