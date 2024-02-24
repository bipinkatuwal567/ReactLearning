import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://idpacikzytpqdhmsegti.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcGFjaWt6eXRwcWRobXNlZ3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MTYwNTUsImV4cCI6MjAyNDA5MjA1NX0.V6JVpSJG4p5kuwZGtKps5sqYw80S4UjhwUHSF4-h4zo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;