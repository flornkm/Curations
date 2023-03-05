import { useState, useRef, useEffect } from "react";

const SaveScreenshotForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const button = useRef();
  const buttonBorder = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === "") {
      alert("Please enter a name");
      return;
    } else if (category === "") {
      alert("Please enter a category");
      return;
    } else if (subcategory === "") {
      alert("Please enter a subcategory");
      return;
    } else if (imageUrl === "") {
      alert("Please enter an image URL");
      return;
    }

    setLoading(true);
    const data = { name, category, subcategory, imageUrl };
    const response = await fetch("/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    
    if (result) {
      setLoading(false);
    } else {
      setLoading(false);
      alert("Error saving screenshot to database.");
    }
  };

  useEffect(() => {
    if (!loading) {
      document.addEventListener("mousemove", (e) => {
        const rectangle = button.current.getBoundingClientRect(),
          x = e.clientX - rectangle.left,
          y = e.clientY - rectangle.top;

        button.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #52525b, #3f3f46)`;
        buttonBorder.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #a1a1aa, #3f3f46)`;
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center justify-center">
      <h1 className="mb-4 text-2xl font-medium">Curations Tool Inserter</h1>
        <div className={"flex justify-center place-items-center " + (loading && "pointer-events-none")}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row place-items-center gap-4">
              <label htmlFor="name" className="w-24">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="rounded-md bg-zinc-600 p-2 ring-1 ring-zinc-500 focus:outline-none transition-all focus:ring-1 focus:ring-red-500 w-64"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <br></br>
            <div className="flex flex-row place-items-center gap-4">
              <label htmlFor="category" className="w-24">
                Category
              </label>
              <input
                type="text"
                id="category"
                className="rounded-md bg-zinc-600 p-2 ring-1 ring-zinc-500 focus:outline-none transition-all focus:ring-1 focus:ring-red-500 w-64"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
            <br></br>
            <div className="flex flex-row place-items-center gap-4">
              <label htmlFor="subcategory" className="w-24">
                Subcategory
              </label>
              <input
                type="text"
                id="subcategory"
                className="rounded-md bg-zinc-600 p-2 ring-1 ring-zinc-500 focus:outline-none transition-all focus:ring-1 focus:ring-red-500 w-64"
                value={subcategory}
                onChange={(event) => setSubcategory(event.target.value)}
              />
            </div>
            <br></br>
            <div className="flex flex-row place-items-center gap-4">
              <label htmlFor="imageUrl" className="w-24">
                Site URL
              </label>
              <input
                type="text"
                id="imageUrl"
                className="rounded-md bg-zinc-600 p-2 ring-1 ring-zinc-500 focus:outline-none transition-all focus:ring-1 focus:ring-red-500 w-64"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />
            </div>
            <div
              onClick={handleSubmit}
              className="bg-zinc-600 px-6 mt-10 font-medium py-3 rounded-md text-white hover:bg-zinc-700 relative cursor-pointer"
            >
              <div
                ref={button}
                className="absolute left-0 top-0 right-0 bottom-0 pointer-events-none rounded-md z-10"
              ></div>
              <div
                ref={buttonBorder}
                className="absolute -left-[1px] -top-[1px] -right-[1px] -bottom-[1px] pointer-events-none rounded-[7px]"
              ></div>
              <span className="z-20 relative flex justify-center">Submit</span>
            </div>
          </form>
        </div>
    </div>
  );
};

export default SaveScreenshotForm;
