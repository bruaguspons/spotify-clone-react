import getCookieSession from '@/src/utils/getCookieSession';
import type { User } from './types/User';
import type { Playlist } from './types/data';

export const login = async (body: BodyInit): Promise<User> => {
    const response = await fetch('http://localhost:4000/api/users/login', {
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
    const response = await fetch('http://localhost:4000/api/users/singup', {
        method: 'POST',
        credentials: 'include',
        body
    });

    const data: User = await response.json();
    return data;
};
export const logout = async (): Promise<void> => {
    const token = getCookieSession();
    await fetch('http://localhost:4000/api/users/singup', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const isFavPlaylist = async(token: User['token'], id: Playlist['id']): Promise<boolean> => {
    if (token === '') {
        token = getCookieSession();
    }

    const response = await fetch(`http://localhost:4000/api/users/playlists?id=${id}`, {
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
    if (!token) {
        token = getCookieSession();
    }
    const formData = new FormData();
    formData.append('playlistId', id);
    const response = await fetch('http://localhost:4000/api/users/playlists', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });

    return response.ok;
};