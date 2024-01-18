import { Arrow } from '@/src/icons';
import { SingupSteps, useSingupContext } from '../../context/singup.context';
import { SingupStepValueToNumber } from './SliderUtils';

const SliderSteps = (): JSX.Element => {
    const { singupContextValue, setSingupContextValue } = useSingupContext();

    const steps = Object.entries(SingupSteps);
    const totalSteps = steps.length;
    const currentStep = SingupStepValueToNumber(singupContextValue.currentStep);

    const handleClick = (): void => {
        if (singupContextValue.currentStep === SingupSteps.Data) { // Data
            setSingupContextValue({ ...singupContextValue, currentStep: SingupSteps.Password, prev: true });
            return;
        }
        if (singupContextValue.currentStep === SingupSteps.Password) { // password
            setSingupContextValue({ ...singupContextValue, currentStep: SingupSteps.Email, prev: true });
        }
    };

    return (
        <div className='flex items-center'>
            <button onClick={handleClick} className='w-8 text-zinc-400 m-4'>
                <Arrow right={false} />
            </button>
            <div>
                <span className='text-zinc-200'>{`step ${currentStep + 1} of ${totalSteps}`}</span>
                <h3></h3>
            </div>
        </div>
    );
};
export default SliderSteps;
