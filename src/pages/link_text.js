import UnconfirmedLink from '../components/UnconfirmedLink'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center items-start p-4 w-screen h-auto border-b-2 border-zinc-800">
        <Image src="../images/curations_logo.png" alt="Curations Logo" width={120} height={24} />
      </div>
      <div className="flex flex-row justfiy-start items-start w-100 h-100">
        <div className="flex flex-col justify-start items-center w-auto h-screen border-r-2 border-zinc-800">
          <div className="flex flex-col justify-center items-start p-4 gap-1 w-auto h-auto border-b-2 border-zinc-800">
            <p className="text-base font-semibold">Admin Panel</p>
            <p className="text-sm font-regular text-zinc-500">nils.eller@hfg.design</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-100 h-100">
          <div className="flex flex-col justify-center items-start p-4 gap-1 w-screen h-auto border-b-2 border-zinc-800">
            <p className="text-sm font-regular text-zinc-500">Curations / Link list</p>
            <p className="text-base font-semibold">Link list</p>
          </div>
          <UnconfirmedLink />
        </div>
      </div>
    </div>
  )
}
