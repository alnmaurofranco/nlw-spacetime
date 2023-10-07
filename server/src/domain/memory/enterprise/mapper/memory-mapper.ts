import { Memory } from '../entity/memory'

// import { Memory as PrismaMemoryPersistenceRaw } from '@prisma/client'

export class MemoryMapper {
  static memoryPersistenceToMemoryDomain(
    persistenceRaw: PrismaMemoryPersistenceRaw,
  ): Memory {}

  static memoryDomainToMemoryPersistence(memoryDomain: Memory) {}

  static memoryPersistenceToMemoryDomainList(
    persistenceRawList: PrismaMemoryPersistenceRaw[],
  ): Memory[] {}

  static memoryDomainToMemoryPersistenceList(
    domainList: Memory[],
  ): PrismaMemoryPersistenceRaw[] {}
}
