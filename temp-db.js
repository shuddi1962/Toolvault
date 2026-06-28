const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URI,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Add is_admin column
    await client.query('ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;');
    console.log('Column added');
    
    // Update admin user
    const result = await client.query("UPDATE profiles SET is_admin = TRUE WHERE email = 'admin@toolvault.com' RETURNING *");
    console.log('Admin updated:', result.rows);
    
    await client.end();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

run();
