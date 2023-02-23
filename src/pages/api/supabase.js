import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let { data } = await supabase.from('curations').select()

  console.log(data)

  res.status(200).json(data);
}
