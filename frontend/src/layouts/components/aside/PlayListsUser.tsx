import { getAllPlaylistOfUser, type Playlist } from '@/src/api';
import { useEffect, useState } from 'react';
import SideMenuCard from './AsideMenuCard.tsx';

const PlayListsUser = (): JSX.Element => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        getAllPlaylistOfUser().then(data => {
            setPlaylists(data);
        }).catch(err => { console.error(err); });
    }, []);
    return (
        <>
            {playlists.map((playList) => <SideMenuCard key={playList.id} playList={playList} />)}
        </>
    );
};
export default PlayListsUser;