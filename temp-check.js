const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ujdemkcamrdvtaqjpifs.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZGVta2NhbXJkdnRhcWpwaWZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjYwMjQzMiwiZXhwIjoyMDk4MTc4NDMyfQ.jJE95ymHTFC0l5aFCnLTCYQ9iNoFgIdOO1gPA6igzWI';

const supabase = createClient(supabaseUrl, serviceKey);

async function run() {
  // Check existing columns
  const { data: existing, error: checkError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
    
  if (checkError) {
    console.log('Check error:', checkError.message);
  } else {
    console.log('Existing columns:', Object.keys(existing[0] || {}));
  }
  
  // Try updating with is_admin field
  const { data: testData, error: testError } = await supabase
    .from('profiles')
    .update({ is_admin: true })
    .eq('email', 'admin@toolvault.com')
    .select();
    
  if (testError) {
    console.log('Column does not exist yet. Need to run SQL in dashboard.');
    console.log('SQL: ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;');
  } else {
    console.log('Admin updated successfully:', testData);
  }
}

run();
