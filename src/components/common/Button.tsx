import React from "react";

const Button = ({ label = "Button", ...props }) => {
  return (
    <div className="w-full">
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        {...props}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
