interface Props {
    children: JSX.Element | Array<JSX.Element | string>
    href?: string
    cursor?: string
}

const AsideMenuItem = ({ children, href, cursor }: Props): JSX.Element => {
    return (
        <li>
            {
                href !== undefined && href !== ''
                    ? (
                        <a
                            href={href}
                            className={
                                'flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-300'
                            }
                            style={{ cursor: cursor ?? 'default' }}
                        >
                            {children}
                        </a>
                    )
                    : (
                        <div
                            className={
                                'flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-300'
                            }
                        >
                            {children}
                        </div>
                    )
            }
        </li>
    );
};
export default AsideMenuItem;
