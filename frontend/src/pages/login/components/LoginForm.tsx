import { login } from '@/src/api';
import { useUserStore } from '@/src/store/userStore';
import { useState } from 'react';
import FadeInOut from '../../../components/animations/FadeInOut';

function LoginForm(): JSX.Element {
    const { setUser } = useUserStore(state => state);
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        login(formData).then(data => {
            setUser(data);
            setError('');
            window.location.href = '/';
        }).catch(err => { console.error(err); setError('Ha ocurrido un error, vuelva a intentarlo.'); });
    };

    return (
        <form className="w-1/2 flex flex-col" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col h-24 mb-8">
                <label
                    htmlFor="login"
                    className="text-white font-semibold text-lg mb-2"
                >
                    Email
                </label>
                <input
                    type="text"
                    id="login"
                    name='login'
                    placeholder="Email"
                    className="p-3 bg-zinc-800 text-zinc-300 font-semibold text-lg border border-zinc-400 rounded-lg hover:border-zinc-300 focus:border-zinc-200 outline-none focus:border-2 box-content"
                />
            </div>
            <div className="w-full flex flex-col h-24 mb-8">
                <label
                    htmlFor="Password"
                    className="text-white font-semibold text-lg mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="Password"
                    name='password'
                    placeholder="Password"
                    className="p-3 bg-zinc-800 text-zinc-300 font-semibold text-lg border border-zinc-400 rounded-lg hover:border-zinc-300 focus:border-zinc-200 outline-none focus:border-2 box-content"
                />
            </div>

            <button
                type='submit'
                className="bg-green-400 rounded-full w-full py-4 my-4 font-bold text-lg transition duration-300 hover:scale-105"
            >
                Login
            </button>

            <FadeInOut
                show={error !== ''}
                duration={500}
            >
                <span className='font-semibold text-red-600'>{error}</span>
            </FadeInOut>

            <span className="font-semibold text-zinc-300">Don&apos;t have an account? <a
                className="text-white font-semibold underline hover:text-green-400"
                href="singup">Sign up for Spotify</a>
            </span>
        </form>
    );
}
export default LoginForm;
