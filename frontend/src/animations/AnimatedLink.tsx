import { type CSSProperties } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: JSX.Element | Array<JSX.Element | string>
    to: string
    className?: string
    style?: CSSProperties
}

const AnimatedLink = ({ children, to, className, style }: Props): JSX.Element => {
    const navigate = useNavigate();
    return (
        <a
            href={to}
            onClick={(ev) => {
                ev.preventDefault();
                console.log('hizo click despues');
                document.startViewTransition(() => {
                    flushSync(() => {
                        navigate(to);
                    });
                });
            }}
            className={className}
            style={style}
        >
            {children}
        </a>
    );
};
export default AnimatedLink;
