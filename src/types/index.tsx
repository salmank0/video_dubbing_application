import { Video } from "./dubbingInterface";
export type User = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  isLoggedIn?: boolean;
  token?: string;
};

export type ResponseMessage = {
  status: boolean;
  message: string;
  data?: string;
};

export interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  currentVideo: Video | null;
  setCurrentVideo: React.Dispatch<React.SetStateAction<Video | null>>;
}
