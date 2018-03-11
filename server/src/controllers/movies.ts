import { Request, Response, NextFunction } from 'express';
import procedures from '../procedures/movies';

function readFromApi(req: Request, res: Response, next: NextFunction) {
    res.promise = procedures.readFromApi(req.params.id)
        .then((movie) => {
            return movie;
        });
    
    next();
}

export default {
    readFromApi
};