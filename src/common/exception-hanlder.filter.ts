import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AppException as CoreAppException } from '@dataclouder/nest-core';
import { FastifyRequest } from 'fastify';
import { AppException, IAppException } from './app-exception';

@Catch()
export class AllExceptionsHandler implements ExceptionFilter {
  catch(exception: Error | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<FastifyRequest>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof AppException || exception instanceof CoreAppException) {
      status = exception.statusCode ?? status;
      response.status(status).send(typeof exception.toJSON === 'function' ? exception.toJSON() : exception);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      response.status(status).send(exception.getResponse());
    } else if (exception?.errInfo?.details) {
      const error: IAppException = {
        error_message: 'Error de base de datos',
        exception: exception,
        path: request.url,
        explanation: 'probablemente un dato no cumple las validaciones',
      };
      response.status(status).send(error);
    } else {
      console.error('Unhandled Exception', exception);
      response.status(status).send({ err: 'Error de sistema no controlado', path: request.url });
    }
  }
}
