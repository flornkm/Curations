import { createClient } from "@supabase/supabase-js";
import tinify from "tinify";

tinify.key = process.env.TINIFY_API_KEY;

async function compressImage(url) {
  try {
    const source = tinify.fromUrl(`https://api.curations.tech/api/screenshot?url=${encodeURIComponent(
      url
    )}`);

    const converted = source.convert({type:["image/webp","image/png"]}).toBuffer();

    return converted;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async (req, res) => {
  let { imageUrl, name, category, subcategory } = req.body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  name = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  const image = await compressImage(imageUrl);

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${name}.webp`, image, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/webp",
    });

  if (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving screenshot to database." });
  } else {
    const { data, error } = await supabase.from("curations").insert([
      {
        name: name,
        category: category.toLowerCase(),
        design: subcategory.toLowerCase(),
        image: name + ".webp",
        link: imageUrl,
        favicon: "test",
      },
    ]);

    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving screenshot to database." });
    } else {
      res.status(200).json({ message: "Screenshot saved to database." });
    }
  }
};
