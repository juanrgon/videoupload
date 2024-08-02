import { YoutubeVideoGrid } from "./video/youtube-video-grid";
import { Separator } from "@/components/ui/separator";
import { AddVideoButton } from "./video/youtube-video-add-button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-8">
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl">Your videos</h1>
          <AddVideoButton />
        </div>
        <Separator />
      </div>

      <YoutubeVideoGrid />
    </main>
  );
}
