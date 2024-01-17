import { useRef, useState } from 'react';
import { Slider } from '../../../components/Slider';
import Volume0 from '@/src/icons/Volume0';
import Volume1 from '@/src/icons/Volume1';
import Volume2 from '@/src/icons/Volume2';
import Volume3 from '@/src/icons/Volume3';

interface Props {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>
}

function VolumeControl({ audioRef }: Props): JSX.Element {
    const [currentVolume, setCurrentVolume] = useState(1);
    const prevVolumeRef = useRef(currentVolume);
    const volume0 = currentVolume === 0;
    const volume1 = currentVolume > 0 && currentVolume <= 0.33;
    const volume2 = currentVolume > 0.33 && currentVolume <= 0.66;
    const volume3 = currentVolume > 0.66 && currentVolume <= 1;

    const handleClick = (): void => {
        if (currentVolume === 0) {
            setCurrentVolume(prevVolumeRef.current);
            if (audioRef?.current !== null) audioRef.current.volume = prevVolumeRef.current;
        } else {
            prevVolumeRef.current = currentVolume;
            setCurrentVolume(0);
            if (audioRef?.current !== null) audioRef.current.volume = 0;
        }
    };

    return (
        <div className='flex justify-center gap-x-2'>
            <button className="fill-zinc-50 w-5 h-5 opacity-70 hover:opacity-100 transition" onClick={handleClick}>
                {volume0 && <Volume0 />}
                {volume1 && <Volume1 />}
                {volume2 && <Volume2 />}
                {volume3 && <Volume3 />}

            </button>
            <Slider
                defaultValue={[currentVolume * 100]}
                max={100}
                min={0}
                className="w-24"
                value={[currentVolume * 100]}
                onValueChange={(value) => {
                    const [newVolume] = value;
                    setCurrentVolume(newVolume / 100);
                    if (audioRef?.current !== null) audioRef.current.volume = currentVolume;
                }}
            />
        </div>
    );
}
export default VolumeControl;
