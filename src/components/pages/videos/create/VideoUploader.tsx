import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Upload } from "lucide-react";
import { Video } from "@/types/dubbingInterface";
import { Input } from "@/components/common/Input";
import Toast from "@/components/common/Toast";

export const VideoUploader: React.FC = () => {
  const { currentVideo, setCurrentVideo } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !file || !originalLanguage || !duration) {
      setError("Please fill in all the required fields");
      return;
    }
    const videoUrl = URL.createObjectURL(file);

    const newVideo: Video = {
      id: Date.now().toString(),
      title,
      description,
      duration,
      url: videoUrl,
      originalLanguage,
      audios: currentVideo?.audios || [
        {
          id: Date.now().toString(),
          language: originalLanguage,
          description: "",
          audios: [],
          subTitles: [],
        },
      ],
      selectedLanguage: currentVideo?.selectedLanguage || originalLanguage,
    };
    setCurrentVideo(newVideo);
    setTitle("");
    setDescription("");
    setDuration(0);
    setOriginalLanguage("");
    setFile(null);

    console.log("Video uploaded:", newVideo);
  };

  return (
    <>
      <div className="text-foreground bg-background p-5 sm:px-16 sm:py-5 md:px-32 text-center">
        <h2 className="text-3xl underline mb-2">Add New video</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap flex-col md:flex-row p-2 rounded-lg shadow-lg"
        >
          {error && <Toast message={error} type="error" />}
          <div className="w-full md:w-1/2 p-1">
            <Input
              label="Video Title"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-1">
            <Input
              label="Video Description"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-1">
            <Input
              label="Duration (in seconds)"
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => {
                setDuration(Number(e.target.value));
              }}
            />
          </div>
          <div className="w-full md:w-1/2 p-1">
            <Input
              label="Original Language"
              id="originalLanguage"
              name="originalLanguage"
              value={originalLanguage}
              onChange={(e) => setOriginalLanguage(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-700"
            >
              Video File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <label
                  htmlFor="video"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <span>Upload a file</span>
                    <input
                      id="video"
                      name="video"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="video/*"
                    />
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    MP4, WebM, or Ogg up to 10MB
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full mt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Save Video
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
