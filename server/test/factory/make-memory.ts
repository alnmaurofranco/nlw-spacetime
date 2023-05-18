import { faker } from '@faker-js/faker'
import { Memory } from '@domain/memory/enterprise/entity/memory'

type MakeMemoryOverride = Partial<Memory>

export function makeMemory(override: MakeMemoryOverride = {}): Memory {
  const memory = Memory.create({
    content: faker.lorem.lines(),
    coverUrl: faker.image.url(),
    isPublic: false,
    userId: 'user-1',
    createdAt: faker.date.future(),
    ...override,
  })
  return memory
}
