import { Memory } from '@domain/memory/enterprise/entity/memory'

type FetchRecentMemoriesInput = {}

type FetchRecentMemoriesOutput = {
  memories: Memory[]
}

export { FetchRecentMemoriesInput, FetchRecentMemoriesOutput }
