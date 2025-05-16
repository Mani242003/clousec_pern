const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { isAdmin } = require('./auth');

// GET all case studies (public)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM case_studies ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single case study by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate that id is a number
    const caseStudyId = parseInt(id);
    if (isNaN(caseStudyId)) {
      console.error(`Invalid case study ID: ${id}`);
      return res.status(400).json({ error: 'Invalid case study ID' });
    }
    
    const result = await db.query('SELECT * FROM case_studies WHERE id = $1', [caseStudyId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// POST create a new case study (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    console.log('Creating case study with body:', req.body);
    
    const { 
      title, 
      content,
      imageUrl,
      pdfUrl,
      // Keep these for backward compatibility
      industry, 
      orgType, 
      challenge, 
      solution, 
      results, 
      testimonial
    } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image is required' });
    }
    
    if (!pdfUrl) {
      return res.status(400).json({ error: 'PDF document is required' });
    }
    
    const result = await db.query(
      `INSERT INTO case_studies (
        title, 
        content, 
        industry, 
        "orgType", 
        challenge, 
        solution, 
        results, 
        testimonial,
        "imageUrl",
        "pdfUrl"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        title, 
        content, 
        industry || null, 
        orgType || null, 
        challenge || null, 
        solution || null, 
        results || null, 
        testimonial || null,
        imageUrl,
        pdfUrl
      ]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating case study:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// PUT update a case study (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate that id is a number
    const caseStudyId = parseInt(id);
    if (isNaN(caseStudyId)) {
      console.error(`Invalid case study ID for update: ${id}`);
      return res.status(400).json({ error: 'Invalid case study ID' });
    }
    
    console.log(`Updating case study ${caseStudyId} with body:`, req.body);
    
    const { 
      title, 
      content,
      imageUrl,
      pdfUrl,
      // Keep these for backward compatibility
      industry, 
      orgType, 
      challenge, 
      solution, 
      results, 
      testimonial
    } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image is required' });
    }
    
    if (!pdfUrl) {
      return res.status(400).json({ error: 'PDF document is required' });
    }
    
    const result = await db.query(
      `UPDATE case_studies SET 
        title = $1, 
        content = $2, 
        industry = $3, 
        "orgType" = $4, 
        challenge = $5, 
        solution = $6, 
        results = $7, 
        testimonial = $8,
        "imageUrl" = $9,
        "pdfUrl" = $10
      WHERE id = $11 RETURNING *`,
      [
        title, 
        content, 
        industry || null, 
        orgType || null, 
        challenge || null, 
        solution || null, 
        results || null, 
        testimonial || null,
        imageUrl,
        pdfUrl,
        caseStudyId
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// DELETE a case study (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate that id is a number
    const caseStudyId = parseInt(id);
    if (isNaN(caseStudyId)) {
      console.error(`Invalid case study ID for delete: ${id}`);
      return res.status(400).json({ error: 'Invalid case study ID' });
    }
    
    const result = await db.query('DELETE FROM case_studies WHERE id = $1 RETURNING *', [caseStudyId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;
