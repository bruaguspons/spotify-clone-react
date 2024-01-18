import { type NextFunction, type Request, type Response } from 'express';
import formidable from 'formidable';

declare module 'express-serve-static-core' {
    interface Request {
        formFields?: formidable.Fields
        formFiles?: formidable.Files
    }
}

// Middleware personalizado para manejar formularios y carga de archivos
const formMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
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
};

export default formMiddleware;
