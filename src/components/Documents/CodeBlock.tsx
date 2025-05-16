import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CodeBlockProps {
  content: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className={`language-${language} rounded-md overflow-hidden`}>
        <code className={`language-${language}`}>{content}</code>
      </pre>
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
    </div>
  );
};

export default CodeBlock;
