import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import Toast from "@/components/common/Toast";
import { useAppContext } from "@/context/AppContext";
import { DubbedAudio, Video } from "@/types/dubbingInterface";
import React, { useState } from "react";

const LanguageForm = ({ formSubmitted = () => {} }) => {
  const { currentVideo, setCurrentVideo } = useAppContext();
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<DubbedAudio>({
    id: "new",
    language: "",
    description: "",
    audios: [],
    subTitles: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLanguage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVideo) {
      setError("Please select a video first");
      return;
    }
    if (currentVideo && !currentVideo.audios) {
      setCurrentVideo({ ...currentVideo, audios: [] });
    }

    if (!language.language) {
      setError("Please enter a language name");
      return;
    }

    let newLanguage: DubbedAudio = {
      id: Date.now().toString(),
      language: language.language,
      description: language.description,
      audios: [],
      subTitles: [],
    };

    setCurrentVideo({
      ...currentVideo,
      audios: [...currentVideo.audios, newLanguage],
      selectedLanguage: language.language,
    });
    setError(null);
    setLanguage({
      id: "new",
      language: "",
      description: "",
      audios: [],
      subTitles: [],
    });
    formSubmitted();
  };

  return (
    <>
      <div className="text-foreground bg-background p-5 sm:px-16 sm:py-5 md:px-32 text-center">
        <h2 className="text-3xl underline mb-2">Add New Language</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap flex-col md:flex-row p-2 rounded-lg shadow-lg"
        >
          {error && <Toast message={error} type="error" />}

          <div className="w-full">
            <Input
              label="Language Name"
              type="text"
              id="language"
              name="language"
              value={language.language}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Input
              label="Description"
              type="text"
              id="description"
              name="description"
              value={language.description}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Button label="Save" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default LanguageForm;
