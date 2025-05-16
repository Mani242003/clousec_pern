import React, { useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CodeBlockWithCopy: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  const [copied, setCopied] = useState(false);
  
  const language = node.attrs.language || 'javascript';
  const content = node.textContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodeViewWrapper className="code-block-wrapper relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md flex items-center gap-1 text-sm"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <FiCheck className="text-green-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FiCopy />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="absolute top-2 left-2 bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded-md">
        {language}
      </div>
    </NodeViewWrapper>
  );
};

export default CodeBlockWithCopy;
