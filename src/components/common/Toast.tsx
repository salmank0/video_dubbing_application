import React from "react";

type ToastType = "success" | "error" | "warning";
interface ToastProps {
  message: string;
  type: ToastType;
}
const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const colors = {
    success: "bg-success",
    error: "bg-danger",
    warning: "bg-warning",
  };

  return (
    <div>
      <div
        className={`${colors[type]} text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
