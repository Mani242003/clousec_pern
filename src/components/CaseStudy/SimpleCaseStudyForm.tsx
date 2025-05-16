import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CaseStudy, createCaseStudy, updateCaseStudy, fetchCaseStudyById } from '../../services/api';
import { Helmet } from 'react-helmet';

const SimpleCaseStudyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    imageUrl: string;
    pdfUrl: string;
  }>({
    title: '',
    content: '',
    imageUrl: '',
    pdfUrl: '',
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(isEditMode);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadCaseStudy = async () => {
      if (!isEditMode) return;
      
      try {
        setInitialLoading(true);
        const caseStudyId = parseInt(id!);
        if (isNaN(caseStudyId)) {
          throw new Error('Invalid case study ID');
        }
        
        const data = await fetchCaseStudyById(caseStudyId);
        setFormData({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl || '',
          pdfUrl: data.pdfUrl || '',
        });
        
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
        
        if (data.pdfUrl) {
          setPdfDataUrl(data.pdfUrl);
          // Extract filename from data URL if possible
          const fileName = data.pdfUrl.includes('/') 
            ? data.pdfUrl.split('/').pop() 
            : `${data.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
          setPdfFileName(fileName || 'case-study.pdf');
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load case study. Please try again later.');
        console.error('Error loading case study:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadCaseStudy();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('PDF size exceeds 10MB. Please choose a smaller file.');
        return;
      }
      
      setPdfFile(file);
      setPdfFileName(file.name);
      
      // Convert PDF to data URL for storage and download
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPdfDataUrl(dataUrl);
        setFormData(prev => ({
          ...prev,
          pdfUrl: dataUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const caseStudyData = {
        title: formData.title,
        content: formData.content,
        imageUrl: imagePreview || formData.imageUrl || '',
        pdfUrl: pdfDataUrl || formData.pdfUrl || '',
        // These fields are required by the API but we'll send empty values
        industry: '',
        orgType: '',
        challenge: '',
        solution: '',
        results: '',
        testimonial: ''
      };
      
      if (isEditMode) {
        const caseStudyId = parseInt(id!);
        if (isNaN(caseStudyId)) {
          throw new Error('Invalid case study ID');
        }
        await updateCaseStudy(caseStudyId, caseStudyData);
      } else {
        await createCaseStudy(caseStudyData);
      }
      
      navigate('/admin');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} case study. Please try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} case study:`, err);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>{isEditMode ? 'Edit Case Study' : 'Create Case Study'} | ClouSec</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Case Study' : 'Create New Case Study'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Title Field */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter case study title"
          />
        </div>
        
        {/* Image Upload Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Featured Image <span className="text-red-500">*</span>
          </label>
          
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
            >
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </button>
            
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
              >
                Remove Image
              </button>
            )}
          </div>
          
          {imagePreview && (
            <div className="mt-4 border rounded-md p-2 max-w-md">
              <img src={imagePreview} alt="Preview" className="max-h-64 object-contain" />
              <p className="text-sm text-gray-500 mt-1">
                Image preview (max 5MB)
              </p>
            </div>
          )}
        </div>
        
        {/* PDF Upload Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            PDF Document <span className="text-red-500">*</span>
          </label>
          
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={pdfFileInputRef}
              accept=".pdf"
              onChange={handlePdfChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => pdfFileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
            >
              {pdfFileName ? 'Change PDF' : 'Upload PDF'}
            </button>
            
            {pdfFileName && (
              <button
                type="button"
                onClick={() => {
                  setPdfFileName(null);
                  setPdfFile(null);
                  setPdfDataUrl(null);
                  if (pdfFileInputRef.current) pdfFileInputRef.current.value = '';
                  setFormData(prev => ({ ...prev, pdfUrl: '' }));
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
              >
                Remove PDF
              </button>
            )}
          </div>
          
          {pdfFileName && (
            <div className="mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">{pdfFileName}</span>
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-2">
            Upload a PDF version of the case study (max 10MB)
          </p>
        </div>
        
        {/* Content Field with HTML Support */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter case study content here. HTML formatting is supported."
          />
          <p className="text-sm text-gray-600 mt-1">
            HTML formatting is supported. You can use tags like &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
          </p>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Case Study' : 'Create Case Study'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleCaseStudyForm;
