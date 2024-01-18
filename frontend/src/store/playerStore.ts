import { create } from 'zustand';
import { type Music } from '../types';
import { type iPlayerStore } from '../types/playerStore';

export const usePlayerStore = create<iPlayerStore>((set) => ({
    isPlaying: false,
    currentMusic: null,
    setIsPlaying: (isPlaying: boolean) => { set({ isPlaying }); },
    setCurrentMusic: (currentMusic: Music) => { set({ currentMusic }); }
}));
