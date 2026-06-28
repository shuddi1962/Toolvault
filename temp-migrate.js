const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ujdemkcamrdvtaqjpifs.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZGVta2NhbXJkdnRhcWpwaWZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjYwMjQzMiwiZXhwIjoyMDk4MTc4NDMyfQ.jJE95ymHTFC0l5aFCnLTCYQ9iNoFgIdOO1gPA6igzWI';

const supabase = createClient(supabaseUrl, serviceKey);

async function runMigration() {
  // Add is_admin column
  const { error: colError } = await supabase.rpc('exec_sql', { 
    query: 'ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;' 
  });
  
  if (colError) {
    console.log('RPC not available, trying direct query...');
    // Try using the REST API to add column
    const response = await fetch(supabaseUrl + '/rest/v1/rpc/exec_sql', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + serviceKey,
        'Content-Type': 'application/json',
        'apikey': serviceKey
      },
      body: JSON.stringify({ query: 'ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;' })
    });
    console.log('Response:', await response.text());
  } else {
    console.log('Column added successfully');
  }

  // Update admin user
  const { data, error: updateError } = await supabase
    .from('profiles')
    .update({ is_admin: true })
    .eq('email', 'admin@toolvault.com')
    .select();
    
  if (updateError) {
    console.log('Update error:', updateError.message);
  } else {
    console.log('Admin user updated:', data);
  }
}

runMigration();
