import { PostgrestQueryBuilder } from "@supabase/postgrest-js";

import supabase, { supabaseUrl } from "./supabase";

// Function that queries all the rows from Cabins table database
// This needs to be permitted in Authentication/Policies
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
// This needs to be permitted in Authentication/Policies
export async function createEditCabin(newCabin: any, id?: string) {
  // Checking whether new cabin contains an image url instead of file
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Creating new image name. Attaching random prefix and removing all the slashed [/]
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Building an URL for the image from Supabase (if we don't have it yet (Edit mode)
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //// 1) Create / Edit a Cabin

  // Storing a part of the query as separate value
  let query: PostgrestQueryBuilder<any, any, "cabins", unknown> =
    supabase.from("cabins");

  // A) Creating a cabin
  // Creating new cabin if we're in new cabin session (id is null)
  if (!id) {
    await query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    // B) Editing a cabin
    // Editing a cabin if we're in edit cabin session (id is NOT null)
    await query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  // AB) Awaiting the query from async function
  const { data, error } = await query.select();

  // If error, throws an error
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }

  //// 2) Uploading image to the Supabase storage
  // If image already exists (cabin is duplicated) do not upload it
  if (hasImagePath) return;

  // Upload new image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(`${imageName}`, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // Delete the cabin if there's an image error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// Function that deletes the row by ID from Cabins table database
// This needs to be permitted in Authentication/Policies
export async function deleteCabin(id: string) {
  // Code from Supabase/API Docs/cabins to delete the cabin from Database
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  // If error, throws an error
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
