import { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase";

function AddLinkPage({ itemData, fetchData}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const subCategoryOptions = {
    Design: [
      "Tools",
      "AI",
      "Portfolios",
      "Inspiration",
      "Icons",
      "Mockups",
      "3D Assets",
      "Colors",
      "Fonts",
      "Illustrations",
      "Design Studios",
      "Product Pages",
      "Figma",
      "Design Systems",
    ],
    Development: [
      "Tools",
      "AI",
      "Frameworks",
      "Repositories",
      "Packages",
      "API",
      "Coding Info",
    ],
    Productivity: [
      "Tools",
      "AI",
      "Analytics",
      "Survey",
      "Typing",
      "Audiovisual",
      "File Sharing",
      "Job Boards",
    ],
    Learning: [
      "AI",
      "Startups",
      "Blog",
      "Resource Pages",
      "Books",
      "Documentations",
    ],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (link === "") {
      alert("Please enter a link");
      return;
    } else if (name === "") {
      alert("Please enter a name");
      return;
    } else if (mainCategory === "") {
      alert("Please enter a main category");
      return;
    } else if (subCategory === "") {
      alert("Please enter a subcategory");
      return;
    }

    setLoading(true);

    const data = { link, name, mainCategory, subCategory };
    const response = await fetch("/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      alert(result.error);
      return;
    }

    if (result) {
      setLoading(false);

      //delete the item from the unconfirmed_links database
      const { error: deleteError } = await supabase
        .from("unconfirmed_links")
        .delete()
        .eq("id", itemData.id);
      if (deleteError) console.log(deleteError);

      //update the data
      fetchData();

      console.log("link saved to database");
    } else {
      setLoading(false);
      alert("Error saving link to database.");
    }
  };

  function handleMainCategoryChange(event) {
    const value = event.target.value;
    setMainCategory(value);
    setSubCategory("");
  }

  function handleSubCategoryChange(event) {
    const value = event.target.value;
    setSubCategory(value);
  }

  return (
    //make the div a popup
      <div className="flex flex-col w-[424px] h-auto bg-[#0d0d0d] border-zinc-800 border-2 rounded-lg">
        {loading ? (
            <div className="flex flex-col h-full w-full justify-center items-center">
              <p className="text-lg font-medium text-zinc-200">Loading...</p>
              </div>) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-start items-center gap-2 p-4 border-zinc-800 border-b-2">
              <div className="origin-center rotate-45 w-3 h-3 bg-[#FC4733] rounded-sm"></div>
              <p className="text-lg font-semibold text-zinc-200">Add Link</p>
            </div>
            <div className="flex flex-col justify-start items-start p-4 gap-4">
              <div className="flex flex-row justify-between items-center w-full h-auto">
                <label
                  htmlFor="link"
                  className="text-sm font-medium text-zinc-200"
                >
                  Link
                </label>
                <input
                  type="text"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-[240px] h-8 px-2 text-sm font-medium whitespace-nowrap truncate text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded "
                />
              </div>
              <div className="flex flex-row justify-between items-center w-full h-auto">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded"
                />
              </div>
              <div className="flex flex-row justify-between items-center w-full h-auto">
                <label
                  htmlFor="mainCategory"
                  className="text-sm font-medium text-zinc-200"
                >
                  Main Category
                </label>
                <select
                  id="mainCategory"
                  value={mainCategory}
                  onChange={handleMainCategoryChange}
                  className=" w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded"
                >
                  <option value="">Select Main Category</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>
              <div className="flex flex-row justify-between items-center w-full h-auto">
                <label
                  htmlFor="subCategory"
                  className="text-sm font-medium text-zinc-200"
                >
                  Sub Category
                </label>
                <select
                  id="subCategory"
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                  className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded"
                >
                  <option value="">Select Sub Category</option>
                  {subCategoryOptions[mainCategory] &&
                    subCategoryOptions[mainCategory].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center p-4 gap-4">
              <button
                onClick={handleSubmit}
                className="w-full h-10 px-2 text-sm font-medium text-zinc-200 bg-zinc-800 rounded hover:bg-zinc-700"
              >
                Add Link
              </button>
            </div>
          </form>
        )}
        </div>
  );
}

export default AddLinkPage;