import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ValidateUserAccountMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('ValidateUserAccountMiddleware');
        const { valid } = req.headers;

        if(valid) {
            next();
        } else {
            res.status(401).send({ error: 'Account is not valid' });
        }
    }
}