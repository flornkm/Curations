import { useRouter } from "next/router";

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
                    router.push(
                      {
                        pathname: "/",
                        query: {
                          category: props.category.category,
                          subcategory: item.name.toLowerCase(), 
                        }
                      },
                      undefined,
                      { shallow: true }
                    );

                  }}
                  className={
                    "flex flex-col gap-2 place-items-center p-2 cursor-pointer transition-all hover:text-white hover:bg-zinc-900 ring-1 hover:ring-zinc-700 rounded-lg " +
                    (props.subCategory.toLowerCase() === item.name.toLowerCase()
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
    </div>
  );
}
