const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Initialize database tables if they don't exist
const initDb = async () => {
  try {
    // Create blogs table if it doesn't exist (without imageUrl column)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create case_studies table if it doesn't exist (without additional columns)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_studies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create comments table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        blog_id INTEGER NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create documents table - stores the document hierarchy
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        parent_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
        order_index INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create document_blocks table - stores content blocks for each document
    await pool.query(`
      CREATE TABLE IF NOT EXISTS document_blocks (
        id SERIAL PRIMARY KEY,
        document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        content JSONB NOT NULL,
        order_index INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Base tables created or already exist');

    // Use a safer approach to check and add columns
    // For blogs table - check if imageUrl column exists
    try {
      // First try to select from the column to see if it exists
      await pool.query(`SELECT "imageUrl" FROM blogs LIMIT 0`);
      console.log('imageUrl column already exists in blogs table');
    } catch (err) {
      // If error, column doesn't exist, so add it
      if (err.code === '42703') { // undefined_column error code
        console.log('Adding imageUrl column to blogs table');
        await pool.query(`ALTER TABLE blogs ADD COLUMN "imageUrl" TEXT`);
      } else {
        // Some other error occurred
        throw err;
      }
    }

    // For case_studies table - check and add columns one by one
    const columnsToAdd = [
      { name: 'industry', type: 'VARCHAR(255)' },
      { name: 'orgType', type: 'VARCHAR(255)' },
      { name: 'challenge', type: 'TEXT' },
      { name: 'solution', type: 'TEXT' },
      { name: 'results', type: 'TEXT' },
      { name: 'testimonial', type: 'TEXT' },
      { name: 'imageUrl', type: 'TEXT' },
      { name: 'pdfUrl', type: 'TEXT' }
    ];
    
    for (const column of columnsToAdd) {
      try {
        // Try to select from the column to see if it exists
        await pool.query(`SELECT "${column.name}" FROM case_studies LIMIT 0`);
        console.log(`${column.name} column already exists in case_studies table`);
      } catch (err) {
        // If error, column doesn't exist, so add it
        if (err.code === '42703') { // undefined_column error code
          console.log(`Adding ${column.name} column to case_studies table`);
          await pool.query(`ALTER TABLE case_studies ADD COLUMN "${column.name}" ${column.type}`);
        } else {
          // Some other error occurred
          throw err;
        }
      }
    }

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
};

// Initialize the database when this module is imported
initDb();

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
