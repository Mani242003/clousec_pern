import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PdfViewer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('Case Study PDF');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get PDF URL from query parameters
    const params = new URLSearchParams(location.search);
    const url = params.get('url');
    const docTitle = params.get('title');
    
    if (!url) {
      setError('No PDF URL provided');
      return;
    }
    
    setPdfUrl(url);
    if (docTitle) {
      setTitle(docTitle);
      document.title = `${docTitle} - PDF Viewer`;
    }
  }, [location]);

  // Handle back button
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Handle download
  const handleDownload = () => {
    if (!pdfUrl) return;
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title ? `${title.replace(/\s+/g, '-').toLowerCase()}.pdf` : 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <button 
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Back
          </button>
          <button 
            onClick={handleDownload}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
      
      {pdfUrl ? (
        <div className="w-full h-[calc(100vh-200px)] border border-gray-300 rounded-lg overflow-hidden">
          <iframe 
            src={pdfUrl} 
            title={title}
            className="w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
