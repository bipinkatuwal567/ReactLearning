import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabin(cabinData, id) {
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Unable to create row to cabins");
  }

  if (hasImagePath) return data;

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  // 3. Delete the cabin if there was an error uploading a file
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabinData.id);
    throw new Error(
      "There was a problem uploading a file and cabin was not created"
    );
  }

  return data;
}

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Unable to fetch data from cabins");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Unable to delete data from cabins");
  }

  return data;
}
