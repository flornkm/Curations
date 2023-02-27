import chromium from "chrome-aws-lambda";
import { createClient } from "@supabase/supabase-js";

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    const puppeteer = require("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      defaultViewport: {
        width: 1280,
        height: 720,
      },
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

export default async (req, res) => {
  const { imageUrl, name, category, subcategory } = req.body;

  try {
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.goto(imageUrl);
    const imageBuffer = await page.screenshot();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const imageName = name.replace(/\s/g, "_") + ".webp";
    const { data, error } = await supabase.storage.from("images").upload(imageName, imageBuffer, {
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
