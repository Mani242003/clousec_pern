import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBlogs, deleteBlog, fetchCaseStudies, deleteCaseStudy } from '../services/api';
import { FiEdit, FiTrash, FiPlus, FiBook, FiFileText, FiFolder } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

const AdminDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [blogsData, caseStudiesData] = await Promise.all([
          fetchBlogs(),
          fetchCaseStudies()
        ]);
        
        setBlogs(blogsData);
        setCaseStudies(caseStudiesData);
        setError(null);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleDeleteBlog = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (err) {
        console.error('Failed to delete blog:', err);
        setError('Failed to delete blog. Please try again.');
      }
    }
  };

  const handleDeleteCaseStudy = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await deleteCaseStudy(id);
        setCaseStudies(caseStudies.filter(cs => cs.id !== id));
      } catch (err) {
        console.error('Failed to delete case study:', err);
        setError('Failed to delete case study. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | ClouSec</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <FiBook className="text-blue-500 text-2xl mr-3" />
              <div>
                <h2 className="text-xl font-semibold">Blogs</h2>
                <p className="text-gray-600">{blogs.length} total</p>
              </div>
            </div>
            <Link 
              to="/admin/blogs/new" 
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <FiPlus className="mr-1" /> Add New Blog
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <FiFileText className="text-green-500 text-2xl mr-3" />
              <div>
                <h2 className="text-xl font-semibold">Case Studies</h2>
                <p className="text-gray-600">{caseStudies.length} total</p>
              </div>
            </div>
            <Link 
              to="/admin/case-studies/new" 
              className="mt-4 inline-flex items-center text-green-600 hover:text-green-800"
            >
              <FiPlus className="mr-1" /> Add New Case Study
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <FiFolder className="text-purple-500 text-2xl mr-3" />
              <div>
                <h2 className="text-xl font-semibold">Documentation</h2>
                <p className="text-gray-600">Manage documentation</p>
              </div>
            </div>
            <Link 
              to="/documentation" 
              className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800"
            >
              <FiPlus className="mr-1" /> Go to Documentation
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blogs Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiBook className="mr-2" /> Blog Posts
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {blogs.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No blog posts found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {blogs.map(blog => (
                        <tr key={blog.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {blog.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(blog.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link 
                              to={`/admin/blogs/edit/${blog.id}`}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <FiEdit />
                            </Link>
                            <button 
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Case Studies Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FiFileText className="mr-2" /> Case Studies
            </h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {caseStudies.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No case studies found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {caseStudies.map(cs => (
                        <tr key={cs.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {cs.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {cs.industry || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link 
                              to={`/admin/case-studies/edit/${cs.id}`}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <FiEdit />
                            </Link>
                            <button 
                              onClick={() => handleDeleteCaseStudy(cs.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
