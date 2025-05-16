// API service for interacting with the backend

const API_URL = 'http://localhost:3000';

// Types
export interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  imageUrl?: string;
}

export interface Comment {
  id: number;
  blogId: number;
  name: string;
  comment: string;
  created_at: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  content: string;
  created_at: string;
  industry?: string;
  orgType?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  testimonial?: string;
  imageUrl?: string;
  pdfUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  loggedIn: boolean;
}

// Auth service
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

// Store admin credentials in session storage after successful login
export const storeAdminCredentials = (credentials: LoginCredentials): void => {
  sessionStorage.setItem('adminEmail', credentials.email);
  sessionStorage.setItem('adminPassword', credentials.password);
};

// Get admin credentials from session storage
export const getAdminCredentials = (): LoginCredentials | null => {
  const email = sessionStorage.getItem('adminEmail');
  const password = sessionStorage.getItem('adminPassword');
  
  if (email && password) {
    return { email, password };
  }
  
  return null;
};

// Clear admin credentials from session storage
export const clearAdminCredentials = (): void => {
  sessionStorage.removeItem('adminEmail');
  sessionStorage.removeItem('adminPassword');
};

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

// Blog service
export const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_URL}/api/blogs`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  
  return response.json();
};

export const fetchBlogById = async (id: number): Promise<Blog> => {
  const response = await fetch(`${API_URL}/api/blogs/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  
  return response.json();
};

export const createBlog = async (blog: Omit<Blog, 'id' | 'created_at'>): Promise<Blog> => {
  const response = await fetch(`${API_URL}/api/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(blog),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create blog');
  }
  
  return response.json();
};

export const updateBlog = async (id: number, blog: Omit<Blog, 'id' | 'created_at'>): Promise<Blog> => {
  const response = await fetch(`${API_URL}/api/blogs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(blog),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update blog');
  }
  
  return response.json();
};

export const deleteBlog = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/blogs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete blog');
  }
};

// Comment service
export const fetchCommentsByBlogId = async (blogId: number): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return response.json();
};

export const createComment = async (blogId: number, comment: Omit<Comment, 'id' | 'blogId' | 'created_at'>): Promise<Comment> => {
  const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create comment');
  }
  
  return response.json();
};

// Case Study service
export const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  const response = await fetch(`${API_URL}/api/case-studies`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch case studies');
  }
  
  return response.json();
};

export const fetchCaseStudyById = async (id: number): Promise<CaseStudy> => {
  const response = await fetch(`${API_URL}/api/case-studies/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch case study');
  }
  
  return response.json();
};

export const createCaseStudy = async (caseStudy: Omit<CaseStudy, 'id' | 'created_at'>): Promise<CaseStudy> => {
  try {
    console.log('Creating case study with data:', caseStudy);
    const response = await fetch(`${API_URL}/api/case-studies`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(caseStudy),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(`Failed to create case study: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in createCaseStudy:', error);
    throw error;
  }
};

export const updateCaseStudy = async (id: number, caseStudy: Omit<CaseStudy, 'id' | 'created_at'>): Promise<CaseStudy> => {
  try {
    console.log(`Updating case study ${id} with data:`, caseStudy);
    
    // Make sure we're logged in as admin
    const credentials = getAdminCredentials();
    if (!credentials) {
      throw new Error('Not authenticated as admin');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'email': credentials.email,
      'password': credentials.password,
    };
    
    const response = await fetch(`${API_URL}/api/case-studies/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(caseStudy),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error response:', errorText);
      throw new Error(`Failed to update case study: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error in updateCaseStudy:', error);
    throw error;
  }
};

export const deleteCaseStudy = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/case-studies/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete case study');
  }
};
