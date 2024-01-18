import { parserNumToTime } from '@/src/utils';
import { Slider } from './Slider';
import { useEffect, useState } from 'react';

interface Props {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>
}

function SongControl({ audioRef }: Props): JSX.Element {
    const [currentTime, setCurrentTime] = useState(0);

    const handleTimeUpdate = (): void => {
        setCurrentTime(audioRef.current?.currentTime ?? 0);
    };

    useEffect(() => {
        audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const duration = audioRef.current?.duration ?? 0;

    return (
        <div className="flex gap-x-4">
            <span className="text-xs opacity-50 w-14 text-right">{parserNumToTime(currentTime)}</span>

            <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={audioRef.current?.duration ?? 0}
                min={0}
                className="w-96"
                onValueChange={([value]) => {
                    if (audioRef?.current !== null) audioRef.current.currentTime = value;
                }}
            />

            <span className="text-xs opacity-50 w-14">{parserNumToTime(duration)}</span>
        </div>
    );
}
export default SongControl;
