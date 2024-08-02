import { YoutubeVideo } from "./youtube-video";

export function YoutubeVideoGrid({ urls }: { urls: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {urls.map((url) => (
        <YoutubeVideo key={url} url={url} />
      ))}
    </div>
  );
}
