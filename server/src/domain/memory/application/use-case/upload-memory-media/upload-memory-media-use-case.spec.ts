let inMemoryMemoryRepository: InMemoryMemoryRepository
let sut: UplaodMemoryMediaUseCase
describe('Upload Memory Media Use Case', () => {
  beforeEach(() => {
    inMemoryMemoryRepository = new InMemoryMemoryRepository()
    sut = new UplaodMemoryMediaUseCase()
  })

  it('should be able', async () => {
    const input = {}
    const output = await sut.execute(input)
    expect(output).toBeTruthy()
  })
})
