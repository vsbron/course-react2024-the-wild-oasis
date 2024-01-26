import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  // Throw error if login wasn't sucessful
  if (error) throw new Error(error.message);

  // Return data
  return data;
}

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

export async function logout() {
  const { error } = await supabase.auth.signOut();

  // Throw error if logout wasn't sucessful
  if (error) throw new Error(error.message);
}
