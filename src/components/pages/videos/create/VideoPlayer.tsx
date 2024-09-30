import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Subtitle, Audio } from "@/types/dubbingInterface";

const VideoPlayer: React.FC = () => {
  const { currentVideo, setCurrentVideo } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentAudio, setCurrentAudio] = useState<Audio | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const [currentTranslatedSubtitle, setCurrentTranslatedSubtitle] =
    useState<Subtitle | null>(null);

  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const videoElement = videoRef.current;
    videoElement?.addEventListener("timeupdate", updateTime);
    return () => {
      videoElement?.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  useEffect(() => {
    if (currentVideo) {
      updateAudioAndSubtitles();
    }
  }, [currentTime, currentVideo]);

  const updateAudioAndSubtitles = () => {
    if (!currentVideo) return;

    const selectedAudioTrack = currentVideo.audios.find(
      (audio) => audio.language === currentVideo.selectedLanguage
    );

    const originalAudioTrack = currentVideo.audios.find(
      (audio) => audio.language === currentVideo.originalLanguage
    );

    if (selectedAudioTrack) {
      // Update current audio
      const audio = selectedAudioTrack.audios.find(
        (audio) =>
          currentTime >= audio.startTime && currentTime <= audio.endTime
      );
      setCurrentAudio(audio || null);

      // Update current subtitle
      const subtitle = selectedAudioTrack.subTitles.find(
        (subtitle) =>
          currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
      );
      setCurrentSubtitle(subtitle || null);

      // Update translated subtitle if the selected language is different from the original
      if (
        currentVideo.selectedLanguage !== currentVideo.originalLanguage &&
        originalAudioTrack
      ) {
        const translatedSubtitle = originalAudioTrack.subTitles.find(
          (subtitle) =>
            currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
        );
        setCurrentTranslatedSubtitle(translatedSubtitle || null);
      } else {
        setCurrentTranslatedSubtitle(null);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        audioRef.current?.pause();
      } else {
        videoRef.current.play();
        if (currentAudio && audioRef.current) {
          audioRef.current.src = currentAudio.url;
          audioRef.current.currentTime = currentTime - currentAudio.startTime;
          audioRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (currentVideo) {
      setCurrentVideo({ ...currentVideo, selectedLanguage: e.target.value });
    }
  };

  if (!currentVideo) {
    return <div>No video selected</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-1">{currentVideo.title}</h2>
      <p className="text-gray-600 mb-4">{currentVideo.description}</p>
      <div className="flex items-center space-x-2 mb-1">
        <select
          value={currentVideo.selectedLanguage}
          onChange={handleLanguageChange}
          className="border rounded px-2 py-1"
        >
          <option value={currentVideo.originalLanguage}>
            Original ({currentVideo.originalLanguage})
          </option>
          {currentVideo.audios.map((audio) => (
            <option key={audio.id} value={audio.language}>
              {audio.language}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <video
          ref={videoRef}
          src={currentVideo.url}
          className="w-full rounded-lg"
          onClick={togglePlay}
          controls
        />
        <audio ref={audioRef} />
        <div className="absolute bottom-16 left-0 right-0 text-center">
          {currentSubtitle && (
            <div className="bg-black bg-opacity-50 text-white p-2 rounded">
              {currentSubtitle.text}
            </div>
          )}
          {currentTranslatedSubtitle && (
            <div className="bg-black bg-opacity-50 text-white p-2 rounded">
              {currentTranslatedSubtitle.text}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min={0}
            max={currentVideo.duration}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
