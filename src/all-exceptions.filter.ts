import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type resObject = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const resObject: resObject = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }

        if(exception instanceof HttpException) {
            resObject.statusCode = exception.getStatus();
            resObject.response = exception.getResponse();
        }
        else if(exception instanceof PrismaClientValidationError) {
            resObject.statusCode = 422;
            resObject.response = exception.message.replaceAll(/\n/g, '');
        }
        else {
            resObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            resObject.response = 'Internal Server Error';
        }

        response
            .status(resObject.statusCode)
            .json(resObject);

        this.logger.error(resObject.response, AllExceptionsFilter.name);

        super.catch(exception, host);
    }
}