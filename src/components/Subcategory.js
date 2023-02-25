export default function Subcategory(props) {
  return (
    <div
      className="emblaRef cursor-grab mb-10 px-6 overflow-hidden py-1"
      ref={props.emblaRef}
    >
      <div className="embla__container">
        {props.subcategoryItems.map((item, index) => {
          return (
            <div key={index} className="embla__slide">
              <div
                onClick={() => {
                  props.setSubCategory(item.name);
                  props.handleCategory(item.name);
                }}
                className={
                  "flex flex-col gap-2 place-items-center p-2 cursor-pointer transition-all hover:text-white hover:bg-zinc-900 ring-1 hover:ring-zinc-700 rounded-lg " +
                  (props.subCategory === item.name
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
  );
}
