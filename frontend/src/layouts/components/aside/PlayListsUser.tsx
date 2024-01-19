import { getAllPlaylistUser } from '@/src/api';
import { useEffect } from 'react';
import SideMenuCard from './AsideMenuCard.tsx';
import { isLogged } from '@/src/utils/isLogged.ts';
import { useUserStore } from '@/src/store/userStore.ts';

const PlayListsUser = (): JSX.Element => {
    const { token, favPlaylists, setFavPlaylists } = useUserStore(state => state);

    useEffect(() => {
        if (isLogged()) {
            getAllPlaylistUser(token).then(playlists => { setFavPlaylists(playlists); }).catch(err => { console.error(err); });
        }
    }, []);
    return (
        <>
            {favPlaylists.map((playList) => <SideMenuCard key={playList.id} playList={playList} />)}
        </>
    );
};
export default PlayListsUser;
