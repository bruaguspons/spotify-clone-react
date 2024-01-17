import { type User as UserPrisma } from '@prisma/client';
export type User = UserPrisma;

export type UserLogin = Omit<User, 'password'>
export type UserLoginWithToken = UserLogin & {
    token: string
};
