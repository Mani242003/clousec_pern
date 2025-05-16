const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { router: authRouter } = require('./routes/auth');
const blogsRouter = require('./routes/blogs');
const caseStudiesRouter = require('./routes/caseStudies');
const commentsRouter = require('./routes/comments');
const documentsRouter = require('./routes/documents');
const { initDb } = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Increase JSON payload size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize database
(async () => {
  try {
    await initDb();
    console.log('Database initialization completed');
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
})();

// Routes
app.use('/login', authRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/blogs/:blogId/comments', commentsRouter);
app.use('/api/case-studies', caseStudiesRouter);
app.use('/api/documents', documentsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('ClouSec API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Server error', 
    message: err.message || 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
