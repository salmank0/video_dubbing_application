import { UnauthorizedUser } from "@/components/common/UnauthorizedUser";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { Header } from "./Header";
import { Video } from "@/types/dubbingInterface";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

const VideosPage = () => {
  const router = useRouter();
  const { user, videos, setCurrentVideo } = useAppContext();

  if (!videos) return <div>No videos</div>;

  const showVideo = (id: string) => {
    const selectedVideo = videos.find((video: Video) => video.id === id);
    if (selectedVideo) setCurrentVideo(selectedVideo);
    router.push(`/videos/create`);
  };

  const createVideo = () => {
    setCurrentVideo(null);

    router.push("/videos/create");
  };
  if (!user || !user.isLoggedIn)
    return (
      <UnauthorizedUser message="You are not authorized to view this page." />
    );
  return (
    <div>
      <Header />

      <div className="p-5 flex items-end">
        <Button label="Create Video" onClick={createVideo} />
      </div>

      {videos && videos.length > 0 ? (
        <div className="max-w-40 flex flex-col gap-3 mx-auto">
          {videos.map((video: Video) => (
            <div
              key={video.id}
              className="w-full p-2 shadow-lg hover:shadow-2xl bg-background text-foreground cursor-pointer"
              onClick={() => {
                showVideo(video.id);
              }}
            >
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <Button
                label={"Play " + video.title}
                onClick={() => showVideo(video.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          <h2>No videos found</h2>
        </>
      )}
    </div>
  );
};

export default VideosPage;
