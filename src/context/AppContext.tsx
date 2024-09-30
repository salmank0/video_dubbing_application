"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { AppContextType, User } from "@/types";
import { Video } from "@/types/dubbingInterface";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        videos,
        setVideos,
        currentVideo,
        setCurrentVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
