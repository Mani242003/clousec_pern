import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAdminCredentials } from './services/api';

// Layout components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Lazy-loaded page components for better performance
const HomePage = lazy(() => import('./Pages/HomePage'));
const BlogList = lazy(() => import('./components/Blog/BlogList'));
const BlogDetail = lazy(() => import('./components/Blog/BlogDetail'));
const CaseStudyList = lazy(() => import('./components/CaseStudy/CaseStudyList'));
const CaseStudyDetail = lazy(() => import('./components/CaseStudy/CaseStudyDetail'));
const LoginPage = lazy(() => import('./Pages/LoginPage'));
const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));
const BlogForm = lazy(() => import('./components/Blog/BlogForm'));
const CaseStudyForm = lazy(() => import('./components/CaseStudy/SimpleCaseStudyForm'));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage'));
const PdfViewer = lazy(() => import('./components/Shared/PdfViewer'));
const Documentation = lazy(() => import('./Pages/Documentation'));

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = !!getAdminCredentials();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16 pb-12">
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/case-studies" element={<CaseStudyList />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/view-pdf" element={<PdfViewer />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/documentation" element={<Documentation />} />
            
            {/* Protected admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/blogs/new" element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/blogs/edit/:id" element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/case-studies/new" element={
              <ProtectedRoute>
                <CaseStudyForm />
              </ProtectedRoute>
            } />
            <Route path="/admin/case-studies/edit/:id" element={
              <ProtectedRoute>
                <CaseStudyForm />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
