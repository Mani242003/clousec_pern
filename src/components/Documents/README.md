# Documentation System Components

This directory contains the React components for the dynamic multi-level nested document system with TipTap rich text editor.

## Component Structure

- `DocumentLayout.tsx`: Main layout component that combines sidebar, breadcrumb, and editor
- `DocumentSidebar.tsx`: Sidebar component that displays the document hierarchy
- `DocumentBreadcrumb.tsx`: Breadcrumb navigation component
- `DocumentEditor.tsx`: Document editor component that handles document editing
- `TipTapEditor.tsx`: Rich text editor component using TipTap

## Features

### Document Hierarchy

The documentation system supports an infinite nested hierarchy of documents. Each document can have:

- A title
- Multiple content blocks
- Child documents

### Rich Text Editing

The TipTap editor supports:

- Text formatting (bold, italic, headings)
- Lists (bulleted and numbered)
- Links
- Images
- Tables

### User Permissions

- All users can view documentation
- Only admin users can create, edit, or delete documents

## Usage

### Viewing Documentation

1. Navigate to `/documentation` in the browser
2. Use the sidebar to navigate between documents
3. The breadcrumb navigation shows your current location in the hierarchy

### Editing Documentation (Admin Only)

1. Log in as an admin user
2. Navigate to `/documentation`
3. Edit document titles by clicking on them
4. Add content blocks using the "Add Content Block" button
5. Edit content using the TipTap editor
6. Add child documents using the "+" button next to a document in the sidebar

## API Integration

The components use the following API endpoints:

- `GET /api/documents/tree`: Get the entire document tree
- `GET /api/documents/:id`: Get a specific document with content blocks
- `GET /api/documents/:id/path`: Get the path (breadcrumb) to a document
- `POST /api/documents`: Create a new document
- `PUT /api/documents/:id`: Update a document
- `DELETE /api/documents/:id`: Delete a document
- `POST /api/documents/:id/blocks`: Create a content block
- `PUT /api/documents/blocks/:blockId`: Update a content block
- `DELETE /api/documents/blocks/:blockId`: Delete a content block

## Styling

The components use Tailwind CSS for styling. Additional styles for the TipTap editor are defined in `index.css`.
