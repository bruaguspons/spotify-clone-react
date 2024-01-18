import type { User } from '@/src/api/types/User';

const getCookieSession = (): User['token'] => {
    // Separamos las cookies por punto y coma (;)
    const cookies = document.cookie.split('; ');

    // Recorremos las cookies para encontrar la que buscamos
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];

        // Dividimos cada cookie en nombre y valor
        const [name, value] = cookie.split('=');

        // Si encontramos la cookie buscada, devolvemos su valor
        if (name === 'session') {
            return decodeURIComponent(value);
        }
    }

    // Si no encontramos la cookie, devolvemos ''
    return '';
};

export default getCookieSession;
