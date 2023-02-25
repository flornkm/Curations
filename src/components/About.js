import Link from "next/link";
import * as Icon from "iconoir-react";

export default function Navigation(props) {
  return (
    <div
      ref={props.sidebarWrapper}
      className="fixed z-40 top-0 right-0 bottom-0 w-full flex transition-all duration-700 opacity-0 translate-x-[100%]"
    >
      <div
        className="flex-grow max-md:hidden"
        onClick={() => {
          props.sidebarWrapper.current.classList.add("opacity-0");
          props.sidebarWrapper.current.classList.add("translate-x-[100%]");
          props.plusIcon.current.classList.remove("rotate-45");
        }}
      />
      <div className="lg:w-[40%] max-lg:w-[70%] max-md:w-full bg-zinc-900 border-l border-l-zinc-700 px-20 py-8 z-30 h-full flex flex-col justify-between">
        <div>
          <div className="flex w-full justify-between place-items-center mb-6">
            <h2 className="text-2xl font-semibold">About</h2>
          </div>

          <p className="text-zinc-400 mb-10">
            Curations was founded with one purpose in mind: Enable Designers and
            Developers to elevate their work by providing the best resources
            possible. This is a free open source project and we would love you
            to be part of this. If you know any helpful resources, just submit
            them below.
          </p>
          <div className="bg-zinc-800 p-6 rounded-xl">
            <div className="flex justify-left items-center gap-3">
              <div className="bg-red-500 h-3 w-3 rounded-sm rotate-45"></div>
              <h3 className="font-medium text-lg">Submit resource</h3>
            </div>
            <p className="text-white mt-2 mb-6">
              Each link will be reviewed by us before implementation
            </p>
            <div className="w-full flex justify-between gap-2">
              <input
                type="text"
                placeholder="Enter Link"
                className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-4 py-3 focus:outline-red-400"
              />
              <button className="bg-zinc-600 px-6 font-medium py-3 rounded-md text-white transition-all hover:bg-zinc-700">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex gap-4 justify-start mb-4">
            <Link
              href="https://discord.gg/EKHkxHHU"
              target="_blank"
              className="flex bg-red-500 rounded-lg p-1 cursor-pointer transition-all hover:opacity-80"
            >
              <Icon.Discord fontSize={16} />
            </Link>
            <Link
              href="https://twitter.com/curationshq"
              target="_blank"
              className="flex bg-red-500 rounded-lg p-1 cursor-pointer transition-all hover:opacity-80"
            >
              <Icon.Twitter fontSize={16} />
            </Link>
            <Link
              href="https://github.com/floriandwt/Curations"
              target="_blank"
              className="flex bg-red-500 rounded-lg p-1 cursor-pointer transition-all hover:opacity-80"
            >
              <Icon.GitHub fontSize={16} />
            </Link>
          </div>
          <p className="text-zinc-600">Built by <Link className="transition-all hover:text-zinc-500" href="https://www.antonstallboerger.com/" target="_blank">Anton</Link>, <Link className="transition-all hover:text-zinc-500" href="https://www.nilseller.com/" target="_blank">Nils</Link> and <Link className="transition-all hover:text-zinc-500" href="https://designwithtech.com/" target="_blank">Flo</Link>.</p>
        </div>
      </div>
    </div>
  );
}
