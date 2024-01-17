import { useRef, useState } from 'react';
import { useSingupContext } from '../context/singup.context';
import PassEyeClose from '@/src/icons/PassEyeClose';
import PassEyeOpen from '@/src/icons/PassEyeOpen';

function SingupPassword(): JSX.Element {
    const { singupContextValue, setSingupContextValue } = useSingupContext();
    const passwordRef = useRef<HTMLInputElement>(null);
    const [passValue, setPassValue] = useState<string>(singupContextValue.password ?? '');

    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        const isCompleteNew = singupContextValue.isComplete;
        isCompleteNew.password = true;
        setSingupContextValue({ ...singupContextValue, isComplete: isCompleteNew, password: passwordRef.current?.value ?? '' });
    };

    const handleClickEye = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsEyeOpen(!isEyeOpen);
    };

    return (
        <>
            <div className="w-full flex flex-col h-24 mb-8">
                <label
                    htmlFor="Password"
                    className="text-white font-semibold text-lg mb-2"
                >
                    Password
                </label>
                <div className='flex items-center relative'>
                    <input
                        ref={passwordRef}
                        type={isEyeOpen ? 'text' : 'password'}
                        id="Password"
                        name='password'
                        placeholder="Password"
                        className="w-full p-3 bg-zinc-800 text-zinc-300 font-semibold text-lg border border-zinc-400 rounded-lg hover:border-zinc-300 focus:border-zinc-200 outline-none focus:border-2 box-content pr-16"
                        value={passValue}
                        onChange={e => { setPassValue(e.target.value); }}
                    />
                    <button className='text-zinc-400 hover:text-zinc-200 absolute right-0 mx-4' onClick={handleClickEye}>{isEyeOpen ? <PassEyeOpen/> : <PassEyeClose/>}</button>
                </div>
            </div>
            <button
                onClick={handleClick}
                type='button'
                className="bg-green-400 rounded-full w-full py-4 my-4 font-bold text-lg transition duration-300 hover:scale-105"
            >
                Next
            </button>
        </>
    );
}
export default SingupPassword;
