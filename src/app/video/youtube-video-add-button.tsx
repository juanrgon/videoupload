"use client";
import { Button } from "@/components/ui/button";
import { useAddVideo } from "./youtube-video-store";

export function AddVideoButton() {
  const addVideo = useAddVideo();

  return (
    <Button
      onClick={() =>
        addVideo.mutate({
          name: "foo",
          url: "https://www.youtube.com/watch?v=JBbliWyaygM",
        })
      }
    >
      Add Video
    </Button>
  );
}
