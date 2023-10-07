import { makeMemory } from '@test/factory/make-memory'
import { User } from './user'

describe('User Entity', () => {
  it('should be able to', async () => {
    const memoryOne = makeMemory()
    const memorySecond = makeMemory()
    const user = User.create({
      login: '01-johndoe',
      name: 'John Doe',
      githubId: 1234567,
      avatarUrl: 'https://link-avatar.com/avatares.png',
      memories: [memoryOne, memorySecond],
    })
    expect(user.id.value).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
    expect(user.githubId).toEqual(1234567)
    expect(user.login).toEqual('01-johndoe')
    expect(user.memories).toEqual([memoryOne, memorySecond])
  })
})
