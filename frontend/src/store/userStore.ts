import { create } from 'zustand';
import { type User } from '@/src/api/types/User.d';
import { type Playlist } from '../api';

interface UserStore extends User {
    favPlaylists: Playlist[]
    setUser: (user: User) => void
    setFavPlaylists: (favPlaylists: Playlist[]) => void
}

export const useUserStore = create<UserStore>((set) => ({
    uuid: '',
    email: '',
    name: '',
    lastName: '',
    token: '',
    favPlaylists: [],
    setUser: (user: User) => { set({ ...user }); },
    setFavPlaylists: (favPlaylists: Playlist[]) => { set({ favPlaylists }); }
}));
