import { apiClient } from '@/lib/axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTO = request.cookies.get('redirectTo')?.value
  const authenticationGithubResponse = await apiClient.post('/register', {
    code,
  })
  const { token } = authenticationGithubResponse.data
  const redirectURL = redirectTO ?? new URL('/', request.url)
  const ThirtyDaysInSeconds = 60 * 60 * 24 * 30
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${ThirtyDaysInSeconds}`,
    },
  })
}
