import './layout.css';
import AsideMenu from './components/aside/AsideMenu';
import Player from './components/player/Player';

interface Props {
    children: JSX.Element | JSX.Element[]
}

const LayoutHome = ({ children }: Props): JSX.Element => {
    return (
        <div id="layout" className="relative h-screen p-2 gap-2">
            <aside className="[grid-area:aside] flex flex-col overflow-y-auto">
                <AsideMenu />
            </aside>
            <main
                className="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto"
            >
                {children}
            </main>
            <footer className="[grid-area:player] flex overflow-x-auto">
                <Player
                    // transition:name="media-player"
                    // transition:persists
                />
            </footer>
        </div>
    );
};
export default LayoutHome;
