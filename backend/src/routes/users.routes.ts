import { Router } from 'express';

import usersController from './services/users.controller';
import authenticateToken from '@/utils/authenticateToken';

const userRouter = Router();

userRouter.get('/');

userRouter.post('/login', usersController.login);
userRouter.get('/logout', usersController.logout);
userRouter.post('/singup', usersController.singup);
userRouter.post('/playlists', authenticateToken, usersController.playlists);
userRouter.get('/playlists', authenticateToken, usersController.playlists);
export default userRouter;
