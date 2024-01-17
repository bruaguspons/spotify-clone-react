import { addLink } from '@/utils/navigationStore';

const SaveLink = (): JSX.Element => {
    addLink(window.location.href);
    return (
        <></>
    );
};
export default SaveLink;
