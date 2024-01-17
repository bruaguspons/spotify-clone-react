import HomeIcon from '@/src/icons/HomeIcon';
import LibraryIcon from '@/src/icons/LibraryIcon';
import SearchIcon from '@/src/icons/SearchIcon';
import PlayListsUser from './PlayListsUser';
import AsideMenuItem from '../aside/AsideMenuItem';

const AsideMenu = (): JSX.Element => {
    return (
        <nav className="flex flex-col flex-1 gap-2">
            <div className="bg-zinc-900 rounded-lg p-2">
                <ul>
                    <AsideMenuItem cursor="pointer" href="/">
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
