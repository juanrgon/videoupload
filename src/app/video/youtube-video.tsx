import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function YoutubeVideo(props: { url: string; name: string }) {
  const embedUrl = getEmbedUrl(props.url);

  return (
    <VideoCard name={props.name}>
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-md"
      />
    </VideoCard>
  );
}

function VideoCard(props: { children: React.ReactNode; name: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}

function getEmbedUrl(url: string) {
  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2]?.length === 11 ? match[2] : null;
  };
  const videoId = extractVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}
