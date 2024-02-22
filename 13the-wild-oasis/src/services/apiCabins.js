import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if(error){
    console.log(error);
    throw new Error("Unable to fetch data from cabins");
  }

  return data;
}
