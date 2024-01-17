import type { Playlist } from '@/src/api/types/data.d';
interface Props {
    playList: Playlist
}

const SideMenuCard = ({ playList }: Props): JSX.Element => {
    const { artists, cover, id, title } = playList;

    const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction'
    });
    const artistsStr = formatter.format(artists);

    return (
        <a
            href={`/playlist/${id}`}
            className="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800"
        >
            <picture className="h-12 w-12 flex-none">
                <img
                    src={cover}
                    alt={`Cover of ${title} by ${artistsStr}`}
                    className="object-cover w-full h-full rounded-md"
                />
            </picture>
            <div className="flex flex-auto flex-col truncate">
                <h4 className="font-bold">
                    {title}
                </h4>

                <span className="text-sm text-zinc-400">
                    {artistsStr}
                </span>
            </div>
        </a>
    );
};
export default SideMenuCard;
