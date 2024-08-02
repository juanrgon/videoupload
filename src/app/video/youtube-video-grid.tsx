import { YoutubeVideo } from "./youtube-video";

export function YoutubeVideoGrid(props: {
  videos: { name: string; url: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {props.videos.map((v) => (
        <YoutubeVideo key={v.url} url={v.url} name={v.name} />
      ))}
    </div>
  );
}
