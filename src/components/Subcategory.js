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
          <button className="embla__prev" onClick={props.scrollPrev} className="absolute p-1 rounded-full z-10 bg-white text-black left-0 top-[50%] translate-y-[-50%]">
            <ArrowLeft />
          </button>
        )}
        {props.canScrollNext && (
          <button className="embla__next" onClick={props.scrollNext} className="absolute p-1 rounded-full z-10 bg-white text-black right-0 top-[50%] translate-y-[-50%]">
            <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
