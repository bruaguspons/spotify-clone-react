import ArrowNav, { ArrowOrientation } from './ArrowNav';
import HeaderUser from './HeaderUser';

const Header = (): JSX.Element => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
                <ArrowNav orientation={ArrowOrientation.Left} />
                <ArrowNav orientation={ArrowOrientation.Right} />
            </div>

            <HeaderUser />
        </div>
    );
};
export default Header;
