"use client";
import { YoutubeVideo } from "./youtube-video";
import { useVideos } from "./youtube-video-store";

export function YoutubeVideoGrid() {
  const videos = useVideos();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.data?.map((v) => (
        <YoutubeVideo key={v.id} id={v.id} url={v.url} name={v.name} />
      ))}
    </div>
  );
}
