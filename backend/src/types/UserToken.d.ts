import { type User } from './user.d';

export interface UserToken {
    uuid: User['uuid']
    email: User['email']
}
