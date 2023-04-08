import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const databaseId = 'YOUR_DATABASE_ID';
const tableName = 'YOUR_TABLE_NAME';

export default async function handler(req, res) {
  try {
    // Retrieve all pages from the Notion database
    const { results } = await notion.databases.query({ database_id: databaseId });

    // Extract links from each page and format them for import into Supabase
    const data = results.map((page) => ({
      link: page.properties.Link.url,
    }));

    // Import the data into Supabase
    // const { data: importedData, error } = await supabase.from('unconfirmed_links').insert(data);
    console.log(data);

    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to import links into Supabase.' });
    } else {
      res.status(200).json({ message: `Imported ${importedData.length} links into Supabase.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve links from Notion.' });
  }
}
