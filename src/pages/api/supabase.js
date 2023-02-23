import { SupabaseClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.from("curations").select("*");

  console.log(data);

  res.status(200).json(data);
}
