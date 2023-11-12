// Modile Imports
// import type { NextFunction, Request, Response} from 'express';
import type { RequestHandler } from 'express';

export const requestLogger: RequestHandler = (req, _res, next): void => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('---');
    next();
};
