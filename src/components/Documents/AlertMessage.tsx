import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertMessageProps {
  type: AlertType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ 
  type, 
  message, 
  duration = 3000, 
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'info':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-green-500" />;
      case 'error':
        return <FiAlertCircle className="text-red-500" />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-500" />;
      case 'info':
        return <FiAlertCircle className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 border-l-4 rounded-md shadow-md ${getAlertStyles()}`} role="alert">
      <div className="flex items-center">
        <div className="mr-2">
          {getIcon()}
        </div>
        <div className="text-sm font-medium">
          {message}
        </div>
      </div>
      <button 
        onClick={handleClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <FiX />
      </button>
    </div>
  );
};

export default AlertMessage;
