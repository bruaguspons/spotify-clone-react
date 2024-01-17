import { getOnePlaylistById, getSongsFromPlaylist } from '@/src/api/playlist';
import Time from '@/src/icons/Time.tsx';
import type { Playlist, Song } from '@/src/api/types/data';
import { usePlayerStore } from '@/src/store/playerStore';
import { useEffect, useState } from 'react';

interface Props {
    id: Playlist['id']
}

const MusicsTable = ({ id }: Props): JSX.Element => {
    const { setCurrentMusic, setIsPlaying } = usePlayerStore((state) => state);

    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        getSongsFromPlaylist(id).then(data => { setSongs(data); }).catch(err => { console.error(err); });
    }, []);

    const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction'
    });

    const handleClick = (e: React.MouseEvent<HTMLTableRowElement>, songId: Song['id']): void => {
        console.log('hizo clicks');
        e.preventDefault();
        getOnePlaylistById(id)
            .then((playlist) => {
                console.log('playlists: ', playlist);
                console.log('songs: ', songs);

                if (songs.length > 0) {
                    setCurrentMusic({
                        playlist,
                        song: songs.find(song => song.id === songId) ?? songs[0],
                        songs
                    });
                    setIsPlaying(true);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/50">
            <thead>
                <tr className="text-zinc-300 text-sm">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Albun</th>
                    <th className="px-4 py-2"><Time /></th>
                </tr>
            </thead>
            <tbody>
                {
                    songs.map((song, index) => (
                        <tr key={song.id}
                            className="text-zinc-300 text-sm cursor-pointer hover:bg-zinc-800/20"
                            onClick={(e) => { handleClick(e, song.id); }}
                        >
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2 flex gap-3">
                                <picture>
                                    <img
                                        src={song.image}
                                        alt={song.title}
                                        className="w-10 h-10 rounded-md"
                                    />
                                </picture>
                                <div className="flex flex-col">
                                    <h3>{song.title}</h3>
                                    <span>
                                        {formatter.format(song.artists ?? [])}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-2">{song.album}</td>
                            <td className="px-4 py-2">{song.duration}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};
export default MusicsTable;
