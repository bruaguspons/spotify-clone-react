import SpotifyLogo from '@/src/icons/SpotifyLogo';
import LoginForm from './components/LoginForm';

const Login = (): JSX.Element => {
    return (
        <div className="bg-zinc-800 min-h-screen flex flex-col items-center w-full">
            <header className="w-full h-32 bg-zinc-950 mb-4 flex items-center">
                <div className="h-10 ml-10">
                    <a href="/">
                        <SpotifyLogo />
                    </a>
                </div>
            </header>
            <div className="py-10 pb-20 relative w-full flex justify-center">
                <div
                    className="bg-zinc-950 w-[770px] flex flex-col items-center rounded-lg py-20 z-10"
                >
                    <h1 className="font-extrabold text-white text-5xl mb-20">
                        Log in to Spotify
                    </h1>
                    <LoginForm />
                </div>
                <div
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/80 z-0"
                >
                </div>
            </div>
        </div>
    );
};
export default Login;
