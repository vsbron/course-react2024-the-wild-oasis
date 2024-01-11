import supabase from "./supabase";

// Function that queries all the rows from Cabins table database
// This needs to be permited in Authentication/Policies
export async function getCabins() {
  // Code from Supabase/API Docs/cabins
  const { data, error } = await supabase.from("cabins").select("*");

  // If error, throws an error
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Function that queries all the rows from Cabins table database
// This needs to be permited in Authentication/Policies
export async function createCabin(newCabin) {
  // Destructuring newCabin variables
  const { name, maxCapacity, regularPrice, discount, description } = newCabin;

  // Code from Supabase/API Docs/cabins
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name,
        maxCapacity,
        regularPrice,
        discount,
        description,
      },
    ])
    .select();

  // If error, throws an error
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }

  return data;
}

// Function that deletes the row by ID from Cabins table database
// This needs to be permited in Authentication/Policies
export async function deleteCabin(id) {
  // Code from Supabase/API Docs/cabins
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  // If error, throws an error
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
