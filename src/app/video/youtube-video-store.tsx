import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const VideoSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
});

type Video = z.infer<typeof VideoSchema>;

const STORAGE_KEY = "videoList";

export function getVideosFromStorage() {
  const storedVideos = localStorage.getItem(STORAGE_KEY);
  if (!storedVideos) return [];
  try {
    return z.array(VideoSchema).parse(JSON.parse(storedVideos));
  } catch (error) {
    console.error("Failed to parse stored videos:", error);
    return [];
  }
}

export function saveVideosToStorage(videos: Video[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

export function useVideos() {
  return useQuery<Video[], Error>({
    queryKey: ["videos"],
    queryFn: getVideosFromStorage,
  });
}

export function useAddVideo() {
  const queryClient = useQueryClient();
  return useMutation<Video, Error, Omit<Video, "id">>({
    mutationFn: async (newVideo) => {
      const videos = getVideosFromStorage();
      const videoWithId = { ...newVideo, id: Date.now().toString() };
      const updatedVideos = [...videos, videoWithId];
      saveVideosToStorage(updatedVideos);
      return videoWithId;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export function useEditVideo() {
  const queryClient = useQueryClient();
  return useMutation<Video, Error, Video>({
    mutationFn: async (updatedVideo) => {
      const videos = getVideosFromStorage();
      const updatedVideos = videos.map((v) =>
        v.id === updatedVideo.id ? updatedVideo : v,
      );
      saveVideosToStorage(updatedVideos);
      return updatedVideo;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: async (videoId) => {
      const videos = getVideosFromStorage();
      const updatedVideos = videos.filter((v) => v.id !== videoId);
      saveVideosToStorage(updatedVideos);
      return videoId;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}
