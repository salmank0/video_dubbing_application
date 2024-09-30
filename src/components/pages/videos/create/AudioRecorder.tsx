import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Audio, DubbedAudio } from "@/types/dubbingInterface";
import { Input } from "@/components/common/Input";
import Button from "@/components/common/Button";
import AudioMic from "./AudioMic";

const AudioRecorder: React.FC = () => {
  const { currentVideo, setCurrentVideo } = useAppContext();
  const [recordedAudios, setRecordedAudios] = useState<Audio[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentVideo && currentVideo.selectedLanguage) {
      const dubbedAudio = currentVideo.audios.find(
        (audio) => audio.language === currentVideo.selectedLanguage
      );
      if (dubbedAudio) {
        setRecordedAudios(dubbedAudio.audios);
      }
    }
  }, [currentVideo, currentVideo?.selectedLanguage]);

  const saveRecording = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioUrl || !startTime || !endTime) {
      setError("All Fields are mandatory");
      return;
    }

    const newAudio: Audio = {
      url: audioUrl,
      startTime: Number(startTime) || 0,
      endTime: Number(endTime) || 0,
    };

    setRecordedAudios((prevAudios) => [...prevAudios, newAudio]);

    if (currentVideo && currentVideo.selectedLanguage) {
      const updatedAudios: DubbedAudio[] = currentVideo.audios.map((audio) => {
        if (audio.language === currentVideo.selectedLanguage) {
          return {
            ...audio,
            audios: [...audio.audios, newAudio],
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
    setAudioUrl(null);
    setError(null);
  };

  const deleteAudio = (index: number) => {
    if (currentVideo && currentVideo.selectedLanguage) {
      const updatedAudios: DubbedAudio[] = currentVideo.audios.map((audio) => {
        if (audio.language === currentVideo.selectedLanguage) {
          const updatedAudioList = audio.audios.filter((_, i) => i !== index);
          return { ...audio, audios: updatedAudioList };
        }
        return audio;
      });

      setCurrentVideo({
        ...currentVideo,
        audios: updatedAudios,
      });
    }
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    setAudioUrl(URL.createObjectURL(audioBlob));
  };

  return (
    <>
      {!currentVideo || !currentVideo.selectedLanguage ? null : (
        <div className="w-full mx-auto mt-8 flex flex-grow flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 text-center ">
            {error ? <p className="text-danger">{error}</p> : null}
            <h2 className="text-lg font-bold mb-4">
              Record Audio for{" "}
              <span className="underline">{currentVideo.selectedLanguage}</span>
            </h2>
            <form onSubmit={saveRecording} className="space-y-4">
              <AudioMic onRecordingComplete={handleRecordingComplete} />
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

              <div className="">
                <Button label="Add Audio" type="submit" />
              </div>
            </form>
          </div>

          <div className="mt-8 md:mt-0 text-center w-full md:w-1/">
            <h3 className="text-lg font-bold mb-4">
              Existing Audios for{" "}
              <span className="underline">{currentVideo.selectedLanguage}</span>
            </h3>
            {!recordedAudios ||
              (recordedAudios.length === 0 && <p>No Recorded Audios found</p>)}
            <ul className="space-y-2">
              {recordedAudios.map((audio, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>
                    {audio.startTime.toFixed(1)}s - {audio.endTime.toFixed(1)}s:
                  </span>
                  <audio src={audio.url} controls className="ml-4" />
                  <button
                    onClick={() => deleteAudio(index)}
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

export default AudioRecorder;
