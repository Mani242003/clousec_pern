const express = require('express');
const router = express.Router();
const { isAdmin } = require('./auth');
const documentService = require('../db/documents');

// Get document tree (public)
router.get('/tree', async (req, res, next) => {
  try {
    const tree = await documentService.getDocumentTree();
    res.json(tree);
  } catch (error) {
    next(error);
  }
});

// Get root documents (public)
router.get('/roots', async (req, res, next) => {
  try {
    const documents = await documentService.getRootDocuments();
    res.json(documents);
  } catch (error) {
    next(error);
  }
});

// Get child documents (public)
router.get('/children/:parentId', async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const documents = await documentService.getChildDocuments(parentId);
    res.json(documents);
  } catch (error) {
    next(error);
  }
});

// Get document by ID with content blocks (public)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await documentService.getDocumentById(id);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json(document);
  } catch (error) {
    next(error);
  }
});

// Get document path (breadcrumb) (public)
router.get('/:id/path', async (req, res, next) => {
  try {
    const { id } = req.params;
    const path = await documentService.getDocumentPath(id);
    res.json(path);
  } catch (error) {
    next(error);
  }
});

// Create document (admin only)
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const { title, parentId, orderIndex } = req.body;
    const document = await documentService.createDocument(title, parentId, orderIndex);
    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
});

// Update document (admin only)
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, orderIndex } = req.body;
    const document = await documentService.updateDocument(id, title, orderIndex);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json(document);
  } catch (error) {
    next(error);
  }
});

// Move document to new parent (admin only)
router.put('/:id/move', isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { parentId, orderIndex } = req.body;
    const document = await documentService.moveDocument(id, parentId, orderIndex);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json(document);
  } catch (error) {
    next(error);
  }
});

// Delete document (admin only)
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    await documentService.deleteDocument(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Create document block (admin only)
router.post('/:id/blocks', isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, content, orderIndex } = req.body;
    const block = await documentService.createDocumentBlock(id, type, content, orderIndex);
    res.status(201).json(block);
  } catch (error) {
    next(error);
  }
});

// Update document block (admin only)
router.put('/blocks/:blockId', isAdmin, async (req, res, next) => {
  try {
    const { blockId } = req.params;
    const { type, content, orderIndex } = req.body;
    const block = await documentService.updateDocumentBlock(blockId, type, content, orderIndex);
    
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    
    res.json(block);
  } catch (error) {
    next(error);
  }
});

// Delete document block (admin only)
router.delete('/blocks/:blockId', isAdmin, async (req, res, next) => {
  try {
    const { blockId } = req.params;
    await documentService.deleteDocumentBlock(blockId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
