import PlayListsUser from './PlayListsUser';
import AsideMenuItem from '../aside/AsideMenuItem';
import { HomeIcon, LibraryIcon, SearchIcon } from '@/src/icons';

const AsideMenu = (): JSX.Element => {
    return (
        <nav className="flex flex-col flex-1 gap-2">
            <div className="bg-zinc-900 rounded-lg p-2">
                <ul>
                    <AsideMenuItem cursor="pointer" href="/" useAnimatedLink={true}>
                        <HomeIcon /> Menu
                    </AsideMenuItem>
                    <AsideMenuItem cursor="pointer" href="/search">
                        <SearchIcon /> Search
                    </AsideMenuItem>
                </ul>
            </div>
            <div className="bg-zinc-900 rounded-lg p-2 flex-1">
                <ul>
                    <AsideMenuItem>
                        <LibraryIcon /> Tu bibloteca
                    </AsideMenuItem>
                    <PlayListsUser />
                </ul>
            </div>
        </nav>
    );
};
export default AsideMenu;
