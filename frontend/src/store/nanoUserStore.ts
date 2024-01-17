// store/users.ts
import { atom } from 'nanostores';
import { type User } from '@/api/types/User.d';

const emptyUser: User = {
    uuid: '',
    email: '',
    name: '',
    lastName: '',
    token: ''
};
export const $user = atom<User>(emptyUser);

export const setUser = (user: User): void => {
    $users.set(...$user.get(), ...user);
};
