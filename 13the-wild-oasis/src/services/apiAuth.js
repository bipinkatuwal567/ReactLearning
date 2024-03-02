import supabase from "./supabase";

export async function signUp({ fullName, email, password }) {
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

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullname

  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { error, data } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const {error: avatarError} = await supabase.storage.from("avatars").upload(fileName, avatar);

  if(avatarError) throw new Error(avatarError.message);

  // 3. Update avatar in the user
  const {data: updateUser, error: updateError} = await supabase.auth.updateUser({
    data: {
      avatar: `https://idpacikzytpqdhmsegti.supabase.co/storage/v1/object/public/avatars/${fileName}`
    }
  })

  if (updateError) throw new Error(updateError.message);

  return updateUser;
}
