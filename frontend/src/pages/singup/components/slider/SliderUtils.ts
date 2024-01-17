import { SingupSteps } from '../../context/singup.context';

const SingupStepsByIndex = Object.fromEntries(Object.entries(SingupSteps)
    .map((value, ind) => [ind, value[1]]));

export const numberToSingupSteps = (ind: number): SingupSteps => {
    return SingupStepsByIndex[ind];
};
export const SingupStepValueToNumber = (value: SingupSteps): number => {
    const keys = Object.keys(SingupStepsByIndex);
    for (const key of keys) {
        if (SingupStepsByIndex[key] === value) {
            return Number(key);
        }
    }
    return 0;
};
