import React from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { User } from "lucide-react";

export const Header: React.FC = () => {
  const { user } = useAppContext();

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          DubStudio Pro
        </Link>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/videos" className="hover:text-accent">
                Videos
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="">
                <div className="flex items-center space-x-1 focus:outline-none">
                  <User className="w-5 h-5" />
                  <p>{user.name}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-x-2">
              <Link
                href="/login"
                className="bg-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-accent hover:bg-opacity-90 text-primary px-4 py-2 rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
