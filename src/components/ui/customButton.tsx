import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-lime-500 hover:bg-lime-600 text-black font-medium text-lg py-2 px-6 rounded-lg transition duration-300 ease-in-out shadow-md font-jakartaSans text-[16px] disabled:bg-[rgb(202 198 221 / var(--tw-text-opacity, 1))] disabled:text-gray-700 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;
