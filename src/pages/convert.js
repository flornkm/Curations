import { useState, useRef, useEffect } from "react";
import * as Icon from "iconoir-react";
import curations from "./curations.json";

const SaveScreenshotForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
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

  return (
    <div className="w-screen h-screen flex flex-col items-center flex-nowrap gap-2 text-white pt-10">
      {curations.map((curation) => (
        <div className="flex gap-5 justify-left p-2 bg-zinc-800 rounded-lg items-center w-[50%] justify-between">
          <p className="text-md font-bold">{curation.name}</p>
          <p>{curation.link}</p>
          <p>{curations.category}</p>
          <Icon.Check
            className="cursor-pointer text-green-500 p-1 transition-all hover:bg-zinc-700 rounded-lg"
            fontSize={28}
            onClick={() => {
              console.log(curation.name, curation.category, curation.link);
              setName(curation.name);
              setCategory(curation.category);
              setSubcategory("insert");
              const link = curation.link.split("?")[0];
              setImageUrl(link);

              handleSubmit();
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SaveScreenshotForm;
