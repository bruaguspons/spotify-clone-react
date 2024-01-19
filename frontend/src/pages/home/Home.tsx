import { type Playlist, getAllPlaylist, getUserInfo, getAllPlaylistUser } from '@/src/api';
import LayoutHome from '@/src/layouts/LayoutHome';
import { useEffect, useState } from 'react';
import Header from '../../layouts/components/header/Header';
import PlayListItemCard from './components/PlayListItemCard';
import { addLink } from '@/src/utils/navigationStore';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '@/src/store/userStore';

const Home = (): JSX.Element => {
    const location = useLocation();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const { setUser, setFavPlaylists, token } = useUserStore(state => state);
    useEffect(() => {
        addLink(location.pathname);
        getAllPlaylist().then(data => {
            setPlaylists(data);
        }).catch(err => { console.error(err); });

        getUserInfo().then(user => { setUser(user); }).catch(err => { console.error(err); });
        getAllPlaylistUser(token).then(playlists => { setFavPlaylists(playlists); }).catch(err => { console.error(err); });
    }, []);

    return (
        <LayoutHome>

            <div
                id="playList-container"
                className="relative transition-all duration-100 bg-green-600"
            >
                <div className="relative z-10 px-6 pt-10">
                    <Header />
                    <div className="flex flex-wrap gap-4">
                        {
                            playlists.map((playList) => (
                                <PlayListItemCard key={playList.id} playList={playList} />
                            ))
                        }
                    </div>
                </div>
                <div
                    className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80"
                >
                </div>
            </div>
        </LayoutHome>
    );
};
export default Home;
