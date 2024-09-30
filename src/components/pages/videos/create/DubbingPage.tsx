import React, { useEffect, useState } from "react";
import { VideoUploader } from "@/components/pages/videos/create/VideoUploader";
import { Header } from "@/components/pages/videos/Header";
import VideoPlayer from "@/components/pages/videos/create/VideoPlayer";
import { useAppContext } from "@/context/AppContext";
import AudioRecorder from "@/components/pages/videos/create/AudioRecorder";
import SubtitleForm from "@/components/pages/videos/create/SubtitleForm";
import Button from "@/components/common/Button";
import LanguageForm from "./LanguageForm";

const DubbingPage: React.FC = () => {
  const { currentVideo, setCurrentVideo, videos, setVideos } = useAppContext();
  const [showLanguageForm, setShowLanguageForm] = useState<boolean>(false);

  const changeLanguage = (selectedLanguage: string) => {
    if (currentVideo && currentVideo.selectedLanguage) {
      setCurrentVideo({ ...currentVideo, selectedLanguage: selectedLanguage });
    }
  };

  useEffect(() => {
    console.log({
      currentVideo: JSON.stringify(JSON.parse(JSON.stringify(currentVideo))),
    });
  }, [currentVideo]);

  const saveVideo = () => {
    if (currentVideo && currentVideo.url) {
      const isNew =
        videos.find((video) => video.id === currentVideo.id) === undefined;

      if (isNew) {
        setVideos([...videos, currentVideo]);
      } else {
        const updatedVideos = videos.map((video) => {
          if (video.id === currentVideo.id) {
            return currentVideo;
          }
          return video;
        });
        setVideos(updatedVideos);
      }
    }
  };

  return (
    <div className="">
      <Header />
      <h2 className="text-primary text-3xl my-5 text-center font-bold">
        Dubbing Page
      </h2>

      <div className="px-5 py-5">
        {currentVideo ? <VideoPlayer /> : <VideoUploader />}
        {currentVideo && currentVideo.url ? (
          <Button label="Save Progress" type="button" onClick={saveVideo} />
        ) : null}

        {currentVideo && currentVideo.audios ? (
          <div className="border border-primary p-2">
            <div className=""></div>
            <div className="flex flex-wrap items-center justify-between my-5">
              <h3 className="text-primary text-2xl">Available Languages</h3>

              {!showLanguageForm ? (
                <div className="">
                  <Button
                    label="Add Language"
                    onClick={() => setShowLanguageForm(true)}
                  />
                </div>
              ) : null}
            </div>
            <ul className="flex flex-wrap gap-2">
              {currentVideo.audios.map((audio, i) => (
                <li key={audio.language + i} className="">
                  <Button
                    label={audio.language}
                    onClick={() => changeLanguage(audio.language)}
                  />
                </li>
              ))}
            </ul>
            {showLanguageForm ? (
              <LanguageForm formSubmitted={() => setShowLanguageForm(false)} />
            ) : null}

            <h4 className="text-xl font-semibold mt-5">Audio</h4>
            <hr />
            <AudioRecorder />

            <h4 className="text-xl font-semibold mt-5">Subtitles</h4>
            <hr />
            <SubtitleForm />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DubbingPage;
