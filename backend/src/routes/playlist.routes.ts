import { Router } from 'express';
import playlistController from './services/playlists.services';
import authenticateToken from '@/utils/authenticateToken';

const playlistRouter = Router();

playlistRouter.get('/userplaylists', authenticateToken, playlistController.getAllUserplaylists);
playlistRouter.get('/all', playlistController.getFullAllPlaylist);
playlistRouter.get('/:id', playlistController.getOnePlaylistById);
playlistRouter.get('/', playlistController.getAllPlaylists);

export default playlistRouter;
