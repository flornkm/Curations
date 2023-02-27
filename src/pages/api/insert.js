import puppeteer from "puppeteer";
import { createClient } from "@supabase/supabase-js";
import https from "https";
import fs from "fs";

export default async (req, res) => {
  try {
    let { imageUrl, name, category, subcategory } = req.body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    name = name.replace(/\s/g, "_");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 700, height: 434, deviceScaleFactor: 2 });
    await page.goto(imageUrl);
    await page.screenshot({ path: "screenshot.png" });
    await browser.close();

    const image = fs.readFileSync("screenshot.png");

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${name}.webp`, image, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/webp",
        size: 434,
        width: 434,
        height: 700,
        resize: {
          fit: "cover",
          width: 434,
          height: 700,
        },
      });

    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving screenshot to database." });
    } else {
      res.status(200).json({ message: "Screenshot saved to database." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error taking screenshot." });
  }
};
