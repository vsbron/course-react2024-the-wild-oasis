// Code from Supabase
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xhxvfwsvfzsezmfmwwcl.supabase.co";
// The API key from Supabase/Settings
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Exporting the supabase
export default supabase;
