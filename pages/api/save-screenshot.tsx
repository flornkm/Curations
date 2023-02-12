// Import necessary libraries and modules
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Define the route handler function
export default async (req, res) => {
  // Take a screenshot using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://curations.tech');
  await page.screenshot({ path: 'example.png' });
  await browser.close();

  // Save the screenshot file and its details to a Supabase database
  const category = 'example category';
  const subcategory = 'example subcategory';
  const image = fs.readFileSync('example.png');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from('screenshots').insert([
    {
      name: 'example.png',
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
};
