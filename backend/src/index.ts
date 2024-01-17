import express, { type NextFunction, type Request, type Response } from 'express';
import playlistRouter from './routes/playlist.routes';
import songRouter from './routes/song.routes';
import usersRouter from './routes/users.routes';
import cors from 'cors';
import { dirname, join } from 'node:path';
import morgan from 'morgan';
import { prisma } from '@/utils/';

import { config } from 'dotenv';

import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import formidable from 'formidable';
config();

const app = express();

declare module 'express-serve-static-core' {
    interface Request {
        formFields?: formidable.Fields
        formFiles?: formidable.Files
    }
}

// Middleware personalizado para manejar formularios y carga de archivos
app.use((req: Request, _res: Response, next: NextFunction): void => {
    const form = formidable({});

    form.parse(req, (err: NodeJS.ErrnoException, fields: formidable.Fields, files: formidable.Files) => {
        if (err !== null) {
            // res.status(500).json({ error: 'Error al procesar el formulario.' });
            next(err);
        } else {
            // Agrega los datos analizados al objeto `req` para que estén disponibles en las rutas posteriores
            req.formFields = fields;
            req.formFiles = files;

            next(); // Llama al siguiente middleware o ruta
        }
    });
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;
// console.log(process.env)

app.use(morgan('dev'));

app.use('/api/playlist', playlistRouter);
app.use('/api/song', songRouter);
app.use('/api/users', usersRouter);

app.use('/index.html', (_req, res, _next) => {
    res.redirect('/');
});
const frontStaticFiles = join(dirname(dirname(__dirname)), 'frontend/dist');
app.use(express.static(frontStaticFiles));

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
