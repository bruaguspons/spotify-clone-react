import { useRef, useState } from 'react';
import { useSingupContext } from '../context/singup.context';

function SingupEmail(): JSX.Element {
    const { singupContextValue, setSingupContextValue } = useSingupContext();
    const emailRef = useRef<HTMLInputElement>(null);
    const [emailValue, setEmailValue] = useState<string>(singupContextValue.email ?? '');

    const handleClick = (): void => {
        const isCompleteNew = singupContextValue.isComplete;
        isCompleteNew.email = true;
        setSingupContextValue({ ...singupContextValue, isComplete: isCompleteNew, email: emailRef.current?.value ?? '' });
    };

    return (

        <>
            <h1 className="font-extrabold text-white text-5xl mb-20">
        Sign up to start listening
            </h1>
            <div className="w-full flex flex-col h-24 mb-8">
                <label
                    htmlFor="login"
                    className="text-white font-semibold text-lg mb-2"
                >
                    Email
                </label>
                <input
                    ref={emailRef}
                    type="text"
                    id="login"
                    name='login'
                    placeholder="Email or username"
                    className="p-3 bg-zinc-800 text-zinc-300 font-semibold text-lg border border-zinc-400 rounded-lg hover:border-zinc-300 focus:border-zinc-200 outline-none focus:border-2 box-content"
                    value={emailValue}
                    onChange={e => { setEmailValue(e.target.value); }}
                />
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
export default SingupEmail;
