import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { FiBold, FiItalic, FiList, FiLink, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight, FiTable } from 'react-icons/fi';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ content, onChange, readOnly = false }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
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
    </div>
  );
};

export default TipTapEditor;
