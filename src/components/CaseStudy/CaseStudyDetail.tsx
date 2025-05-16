import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CaseStudy, fetchCaseStudyById, fetchCaseStudies, getAdminCredentials } from '../../services/api';
import { formatDate } from '../../utils/dateFormatter';

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [otherCaseStudies, setOtherCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = !!getAdminCredentials();

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Validate that id is a number
        const caseStudyId = parseInt(id);
        if (isNaN(caseStudyId)) {
          throw new Error('Invalid case study ID');
        }
        
        // Fetch current case study
        const currentCaseStudy = await fetchCaseStudyById(caseStudyId);
        setCaseStudy(currentCaseStudy);
        
        // Fetch all case studies to display in sidebar
        const allCaseStudies = await fetchCaseStudies();
        // Filter out the current case study
        const filteredCaseStudies = allCaseStudies.filter(cs => cs.id !== caseStudyId);
        setOtherCaseStudies(filteredCaseStudies);
        
        setError(null);
      } catch (err) {
        setError('Failed to load case study. Please try again later.');
        console.error('Error loading case study data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleCaseStudyClick = (caseStudyId: number) => {
    navigate(`/case-studies/${caseStudyId}`);
    // Scroll to top when navigating to a new case study
    window.scrollTo(0, 0);
  };

  // Force download PDF directly
  const handleDownloadPdf = () => {
    if (!caseStudy || !caseStudy.pdfUrl) {
      alert('PDF file is not available for download.');
      return;
    }
    
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = caseStudy.pdfUrl;
      
      // Set download attribute with a filename based on the case study title
      const fileName = `${caseStudy.title.replace(/\s+/g, '-').toLowerCase()}-case-study.pdf`;
      link.setAttribute('download', fileName);
      
      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('There was an error downloading the PDF. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error || 'Case study not found'}</span>
      </div>
    );
  }

  // Function to truncate text for case study previews
  const truncateText = (text: string, maxLength: number) => {
    // Remove HTML tags for clean preview
    const strippedText = text.replace(/<[^>]*>?/gm, '');
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.substring(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/case-studies" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        &larr; Back to Case Studies
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main case study content - left side */}
        <div className="lg:w-2/3">
          <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{caseStudy.title}</h1>
              <div className="flex flex-wrap gap-2 mb-2">
                {caseStudy.industry && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {caseStudy.industry}
                  </span>
                )}
                {caseStudy.orgType && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {caseStudy.orgType}
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                Published on {formatDate(caseStudy.created_at)}
              </p>
            </header>

            {isAdmin && (
              <div className="mb-6 flex space-x-4">
                <Link 
                  to={`/admin/case-studies/edit/${caseStudy.id}`} 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  Edit Case Study
                </Link>
              </div>
            )}

            {/* Display case study image if available */}
            {caseStudy.imageUrl && (
              <div className="mb-6">
                <img 
                  src={caseStudy.imageUrl} 
                  alt={caseStudy.title} 
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: caseStudy.content }}
            />

            {/* PDF Download Button - Using direct download handler */}
            {caseStudy.pdfUrl && (
              <div className="mt-8 border-t pt-6">
                <button 
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Case Study PDF
                </button>
              </div>
            )}
          </article>
        </div>
        
        {/* Other case studies sidebar - right side */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">More Case Studies</h2>
            
            {otherCaseStudies.length === 0 ? (
              <p className="text-gray-600 italic">No other case studies available.</p>
            ) : (
              <ul className="space-y-4">
                {otherCaseStudies.map(otherCaseStudy => (
                  <li 
                    key={otherCaseStudy.id} 
                    className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <button 
                      onClick={() => handleCaseStudyClick(otherCaseStudy.id)}
                      className="text-left w-full hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <h3 className="font-semibold text-blue-600 hover:text-blue-800 mb-1">
                        {otherCaseStudy.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {otherCaseStudy.industry && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded">
                            {otherCaseStudy.industry}
                          </span>
                        )}
                      </div>
                      {otherCaseStudy.imageUrl && (
                        <div className="mb-2">
                          <img 
                            src={otherCaseStudy.imageUrl} 
                            alt={otherCaseStudy.title} 
                            className="w-full h-auto rounded-md object-cover"
                            style={{ maxHeight: '100px' }}
                          />
                        </div>
                      )}
                      <p className="text-sm text-gray-700">
                        {truncateText(otherCaseStudy.content, 100)}
                      </p>
                    </button>
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

export default CaseStudyDetail;
