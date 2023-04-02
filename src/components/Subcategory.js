import { useRouter } from "next/router";
import { ArrowRight, ArrowLeft } from "iconoir-react";

export default function Subcategory(props) {
  const router = useRouter();

  return (
    <div className="relative">
      <div
        className="emblaRef cursor-grab mb-10 px-8 max-md:px-1 overflow-hidden py-1 max-lg:mt-16"
        ref={props.emblaRef}
      >
        <div className="embla__container">
          {props.subcategoryItems.map((item, index) => {
            return (
              <div key={index} className="embla__slide">
                <div
                  onClick={() => {
                    props.setSubCategory(item.name);
                    if (item.name.includes(" ")) {
                      item.name = item.name.replace(/ /g, "-");
                    }
                    props.handleCategory(props.category.category, item.name);
                    if (item.name.toLowerCase() !== "all") {
                      router.push(
                        {
                          pathname: "/",
                          query: {
                            category: props.category.category,
                            subcategory: item.name.toLowerCase(),
                          },
                        },
                        undefined,
                        { shallow: true }
                      );
                    } else {
                      router.push(
                        {
                          pathname: "/",
                          query: {
                            category: props.category.category,
                          },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }
                  }}
                  className={
                    "flex flex-col gap-2 place-items-center p-2 cursor-pointer transition-all hover:text-white " +
                    (props.subCategory.toLowerCase() === item.name.toLowerCase()
                      ? "border-b border-white text-white"
                      : "border-b border-transparent text-zinc-400")
                  }
                >
                  <div>{item.icon}</div>
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        {props.canScrollPrev && (
          <div className="absolute z-10 left-0 w-40 pointer-events-none top-0 bottom-0 flex items-center justify-start bg-gradient-to-r from-[#0D0D0D] to-zinc-900/0">
            <button onClick={props.scrollPrev} className="embla__prev p-1 rounded-full z-10 bg-white text-black pointer-events-auto transition-all hover:opacity-75">
              <ArrowLeft strokeWidth="2" />
            </button>
          </div>
        )}
        {props.canScrollNext && (
          <div className="absolute z-10 right-0 w-40 pointer-events-none top-0 bottom-0 flex items-center justify-end bg-gradient-to-r from-zinc-900/0 to-[#0D0D0D]">
            <button onClick={props.scrollNext} className="embla__next p-1 rounded-full z-10 bg-white text-black pointer-events-auto transition-all hover:opacity-75">
              <ArrowRight strokeWidth="2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
