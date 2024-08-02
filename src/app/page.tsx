import { api, HydrateClient } from "@/trpc/server";
import { YoutubeVideoGrid } from "./video/youtube-video-grid";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  //   const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-8 p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">Your videos</h1>
          <Separator />
        </div>

        <YoutubeVideoGrid
          videos={[
            { name: "foo", url: "https://www.youtube.com/watch?v=JBbliWyaygM" },
            { name: "foo", url: "https://www.youtube.com/watch?v=XDpoBc8t6gE" },
            { name: "foo", url: "https://www.youtube.com/watch?v=ko4IMxJW0rU" },
            { name: "foo", url: "https://www.youtube.com/watch?v=mPymRFeTJa4" },
            { name: "foo", url: "https://www.youtube.com/watch?v=Px9biv1pgVE" },
          ]}
        />
      </main>
    </HydrateClient>
  );
}
