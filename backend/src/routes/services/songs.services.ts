import { playlists, songs } from '@/lib/data';
import { type Playlist, type Song } from '@/lib/data.d';

export const getAllSongs = (): Song[] => {
    return songs;
};

export const getSongsFromPlaylistId = (id: Playlist['id']): Song[] => {
    const playlist = playlists.find(playlist => playlist.id === id);
    return songs.filter(song => song.albumId === playlist?.albumId);
};
