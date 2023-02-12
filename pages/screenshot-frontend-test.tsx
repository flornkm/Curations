import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Screenshots() {
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    async function fetchScreenshots() {
      const { data, error } = await supabase.from('screenshots').select('*');
      if (error) console.log('error', error);
      else setScreenshots(data);
    }
    fetchScreenshots();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {screenshots.map((screenshot) => (
        <div key={screenshot.id}>
          <img src={`data:image/;base64,${screenshot.image.toString('base64')}`} />
          <p>{screenshot.name}</p>
          <p>{screenshot.category}</p>
          <p>{screenshot.subcategory}</p>
        </div>
      ))}
    </div>
  );
}

