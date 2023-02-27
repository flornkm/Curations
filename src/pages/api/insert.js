import chromium from "chrome-aws-lambda";
import { createClient } from "@supabase/supabase-js";
import https from "https";

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

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
  let browser = null;
  let { imageUrl, name, category, subcategory } = req.body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  name = name.replace(/\s/g, "_");

  try {
    browser = await getBrowserInstance();
    let page = await browser.newPage();
    await page.goto(imageUrl);
    const imageBuffer = await page.screenshot();

    const image = "uploaded_on_" + Date.now() + ".jpg";

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${name}.webp`, imageBuffer, {
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
      res
        .status(500)
        .json({ message: "Error saving screenshot to database." });
    } else {
      res.status(200).json({ message: "Screenshot saved to database." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error taking screenshot." });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

