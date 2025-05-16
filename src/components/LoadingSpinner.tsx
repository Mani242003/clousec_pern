import React from 'react';

/**
 * Loading spinner component shown during page transitions
 * Uses Tailwind CSS for styling
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
