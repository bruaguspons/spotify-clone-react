import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './FadeInOut.css';
interface Props {
    children: JSX.Element | JSX.Element[]
    show: boolean
    duration: number
    onExited?: () => void
}

const FadeInOut = ({ children, show, duration, onExited }: Props): JSX.Element => {
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            in={show}
            nodeRef={nodeRef}
            timeout={duration}
            classNames="input"
            unmountOnExit
            // onEnter={() => setShowButton(false)}
            onExited={() => { if (onExited !== undefined) onExited(); }}
        >
            <div ref={nodeRef}>
                {children}
            </div>
        </CSSTransition>
    );
};
export default FadeInOut;
