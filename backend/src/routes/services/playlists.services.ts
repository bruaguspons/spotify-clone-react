import { playlists, allPlaylists } from '@/lib/data';
import { type Playlist } from '@/lib/data.d';
import { prisma } from '@/utils';
import { type Request, type Response } from 'express';

const getAllPlaylists = (_req: Request, res: Response): void => {
    res.send(playlists);
};

const getFullAllPlaylist = (_req: Request, res: Response): void => {
    res.send(allPlaylists);
};

const getOnePlaylistById = (req: Request, res: Response): void => {
    const id: Playlist['id'] = req.params.id;
    res.send(playlists.find(playlist => playlist.id === id));
};

const getAllUserplaylists = (req: Request, res: Response): void => {
    (async () => {
        const userToken = req.user;
        if (userToken === undefined) {
            res.sendStatus(401);
            return;
        }
        const userUuid = userToken.uuid;

        const playListsUser = await prisma.userPlaylist.findMany({ where: { userUuid } });
        const playlist = await prisma.playlist.findMany({
            where: {
                id: {
                    in: playListsUser.map(playListUser => playListUser.playlistId)
                }
            }
        });
        res.send(playlist);
    })()
        .catch(err => { console.error(err); });
};

export default { getAllPlaylists, getFullAllPlaylist, getOnePlaylistById, getAllUserplaylists };
