import supabase from "./supabase";

export async function getCabins() {
  // Code from Supabase/API Docs/cabins
  const { data, error } = await supabase.from("cabins").select("*");

  // If error, throws anerror
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  // Return the data
  return data;
}
