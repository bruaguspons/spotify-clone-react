import type { Playlist, Song } from '@/api/types/data';

export interface iCurrentMusic {
    playlist: Playlist | null
    song: Song | null
    songs: Song[]
}

export interface iPlayerStore {
    isPlaying: boolean
    currentMusic: iCurrentMusic
    setIsPlaying: (isPlaying: boolean) => void
    setCurrentMusic: (currentMusic: iCurrentMusic) => void
}
