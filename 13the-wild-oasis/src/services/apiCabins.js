import supabase from "./supabase";

export async function createCabin(cabinData) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinData])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Unable to create row to cabins");
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
