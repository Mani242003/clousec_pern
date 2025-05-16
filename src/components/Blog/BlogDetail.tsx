import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Blog, Comment, fetchBlogById, fetchBlogs, fetchCommentsByBlogId, createComment, getAdminCredentials } from '../../services/api';
import { formatDate } from '../../utils/dateFormatter';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [otherBlogs, setOtherBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = !!getAdminCredentials();

  // Comment state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
  const [newComment, setNewComment] = useState({ name: '', comment: '', captcha: '' });
  const [captchaValue, setCaptchaValue] = useState<string>('');
  const [captchaAnswer, setCaptchaAnswer] = useState<string>('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentSuccess, setCommentSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch current blog
        const currentBlog = await fetchBlogById(parseInt(id));
        setBlog(currentBlog);
        
        // Fetch all blogs to display in sidebar
        const allBlogs = await fetchBlogs();
        // Filter out the current blog
        const filteredBlogs = allBlogs.filter(b => b.id !== parseInt(id));
        setOtherBlogs(filteredBlogs);
        
        // Generate captcha
        generateCaptcha();
        
        setError(null);
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error loading blog data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  useEffect(() => {
    const loadComments = async () => {
      if (!id) return;
      
      try {
        setCommentsLoading(true);
        const data = await fetchCommentsByBlogId(parseInt(id));
        setComments(data);
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setCommentsLoading(false);
      }
    };

    loadComments();
  }, [id]);

  // Generate a simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaValue(`${num1} + ${num2} = ?`);
    setCaptchaAnswer((num1 + num2).toString());
  };

  // Handle comment form input changes
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear any previous error/success messages
    setCommentError(null);
    setCommentSuccess(false);
  };

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newComment.name.trim() || !newComment.comment.trim()) {
      setCommentError('Name and comment are required.');
      return;
    }
    
    // Validate captcha
    if (newComment.captcha !== captchaAnswer) {
      setCommentError('Incorrect captcha answer. Please try again.');
      generateCaptcha();
      setNewComment(prev => ({ ...prev, captcha: '' }));
      return;
    }
    
    try {
      // In a real app, you would send this to your backend API
      if (id) {
        const commentData = {
          name: newComment.name,
          comment: newComment.comment
        };
        
        try {
          const newCommentResponse = await createComment(parseInt(id), commentData);
          
          // Add the new comment to the comments list
          setComments(prev => [newCommentResponse, ...prev]);
          setNewComment({ name: '', comment: '', captcha: '' });
          setCommentSuccess(true);
        } catch (err) {
          console.error('Error creating comment:', err);
          setCommentError('Failed to submit comment. Please try again.');
        }
      }
    } catch (err) {
      setCommentError('Failed to submit comment. Please try again.');
    }
    
    generateCaptcha();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error || 'Blog post not found'}</span>
      </div>
    );
  }

  // Function to truncate text for blog previews
  const truncateText = (text: string, maxLength: number) => {
    // Remove HTML tags for clean preview
    const strippedText = text.replace(/<[^>]*>?/gm, '');
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.substring(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blogs" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        &larr; Back to Blogs
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main blog content - left side */}
        <div className="lg:w-2/3">
          <article className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>
              <p className="text-gray-600">
                Published on {formatDate(blog.created_at)}
              </p>
            </header>

            {isAdmin && (
              <div className="mb-6 flex space-x-4">
                <Link 
                  to={`/admin/blogs/edit/${blog.id}`} 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Edit Post
                </Link>
              </div>
            )}

            {/* Display blog image if available */}
            {blog.imageUrl && (
              <div className="mb-6">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments {comments.length > 0 ? `(${comments.length})` : ''}</h2>
            
            {/* Comment Form */}
            <div className="mb-8 border-b pb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Leave a Comment</h3>
              
              {commentSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">Your comment has been added successfully!</span>
                </div>
              )}
              
              {commentError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{commentError}</span>
                </div>
              )}
              
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newComment.name}
                    onChange={handleCommentChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={newComment.comment}
                    onChange={handleCommentChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your comment"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="captcha" className="block text-gray-700 font-medium mb-2">
                    {captchaValue} *
                  </label>
                  <input
                    type="text"
                    id="captcha"
                    name="captcha"
                    value={newComment.captcha}
                    onChange={handleCommentChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the answer"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Please solve this simple math problem to verify you're human.
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Submit Comment
                </button>
              </form>
            </div>
            
            {/* Comments List */}
            <div>
              {commentsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : comments.length > 0 ? (
                <ul className="space-y-6">
                  {comments.map(comment => (
                    <li key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold text-gray-800">{comment.name}</h4>
                          <p className="text-sm text-gray-500">{formatDate(comment.created_at)}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{comment.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-center py-4">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Other blogs sidebar - right side */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">More Blog Posts</h2>
            
            {otherBlogs.length === 0 ? (
              <p className="text-gray-600 italic">No other blog posts available.</p>
            ) : (
              <ul className="space-y-4">
                {otherBlogs.map(otherBlog => (
                  <li 
                    key={otherBlog.id} 
                    className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <Link 
                      to={`/blogs/${otherBlog.id}`} 
                      className="block hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <h3 className="font-semibold text-blue-600 hover:text-blue-800 mb-1">
                        {otherBlog.title}
                      </h3>
                      {otherBlog.imageUrl && (
                        <div className="mb-2">
                          <img 
                            src={otherBlog.imageUrl} 
                            alt={otherBlog.title} 
                            className="w-full h-auto rounded-md object-cover"
                            style={{ maxHeight: '100px' }}
                          />
                        </div>
                      )}
                      <p className="text-sm text-gray-700">
                        {truncateText(otherBlog.content, 100)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(otherBlog.created_at)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
