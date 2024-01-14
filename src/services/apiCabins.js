import supabase, { supabaseUrl } from "./supabase";

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
  // Creating new image name. Attaching random prefix and removing all the slashed [/]
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Building an URL for the image from Supabase
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Code from Supabase/API Docs/cabins
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  // If error, throws an error
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }

  // Uploading image to the Supabase storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(`${imageName}`, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  // Delete the cabin if there's an image error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
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
