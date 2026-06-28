import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://ujdemkcamrdvtaqjpifs.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZGVta2NhbXJkdnRhcWpwaWZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2MDI0MzIsImV4cCI6MjA5ODE3ODQzMn0.KPawGJwBgrcX9N-BETIFIV6nUzEt0M4ZqYAku_npK3g";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
