// components/GradientLinkButton.tsx

import React from "react";
import { Link } from "react-router-dom"; // Use "next/link" if using Next.js

interface GradientLinkButtonProps {
  path: string;
  children?: React.ReactNode;
  className?: string;
  icon? : string; 
}

const GradientLinkButton: React.FC<GradientLinkButtonProps> = ({
  path,
  children ,
  className = "",
  icon = 'true'
}) => {
  const baseClasses =
    "group inline-block text-center flex  items-center justify-center  px-3 py-2  bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border-2 border-transparent";

  return (
    <Link to={path} className={`${baseClasses} ${className}`}>
      <span className="flex items-center justify-center gap-1">
        {children}
       {
        icon === 'true' ?  <span className="transform text-center flex  items-center justify-center  transition-transform duration-300 group-hover:translate-x-1">
        →
      </span> : <></>
       }
      </span>
    </Link>
  );
};

export default GradientLinkButton;
