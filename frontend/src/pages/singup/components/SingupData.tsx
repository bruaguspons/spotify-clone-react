import { useState } from 'react';
import { useSingupContext } from '../context/singup.context';

function SingupData(): JSX.Element {
    const { singupContextValue, setSingupContextValue } = useSingupContext();
    const [nameValue, setNameValue] = useState<string>(singupContextValue.name ?? '');
    const [lastNameValue, setLastNameValue] = useState<string>(singupContextValue.lastName ?? '');

    return (

        <>
            <div className="w-full flex flex-col mb-8 py-2 gap-2">
                <label
                    htmlFor="name"
                    className="text-white font-semibold text-lg mb-2"
                >
                    Name (optional)
                </label>
                <input
                    type="text"
                    id="name"
                    name='name'
                    placeholder="Name"
                    className="p-3 bg-zinc-800 text-zinc-300 font-semibold text-lg border border-zinc-400 rounded-lg hover:border-zinc-300 focus:border-zinc-200 outline-none focus:border-2 box-content"
                    value={nameValue}
                    onChange={e => { setNameValue(e.target.value); } }
                    onBlur={e => { setSingupContextValue({ ...singupContextValue, name: e.target.value }); }}
                    autoComplete="given-name"
                />
                <label
                    htmlFor="lastName"
                    className="text-white font-semibold text-lg mb-2"
                >
                    Last Name (optional)
                </label>
                <input
                    type="text"
                    id="lastName"
                    name='lastName'
                    placeholder="Last Name"
                    className="p-3 bg-zinc-800 text-zinc-300 font-semibold text-lg border border-zinc-400 rounded-lg hover:border-zinc-300 focus:border-zinc-200 outline-none focus:border-2 box-content"
                    value={lastNameValue}
                    onChange={e => { setLastNameValue(e.target.value); } }
                    onBlur={e => { setSingupContextValue({ ...singupContextValue, lastName: e.target.value }); }}
                    autoComplete="family-name"
                />
            </div>
        </>
    );
}
export default SingupData;
