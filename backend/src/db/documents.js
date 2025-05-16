const { query } = require('./db');

// Initialize document tables
const initDocumentTables = async () => {
  try {
    // Create documents table - stores the document hierarchy
    await query(`
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
    await query(`
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

    console.log('Document tables created or already exist');
  } catch (error) {
    console.error('Error initializing document tables:', error);
    throw error;
  }
};

// Get all root documents (documents with no parent)
const getRootDocuments = async () => {
  try {
    const result = await query(`
      SELECT * FROM documents 
      WHERE parent_id IS NULL 
      ORDER BY order_index ASC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error getting root documents:', error);
    throw error;
  }
};

// Get all child documents for a given parent
const getChildDocuments = async (parentId) => {
  try {
    const result = await query(`
      SELECT * FROM documents 
      WHERE parent_id = $1 
      ORDER BY order_index ASC
    `, [parentId]);
    return result.rows;
  } catch (error) {
    console.error(`Error getting child documents for parent ${parentId}:`, error);
    throw error;
  }
};

// Get document by ID with its content blocks
const getDocumentById = async (id) => {
  try {
    // Get the document
    const docResult = await query(`
      SELECT * FROM documents WHERE id = $1
    `, [id]);
    
    if (docResult.rows.length === 0) {
      return null;
    }
    
    const document = docResult.rows[0];
    
    // Get the document's content blocks
    const blocksResult = await query(`
      SELECT * FROM document_blocks 
      WHERE document_id = $1 
      ORDER BY order_index ASC
    `, [id]);
    
    document.blocks = blocksResult.rows;
    
    return document;
  } catch (error) {
    console.error(`Error getting document ${id}:`, error);
    throw error;
  }
};

// Get full document tree
const getDocumentTree = async () => {
  try {
    // Get all documents
    const result = await query(`
      SELECT * FROM documents ORDER BY parent_id NULLS FIRST, order_index ASC
    `);
    
    const documents = result.rows;
    const documentMap = {};
    const tree = [];
    
    // Create a map of documents by ID
    documents.forEach(doc => {
      documentMap[doc.id] = { ...doc, children: [] };
    });
    
    // Build the tree structure
    documents.forEach(doc => {
      if (doc.parent_id === null) {
        // Root document
        tree.push(documentMap[doc.id]);
      } else {
        // Child document
        documentMap[doc.parent_id].children.push(documentMap[doc.id]);
      }
    });
    
    return tree;
  } catch (error) {
    console.error('Error getting document tree:', error);
    throw error;
  }
};

// Create a new document
const createDocument = async (title, parentId = null, orderIndex = 0) => {
  try {
    const result = await query(`
      INSERT INTO documents (title, parent_id, order_index, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *
    `, [title, parentId, orderIndex]);
    
    return result.rows[0];
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

// Update a document
const updateDocument = async (id, title, orderIndex) => {
  try {
    const result = await query(`
      UPDATE documents
      SET title = $1, order_index = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `, [title, orderIndex, id]);
    
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating document ${id}:`, error);
    throw error;
  }
};

// Move a document to a new parent
const moveDocument = async (id, newParentId, orderIndex) => {
  try {
    const result = await query(`
      UPDATE documents
      SET parent_id = $1, order_index = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `, [newParentId, orderIndex, id]);
    
    return result.rows[0];
  } catch (error) {
    console.error(`Error moving document ${id}:`, error);
    throw error;
  }
};

// Delete a document and all its children (cascade delete will handle this)
const deleteDocument = async (id) => {
  try {
    await query(`DELETE FROM documents WHERE id = $1`, [id]);
    return true;
  } catch (error) {
    console.error(`Error deleting document ${id}:`, error);
    throw error;
  }
};

// Create a content block for a document
const createDocumentBlock = async (documentId, type, content, orderIndex = 0) => {
  try {
    const result = await query(`
      INSERT INTO document_blocks (document_id, type, content, order_index, updated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
      RETURNING *
    `, [documentId, type, content, orderIndex]);
    
    return result.rows[0];
  } catch (error) {
    console.error('Error creating document block:', error);
    throw error;
  }
};

// Update a content block
const updateDocumentBlock = async (id, type, content, orderIndex) => {
  try {
    const result = await query(`
      UPDATE document_blocks
      SET type = $1, content = $2, order_index = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `, [type, content, orderIndex, id]);
    
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating document block ${id}:`, error);
    throw error;
  }
};

// Delete a content block
const deleteDocumentBlock = async (id) => {
  try {
    await query(`DELETE FROM document_blocks WHERE id = $1`, [id]);
    return true;
  } catch (error) {
    console.error(`Error deleting document block ${id}:`, error);
    throw error;
  }
};

// Get the path (breadcrumb) to a document
const getDocumentPath = async (id) => {
  try {
    // Recursive CTE to get the path from root to the document
    const result = await query(`
      WITH RECURSIVE document_path AS (
        SELECT id, title, parent_id, ARRAY[id] AS path, ARRAY[title] AS titles
        FROM documents
        WHERE id = $1
        
        UNION ALL
        
        SELECT d.id, d.title, d.parent_id, d.id || dp.path, d.title || dp.titles
        FROM documents d
        JOIN document_path dp ON d.id = dp.parent_id
      )
      SELECT * FROM document_path
      WHERE parent_id IS NULL
    `, [id]);
    
    if (result.rows.length === 0) {
      return [];
    }
    
    // The path is stored in reverse order (root to target)
    // We need to reverse it to get the correct order (target to root)
    const path = result.rows[0].path.reverse();
    const titles = result.rows[0].titles.reverse();
    
    // Create the breadcrumb array
    return path.map((id, index) => ({
      id,
      title: titles[index]
    }));
  } catch (error) {
    console.error(`Error getting path for document ${id}:`, error);
    throw error;
  }
};

module.exports = {
  initDocumentTables,
  getRootDocuments,
  getChildDocuments,
  getDocumentById,
  getDocumentTree,
  createDocument,
  updateDocument,
  moveDocument,
  deleteDocument,
  createDocumentBlock,
  updateDocumentBlock,
  deleteDocumentBlock,
  getDocumentPath
};
