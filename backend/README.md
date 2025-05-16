# ClouSec Backend

This is the backend service for the ClouSec website, providing API endpoints for blogs, case studies, and documentation.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_DATABASE=clousec
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   ```

3. Make sure PostgreSQL is running and the database is created:
   ```bash
   createdb clousec
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Initialization

The database tables are automatically created when the server starts. The following tables are created:

- `blogs`: Stores blog posts
- `case_studies`: Stores case studies
- `comments`: Stores comments on blog posts
- `documents`: Stores document hierarchy for the documentation system
- `document_blocks`: Stores content blocks for each document

## API Endpoints

### Authentication

- `POST /login`: Authenticate with email and password

### Blogs

- `GET /api/blogs`: Get all blogs
- `GET /api/blogs/:id`: Get a specific blog
- `POST /api/blogs`: Create a new blog (admin only)
- `PUT /api/blogs/:id`: Update a blog (admin only)
- `DELETE /api/blogs/:id`: Delete a blog (admin only)

### Comments

- `GET /api/blogs/:blogId/comments`: Get all comments for a blog
- `POST /api/blogs/:blogId/comments`: Create a new comment

### Case Studies

- `GET /api/case-studies`: Get all case studies
- `GET /api/case-studies/:id`: Get a specific case study
- `POST /api/case-studies`: Create a new case study (admin only)
- `PUT /api/case-studies/:id`: Update a case study (admin only)
- `DELETE /api/case-studies/:id`: Delete a case study (admin only)

### Documentation

- `GET /api/documents/tree`: Get the entire document tree
- `GET /api/documents/roots`: Get root documents
- `GET /api/documents/children/:parentId`: Get child documents
- `GET /api/documents/:id`: Get a specific document with content blocks
- `GET /api/documents/:id/path`: Get the path (breadcrumb) to a document
- `POST /api/documents`: Create a new document (admin only)
- `PUT /api/documents/:id`: Update a document (admin only)
- `PUT /api/documents/:id/move`: Move a document to a new parent (admin only)
- `DELETE /api/documents/:id`: Delete a document (admin only)
- `POST /api/documents/:id/blocks`: Create a content block (admin only)
- `PUT /api/documents/blocks/:blockId`: Update a content block (admin only)
- `DELETE /api/documents/blocks/:blockId`: Delete a content block (admin only)

## Authentication

The backend uses a simple authentication system with hardcoded admin credentials:

- Email: `admin@example.com`
- Password: `securepassword`

## Seeding Documentation

To seed the database with initial documentation structure:

1. Make sure the server has been started at least once to create the database tables
2. Run the seeding script:
   ```bash
   cd src/scripts
   node seed-documentation.js
   ```

This will create a sample documentation structure with nested documents and content blocks.
