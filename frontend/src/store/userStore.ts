import { create } from 'zustand';
import { type User } from '@/src/api/types/User.d';

interface UserStore extends User {
    setUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
    uuid: '',
    email: '',
    name: '',
    lastName: '',
    token: '',
    setUser: (user: User) => { set({ ...user }); }
}));
