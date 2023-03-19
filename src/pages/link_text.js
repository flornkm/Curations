import UnconfirmedLink from '../components/UnconfirmedLink'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center items-start w-screen p-1 h-auto border-b-2 border-zinc-800">
        <Image src="/images/curations_logo.png" alt="Curations Logo" width={120} height={24} />
      </div>
        <div className="flex flex-col justify-center items-center w-auto h-100">
          <p className="text-2xl font-bold">Unconfirmed Links</p>
        </div>
        <UnconfirmedLink />
    </div>
  )
}
