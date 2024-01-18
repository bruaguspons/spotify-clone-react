import { type Playlist } from '@/src/api';
import CardPlayButtonHeart from './CardPlayButtonHeart';
import CardPlayButton from './CardPlayButton';
import AnimatedLink from '@/src/animations/AnimatedLink';

interface Props {
    playList: Playlist
}
const PlayListItemCard = ({ playList }: Props): JSX.Element => {
    const { artists, cover, id, title } = playList;

    const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction'
    });
    const artistsStr = formatter.format(artists);

    return (
        <article
            className=" relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300"
        >
            <AnimatedLink to={`/playlist/${id}`} className="transition-all duration-300 flex flex-col relative p-2 overflow-hidden items-center gap-2 w-44">
                <picture className="group aspect-square w-full h-auto flex-none relative">
                    <img
                        src={cover}
                        alt={`Cover of ${title} by ${artistsStr}`}
                        className="object-cover w-full h-full rounded-md"
                        style={{ viewTransitionName: `playList-${id}-image` }}
                    />

                    <CardPlayButtonHeart id={id} />
                    <CardPlayButton id={id} />
                </picture>
                <div className="w-full flex flex-auto flex-col line-clamp-1 items-start">
                    <h4
                        className="font-bold"
                        style={{ viewTransitionName: `playlist-${id}-title` }}
                    >
                        {title}
                    </h4>

                    <span
                        className="text-sm text-zinc-400"
                        style={{ viewTransitionName: `playlist-${id}-artists` }}
                    >
                        {artistsStr}
                    </span>
                </div>
            </AnimatedLink>
        </article>
    );
};
export default PlayListItemCard;
