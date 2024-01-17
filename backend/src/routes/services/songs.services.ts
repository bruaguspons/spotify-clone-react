import { songs } from '@/lib/data';
import { getOnePlaylistById } from './playlists.services';
import { type Playlist, type Song } from '@/lib/data.d';

export const getAllSongs = (): Song[] => {
    return songs;
};

export const getSongsFromPlaylistId = (id: Playlist['id']): Song[] => {
    const playlist = getOnePlaylistById(id);
    return songs.filter(song => song.albumId === playlist?.albumId);
};
