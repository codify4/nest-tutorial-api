import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Im inside validate user middleware');

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(403).send({ error: 'No authorization header provided' });
        }

        if(authorization === '123') {
            next();
        }
        else {
            return res.status(403).send({ error: 'Invalid Authentication Token' });
        }
    }
}