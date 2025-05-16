const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../db/db');

// GET all comments for a blog post
router.get('/', async (req, res) => {
  try {
    const { blogId } = req.params;
    const result = await db.query(
      'SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC',
      [blogId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create a new comment
router.post('/', async (req, res) => {
  try {
    console.log('Creating comment with body:', req.body);
    const { blogId } = req.params;
    const { name, comment } = req.body;
    
    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }
    
    // Verify that the blog exists
    const blogCheck = await db.query('SELECT id FROM blogs WHERE id = $1', [blogId]);
    if (blogCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    const result = await db.query(
      'INSERT INTO comments (blog_id, name, comment) VALUES ($1, $2, $3) RETURNING *',
      [blogId, name, comment]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
