import { useState } from "react";

const SaveScreenshotForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, category, subcategory, imageUrl };
    const response = await fetch("/api/save-screenshot", {
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
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
      </div>
      <button type="submit">Save Screenshot</button>
    </form>
  );
};

export default SaveScreenshotForm;
