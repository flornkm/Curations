import { useState } from "react";

const SaveScreenshotForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, category, subcategory, imageUrl };
    const response = await fetch("/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="text-black"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          className="text-black"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="subcategory">Subcategory:</label>
        <input
          type="text"
          id="subcategory"
          className="text-black"
          value={subcategory}
          onChange={(event) => setSubcategory(event.target.value)}
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          className="text-black"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
      </div>
      <button type="submit">Save Screenshot</button>
    </form>
  );
};

export default SaveScreenshotForm;
