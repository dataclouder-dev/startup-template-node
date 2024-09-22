import { HttpException, HttpStatus } from '@nestjs/common';

export interface IAppException {
  error_message?: string;
  explanation?: string;
  path?: string;
  statusCode?: number;
  method?: string;
  obj?: any;
  exception?: any;
}

export class AppException extends HttpException implements IAppException {
  constructor({ error_message, explanation, statusCode, method, obj, exception }: Partial<IAppException>) {
    super(error_message, HttpStatus.INTERNAL_SERVER_ERROR);
    this.error_message = error_message; // Mensaje para mostrar
    this.explanation = explanation; // Explicación del error
    this.statusCode = statusCode;
    this.method = method; // código donde falló
    this.obj = obj; // objeto que se estaba procesando durante el fallo
    this.exception = exception; // Excepcion original.
  }
  path: string;

  public error_message: string = 'Error';
  public explanation: string;
  public statusCode: number;
  public method: string;
  public obj: any;
  public exception: any;

  toJSON() {
    return {
      error_message: this.error_message,
      explanation: this.explanation,
      statusCode: this.statusCode,
      method: this.method,
      obj: this.obj,
      exception: this.exception,
    };
  }
}
