import { getUser } from '@/lib/auth'

import Image from 'next/image'
import Link from 'next/link'

export function Profile() {
  const user = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        className="h-10 w-10 rounded-full"
        src={user.avatarUrl}
        alt={user.name}
        width={40}
        height={40}
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {user.name}
        <Link
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Quero sair
        </Link>
      </p>
    </div>
  )
}
