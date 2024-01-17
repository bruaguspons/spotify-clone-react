import LayoutHome from '@/src/layouts/LayoutHome';
import { useParams } from 'react-router-dom';
import Header from '../home/header/Header';
import { getAllPlaylist, type Playlist as PlaylistType } from '@/src/api';
import { useEffect, useState } from 'react';
import MusicsTable from './components/MusicsTable';

const Playlist = (): JSX.Element => {
    const { id } = useParams();

    const [playlistItem, setPlaylistItem] = useState<PlaylistType | null>(null);

    useEffect(() => {
        getAllPlaylist().then(playlists => {
            const playlistData = playlists.find((playlist) => playlist.id === id);
            if (playlistData !== undefined) setPlaylistItem(playlistData);
        }).catch(err => { console.error(err); });
    }, []);

    const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction'
    });
    const artistsStr = formatter.format(playlistItem?.artists ?? []);

    // console.log(playlist?.color);
    const { accent, dark } = playlistItem?.color ?? { accent: '', dark: '' };

    return (
        <LayoutHome >
            <div
                id="playList-container"
                className="relative flex flex-col h-full overflow-x-hidden"
                style={{ backgroundColor: accent }}
            >
                <div className="px-6 pt-10">
                    <Header />
                    <header
                        className="flex items-center gap-8"
                        style={{ backgroundColor: accent }}
                    >
                        <picture className="aspect-square w-52 flex-none">
                            <img
                                src={playlistItem?.cover}
                                alt={`Cover of ${playlistItem?.title} `}
                                className="object-cover w-full h-full rounded-md shadow-lg"
                                style={{ viewTransitionName: `playList-${id}-image` }}
                            />
                        </picture>

                        <div className="flex flex-col justify-between">
                            <h2 className="flex flex-1 items-end">Playlist</h2>
                            <div>
                                <h1
                                    className="text-3xl font-bold block"
                                    style={{ viewTransitionName: `playlist-${playlistItem?.id}-title` }}
                                >
                                    {playlistItem?.title}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-1 items-end">
                            <div className="text-sm text-gray-300 font-normal">
                                <div
                                    style={{ viewTransitionName: `playlist-${playlistItem?.id}-artists` }}
                                >
                                    <span>{artistsStr}</span>
                                </div>
                                <p className="mt-1">
                                    <span className="text-white"></span>
                                </p>
                            </div>
                        </div>
                    </header>
                </div>

                <div
                    className="relative z-10 px-6 pt-10 flex-auto"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${dark}, ${accent})`
                    }}
                >
                    <MusicsTable id={id ?? ''} />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-zinc-900/20 -z-10"
                    >
                    </div>
                </div>
            </div>
        </LayoutHome>
    );
};
export default Playlist;
