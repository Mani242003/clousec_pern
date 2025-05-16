import React, { useEffect, useState } from 'react';

/**
 * ScrollProgressBar component shows a progress bar at the top of the page
 * that fills as the user scrolls down the page
 */
const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far the user has scrolled down the page
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      
      // Update state with percentage (0 to 100)
      setScrollProgress(scrolled * 100);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200">
      <div 
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
