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

export async function getCurrentUser() {
  // Checking if there's active session
  const { data: session } = await supabase.auth.getSession();

  // Guard clause
  if (!session.session) return null;

  // Getting the user data
  const { data, error } = await supabase.auth.getUser();

  // Throw error if login wasn't sucessful
  if (error) throw new Error(error.message);

  // Return user data
  return data?.user;
}
