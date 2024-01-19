import getCookieSession from '@/src/utils/getCookieSession';
import type { Playlist, Song } from './types/data.d';

export const getAllPlaylist = async (): Promise<Playlist[]> => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/playlist');
    const data: Playlist[] = await res.json();
    return data;
};

export const getOnePlaylistById = async (id: Playlist['id']): Promise<Playlist> => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + `api/playlist/${id}`);
    const data: Playlist = await res.json();
    return data;
};

export const getAllSongs = async (): Promise<Song[]> => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/song');
    const data: Song[] = await res.json();
    return data;
};
export const getSongsFromPlaylist = async (id: Playlist['id']): Promise<Song[]> => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + `api/song/songsFromPlaylist/${id}`);
    const data: Song[] = await res.json();
    return data;
};
export const getFullAllPlaylist = async (): Promise<Playlist[]> => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/playlist/all');
    const data: Playlist[] = await res.json();
    return data;
};

export const getAllPlaylistOfUser = async (): Promise<Playlist[]> => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/playlist/userplaylists', {
        method: 'GET',
        headers: { Authorization: `Bearer ${getCookieSession()}` }
    });
    if (!res.ok) return [];
    const data: Playlist[] = await res.json();
    return data;
};
