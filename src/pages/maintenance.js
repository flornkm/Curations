import Head from "next/head";
import * as Icon from "iconoir-react";
import { useRef, useEffect } from "react";
import { Inter } from "@next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function Maintenance() {
  const border = useRef();
  const rect = useRef();
  const blur = useRef();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const rectangle = rect.current.getBoundingClientRect(),
        x = e.clientX - rectangle.left,
        y = e.clientY - rectangle.top;

      rect.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #220000, #000000)`;
      border.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #990000, #000000)`;
      blur.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #550000, #000000)`;
    });
  }, []);

  return (
    <>
      <Head>
        <title>Curations - Stunning Tools, served daily</title>
        <meta name="description" content="Curations is a collection of tools and inspiration for designers and developers. Discover new resources and stay up-to-date with the latest trends." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <main className="px-[5%] w-screen h-screen relative overflow-hidden">
        <div className="absolute z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div
            ref={rect}
            className="absolute z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-45 opacity-50"
          >
            <div className="h-96 w-[768px] bg-red rounded-[48px] bg-zinc-900 rotate-90 relative translate-x-[-25%] translate-y-[50%]" />
            <div className="h-96 w-[768px] bg-red rounded-[48px] bg-zinc-900" />
          </div>
          <div className="absolute left-80">
            <div
              ref={rect}
              className="h-80 w-80 rotate-45 bg-black bg-opacity-50 absolute z-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[48px]"
            />
            <div
              ref={border}
              className="h-[322px] w-[322px] rotate-45 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[48px]"
            />
            <div
              ref={blur}
              className="h-[350px] w-[350px] bg-red-900 rotate-45 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[48px] blur-[128px]"
            />
          </div>
        </div>
        <h1 className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl font-bold z-20">
          Maintenance
        </h1>
      </main>
    </>
  );
}
