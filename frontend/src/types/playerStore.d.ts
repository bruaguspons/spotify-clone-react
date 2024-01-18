import { type Music } from '.';

export interface iPlayerStore {
    isPlaying: boolean
    currentMusic: Music | null
    setIsPlaying: (isPlaying: boolean) => void
    setCurrentMusic: (currentMusic: Music) => void
}
