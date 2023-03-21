import UnconfirmedLink from "../components/UnconfirmedLink";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden overflow-x-hidden">
        <div className="flex flex-col justify-center items-start p-4 w-full h-auto border-b-2 border-zinc-800">
          <Image
            src="/images/curations_logo.png"
            alt="Curations Logo"
            width={120}
            height={24}
          />
        </div>

      <div className="flex flex-row justfiy-start items-start w-100 h-100">

        <div className="flex flex-col justify-start items-start min-w-100 h-[calc(100vh-2rem)] whitespace-nowrap border-r-2 border-zinc-800">
          <div className="flex flex-col justify-center items-start p-4 gap-1 w-full h-auto border-b-2 border-zinc-800">
            <p className="text-base font-semibold">Admin Panel</p>
            <p className="text-sm font-regular text-zinc-500">
              nils.eller@hfg.design
            </p>
          </div>
          
          <div className="flex flex-col justify-start items-start p-4 gap-2 w-auto h-100">
            <div className="flex px-4 py-1 border-l-2 border-white">
              <p className="text-base font-semibold">Link list</p>
            </div>
            <div className="flex px-4 py-1">
              <p className="text-base font-semibold text-zinc-600">Add link</p>
            </div>
            <div className="flex px-4 py-1">
              <p className="text-base font-semibold text-zinc-600">Add component</p>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col justify-start items-start w-100 h-100 overflow-hidden">
          <div className="flex flex-col justify-center items-start p-4 gap-1 w-full h-auto border-b-2 border-zinc-800">
            <p className="text-sm font-regular text-zinc-500">
              Curations / Link list
            </p>
            <p className="text-base font-semibold">Link list</p>
          </div>
          <div className="h-[calc(100vh-8rem)] overflow-y-auto">
            <UnconfirmedLink />
          </div>
        </div>
      </div>

    </div>
  );
}
