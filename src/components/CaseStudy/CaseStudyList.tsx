import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy, fetchCaseStudies, deleteCaseStudy, getAdminCredentials } from '../../services/api';
import { formatDate } from '../../utils/dateFormatter';

const CaseStudyList: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = !!getAdminCredentials();

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        setLoading(true);
        const data = await fetchCaseStudies();
        setCaseStudies(data);
        setError(null);
      } catch (err) {
        setError('Failed to load case studies. Please try again later.');
        console.error('Error loading case studies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await deleteCaseStudy(id);
        setCaseStudies(caseStudies.filter(study => study.id !== id));
      } catch (err) {
        setError('Failed to delete case study. Please try again.');
        console.error('Error deleting case study:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Case Studies</h1>
        {isAdmin && (
          <Link 
            to="/admin/case-studies/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
          >
            Create New Case Study
          </Link>
        )}
      </div>

      {caseStudies.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No case studies found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map(study => (
            <div key={study.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {study.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
                  {formatDate(study.created_at)}
                </p>
                <div className="text-gray-700 mb-4 line-clamp-3">
                  {/* Remove HTML tags for preview */}
                  {study.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                </div>
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/case-studies/${study.id}`} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Case Study
                  </Link>
                  {isAdmin && (
                    <div className="flex space-x-2">
                      <Link 
                        to={`/admin/case-studies/edit/${study.id}`} 
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(study.id)} 
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseStudyList;
