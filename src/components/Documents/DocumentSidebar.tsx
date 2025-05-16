import React, { useState, useEffect } from 'react';
import { fetchDocumentTree, Document, createDocument, deleteDocument } from '../../services/documentApi';
import { FiFolder, FiFile, FiChevronRight, FiChevronDown, FiPlus, FiTrash, FiEdit } from 'react-icons/fi';
import { getAdminCredentials } from '../../services/api';
import AlertMessage from './AlertMessage';

interface DocumentSidebarProps {
  onSelectDocument: (document: Document) => void;
  selectedDocumentId: number | null;
}

const DocumentSidebar: React.FC<DocumentSidebarProps> = ({ onSelectDocument, selectedDocumentId }) => {
  const [documentTree, setDocumentTree] = useState<Document[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newDocumentTitle, setNewDocumentTitle] = useState<string>('');
  const [addingToParentId, setAddingToParentId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info' | 'warning', message: string } | null>(null);

  useEffect(() => {
    const credentials = getAdminCredentials();
    setIsAdmin(!!credentials);
    
    loadDocumentTree();
  }, []);

  const showAlert = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setAlert({ type, message });
    // Alert will auto-dismiss via the AlertMessage component
  };

  const loadDocumentTree = async () => {
    try {
      setLoading(true);
      const tree = await fetchDocumentTree();
      setDocumentTree(tree);
      setError(null);
    } catch (err) {
      console.error('Failed to load document tree:', err);
      setError('Failed to load documents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (nodeId: number) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const handleAddDocument = async (parentId: number | null = null) => {
    if (!newDocumentTitle.trim()) return;
    
    try {
      await createDocument(newDocumentTitle, parentId);
      setNewDocumentTitle('');
      setAddingToParentId(null);
      await loadDocumentTree();
      showAlert('success', 'Document created successfully!');
    } catch (err) {
      console.error('Failed to create document:', err);
      setError('Failed to create document. Please try again.');
      showAlert('error', 'Failed to create document. Please try again.');
    }
  };

  const handleDeleteDocument = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this document and all its children?')) {
      try {
        await deleteDocument(id);
        await loadDocumentTree();
        
        // If the deleted document was selected, clear the selection
        if (selectedDocumentId === id) {
          onSelectDocument(null as any);
        }
        
        showAlert('success', 'Document deleted successfully!');
      } catch (err) {
        console.error('Failed to delete document:', err);
        setError('Failed to delete document. Please try again.');
        showAlert('error', 'Failed to delete document. Please try again.');
      }
    }
  };

  const renderDocumentNode = (document: Document, level: number = 0) => {
    const isExpanded = expandedNodes[document.id] || false;
    const hasChildren = document.children && document.children.length > 0;
    const isSelected = selectedDocumentId === document.id;
    
    return (
      <div key={document.id} className="document-node">
        <div 
          className={`document-item group ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''} hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded flex items-center cursor-pointer`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => onSelectDocument(document)}
        >
          {hasChildren ? (
            <span onClick={(e) => { e.stopPropagation(); toggleNode(document.id); }} className="mr-1">
              {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          ) : (
            <span className="mr-1 w-4"></span>
          )}
          
          {hasChildren ? <FiFolder className="mr-2 text-yellow-500" /> : <FiFile className="mr-2 text-gray-500" />}
          
          <span className="flex-grow truncate">{document.title}</span>
          
          {isAdmin && (
            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); setAddingToParentId(document.id); }}
                className="p-1 text-gray-500 hover:text-blue-500"
                title="Add child document"
              >
                <FiPlus size={14} />
              </button>
              <button 
                onClick={(e) => handleDeleteDocument(document.id, e)}
                className="p-1 text-gray-500 hover:text-red-500"
                title="Delete document"
              >
                <FiTrash size={14} />
              </button>
            </div>
          )}
        </div>
        
        {addingToParentId === document.id && (
          <div className="pl-8 py-2 flex items-center">
            <input
              type="text"
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              placeholder="Document title"
              className="border rounded px-2 py-1 text-sm flex-grow mr-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddDocument(document.id);
                if (e.key === 'Escape') {
                  setNewDocumentTitle('');
                  setAddingToParentId(null);
                }
              }}
            />
            <button 
              onClick={() => handleAddDocument(document.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Add
            </button>
            <button 
              onClick={() => {
                setNewDocumentTitle('');
                setAddingToParentId(null);
              }}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm ml-1"
            >
              Cancel
            </button>
          </div>
        )}
        
        {isExpanded && hasChildren && (
          <div className="document-children">
            {document.children!.map(child => renderDocumentNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading && documentTree.length === 0) {
    return <div className="p-4">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="document-sidebar border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto fixed w-64 bg-white dark:bg-gray-900">
      {alert && (
        <AlertMessage 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)}
        />
      )}
      
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Documentation</h2>
        {isAdmin && (
          <button 
            onClick={() => setAddingToParentId(0)}
            className="bg-blue-500 text-white p-1 rounded flex items-center"
            title="Add root document"
          >
            <FiPlus size={18} />
          </button>
        )}
      </div>
      
      {addingToParentId === 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              placeholder="Document title"
              className="border rounded px-2 py-1 text-sm flex-grow mr-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddDocument(null);
                if (e.key === 'Escape') {
                  setNewDocumentTitle('');
                  setAddingToParentId(null);
                }
              }}
            />
            <button 
              onClick={() => handleAddDocument(null)}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Add
            </button>
            <button 
              onClick={() => {
                setNewDocumentTitle('');
                setAddingToParentId(null);
              }}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm ml-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="p-2">
        {documentTree.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            No documents found.
            {isAdmin && (
              <div className="mt-2">
                <button 
                  onClick={() => setAddingToParentId(0)}
                  className="text-blue-500 hover:underline"
                >
                  Create your first document
                </button>
              </div>
            )}
          </div>
        ) : (
          documentTree.map(doc => renderDocumentNode(doc))
        )}
      </div>
    </div>
  );
};

export default DocumentSidebar;
