import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            appearance-none block ${fullWidth ? "w-full" : "w-auto"}
            px-3 py-2 border border-gray-300 rounded-md shadow-sm
            placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary
            sm:text-sm ${error ? "border-danger" : ""} ${className}
          `}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
