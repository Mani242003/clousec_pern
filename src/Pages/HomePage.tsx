import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Blog, CaseStudy, fetchBlogs, fetchCaseStudies } from '../services/api';
import { formatDate } from '../utils/dateFormatter';

const HomePage: React.FC = () => {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [featuredCaseStudies, setFeaturedCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [blogsData, caseStudiesData] = await Promise.all([
          fetchBlogs(),
          fetchCaseStudies()
        ]);
        
        // Get the latest 3 blogs
        setLatestBlogs(blogsData.slice(0, 3));
        
        // Get the latest 2 case studies
        setFeaturedCaseStudies(caseStudiesData.slice(0, 2));
        
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white rounded-lg shadow-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ClouSec</h1>
          <p className="text-xl mb-6">
            Your trusted partner for cloud security solutions and expertise
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/blogs" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Read Our Blog
            </Link>
            <Link 
              to="/case-studies" 
              className="bg-transparent hover:bg-blue-700 border border-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Latest Blog Posts Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Latest Blog Posts</h2>
          <Link to="/blogs" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </Link>
        </div>

        {latestBlogs.length === 0 ? (
          <p className="text-gray-600">No blog posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {formatDate(blog.created_at)}
                  </p>
                  <div className="text-gray-700 mb-4 line-clamp-3">
                    {/* Remove HTML tags for preview */}
                    {blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                  </div>
                  <Link 
                    to={`/blogs/${blog.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Case Studies Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Case Studies</h2>
          <Link to="/case-studies" className="text-blue-600 hover:text-blue-800 font-medium">
            View All
          </Link>
        </div>

        {featuredCaseStudies.length === 0 ? (
          <p className="text-gray-600">No case studies available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCaseStudies.map(study => (
              <div key={study.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {formatDate(study.created_at)}
                  </p>
                  <div className="text-gray-700 mb-4 line-clamp-3">
                    {/* Remove HTML tags for preview */}
                    {study.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                  </div>
                  <Link 
                    to={`/case-studies/${study.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
