import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const category = req.query.category;
  const subCategory = req.query.subCategory;

  if (!subCategory) {
    if (category === "all") {
      const { data } = await supabase.from("curations").select("*");

      res.status(200).json(data);
    } else {
      const { data } = await supabase
        .from("curations")
        .select("*")
        .eq("category", category);

      res.status(200).json(data);
    }
  } else if (subCategory !== "All") {
    const { data } = await supabase
      .from("curations")
      .select("*")
      .eq("category", category)
      .eq("subcategory", subCategory.toLowerCase());

    res.status(200).json(data);
  } else {
    const { data } = await supabase
      .from("curations")
      .select("*")
      .eq("category", category);

    res.status(200).json(data);
  }
}
