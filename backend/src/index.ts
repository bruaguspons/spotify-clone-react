import express from 'express';
import playlistRouter from './routes/playlist.routes';
import songRouter from './routes/song.routes';
import usersRouter from './routes/users.routes';
import cors from 'cors';
import { dirname, join } from 'node:path';
import morgan from 'morgan';
import { formMiddleware, prisma } from '@/utils/';

import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

config();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(cookieParser());
app.use(formMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/playlist', playlistRouter);
app.use('/api/song', songRouter);
app.use('/api/users', usersRouter);

// Static files
app.use('/index.html', (_req, res, _next) => {
    res.redirect('/');
});
const frontStaticFiles = join(dirname(dirname(__dirname)), 'frontend/dist');
app.use(express.static(frontStaticFiles));

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
});

server.on('close', () => {
    prisma.$disconnect()
        .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
        });
});
