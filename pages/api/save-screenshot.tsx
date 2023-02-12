const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const fs = require('fs');

export default async (req, res) => {
  try {
    const { imageUrl, name, category, subcategory } = req.body;

    // Take a screenshot using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //define size of the screenshot
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(imageUrl);
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();

    // Save the screenshot file and its details to a Supabase database
    const image = fs.readFileSync('screenshot.png');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('screenshots').insert([
      {
        name: name,
        category: category,
        subcategory: subcategory,
        image: image.toString('base64'),
      },
    ]);

    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving screenshot to database.' });
    } else {
      res.status(200).json({ message: 'Screenshot saved to database.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error taking screenshot.' });
  }
};

