import Arrow from '@/src/icons/Arrow';
import { isLeftLinkEnabled, isRightLinkEnabled, moveToNextLink, moveToPrevLink } from '@/src/utils/navigationStore';

export enum ArrowOrientation {
    Left = 'left',
    Right = 'right'
}
interface Props {
    orientation: ArrowOrientation
}

const handleClick = (orientation: ArrowOrientation): void => {
    let newLink: string = '';
    if (orientation === ArrowOrientation.Right) {
        newLink = moveToNextLink();
    } else {
        newLink = moveToPrevLink();
    }

    window.location.href = newLink;
};

const ArrowNav = ({ orientation }: Props): JSX.Element => {
    const isEnabled: boolean = (
        (orientation === ArrowOrientation.Right && isRightLinkEnabled()) ||
        (orientation === ArrowOrientation.Left && isLeftLinkEnabled())
    );

    const classBtn = !isEnabled ? 'w-8 bg-zinc-700 rounded-full p-2 text-zinc-400 cursor-not-allowed' : 'w-8 bg-zinc-800 rounded-full p-2 text-zinc-100 cursor-pointer';
    return (
        <button className={classBtn} onClick={() => { handleClick(orientation); }} disabled={!isEnabled}>
            <Arrow right={orientation === ArrowOrientation.Right} />
        </button>
    );
};
export default ArrowNav;
