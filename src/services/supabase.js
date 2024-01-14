// Code from Supabase
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xhxvfwsvfzsezmfmwwcl.supabase.co";
// The API key from Supabase/Settings
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoeHZmd3N2ZnpzZXptZm13d2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4ODUwMzQsImV4cCI6MjAyMDQ2MTAzNH0.LkMvsmFxLYbd9xE37LzU8LIE_SmQp0HWRwFVvLHXI0E";
const supabase = createClient(supabaseUrl, supabaseKey);

// Exporting the supabase
export default supabase;
