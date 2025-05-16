import React, { useState, useEffect } from 'react';
import { Document, DocumentBlock, fetchDocumentById, updateDocument, createDocumentBlock, updateDocumentBlock, deleteDocumentBlock } from '../../services/documentApi';
import TipTapEditor from './TipTapEditor';
import { FiSave, FiPlus, FiTrash, FiMove } from 'react-icons/fi';
import { getAdminCredentials } from '../../services/api';

interface DocumentEditorProps {
  documentId: number | null;
  onDocumentUpdated: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ documentId, onDocumentUpdated }) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [title, setTitle] = useState<string>('');
  const [blocks, setBlocks] = useState<DocumentBlock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const credentials = getAdminCredentials();
    setIsAdmin(!!credentials);
    
    if (documentId) {
      loadDocument();
    } else {
      setDocument(null);
      setTitle('');
      setBlocks([]);
    }
  }, [documentId]);

  const loadDocument = async () => {
    if (!documentId) return;
    
    try {
      setLoading(true);
      const doc = await fetchDocumentById(documentId);
      setDocument(doc);
      setTitle(doc.title);
      setBlocks(doc.blocks || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load document:', err);
      setError('Failed to load document. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDocument = async () => {
    if (!document || !documentId) return;
    
    try {
      setSaving(true);
      await updateDocument(documentId, title, document.order_index);
      onDocumentUpdated();
      setError(null);
    } catch (err) {
      console.error('Failed to save document:', err);
      setError('Failed to save document. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddBlock = async () => {
    if (!documentId) return;
    
    try {
      setSaving(true);
      const newBlock = await createDocumentBlock(
        documentId,
        'rich-text',
        { html: '<p>Start typing here...</p>' },
        blocks.length
      );
      
      setBlocks([...blocks, newBlock]);
      setError(null);
    } catch (err) {
      console.error('Failed to add block:', err);
      setError('Failed to add content block. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBlock = async (blockId: number, content: string) => {
    const blockIndex = blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;
    
    const updatedBlock = {
      ...blocks[blockIndex],
      content: { html: content }
    };
    
    const newBlocks = [...blocks];
    newBlocks[blockIndex] = updatedBlock;
    setBlocks(newBlocks);
    
    try {
      await updateDocumentBlock(
        blockId,
        updatedBlock.type,
        updatedBlock.content,
        updatedBlock.order_index
      );
    } catch (err) {
      console.error('Failed to update block:', err);
      // Optionally show an error, but don't revert the UI to avoid losing user changes
    }
  };

  const handleDeleteBlock = async (blockId: number) => {
    if (!window.confirm('Are you sure you want to delete this content block?')) {
      return;
    }
    
    try {
      setSaving(true);
      await deleteDocumentBlock(blockId);
      
      const newBlocks = blocks.filter(b => b.id !== blockId);
      setBlocks(newBlocks);
      setError(null);
    } catch (err) {
      console.error('Failed to delete block:', err);
      setError('Failed to delete content block. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleMoveBlock = async (blockId: number, direction: 'up' | 'down') => {
    const blockIndex = blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;
    
    const newIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
    
    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= blocks.length) return;
    
    // Swap blocks
    const newBlocks = [...blocks];
    const temp = newBlocks[blockIndex];
    newBlocks[blockIndex] = newBlocks[newIndex];
    newBlocks[newIndex] = temp;
    
    // Update order_index
    newBlocks[blockIndex].order_index = blockIndex;
    newBlocks[newIndex].order_index = newIndex;
    
    setBlocks(newBlocks);
    
    try {
      setSaving(true);
      
      // Update both blocks in the database
      await updateDocumentBlock(
        newBlocks[blockIndex].id,
        newBlocks[blockIndex].type,
        newBlocks[blockIndex].content,
        newBlocks[blockIndex].order_index
      );
      
      await updateDocumentBlock(
        newBlocks[newIndex].id,
        newBlocks[newIndex].type,
        newBlocks[newIndex].content,
        newBlocks[newIndex].order_index
      );
      
      setError(null);
    } catch (err) {
      console.error('Failed to move block:', err);
      setError('Failed to reorder content blocks. Please try again.');
      
      // Revert the UI if there's an error
      loadDocument();
    } finally {
      setSaving(false);
    }
  };

  if (!documentId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <p className="text-xl mb-4">Select a document from the sidebar</p>
          <p>or create a new one to get started.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={loadDocument}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        {isAdmin ? (
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 bg-transparent flex-grow"
              placeholder="Document Title"
            />
            <button
              onClick={handleSaveDocument}
              disabled={saving}
              className={`ml-2 p-2 rounded ${saving ? 'bg-gray-300 dark:bg-gray-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              title="Save document"
            >
              <FiSave />
            </button>
          </div>
        ) : (
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
        )}
      </div>

      {blocks.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          {isAdmin ? (
            <>
              <p className="mb-4">This document has no content blocks yet.</p>
              <button
                onClick={handleAddBlock}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Content Block
              </button>
            </>
          ) : (
            <p>This document is empty.</p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {blocks.map((block) => (
            <div key={block.id} className="border rounded-lg overflow-hidden">
              {isAdmin && (
                <div className="bg-gray-100 dark:bg-gray-800 p-2 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMoveBlock(block.id, 'up')}
                      disabled={blocks.indexOf(block) === 0}
                      className={`p-1 rounded ${blocks.indexOf(block) === 0 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title="Move up"
                    >
                      <FiMove className="transform rotate-180" />
                    </button>
                    <button
                      onClick={() => handleMoveBlock(block.id, 'down')}
                      disabled={blocks.indexOf(block) === blocks.length - 1}
                      className={`p-1 rounded ${blocks.indexOf(block) === blocks.length - 1 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title="Move down"
                    >
                      <FiMove />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteBlock(block.id)}
                    className="p-1 rounded text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    title="Delete block"
                  >
                    <FiTrash />
                  </button>
                </div>
              )}
              <div className="p-4">
                <TipTapEditor
                  content={block.content.html}
                  onChange={(content) => handleUpdateBlock(block.id, content)}
                  readOnly={!isAdmin}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="mt-6 text-center">
          <button
            onClick={handleAddBlock}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center mx-auto"
          >
            <FiPlus className="mr-2" />
            Add Content Block
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;
