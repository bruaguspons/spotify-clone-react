import { addOrRemovePlaylist, getAllPlaylistUser, type Playlist } from '@/src/api';
import { Heart } from '@/src/icons';
import { useUserStore } from '@/src/store/userStore';

interface Props {
    id: Playlist['id']
}

const CardPlayButtonHeart = ({ id }: Props): JSX.Element => {
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [isLike, setIsLike] = useState<boolean>(true);

    const { token, favPlaylists, setFavPlaylists } = useUserStore(state => state);

    const isLike = favPlaylists.map(playlist => playlist.id.toString()).includes(id);

    // useEffect(() => {
    //     if (!isLogged()) return;

    //     isFavPlaylist(token, id)
    //         .then(data => {
    //             setIsLike(data);
    //             setIsLoading(false);
    //         })
    //         .catch(err => { console.error(err); });
    // }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        addOrRemovePlaylist(token, id)
            // .then(ok => { if (ok) setIsLike(!isLike); })
            .then(ok => { if (ok) getAllPlaylistUser(token).then(playlists => { setFavPlaylists(playlists); }).catch(err => { console.error(err); }); })
            .catch(err => { console.error(err); });
    };

    return (

        <div
            className={'absolute left-5 bottom-5 duration-500 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}
        >
            <button onClick={handleClick} className={`rounded-full p-2 cursor-default bg-zinc-200 p-2 cursor-pointer  ${isLike ? 'text-red-400' : 'text-zinc-400'}`}>
                <Heart />
            </button>
        </div>

    );
};
export default CardPlayButtonHeart;
