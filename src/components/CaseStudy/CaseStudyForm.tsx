import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CaseStudy, createCaseStudy, updateCaseStudy, fetchCaseStudyById } from '../../services/api';

const CaseStudyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    industry: string;
    orgType: string;
    challenge: string;
    solution: string;
    results: string;
    testimonial: string;
    imageUrl: string;
    pdfUrl: string;
  }>({
    title: '',
    content: '',
    industry: '',
    orgType: '',
    challenge: '',
    solution: '',
    results: '',
    testimonial: '',
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
          industry: data.industry || '',
          orgType: data.orgType || '',
          challenge: data.challenge || '',
          solution: data.solution || '',
          results: data.results || '',
          testimonial: data.testimonial || '',
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
        console.log("PDF converted to data URL:", dataUrl.substring(0, 100) + "...");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Format content with structured data from form fields
      const formattedContent = `
        <h2>Overview</h2>
        <p>${formData.content}</p>
        
        <h2>Challenges</h2>
        <p>${formData.challenge}</p>
        
        <h2>Solution</h2>
        <p>${formData.solution}</p>
        
        <h2>Results</h2>
        <p>${formData.results}</p>
        
        <blockquote>
          <p>${formData.testimonial}</p>
        </blockquote>
      `;
      
      const caseStudyData = {
        title: formData.title,
        content: formattedContent,
        industry: formData.industry,
        orgType: formData.orgType,
        challenge: formData.challenge,
        solution: formData.solution,
        results: formData.results,
        testimonial: formData.testimonial,
        imageUrl: imagePreview || formData.imageUrl || '',
        pdfUrl: pdfDataUrl || formData.pdfUrl || '',
      };
      
      console.log("Submitting case study data:", {
        ...caseStudyData,
        pdfUrl: caseStudyData.pdfUrl ? `[PDF data URL - ${caseStudyData.pdfUrl.substring(0, 50)}...]` : ''
      });
      
      if (isEditMode) {
        const caseStudyId = parseInt(id!);
        if (isNaN(caseStudyId)) {
          throw new Error('Invalid case study ID');
        }
        await updateCaseStudy(caseStudyId, caseStudyData);
      } else {
        await createCaseStudy(caseStudyData);
      }
      
      navigate('/case-studies');
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Case Study' : 'Create New Case Study'}
      </h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-800">Case Study Input Form</h2>
        <p className="text-blue-700">
          Hi! To help us build a compelling case study, please provide the following details about your organization's experience using ClouSec. All fields are required.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a compelling headline summarizing the case"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Featured Image
          </h3>
          
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
                Note: For best results, use images smaller than 5MB
              </p>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            PDF Download
          </h3>
          
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
            Upload a PDF version of the case study for users to download (max 10MB)
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🏢</span> Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry" className="block text-gray-700 font-medium mb-2">
                Industry / Sector
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Banking, Healthcare, Energy, CII"
              />
            </div>
            
            <div>
              <label htmlFor="orgType" className="block text-gray-700 font-medium mb-2">
                Organization Type
              </label>
              <input
                type="text"
                id="orgType"
                name="orgType"
                value={formData.orgType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Global Bank, Government Agency, FinTech Startup"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Overview
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a brief overview of the case study"
          />
          <p className="text-sm text-gray-600 mt-1">
            HTML formatting is supported for rich content.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🚨</span> Challenge
          </h3>
          
          <label htmlFor="challenge" className="block text-gray-700 font-medium mb-2">
            What were the key security or compliance challenges you faced?
          </label>
          <textarea
            id="challenge"
            name="challenge"
            value={formData.challenge}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe pain points such as inefficiencies, security gaps, or regulatory burdens."
          />
          <p className="text-sm text-gray-600 mt-1">
            e.g., "Manual remediation of misconfigurations," "Inefficient user access audits," etc.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🛠️</span> Solution
          </h3>
          
          <label htmlFor="solution" className="block text-gray-700 font-medium mb-2">
            What specific ClouSec features or solutions addressed your challenges?
          </label>
          <textarea
            id="solution"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Centralized dashboards, AI-driven remediation, automated compliance checks"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span className="mr-2">📈</span> Results
          </h3>
          
          <label htmlFor="results" className="block text-gray-700 font-medium mb-2">
            What measurable or qualitative results did you experience?
          </label>
          <textarea
            id="results"
            name="results"
            value={formData.results}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 80% reduction in manual effort, faster audits, improved compliance readiness"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span className="mr-2">💬</span> Testimonial
          </h3>
          
          <label htmlFor="testimonial" className="block text-gray-700 font-medium mb-2">
            Please provide a quote from a team member or leader about your experience with ClouSec.
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., &quot;ClouSec transformed the way we manage cloud security at scale.&quot;"
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/case-studies')}
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

export default CaseStudyForm;
