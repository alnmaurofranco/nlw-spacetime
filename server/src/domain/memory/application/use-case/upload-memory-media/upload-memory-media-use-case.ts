import { UseCase } from '@core/use-case'
import { MemoryRepository } from '../../repository/memory-repository'
import {
  UploadMemoryMediaInput,
  UploadMemoryMediaOutput,
} from './upload-memory-media-dto'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export class UploadMemoryMediaUseCase
  implements UseCase<UploadMemoryMediaInput, UploadMemoryMediaOutput>
{
  readonly #memoryRepository: MemoryRepository

  constructor(memoryRepository: MemoryRepository) {
    this.#memoryRepository = memoryRepository
  }

  async execute(
    input: UploadMemoryMediaInput,
  ): Promise<UploadMemoryMediaOutput> {
    const { file, fullURL } = input
    if (!file) {
      throw new Error('file does not exist')
    }
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const hasValidFileFormat = mimeTypeRegex.test(file.mimetype)
    if (!hasValidFileFormat) {
      throw new Error('file extension not supported')
    }
    const fileId = randomUUID()
    const extension = extname(file.filename)
    const fileName = fileId.concat(extension)
    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', 'uploads', fileName),
    )
    await pump(file.file, writeStream)
    const fileURL = new URL(`/uploads/${fileName}`, fullURL).toString()
    return {
      fileURL,
    }
  }
}
