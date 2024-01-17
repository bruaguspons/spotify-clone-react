import { type Request, type Response, Router } from 'express';
import { getAllSongs, getSongsFromPlaylistId } from './services/songs.services';

const songRouter = Router();

songRouter.get('/', (_req: Request, res: Response): void => {
    res.send(getAllSongs());
});

songRouter.get('/songsFromPlaylist/:id', (req: Request, res: Response): void => {
    res.send(getSongsFromPlaylistId(req.params.id));
});

export default songRouter;
