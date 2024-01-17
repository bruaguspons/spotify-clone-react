import type { User } from '@/src/api/types/User';
import { createContext, useContext, useState } from 'react';

export enum SingupSteps {
    Email = 'email',
    Password = 'password',
    Data = 'data'
}

const isComplete = Object.fromEntries(Object.entries(SingupSteps).map(progress => [progress[1], false]));

interface ISingupContext {
    singupContextValue: {
        currentStep: SingupSteps
        isComplete: Record<SingupSteps, boolean>
        prev: boolean
        email: User['email']
        password: string
        name: User['name']
        lastName: User['lastName']
    }
    setSingupContextValue: React.Dispatch<React.SetStateAction<ISingupContext['singupContextValue']>>
}

const SingupContextDefaultValue: ISingupContext['singupContextValue'] = {
    currentStep: SingupSteps.Email,
    isComplete: isComplete as Record<SingupSteps, boolean>,
    prev: false,
    email: '',
    password: '',
    name: '',
    lastName: ''
};

const SingupContext = createContext<ISingupContext | undefined>(undefined);

interface Props {
    children: JSX.Element[] | JSX.Element
}

export const SingupContextProvider = ({ children }: Props): JSX.Element => {
    const [singupContextValue, setSingupContextValue] = useState(SingupContextDefaultValue);
    return (
        <SingupContext.Provider value={{ singupContextValue, setSingupContextValue }}>
            {children}
        </SingupContext.Provider>
    );
};

export const useSingupContext = (): ISingupContext => {
    const context = useContext(SingupContext);
    if (context === undefined) {
        throw new Error('SingupContext must be used within a SingupContextProvider');
    }

    return context;
};
