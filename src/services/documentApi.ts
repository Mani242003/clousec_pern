// API service for interacting with the document system backend
import { getAdminCredentials } from './api';

const API_URL = 'http://localhost:3000';

// Types
export interface DocumentBlock {
  id: number;
  document_id: number;
  type: string;
  content: any;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: number;
  title: string;
  parent_id: number | null;
  order_index: number;
  created_at: string;
  updated_at: string;
  blocks?: DocumentBlock[];
  children?: Document[];
}

export interface DocumentPath {
  id: number;
  title: string;
}

// Helper function to add admin credentials to headers if available
const getAuthHeaders = (): HeadersInit => {
  const credentials = getAdminCredentials();
  
  if (credentials) {
    return {
      'Content-Type': 'application/json',
      'email': credentials.email,
      'password': credentials.password,
    };
  }
  
  return {
    'Content-Type': 'application/json',
  };
};

// Document tree service
export const fetchDocumentTree = async (): Promise<Document[]> => {
  const response = await fetch(`${API_URL}/api/documents/tree`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch document tree');
  }
  
  return response.json();
};

// Root documents service
export const fetchRootDocuments = async (): Promise<Document[]> => {
  const response = await fetch(`${API_URL}/api/documents/roots`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch root documents');
  }
  
  return response.json();
};

// Child documents service
export const fetchChildDocuments = async (parentId: number): Promise<Document[]> => {
  const response = await fetch(`${API_URL}/api/documents/children/${parentId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch child documents');
  }
  
  return response.json();
};

// Document by ID service
export const fetchDocumentById = async (id: number): Promise<Document> => {
  const response = await fetch(`${API_URL}/api/documents/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch document');
  }
  
  return response.json();
};

// Document path (breadcrumb) service
export const fetchDocumentPath = async (id: number): Promise<DocumentPath[]> => {
  const response = await fetch(`${API_URL}/api/documents/${id}/path`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch document path');
  }
  
  return response.json();
};

// Create document service
export const createDocument = async (title: string, parentId: number | null = null, orderIndex: number = 0): Promise<Document> => {
  const response = await fetch(`${API_URL}/api/documents`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, parentId, orderIndex }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create document');
  }
  
  return response.json();
};

// Update document service
export const updateDocument = async (id: number, title: string, orderIndex: number): Promise<Document> => {
  const response = await fetch(`${API_URL}/api/documents/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, orderIndex }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update document');
  }
  
  return response.json();
};

// Move document service
export const moveDocument = async (id: number, parentId: number | null, orderIndex: number): Promise<Document> => {
  const response = await fetch(`${API_URL}/api/documents/${id}/move`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ parentId, orderIndex }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to move document');
  }
  
  return response.json();
};

// Delete document service
export const deleteDocument = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/documents/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete document');
  }
};

// Create document block service
export const createDocumentBlock = async (
  documentId: number, 
  type: string, 
  content: any, 
  orderIndex: number = 0
): Promise<DocumentBlock> => {
  const response = await fetch(`${API_URL}/api/documents/${documentId}/blocks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ type, content, orderIndex }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create document block');
  }
  
  return response.json();
};

// Update document block service
export const updateDocumentBlock = async (
  blockId: number, 
  type: string, 
  content: any, 
  orderIndex: number
): Promise<DocumentBlock> => {
  const response = await fetch(`${API_URL}/api/documents/blocks/${blockId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ type, content, orderIndex }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update document block');
  }
  
  return response.json();
};

// Delete document block service
export const deleteDocumentBlock = async (blockId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/documents/blocks/${blockId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete document block');
  }
};
