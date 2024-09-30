import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Subtitle, DubbedAudio } from "@/types/dubbingInterface";
import { Input } from "@/components/common/Input";
import Button from "@/components/common/Button";

const SubtitleForm: React.FC = () => {
  const { currentVideo, setCurrentVideo } = useAppContext();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [text, setText] = useState("");
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  useEffect(() => {
    if (currentVideo && currentVideo.selectedLanguage) {
      const audioTrack = currentVideo.audios.find(
        (a) => a.language === currentVideo.selectedLanguage
      );
      if (audioTrack) {
        setSubtitles(audioTrack.subTitles);
      }
    }
  }, [currentVideo, currentVideo?.selectedLanguage]);

  useEffect(() => {
    if (!currentVideo || !currentVideo.selectedLanguage) {
      return;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubtitle: Subtitle = {
      startTime: parseFloat(startTime),
      endTime: parseFloat(endTime),
      text,
    };

    if (currentVideo && currentVideo.selectedLanguage) {
      const updatedAudios: DubbedAudio[] = currentVideo.audios.map((audio) => {
        if (audio.language === currentVideo.selectedLanguage) {
          return {
            ...audio,
            subTitles: [...audio.subTitles, newSubtitle].sort(
              (a, b) => a.startTime - b.startTime
            ),
          };
        }
        return audio;
      });

      setCurrentVideo({
        ...currentVideo,
        audios: updatedAudios,
      });
    }

    setStartTime("");
    setEndTime("");
    setText("");
  };

  const handleDelete = (index: number) => {
    if (currentVideo && currentVideo.selectedLanguage) {
      const updatedAudios: DubbedAudio[] = currentVideo.audios.map((audio) => {
        if (audio.language === currentVideo.selectedLanguage) {
          const updatedSubtitles = audio.subTitles.filter(
            (_, i) => i !== index
          );
          return { ...audio, subTitles: updatedSubtitles };
        }
        return audio;
      });

      setCurrentVideo({
        ...currentVideo,
        audios: updatedAudios,
      });
    }
  };

  return (
    <>
      {!currentVideo ? (
        <></>
      ) : (
        <div className="w-full mx-auto mt-8 flex flex-grow flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 text-center ">
            <h2 className="text-lg font-bold mb-4">
              Add Subtitle for{" "}
              <span className="underline">{currentVideo.selectedLanguage}</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="number"
                  label="Start Time (seconds)"
                  value={startTime}
                  name="startTime"
                  id="startTime"
                  onChange={(e) => setStartTime(e.target.value)}
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <Input
                  type="number"
                  label="End Time (seconds)"
                  value={endTime}
                  name="endTime"
                  id="endTime"
                  onChange={(e) => setEndTime(e.target.value)}
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <Input
                  label="Subtitle Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  name="text"
                  id="text"
                />
              </div>
              <div className="">
                <Button label="Add Subtitle" type="submit" />
              </div>
            </form>
          </div>

          <div className="mt-8 md:mt-0 text-center w-full md:w-1/">
            <h3 className="text-lg font-bold mb-4">
              Existing Subtitles{" "}
              <span className="underline">{currentVideo.selectedLanguage}</span>
            </h3>
            {!subtitles ||
              (subtitles.length === 0 && <p>No subtitles found</p>)}
            <ul className="space-y-2">
              {subtitles.map((subtitle, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>
                    {subtitle.startTime.toFixed(1)}s -{" "}
                    {subtitle.endTime.toFixed(1)}
                    s: {subtitle.text}
                  </span>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SubtitleForm;
