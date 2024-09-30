import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface UnauthorizedUserProps {
  message?: string;
}

export const UnauthorizedUser: React.FC<UnauthorizedUserProps> = ({
  message = "You are not authorized to view this page.",
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-warning" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-text">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-md text-gray-600">{message}</p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Go to Home
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
