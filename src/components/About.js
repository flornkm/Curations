import Link from "next/link";
import { useEffect, useRef } from "react";
import * as Icon from "iconoir-react";

export default function Navigation(props) {
  const button = useRef();
  const buttonBorder = useRef();
  const input = useRef();
  const inputBorder = useRef();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const rectangle = button.current.getBoundingClientRect(),
        x = e.clientX - rectangle.left,
        y = e.clientY - rectangle.top;

      button.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #52525b, #3f3f46)`;
      buttonBorder.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #a1a1aa, #3f3f46)`;

      const inputRectangle = input.current.getBoundingClientRect(),
        inputX = e.clientX - inputRectangle.left,
        inputY = e.clientY - inputRectangle.top;

      input.current.style.background = `radial-gradient(circle at ${inputX}px ${inputY}px, #52525b, #3f3f46)`;
      inputBorder.current.style.background = `radial-gradient(circle at ${inputX}px ${inputY}px, #a1a1aa, #3f3f46)`;
    });
  }, []);

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
          document.body.style.overflow = "auto";
        }}
      />
      <div className="lg:w-[40%] max-lg:w-[70%] max-md:w-full max-md:border-none bg-zinc-900 border-l border-l-zinc-700 px-20 max-md:px-8 py-8 z-30 h-full flex flex-col justify-between">
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
              <div className="w-full h-12 relative">
                <input
                  ref={input}
                  type="text"
                  placeholder="Enter Link"
                  className="rounded-md absolute left-0 right-0 top-0 bottom-0 z-10 px-4 focus:outline-none transition-all focus:ring-1 focus:ring-red-500"
                />
                <div
                  ref={inputBorder}
                  type="text"
                  placeholder="Enter Link"
                  className="absolute -left-[1px] -top-[1px] -right-[1px] -bottom-[1px] rounded-[7px]"
                >
                  {" "}
                </div>
              </div>
              <div className="bg-zinc-600 px-6 font-medium py-3 rounded-md text-white hover:bg-zinc-700 relative cursor-pointer transition-all hover:scale-95">
                <div
                  ref={button}
                  className="absolute left-0 top-0 right-0 bottom-0 pointer-events-none rounded-md z-10"
                ></div>
                <div
                  ref={buttonBorder}
                  className="absolute -left-[1px] -top-[1px] -right-[1px] -bottom-[1px] pointer-events-none rounded-[7px]"
                ></div>
                <span className="z-20 relative">Submit</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex gap-4 justify-start mb-4">
            <Link
              href="https://discord.gg/EKHkxHHU"
              target="_blank"
              className="flex bg-red-500 rounded-lg p-2 cursor-pointer transition-all hover:opacity-80"
            >
              <Icon.Discord fontSize={16} />
            </Link>
            <Link
              href="https://twitter.com/curationshq"
              target="_blank"
              className="flex bg-red-500 rounded-lg p-2 cursor-pointer transition-all hover:opacity-80"
            >
              <Icon.Twitter fontSize={16} />
            </Link>
            <Link
              href="https://github.com/floriandwt/Curations"
              target="_blank"
              className="flex bg-red-500 rounded-lg p-2 cursor-pointer transition-all hover:opacity-80"
            >
              <Icon.GitHub fontSize={16} />
            </Link>
          </div>
          <p className="text-zinc-600">
            Built by{" "}
            <Link
              className="transition-all hover:text-zinc-500"
              href="https://www.antonstallboerger.com/"
              target="_blank"
            >
              Anton
            </Link>
            ,{" "}
            <Link
              className="transition-all hover:text-zinc-500"
              href="https://www.nilseller.com/"
              target="_blank"
            >
              Nils
            </Link>{" "}
            and{" "}
            <Link
              className="transition-all hover:text-zinc-500"
              href="https://designwithtech.com/"
              target="_blank"
            >
              Flo
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
