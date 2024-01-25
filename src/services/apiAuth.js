import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Throw error if login wasn't sucessful
  if (error) throw new Error(error.message);

  // Return data
  return data;
}
