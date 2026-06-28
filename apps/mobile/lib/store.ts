import { create } from "zustand";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  plan: "free" | "pro" | "business";
  ai_credits_used: number;
  ai_credits_limit: number;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTrack: any | null;
  setCurrentTrack: (track: any | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  currentTrack: null,
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
}));
