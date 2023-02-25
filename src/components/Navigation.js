import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as Icon from "iconoir-react";
import useEmblaCarousel from "embla-carousel-react";

export default function Navigation(props) {
  const mainNavigation = {
    all: useRef(),
    design: useRef(),
    development: useRef(),
    productivity: useRef(),
    learning: useRef(),
  };
  const rect = useRef();
  const imgLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const [subCategory, setSubCategory] = useState("All");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 0,
    dragFree: true,
  });   

  const handleCategory = (itemName) => {
    setSubCategory(itemName);
  }

  const designCategory = [
    {
      name: "All",
      icon: <Icon.Globe />,
    },
    {
      name: "Tools",
      icon: <Icon.Tools />,
    },
    {
      name: "Portfolios",
      icon: <Icon.User />,
    },
    {
      name: "Inspiration",
      icon: <Icon.LightBulb />,
    },
    {
      name: "Icons",
      icon: <Icon.Iconoir />,
    },
    {
      name: "Mockups",
      icon: <Icon.Laptop />,
    },
    {
      name: "3D Assets",
      icon: <Icon.Axes />,
    },
    {
      name: "Colors",
      icon: <Icon.ColorWheel />,
    },
    {
      name: "Fonts",
      icon: <Icon.Type />,
    },
    {
      name: "Illustrations",
      icon: <Icon.DesignPencil />,
    },
    {
      name: "Design Studios",
      icon: <Icon.Building />,
    },
    {
      name: "Product Pages",
      icon: <Icon.ShoppingBag />,
    },
    {
      name: "Figma",
      icon: <Icon.Figma />,
    },
    {
      name: "Design Systems",
      icon: <Icon.SystemRestart />,
    },
  ];

  const handleNavigation = (e) => {
    const target = e.target;
    const targetPos = target.offsetLeft;
    const targetWidth = target.offsetWidth;

    rect.current.style.transform = `translateX(${targetPos}px)`;
    rect.current.style.width = `${targetWidth}px`;

    props.setCategory({ category: target.innerText.toLowerCase() });
  };

  return (
    <>
      <div className="w-full flex justify-between px-[2%] h-24 place-items-center">
        <Link href="/">
          <Image
            loader={imgLoader}
            src="/images/curations_logo.png"
            alt="Curations Logo"
            className="max-h-7 object-contain object-left"
            width={200}
            height={200}
          />
        </Link>
        <div
          ref={props.navigation}
          className="flex place-items-center p-1 rounded-full ring-1 z-50 ring-zinc-800 text-sm font-medium text-white fixed translate-x-[-50%] left-[50%] bg-[#0D0D0D] max-lg:w-[90%] max-lg:justify-between max-lg:translate-y-16 transition-all duration-100"
        >
          <div
            ref={mainNavigation.all}
            onClick={(e) => handleNavigation(e)}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full max-md:hidden"
          >
            All
          </div>
          <div
            ref={mainNavigation.design}
            onClick={(e) => handleNavigation(e)}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
          >
            Design
          </div>
          <div
            ref={mainNavigation.development}
            onClick={(e) => handleNavigation(e)}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
          >
            Development
          </div>
          <div
            ref={mainNavigation.productivity}
            onClick={(e) => handleNavigation(e)}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 max-md:text-sm hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
          >
            Productivity
          </div>
          <div
            ref={mainNavigation.learning}
            href="/learning"
            onClick={(e) => handleNavigation(e)}
            className="z-10 cursor-pointer px-4 py-2 max-md:px-2 hover:bg-zinc-800 hover:bg-opacity-50 transition-all rounded-full"
          >
            Learning
          </div>
          <div
            ref={rect}
            className={
              "transition-all h-9 w-12 bg-zinc-800 rounded-full absolute z-0 left-0 duration-300 translate-x-1 max-md:w-16"
            }
          />
        </div>
        <Icon.Plus
          className="bg-white rounded-full p-0.5 cursor-pointer text-black transition-all hover:opacity-80 z-50 duration-700"
          fontSize={24}
          ref={props.plusIcon}
          onClick={() => {
            if (
              props.sidebarWrapper.current.classList.contains("opacity-0") &&
              props.sidebarWrapper.current.classList.contains(
                "translate-x-[100%]"
              )
            ) {
              props.sidebarWrapper.current.classList.remove("opacity-0");
              props.sidebarWrapper.current.classList.remove(
                "translate-x-[100%]"
              );
              props.plusIcon.current.classList.add("rotate-45");
            } else {
              props.sidebarWrapper.current.classList.add("opacity-0");
              props.sidebarWrapper.current.classList.add("translate-x-[100%]");
              props.plusIcon.current.classList.remove("rotate-45");
            }
          }}
        />
      </div>
      {props.category.category === "design" && (
        <div
          className="emblaRef cursor-grab mb-10 px-6 overflow-hidden py-1"
          ref={emblaRef}
        >
          <div className="embla__container">
            {designCategory.map((item, index) => {
              return (
                <div key={index} className="embla__slide">
                  <div
                    onClick={() => {
                      handleCategory(item.name);
                    }}
                    className={
                      "flex flex-col gap-2 place-items-center p-2 cursor-pointer transition-all hover:text-white hover:bg-zinc-900 ring-1 hover:ring-zinc-700 rounded-lg " +
                      (subCategory === item.name
                        ? "ring-zinc-700 bg-zinc-900 text-white"
                        : "text-zinc-400 ring-zinc-800")
                    }
                  >
                    <div>{item.icon}</div>
                    <p className="text-sm font-medium">{item.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
