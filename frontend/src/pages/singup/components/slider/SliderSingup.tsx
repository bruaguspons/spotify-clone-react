import { Slider } from './Slider';
import SliderSteps from './SliderSteps';
import { SingupSteps, useSingupContext } from '../../context/singup.context';
import { SingupStepValueToNumber, numberToSingupSteps } from './SliderUtils';

function SliderSingup(): JSX.Element {
    const { singupContextValue, setSingupContextValue } = useSingupContext();

    const maxValue = Object.keys(SingupSteps).length - 1;

    return (
        <>
            {singupContextValue.currentStep !== SingupSteps.Email &&
            (
                <>
                    <Slider
                        draggable={false}
                        defaultValue={[SingupStepValueToNumber(SingupSteps.Email)]}
                        max={maxValue}
                        min={0}
                        className="w-full"
                        disabled={true}
                        value={[SingupStepValueToNumber(singupContextValue.currentStep)]}
                        onValueChange={(value) => {
                            setSingupContextValue(prev => { prev.currentStep = numberToSingupSteps(value[0]); return prev; });
                        }}
                    />
                    <SliderSteps />
                </>
            )
            }
        </>
    );
}
export default SliderSingup;
