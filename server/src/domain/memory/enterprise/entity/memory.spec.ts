import { Memory } from './memory'

describe('Memory Entity Unit Test', () => {
  it('should be able to create a memory', async () => {
    const memory = Memory.create({
      userId: 'user-123',
      coverUrl: 'https://example.com/cover.jpg',
      content: 'Lorem ipsum dolor sit amet',
    })
    expect(memory).toBeTruthy()
    expect(memory.userId).toEqual('user-123')
    expect(memory.coverUrl).toEqual('https://example.com/cover.jpg')
    expect(memory.content).toEqual('Lorem ipsum dolor sit amet')
    expect(memory.isPublic).toBeFalsy()
  })

  it('should be able to create a memory and using excerpt content', async () => {
    const content =
      'Lorem ipsum dolor sit amet is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
    const memory = Memory.create({
      userId: 'user-123',
      coverUrl: 'https://example.com/cover.jpg',
      content,
    })
    expect(memory.excerpt()).toEqual(
      'Lorem ipsum dolor sit amet is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ...',
    )
  })
})
