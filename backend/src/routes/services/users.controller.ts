import { prisma, parserUserToUserLogin } from '@/utils';
import { type Request, type Response } from 'express';

import { type UserLoginWithToken, type UserToken } from '@/types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { type UserPlaylist } from '@prisma/client';

const login = (req: Request, res: Response): void => {
    (async () => {
        try {
            // console.log();
            // Accede a los datos del formulario desde `req.formFields` y `req.formFiles`
            const formData = req.formFields;

            const [login] = formData?.login ?? [''];
            const [password] = formData?.password ?? [''];

            const user = await prisma.users.findUnique({ where: { email: login } });

            const passwordCorrect = user !== null ? await bcrypt.compare(password, user.password) : false;

            if (!passwordCorrect || user === null) {
                res.status(401).json({ error: 'invalid user or password.' });
                return;
            }

            const userToken: UserToken = {
                uuid: user.uuid,
                email: user.email
            };

            const token = jwt.sign(userToken, process.env.SECRET_KEY ?? 'SECRET_KEY');

            const userLogin: UserLoginWithToken = {
                ...parserUserToUserLogin(user), token
            };
            res.cookie('session', token, { maxAge: 24 * 60 * 60 * 1000 });
            res.status(202).json(userLogin);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al hacer login' });
        }
    })().catch(err => { console.error(err); });
};

const singup = (req: Request, res: Response): void => {
    (async () => {
        try {
            const formData = req.formFields;
            const [login] = formData?.login ?? [''];
            const [password] = formData?.password ?? [''];
            const [name] = formData?.name ?? [''];
            const [lastName] = formData?.lastName ?? [''];

            const salt = await bcrypt.genSalt(10);
            const passwordCrypted = await bcrypt.hash(password, salt);

            const user = await prisma.users.create({ data: { email: login, password: passwordCrypted, name, lastName } });

            const userToken: UserToken = {
                uuid: user.uuid,
                email: user.email
            };

            const token = jwt.sign(userToken, process.env.SECRET_KEY ?? 'SECRET_KEY');

            const userLogin: UserLoginWithToken = {
                ...parserUserToUserLogin(user), token
            };
            res.cookie('session', token, { maxAge: 24 * 60 * 60 * 1000 });
            res.status(201).json(userLogin);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    })().catch(err => { console.error(err); });
};

const logout = (_req: Request, res: Response): void => {
    (async () => {
        try {
            res.clearCookie('session');
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al cerrar la session' });
        }
    })().catch(err => { console.error(err); });
};

const existsUserPlaylist = async (userUuid: UserPlaylist['userUuid'], playlistId: UserPlaylist['playlistId']): Promise<boolean> => {
    const userPlaylist = await prisma.userPlaylist.findUnique({ where: { userUuid_playlistId: { userUuid, playlistId } } });

    return userPlaylist !== null;
};

const playlists = (req: Request, res: Response): void => {
    if (req.method === 'POST') {
        (async() => {
            try {
                const formData = req.formFields;
                const [playlistId] = formData?.playlistId ?? '';
                if (playlistId === '') return res.sendStatus(400);

                const userToken = req.user;
                if (userToken === undefined) return res.sendStatus(401);
                const userUuid = userToken.uuid;

                const exists = await existsUserPlaylist(userUuid as string, Number(playlistId));

                if (exists) {
                    await prisma.userPlaylist.delete({
                        where: {
                            userUuid_playlistId: {
                                userUuid,
                                playlistId: Number(playlistId)
                            }
                        }
                    });
                    return res.sendStatus(204);
                }
                await prisma.userPlaylist.create({
                    data: {
                        userUuid,
                        playlistId: Number(playlistId)
                    }
                });
                return res.sendStatus(201);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al asociar al usuario con la playlist' });
            }
        })().catch(err => { console.error(err); });
        return;
    }
    if (req.method === 'GET') {
        (async() => {
            try {
                const { id } = req.query ?? '';
                if (id === '') return res.sendStatus(400);

                const userToken = req.user;
                if (userToken === undefined) return res.sendStatus(401);

                const exists = await existsUserPlaylist(userToken.uuid as string, Number(id));

                return res.status(202).json({ isFavPlaylist: exists });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al obtener las playlists del usuario' });
            }
        })().catch(err => { console.error(err); });
        return;
    }

    res.status(501);
};

export default { login, singup, logout, playlists };
