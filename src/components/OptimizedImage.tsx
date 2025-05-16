import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
}

/**
 * OptimizedImage component for improved performance
 * Features:
 * - Lazy loading for off-screen images
 * - Proper dimensions to prevent layout shifts
 * - Optional priority loading for above-the-fold images
 * - Placeholder support
 * 
 * @param src - Image source URL
 * @param alt - Alternative text for accessibility
 * @param width - Image width
 * @param height - Image height
 * @param className - Additional CSS classes
 * @param priority - Whether to load the image with high priority (no lazy loading)
 * @param placeholder - URL for placeholder image while loading
 * @param onLoad - Callback function when image is loaded
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = '',
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || src);

  useEffect(() => {
    // If priority is true, load the image immediately
    if (priority) {
      setCurrentSrc(src);
      return;
    }

    // If IntersectionObserver is available, use it for lazy loading
    if ('IntersectionObserver' in window) {
      const imgElement = document.createElement('img');
      imgElement.src = src;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
            observer.disconnect();
          }
        });
      }, {
        rootMargin: '200px', // Start loading when image is 200px from viewport
      });

      const currentElement = document.getElementById(`image-${src.replace(/[^\w]/g, '-')}`);
      if (currentElement) {
        observer.observe(currentElement);
      }

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setCurrentSrc(src);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <>
      <img
        id={`image-${src.replace(/[^\w]/g, '-')}`}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 rounded-[20px] shadow-lg`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        style={{
          objectFit: 'cover',
        }}
      />
      {!isLoaded && placeholder && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default OptimizedImage;
