import { addOrRemovePlaylist, isFavPlaylist, type Playlist } from '@/src/api';
import Heart from '@/src/icons/Heart';
import { useUserStore } from '@/src/store/userStore';
import { isLogged } from '@/src/utils/isLogged';
import { useEffect, useState } from 'react';

interface Props {
    id: Playlist['id']
}

const CardPlayButtonHeart = ({ id }: Props): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLike, setIsLike] = useState<boolean>(true);
    const { token } = useUserStore(state => state);
    useEffect(() => {
        if (!isLogged()) return;

        isFavPlaylist(token, id)
            .then(data => {
                setIsLike(data);
                setIsLoading(false);
            })
            .catch(err => { console.error(err); });
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        addOrRemovePlaylist(token, id)
            .then(ok => { if (ok) setIsLike(!isLike); })
            .catch(err => { console.error(err); });
    };

    return (
        <>
            {
                !isLoading &&
        (

            <div
                className={'absolute left-5 bottom-5 duration-500 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}
            >
                <button onClick={handleClick} className={`rounded-full p-2 cursor-default bg-zinc-200 p-2 cursor-pointer  ${isLike ? 'text-red-400' : 'text-zinc-400'}`}>
                    <Heart />
                </button>
            </div>
        )
            }
        </>
    );
};
export default CardPlayButtonHeart;
