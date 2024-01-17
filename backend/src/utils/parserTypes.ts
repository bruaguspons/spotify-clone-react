import { type UserLogin, type User } from '../types';

export const parserUserToUserLogin = (user: User): UserLogin => {
    const { uuid, email, name, lastName } = user;

    return { uuid, email, name, lastName };
};
