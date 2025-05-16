/**
 * Script to seed the database with an initial documentation structure
 * 
 * Run with: node seed-documentation.js
 */

require('dotenv').config({ path: '../.env' });
const { pool } = require('../db/db');

// Sample documentation structure
const documentStructure = [
  {
    "id": "1",
    "title": "Getting Started",
    "slug": "getting-started",
    "content": "<h1>Getting Started with ClouSec</h1><p>Welcome to ClouSec! This documentation will help you get started with our platform.</p><p>ClouSec is a comprehensive cloud security solution designed to protect your cloud infrastructure and applications.</p>",
    "parentId": null,
    "orderIndex": 0
  },
  {
    "id": "2",
    "title": "Introduction",
    "slug": "introduction",
    "content": "<h1>Introduction to ClouSec</h1><p>ClouSec provides a suite of tools and services to secure your cloud environment.</p><p>Our platform offers:</p><ul><li>Continuous security monitoring</li><li>Threat detection and response</li><li>Compliance management</li><li>Security posture assessment</li></ul>",
    "parentId": "1",
    "orderIndex": 0
  },
  {
    "id": "3",
    "title": "Installation",
    "slug": "installation",
    "content": "<h1>Installing ClouSec</h1><p>Follow these steps to install and configure ClouSec in your environment.</p><p>ClouSec can be deployed in various cloud environments including AWS, Azure, and Google Cloud Platform.</p>",
    "parentId": "1",
    "orderIndex": 1
  },
  {
    "id": "4",
    "title": "Linux Setup",
    "slug": "linux-setup",
    "content": "<h1>Linux Setup Guide</h1><p>This guide covers the installation of ClouSec on Linux-based systems.</p><p>ClouSec supports most major Linux distributions including Ubuntu, CentOS, and Debian.</p><pre><code>sudo apt update\nsudo apt install clousec</code></pre>",
    "parentId": "3",
    "orderIndex": 0
  },
  {
    "id": "5",
    "title": "Ubuntu",
    "slug": "ubuntu",
    "content": "<h1>Ubuntu-specific Installation</h1><p>Follow these Ubuntu-specific instructions to install ClouSec.</p><p>These instructions are tested on Ubuntu 20.04 LTS and newer versions.</p><pre><code>sudo add-apt-repository ppa:clousec/stable\nsudo apt update\nsudo apt install clousec-agent</code></pre>",
    "parentId": "4",
    "orderIndex": 0
  },
  {
    "id": "6",
    "title": "API Reference",
    "slug": "api-reference",
    "content": "<h1>API Reference</h1><p>This section provides detailed information about the ClouSec API.</p><p>The ClouSec API allows you to programmatically interact with our platform, enabling automation and integration with your existing tools and workflows.</p>",
    "parentId": null,
    "orderIndex": 1
  },
  {
    "id": "7",
    "title": "Authentication",
    "slug": "auth",
    "content": "<h1>Authentication</h1><p>Learn how to authenticate with the ClouSec API.</p><p>ClouSec uses API keys for authentication. You can generate API keys from the ClouSec dashboard.</p><pre><code>curl -X POST https://api.clousec.com/v1/auth \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"apiKey\": \"your-api-key\"}'\n</code></pre>",
    "parentId": "6",
    "orderIndex": 0
  },
  {
    "id": "8",
    "title": "Users API",
    "slug": "users",
    "content": "<h1>Users API</h1><p>The Users API allows you to manage users in your ClouSec account.</p><p>You can create, update, and delete users, as well as manage their permissions and roles.</p><h2>Endpoints</h2><ul><li><code>GET /users</code> - List all users</li><li><code>POST /users</code> - Create a new user</li><li><code>GET /users/{id}</code> - Get a specific user</li><li><code>PUT /users/{id}</code> - Update a user</li><li><code>DELETE /users/{id}</code> - Delete a user</li></ul>",
    "parentId": "6",
    "orderIndex": 1
  }
];

/**
 * Seed the database with the initial documentation structure
 */
async function seedDocumentation() {
  try {
    console.log('Starting documentation seeding...');
    
    // Check if documents table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'documents'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.error('Documents table does not exist. Please run the database initialization first.');
      process.exit(1);
    }
    
    // Check if there are already documents in the table
    const docCount = await pool.query('SELECT COUNT(*) FROM documents');
    if (docCount.rows[0].count > 0) {
      console.log('Documents already exist in the database. Skipping seeding to avoid duplicates.');
      console.log(`Current document count: ${docCount.rows[0].count}`);
      process.exit(0);
    }
    
    // Create a map to store the actual database IDs
    const idMap = {};
    
    // First pass: Create all documents with null parent_id
    for (const doc of documentStructure) {
      if (doc.parentId === null) {
        const result = await pool.query(`
          INSERT INTO documents (title, parent_id, order_index)
          VALUES ($1, NULL, $2)
          RETURNING id
        `, [doc.title, doc.orderIndex]);
        
        const dbId = result.rows[0].id;
        idMap[doc.id] = dbId;
        
        console.log(`Created root document: ${doc.title} (ID: ${dbId})`);
      }
    }
    
    // Second pass: Create documents with parent_id references
    // We may need multiple passes for deeply nested structures
    let remainingDocs = documentStructure.filter(doc => doc.parentId !== null);
    let lastRemainingCount = remainingDocs.length + 1; // Initialize with a different value
    
    while (remainingDocs.length > 0 && remainingDocs.length < lastRemainingCount) {
      lastRemainingCount = remainingDocs.length;
      const nextBatch = [];
      
      for (const doc of remainingDocs) {
        // Check if parent has been created
        if (idMap[doc.parentId]) {
          const result = await pool.query(`
            INSERT INTO documents (title, parent_id, order_index)
            VALUES ($1, $2, $3)
            RETURNING id
          `, [doc.title, idMap[doc.parentId], doc.orderIndex]);
          
          const dbId = result.rows[0].id;
          idMap[doc.id] = dbId;
          
          console.log(`Created document: ${doc.title} (ID: ${dbId}, Parent: ${idMap[doc.parentId]})`);
        } else {
          // Parent not created yet, add to next batch
          nextBatch.push(doc);
        }
      }
      
      remainingDocs = nextBatch;
    }
    
    if (remainingDocs.length > 0) {
      console.warn('Some documents could not be created due to missing parent references:');
      console.warn(remainingDocs);
    }
    
    // Create content blocks for all documents
    for (const doc of documentStructure) {
      if (idMap[doc.id] && doc.content) {
        await pool.query(`
          INSERT INTO document_blocks (document_id, type, content, order_index)
          VALUES ($1, $2, $3, $4)
        `, [idMap[doc.id], 'rich-text', { html: doc.content }, 0]);
        
        console.log(`Created content block for document: ${doc.title}`);
      }
    }
    
    console.log('Documentation seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding documentation:', error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

// Run the seeding function
seedDocumentation();
