import Pause from '@/src/icons/Pause.tsx';
import Play from '@/src/icons/Play.tsx';
// import type { Playlist } from "@/src/lib/data"
import type { Song } from '@/src/api/types/data.d';
import { usePlayerStore } from '@/src/store/playerStore';
import { useRef, useEffect } from 'react';

import VolumeControl from './VolumeControl';
import SongControl from './SongControl';

function Player(): JSX.Element {
    const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    interface iCurrentSong {
        image: Song['image']
        title: Song['title']
        artists: Song['artists']
    }

    const CurrentSong = ({ image, title, artists }: iCurrentSong): JSX.Element => {
        const formatter = new Intl.ListFormat('en', {
            style: 'long',
            type: 'conjunction'
        });
        const artistsStr = formatter.format(artists);

        return (
            <div className="flex items-center gap-5 relative overflow-hidden">
                <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                    {image !== ''
                        ? <img src={image} alt={title} className="w-full h-full" style={{ color: '#ffffff' }} />

                        : <svg xmlns="http://www.w3.org/2000/svg" className='fill-none  p-2' viewBox="0 0 24 24">
                            <path fill="#999999" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5c-.1-.4.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" className='fill-black dark:fill-white'/>
                        </svg>
                    }
                </picture>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-sm block">
                        {title}
                    </h3>
                    <span className="text-xs opacity-80">
                        {artistsStr}
                    </span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (audioRef?.current?.src !== null) {
            // console.log('src: ', audioRef.current.src)
            if (isPlaying) {
                audioRef?.current?.play().catch(err => { console.error(err); });
            } else {
                audioRef?.current?.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        // console.log(currentMusic)
        const { playlist, song } = currentMusic;
        if (audioRef?.current !== null && playlist && song) {
            audioRef.current.src = `/music/${playlist?.id}/${song?.id.toString().padStart(2, '0')}.mp3`;
            audioRef.current.play().catch(err => { console.error(err); });
            // setIsPlaying(true)
        }
    }, [currentMusic]);

    const handleClick = (): void => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="grid grid-cols-3 w-full px-4 z-50">
            <div className="">
                <CurrentSong image={currentMusic.song?.image ?? ''} title={currentMusic.song?.title ?? ''} artists={currentMusic.song?.artists ?? []}/>
            </div>

            <div className="grid place-content-center gap-4 flex-1"
            >
                <div className="flex justify-center flex-col items-center">
                    <button className="bg-white rounded-full p-2" onClick={handleClick}>
                        {
                            isPlaying ? <Pause /> : <Play />
                        }
                    </button>
                    <SongControl audioRef={audioRef} />
                    <audio ref={audioRef} />
                </div>
            </div>
            <div className="flex justify-end items-center">
                <VolumeControl audioRef={audioRef} />
            </div>
        </div>
    );
}
export default Player;
