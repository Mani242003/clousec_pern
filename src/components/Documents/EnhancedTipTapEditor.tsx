import React, { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { FiBold, FiItalic, FiList, FiLink, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight, FiTable, FiCode } from 'react-icons/fi';

// Create a lowlight instance with common languages
const lowlight = createLowlight(common);

// Import styles for syntax highlighting
import 'highlight.js/styles/github-dark.css';

// Add copy button to code blocks
const addCopyButtonToCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(codeBlock => {
    // Skip if already has a copy button
    if (codeBlock.querySelector('.code-copy-button')) return;
    
    const content = codeBlock.textContent || '';
    const language = codeBlock.querySelector('code')?.className.replace('language-', '') || 'text';
    
    // Add language label
    const languageLabel = document.createElement('div');
    languageLabel.className = 'code-block-language-label';
    languageLabel.textContent = language;
    codeBlock.appendChild(languageLabel);
    
    // Add copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-block-copy-button';
    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
    
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(content);
      copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
      copyButton.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
      
      setTimeout(() => {
        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
        copyButton.style.backgroundColor = '';
      }, 2000);
    });
    
    codeBlock.appendChild(copyButton);
  });
};

interface EnhancedTipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

const EnhancedTipTapEditor: React.FC<EnhancedTipTapEditorProps> = ({ content, onChange, readOnly = false }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [codeLanguage, setCodeLanguage] = useState<string>('javascript');
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);

  const supportedLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'sql', label: 'SQL' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable the default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Image,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Add copy buttons to code blocks after render
  useEffect(() => {
    if (readOnly) {
      // Use a small delay to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        addCopyButtonToCodeBlocks();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [readOnly, content]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageModal(false);
    }
  };

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkModal(false);
    }
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addCodeBlock = () => {
    editor
      .chain()
      .focus()
      .toggleCodeBlock({ language: codeLanguage })
      .run();
    setShowCodeModal(false);
  };

  if (readOnly) {
    return (
      <div className="prose max-w-none dark:prose-invert">
        <EditorContent editor={editor} />
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Bold"
        >
          <FiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Italic"
        >
          <FiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Bullet List"
        >
          <FiList />
        </button>
        <button
          onClick={() => setShowLinkModal(true)}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Add Link"
        >
          <FiLink />
        </button>
        <button
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Add Image"
        >
          <FiImage />
        </button>
        <button
          onClick={addTable}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Add Table"
        >
          <FiTable />
        </button>
        <button
          onClick={() => setShowCodeModal(true)}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Add Code Block"
        >
          <FiCode />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Align Left"
        >
          <FiAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Align Center"
        >
          <FiAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          title="Align Right"
        >
          <FiAlignRight />
        </button>
      </div>

      <EditorContent editor={editor} className="p-4 min-h-[300px] prose max-w-none dark:prose-invert" />

      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addImage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addLink}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Code Block</h3>
            <label className="block text-sm font-medium mb-2">Select Language</label>
            <select
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={addCodeBlock}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTipTapEditor;
