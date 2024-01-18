import { getAllPlaylistOfUser, type Playlist } from '@/src/api';
import { useEffect, useState } from 'react';
import SideMenuCard from './AsideMenuCard.tsx';
import { isLogged } from '@/src/utils/isLogged.ts';

const PlayListsUser = (): JSX.Element => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        if (isLogged()) {
            getAllPlaylistOfUser().then(data => {
                setPlaylists(data);
            }).catch(err => { console.error(err); });
        }
    }, []);
    return (
        <>
            {playlists.map((playList) => <SideMenuCard key={playList.id} playList={playList} />)}
        </>
    );
};
export default PlayListsUser;
