import React, { useState, useEffect } from 'react';
import { fetchDocumentPath, DocumentPath } from '../../services/documentApi';
import { FiChevronRight, FiHome } from 'react-icons/fi';

interface DocumentBreadcrumbProps {
  documentId: number | null;
  onNavigate: (documentId: number) => void;
}

const DocumentBreadcrumb: React.FC<DocumentBreadcrumbProps> = ({ documentId, onNavigate }) => {
  const [path, setPath] = useState<DocumentPath[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (documentId) {
      loadPath();
    } else {
      setPath([]);
    }
  }, [documentId]);

  const loadPath = async () => {
    if (!documentId) return;
    
    try {
      setLoading(true);
      const pathData = await fetchDocumentPath(documentId);
      setPath(pathData);
    } catch (err) {
      console.error('Failed to load document path:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <FiChevronRight className="mx-2 text-gray-400" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
      <button 
        onClick={() => onNavigate(0)}
        className="flex items-center text-blue-500 hover:underline"
      >
        <FiHome className="mr-1" />
        <span>Documentation</span>
      </button>
      
      {path.map((item, index) => (
        <React.Fragment key={item.id}>
          <FiChevronRight className="mx-2 text-gray-400" />
          <button 
            onClick={() => onNavigate(item.id)}
            className={`hover:underline ${index === path.length - 1 ? 'font-medium' : 'text-blue-500'}`}
          >
            {item.title}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DocumentBreadcrumb;
