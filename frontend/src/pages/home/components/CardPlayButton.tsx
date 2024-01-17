import Pause from '@/src/icons/Pause';
import Play from '@/src/icons/Play';
// import { playlists, type Playlist, songs } from "@/lib/data"
import type { Playlist } from '@/src/api/types/data.d';
import { getOnePlaylistById, getSongsFromPlaylist } from '@/src/api/playlist';

import { usePlayerStore } from '@/src/store/playerStore';

interface Props {
    id: Playlist['id']
}

function CardPlayButton({ id }: Props): JSX.Element {
    const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        console.log('hizo click antes');

        Promise.all([getOnePlaylistById(id), getSongsFromPlaylist(id)])
            .then(([playlist, songsFromPlaylist]) => {
                if (songsFromPlaylist.length > 0) {
                    setCurrentMusic({
                        playlist,
                        song: songsFromPlaylist[0],
                        songs: songsFromPlaylist
                    });
                    setIsPlaying(true);
                }
            })
            .catch(err => { console.error(err); });
    };

    const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

    return (
        <div
            className={`absolute right-5 bottom-5 duration-500 ${!isPlayingPlaylist && 'translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}
        >
            <button onClick={handleClick} className="rounded-full bg-green-500 p-2 cursor-default">
                {isPlayingPlaylist ? <Pause /> : <Play />}
            </button>
        </div>
    );
}
export default CardPlayButton;
