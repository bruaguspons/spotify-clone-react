import { logout } from '@/src/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (): JSX.Element => {
    const navigate = useNavigate();
    useEffect(() => {
        logout().then(() => {}).catch((err) => { console.error(err); });
        navigate('/');
    }, []);

    return (
        <></>
    );
};
export default Logout;
