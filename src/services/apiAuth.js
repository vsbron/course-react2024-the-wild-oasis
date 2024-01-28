import supabase, { supabaseUrl } from "./supabase";

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

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update Password or Full Name

  // Creating the object that we will update the user with
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // Sending the object to supabase and receiving data and error
  const { data, error } = await supabase.auth.updateUser(updateData);

  // If error, throw Error
  if (error) throw new Error(error.message);

  // 2. Upload the avatar image

  // Return if there's no new avatar
  if (!avatar) return data;

  // Creating the new filename for the new avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  // Uploading the file to the storage
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  // If error, throw Error
  if (storageError) throw new Error(error.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  // If error, throw Error
  if (updateError) throw new Error(error.message);

  return updatedUser;
}
