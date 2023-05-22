import Link from 'next/link'
import logoSpacetime from '../../assets/logo-spacetime.svg'

import Image from 'next/image'

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={logoSpacetime} alt="Logo Spacetime" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="font-alt inline-block rounded-full bg-green-500 px-5 py-3 uppercase leading-none text-black hover:bg-green-600"
      >
        Cadastrar Lembraça
      </Link>
    </div>
  )
}
