export function YoutubeVideo({ url }: { url: string }) {
  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2]?.length === 11 ? match[2] : null;
  };
  const videoId = extractVideoId(url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  return (
    <iframe
      src={embedUrl}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="aspect-video rounded-md w-full"
    />
  );
}
