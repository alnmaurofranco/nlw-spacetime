import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): User {
  const token = cookies().get('token')
  if (!token) {
    throw new Error('Unathenticated.')
  }
  const user: User = jwtDecode(token.value)
  return user
}
