import React from 'react';

interface AspectRatioBoxProps {
  ratio: string; // Format: "width:height", e.g. "16:9"
  children: React.ReactNode;
  className?: string;
}

/**
 * AspectRatioBox component to prevent Cumulative Layout Shift (CLS)
 * Maintains a consistent aspect ratio for content like images and videos
 * 
 * @param ratio - The aspect ratio in format "width:height" (e.g. "16:9")
 * @param children - The content to display inside the box
 * @param className - Additional CSS classes
 */
const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({ 
  ratio, 
  children, 
  className = '' 
}) => {
  // Parse the ratio string (e.g. "16:9") into width and height numbers
  const [width, height] = ratio.split(':').map(Number);
  
  // Calculate the padding-bottom percentage to maintain the aspect ratio
  const paddingBottom = `${(height / width) * 100}%`;

  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ paddingBottom }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AspectRatioBox;
