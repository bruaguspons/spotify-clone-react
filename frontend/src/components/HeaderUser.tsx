import { isLogged } from '@/utils/isLogged';

const HeaderUser = (): JSX.Element => {
    return (
        <div className='flex gap-4'>
            {
                !isLogged()
                    ? <>
                        <a href='/singup' className='bg-zinc-800 rounded-full w-36 py-4 font-bold text-lg text-center transition duration-300 hover:scale-105'>Singup</a>
                        <a href='/login' className='bg-zinc-50 rounded-full w-36 py-4 font-bold text-lg text-center text-zinc-900 transition duration-300 hover:scale-105'>Login</a>
                    </>
                    : <a href='/logout' className='bg-zinc-50 rounded-full w-36 py-4 font-bold text-lg text-center text-zinc-900 transition duration-300 hover:scale-105'>Logout</a>
            }

        </div>
    );
};
export default HeaderUser;
