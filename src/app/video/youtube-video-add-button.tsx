"use client";
import { Button } from "@/components/ui/button";
import { useAddVideo } from "./youtube-video-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useDialog } from "@/components/ui/use-dialog";

export function AddVideoButton() {
  const addDialog = useDialog();

  return (
    <Dialog {...addDialog.props}>
      <DialogTrigger asChild>
        <Button>Add Video</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>Add Video</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <AddVideoForm onAdd={addDialog.dismiss} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default function AddVideoForm(props: { onAdd: () => void }) {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    url: z.string().url({ message: "Enter a valid URL" }),
  });

  type FormData = z.infer<typeof schema>;
  const addVideo = useAddVideo();

  const addForm = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={addForm.handleSubmit((formData) => {
        addForm.reset();
        props.onAdd();
        addVideo.mutate({
          ...formData,
        });

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
          {...addForm.register("name")}
          type="text"
          id="name"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          data-1p-ignore
        />
        {addForm.formState.errors.name && (
          <p className="text-xs italic text-red-500">
            {addForm.formState.errors.name.message}
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
          {...addForm.register("url")}
          type="text"
          id="url"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          data-1p-ignore
        />
        {addForm.formState.errors.url && (
          <p className="text-xs italic text-red-500">
            {addForm.formState.errors.url.message}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
