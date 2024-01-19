import getCookieSession from '@/src/utils/getCookieSession';
import type { User } from './types/User';
import type { Playlist } from './types/data';

export const login = async (body: BodyInit): Promise<User> => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/users/login', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        credentials: 'include',
        body
    });

    if (!response.ok) throw new Error(response.statusText);

    const data: User = await response.json();
    return data;
};

export const singup = async (body: BodyInit): Promise<User> => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/users/singup', {
        method: 'POST',
        credentials: 'include',
        body
    });

    if (!response.ok) throw new Error(response.statusText);

    const data: User = await response.json();
    return data;
};
export const logout = async (): Promise<void> => {
    // const token = getCookieSession();
    await fetch(import.meta.env.VITE_BACKEND_URL + 'api/users/logout', {
        method: 'GET',
        credentials: 'include'
    });
};

export const getUserInfo = async(): Promise<User> => {
    const token = getCookieSession();

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/users/getInfo', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    return data.user;
};

export const getAllPlaylistUser = async(token: User['token']): Promise<Playlist[]> => {
    if (token === '') {
        token = getCookieSession();
    }

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/users/getAllPlaylists', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
        const data = await response.json();
        return data.isFavPlaylists;
    }
    // TODO: Falta manejar los errores correctamente
    return [];
};

export const isFavPlaylist = async(token: User['token'], id: Playlist['id']): Promise<boolean> => {
    if (token === '') {
        token = getCookieSession();
    }

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + `api/users/playlists?id=${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) {
        const data = await response.json();
        return data.isFavPlaylist;
    }

    // TODO: Falta manejar los errores correctamente
    return false;
};

export const addOrRemovePlaylist = async(token: User['token'], id: Playlist['id']): Promise<boolean> => {
    if (token === '') {
        token = getCookieSession();
    }
    const formData = new FormData();
    formData.append('playlistId', id);
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + 'api/users/playlists', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });

    return response.ok;
};
