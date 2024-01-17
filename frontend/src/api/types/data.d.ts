import { type color } from './colors.d';
export interface Playlist {
    id: string
    albumId: number
    title: string
    color: color
    cover: string
    artists: string[]
}

export interface Song {
    id: number
    albumId: number
    title: string
    image: string
    artists: string[]
    album: string
    duration: string
}
