const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ujdemkcamrdvtaqjpifs.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZGVta2NhbXJkdnRhcWpwaWZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjYwMjQzMiwiZXhwIjoyMDk4MTc4NDMyfQ.jJE95ymHTFC0l5aFCnLTCYQ9iNoFgIdOO1gPA6igzWI';

const supabase = createClient(supabaseUrl, serviceKey);

async function run() {
  // Try to create exec_sql function via SQL
  const sql = 'CREATE OR REPLACE FUNCTION exec_sql(query text) RETURNS void AS $ BEGIN EXECUTE query; END; $ LANGUAGE plpgsql SECURITY DEFINER;';
  
  const { data, error } = await supabase.rpc('exec_sql', { query: sql });
  
  if (error) {
    console.log('Cannot create exec_sql via rpc:', error.message);
    console.log('');
    console.log('ALTERNATIVE: We will update the admin panel code to work without the is_admin column');
    console.log('by checking the email directly instead.');
  } else {
    console.log('Function created:', data);
  }
}

run();
