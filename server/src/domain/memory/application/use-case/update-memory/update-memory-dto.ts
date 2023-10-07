type UpdateMemoryInput = {
  userId: string
  memoryId: string
  content: string
  isPublic: boolean
  coverUrl: string
}

type UpdateMemoryOutput = {}

export { UpdateMemoryInput, UpdateMemoryOutput }
