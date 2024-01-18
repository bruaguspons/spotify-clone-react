import { useEffect, useRef } from 'react';
import CurrentSong from './CurrentSong';
import SongControl from './SongControl';
import { Pause, Play } from '@/src/icons';
import VolumeControl from './VolumeControl';
import { usePlayerStore } from '@/src/store/playerStore';

const Player = (): JSX.Element => {
    const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state);

    // auidoRed
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef?.current?.src !== null) {
            if (isPlaying) {
                audioRef?.current?.play().catch(err => { console.error(err); });
            } else {
                audioRef?.current?.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        // console.log(currentMusic)
        if (audioRef?.current !== null && currentMusic !== null) {
            const { playlist, song } = currentMusic;
            audioRef.current.src = `/music/${playlist?.id}/${song?.id.toString().padStart(2, '0')}.mp3`;
            audioRef.current.play().catch(err => { console.error(err); });
            setIsPlaying(true);
        }
    }, [currentMusic]);

    const handleClick = (): void => {
        if (currentMusic !== null) {
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="grid grid-cols-3 w-full px-4 z-50">
            <div className="">
                <CurrentSong image={currentMusic?.song?.image ?? ''} title={currentMusic?.song?.title ?? ''} artists={currentMusic?.song?.artists ?? []}/>
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
};
export default Player;
