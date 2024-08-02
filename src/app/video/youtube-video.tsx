"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { useDialog } from "@/components/ui/use-dialog";

export function YoutubeVideo(props: { url: string; name: string }) {
  const embedUrl = getEmbedUrl(props.url);

  return (
    <VideoCard name={props.name} url={props.url}>
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-md"
      />
    </VideoCard>
  );
}

function VideoCard(props: { children: React.ReactNode; name: string; url: string }) {
  const editDialog = useDialog();
  const deleteDialog = useDialog();

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{props.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-card-foreground hover:bg-card-foreground/10 absolute right-3 top-2"
            >
              <SettingsIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={editDialog.trigger}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={deleteDialog.trigger}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog {...editDialog.props}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
              <DialogDescription>
                <VideoForm name={props.name} url={props.url} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <AlertDialog {...deleteDialog.props}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This video will be permanently deleted. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}

export default function VideoForm(props: { name: string; url: string }) {
  const schema = z.object({
    name: z.string(),
    url: z.string().url(),
  });

  const editForm = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={editForm.handleSubmit((formData) => {
        return formData;
      })}
      className="mx-auto mt-8 max-w-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Name
        </label>
        <input
          {...editForm.register("name", { required: "Name is required" })}
          type="text"
          id="name"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {editForm.formState.errors.name && (
          <p className="text-xs italic text-red-500">
            {editForm.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="url"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          URL
        </label>
        <input
          {...editForm.register("url", {
            required: "URL is required",
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
              message: "Enter a valid URL",
            },
          })}
          type="text"
          id="url"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {editForm.formState.errors.url && (
          <p className="text-xs italic text-red-500">
            {editForm.formState.errors.url.message}
          </p>
        )}
      </div>

      <div className="flex items-right justify-between">
        <Button type="submit">Save</Button>
      </div>
    </form>
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

function SettingsIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
