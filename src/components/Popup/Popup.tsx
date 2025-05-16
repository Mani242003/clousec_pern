import React from 'react';
import awsCertified from "../../assets/awsCertified.png";
import { IoCloseSharp } from "react-icons/io5";
import Confetti from 'react-confetti';
import useWindowSize from "../../hooks/useWindowSize"; // adjust path if needed

interface PopupProps {
  show: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onClose }) => {
  const { width, height } = useWindowSize();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[1000] flex items-center justify-center ">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-pop pb-[20px]">
        {/* Close Button inside the card */}
        <div className="absolute top-4 right-4 text-gray-700 text-3xl cursor-pointer z-10">
          <IoCloseSharp onClick={onClose} />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-center py-6 px-4 rounded-t-xl">
          <h1 className="text-3xl font-bold">🎉 Great News!</h1>
          <p className="text-sm mt-2">ClouSec has successfully cleared the AWS Foundation Technical Review, validating our platform’s adherence to AWS best practices for security, reliability, and operational excellence</p>
        </div>

        {/* Image */}
        <img src={awsCertified} className="w-full" alt="AWS Certified" />
            
      </div>
    </div>
  );
};

export default Popup;
