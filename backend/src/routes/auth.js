const express = require('express');
const router = express.Router();

// Hardcoded admin credentials as per requirements
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'securepassword';

// Login route
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Check if credentials match
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ loggedIn: true });
  }

  // Return 401 Unauthorized if credentials don't match
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const { email, password } = req.headers;
  
  console.log('Auth check headers:', { email, password });
  
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    console.log('Auth successful');
    return next();
  }
  
  console.log('Auth failed');
  return res.status(401).json({ error: 'Unauthorized' });
};

module.exports = {
  router,
  isAdmin
};
