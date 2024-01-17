import { create } from 'zustand';
import type { iPlayerStore, iCurrentMusic } from './types/playerStore';

export const usePlayerStore = create<iPlayerStore>((set) => ({
    isPlaying: false,
    currentMusic: {
        playlist: null,
        song: null,
        songs: []
    },
    setIsPlaying: (isPlaying: boolean) => { set({ isPlaying }); },
    setCurrentMusic: (currentMusic: iCurrentMusic) => { set({ currentMusic }); }
}));
