import { createClient } from "@supabase/supabase-js";
import tinify from "tinify";

tinify.key = process.env.TINIFY_API_KEY;

async function compressImage(url) {
  try {
    const source = tinify.fromUrl(
      `https://api.curations.tech/api/screenshot?url=${encodeURIComponent(url)}`
    );

    const converted = source
      .convert({ type: ["image/webp", "image/png"] })
      .toBuffer();

    return converted;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getFavicon(url) {
  try {
    const response = await fetch(
      `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
        url
      )}`
    );
    const data = await response.buffer();
    

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async (req, res) => {
  let { link, name, mainCategory, subCategory } = req.body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const image = await compressImage(link);

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`${name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}.webp`, image, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/webp",
    });

  if (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving screenshot to database." });
  } else {
    const favicon = await getFavicon(link);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(
        `${name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}_favicon.png`,
        favicon,
        {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/png",
        }
      );

    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving screenshot to database." });
    } else {
      const { data, error } = await supabase.from("curations").insert([
        {
          name: name,
          category: mainCategory.toLowerCase(),
          subcategory: subCategory.toLowerCase(),
          image: name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase() + ".webp",
          link: link,
          favicon: name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase() + "_favicon.png",
        },
      ]);

      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error saving screenshot to database." });
      } else {
        res.status(200).json({ message: "Screenshot saved to database." });
      }
    }
  }
};
