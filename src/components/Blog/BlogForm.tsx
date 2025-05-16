import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Blog, createBlog, updateBlog, fetchBlogById } from '../../services/api';

// You might want to add a rich text editor like TinyMCE, CKEditor, or Quill
// For simplicity, we're using a textarea in this example

const BlogForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const htmlExampleRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    imageUrl: string;
  }>({
    title: '',
    content: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(isEditMode);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showHtmlHelp, setShowHtmlHelp] = useState<boolean>(false);

  // HTML examples for blog content
  const htmlExamples = `
<!-- Heading Examples -->
<h1>This is a Large Heading (H1)</h1>
<h2>This is a Medium Heading (H2)</h2>
<h3>This is a Small Heading (H3)</h3>

<!-- Text Formatting -->
<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<p>You can also add <u>underlined text</u> or <mark>highlighted text</mark>.</p>

<!-- Lists -->
<h3>Unordered List:</h3>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<h3>Ordered List:</h3>
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>

<!-- Links -->
<p><a href="https://example.com" target="_blank">This is a link</a> that opens in a new tab.</p>

<!-- Images -->
<figure>
  <img src="https://via.placeholder.com/800x400" alt="Example image" style="max-width: 100%; height: auto;">
  <figcaption>This is an image caption</figcaption>
</figure>

<!-- Blockquote -->
<blockquote>
  <p>This is a blockquote for highlighting important quotes or testimonials.</p>
  <cite>— Author Name</cite>
</blockquote>

<!-- Code Block -->
<pre><code>
// This is a code block
function helloWorld() {
  console.log("Hello, world!");
}
</code></pre>

<!-- Table -->
<table border="1" cellpadding="10">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Cell 1</td>
      <td>Row 1, Cell 2</td>
    </tr>
    <tr>
      <td>Row 2, Cell 1</td>
      <td>Row 2, Cell 2</td>
    </tr>
  </tbody>
</table>

<!-- Horizontal Rule -->
<hr>

<!-- Custom Styled Section -->
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
  <h3>Key Takeaways</h3>
  <p>This is a custom styled section to highlight important information.</p>
</div>
`;

  useEffect(() => {
    const loadBlog = async () => {
      if (!isEditMode) return;
      
      try {
        setInitialLoading(true);
        const data = await fetchBlogById(parseInt(id!));
        
        setFormData({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl || '',
        });
        
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error loading blog:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadBlog();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        // Also update the formData with the image URL
        setFormData(prev => ({
          ...prev,
          imageUrl: dataUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const copyHtmlExample = () => {
    if (htmlExampleRef.current) {
      htmlExampleRef.current.select();
      document.execCommand('copy');
      alert('HTML examples copied to clipboard!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Submitting blog with imageUrl:', formData.imageUrl ? formData.imageUrl.substring(0, 50) + '...' : 'none');
      
      const blogData = {
        title: formData.title,
        content: formData.content,
        imageUrl: formData.imageUrl || '',
      };
      
      if (isEditMode) {
        await updateBlog(parseInt(id!), blogData);
      } else {
        await createBlog(blogData);
      }
      
      navigate('/blogs');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} blog post. Please try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} blog:`, err);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Featured Image
          </h3>
          
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
            >
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </button>
            
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                  setFormData(prev => ({ ...prev, imageUrl: '' }));
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
              >
                Remove Image
              </button>
            )}
          </div>
          
          {imagePreview && (
            <div className="mt-4 border rounded-md p-2 max-w-md">
              <img src={imagePreview} alt="Preview" className="max-h-64 object-contain" />
              <p className="text-sm text-gray-500 mt-1">
                Note: For best results, use images smaller than 5MB
              </p>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="content" className="block text-gray-700 font-medium">
              Content
            </label>
            <button
              type="button"
              onClick={() => setShowHtmlHelp(!showHtmlHelp)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showHtmlHelp ? 'Hide HTML Help' : 'Show HTML Help'}
            </button>
          </div>
          
          {showHtmlHelp && (
            <div className="mb-4 p-4 bg-gray-50 border rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">HTML Examples</h4>
              <div className="relative">
                <textarea
                  ref={htmlExampleRef}
                  value={htmlExamples}
                  readOnly
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={copyHtmlExample}
                  className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                You can copy and paste these examples into your content to format it.
              </p>
            </div>
          )}
          
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder="Enter blog content (HTML is supported)"
          />
          <p className="text-sm text-gray-600 mt-1">
            HTML formatting is supported for rich content.
          </p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
