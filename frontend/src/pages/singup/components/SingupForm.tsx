import { singup } from '@/src/api';
import { useUserStore } from '@/src/store/userStore';

import { SingupSteps, useSingupContext } from '../context/singup.context';
import SingupEmail from './SingupEmail';
import SingupData from './SingupData';
import SingupPassword from './SingupPassword';
import SliderSingup from './slider/SliderSingup';
import FadeInOut from '../../../animations/FadeInOut';

// import { Fade } from 'react-awesome-reveal';

function SingupForm(): JSX.Element {
    const { setUser } = useUserStore(state => state);
    const { singupContextValue, setSingupContextValue } = useSingupContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (
            singupContextValue.email === '' ||
            singupContextValue.password === ''
        ) return;

        const formData = new FormData();
        formData.append('login', singupContextValue.email);
        formData.append('password', singupContextValue.password);
        formData.append('name', singupContextValue.name);
        formData.append('lastName', singupContextValue.lastName);

        singup(formData).then(data => {
            setUser(data);
            window.location.href = '/';
        }).catch(err => { console.error(err); setSingupContextValue({ ...singupContextValue, error: 'Ha ocurrido un error, vuelva a intentarlo.' }); });
    };

    const handleTransitionEndPrev = (prevStep: SingupSteps, currentStep: SingupSteps): void => {
        const isCompleteNew = singupContextValue.isComplete;
        isCompleteNew[currentStep] = false;
        isCompleteNew[prevStep] = false;
        setSingupContextValue({ ...singupContextValue, isComplete: isCompleteNew, prev: false });
    };
    const handleTransitionEndNext = (step: SingupSteps): void => {
        setSingupContextValue({ ...singupContextValue, currentStep: step, prev: false });
    };

    return (
        <div className='w-1/2 flex flex-col'>
            <SliderSingup />
            <form className="" onSubmit={handleSubmit}>
                <FadeInOut
                    show={singupContextValue.currentStep === SingupSteps.Email && !singupContextValue.isComplete.email}
                    duration={500}
                    onExited={() => {
                        if (!singupContextValue.prev) {
                            if (singupContextValue.currentStep === SingupSteps.Email) handleTransitionEndNext(SingupSteps.Password);
                        }
                    }}
                >
                    <SingupEmail />
                </FadeInOut>
                <FadeInOut
                    show={singupContextValue.currentStep === SingupSteps.Password && !singupContextValue.isComplete.password}
                    duration={500}
                    onExited={() => {
                        if (singupContextValue.prev) {
                            handleTransitionEndPrev(SingupSteps.Email, SingupSteps.Password);
                        } else {
                            if (singupContextValue.currentStep === SingupSteps.Password) handleTransitionEndNext(SingupSteps.Data);
                        }
                    }
                    }
                >
                    <SingupPassword />
                </FadeInOut>
                <FadeInOut
                    show={singupContextValue.currentStep === SingupSteps.Data}
                    duration={500}
                    onExited={() => {
                        if (singupContextValue.prev) {
                            handleTransitionEndPrev(SingupSteps.Data, SingupSteps.Password);
                        }
                    }}
                >
                    <SingupData />
                </FadeInOut>
                {singupContextValue.currentStep === SingupSteps.Data &&

                    <button
                        type='submit'
                        className="bg-green-400 rounded-full w-full py-4 my-4 font-bold text-lg transition duration-300 hover:scale-105"
                    >
                Sing up
                    </button>
                }
            </form>

            <FadeInOut
                show={singupContextValue.error !== ''}
                duration={500}
            >
                <span className='font-semibold text-red-600'>{singupContextValue.error}</span>
            </FadeInOut>

            <span className="font-semibold text-zinc-300">Already have an account? <a
                className="text-white font-semibold underline hover:text-green-400"
                href="login">Log in here.</a>
            </span>
        </div>
    );
}
export default SingupForm;
