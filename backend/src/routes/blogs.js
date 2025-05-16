const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { isAdmin } = require('./auth');
const commentsRouter = require('./comments');

// Use comments router for blog comments
router.use('/:blogId/comments', (req, res, next) => {
  req.params.blogId = req.params.blogId;
  next();
}, commentsRouter);

// GET all blog posts (public)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single blog post by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM blogs WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create a new blog post (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    console.log('Creating blog with body:', req.body);
    const { title, content, imageUrl } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const result = await db.query(
      'INSERT INTO blogs (title, content, "imageUrl") VALUES ($1, $2, $3) RETURNING *',
      [title, content, imageUrl || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update a blog post (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    console.log('Updating blog with body:', req.body);
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const result = await db.query(
      'UPDATE blogs SET title = $1, content = $2, "imageUrl" = $3 WHERE id = $4 RETURNING *',
      [title, content, imageUrl || null, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a blog post (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM blogs WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
