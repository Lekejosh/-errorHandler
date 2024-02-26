/* eslint-disable @typescript-eslint/no-unused-vars */
import { response } from '../utils/response';
import { Application, Request, Response, NextFunction } from 'express';

// Define custom error interface
interface CustomError extends Error {
  status?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyValue?: any;
  code?: number;
}

export interface ErrorNames {
  CastError: string;
  JsonWebTokenError: string;
  ValidationError: string;
  SyntaxError: string;
  MongooseError: string;
  MongoError: string;
  TokenExpiredError: string;
  PostgreError: string;
  SQLiteError: string;
  MySQLError: string;
}

const errorNames: ErrorNames = {
  CastError: 'CastError',
  JsonWebTokenError: 'JsonWebTokenError',
  ValidationError: 'ValidationError',
  SyntaxError: 'SyntaxError',
  MongooseError: 'MongooseError',
  MongoError: 'MongoError',
  TokenExpiredError: 'TokenExpiredError',
  PostgreError: 'PostgreError',
  SQLiteError: 'SQLiteError',
  MySQLError: 'MySQLError'
};

export const errorHandler = (app: Application) => {
  app.use('*', (req: Request, res: Response) => {
    res.status(404).send(response('Invalid request', null, false));
  });

  app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.name === 'CustomError') {
      res.status(error.status || 500).send(response(error.message, null, false));
    } else if (error.name === 'MongoError' && error.code === 11000) {
      // Catch duplicate key field error
      const field = Object.entries(error.keyValue)[0][0];
      res.status(400).send(response(`${field} already exists`, null, false));
    } else if (error.name in errorNames) {
      res.status(400).send(response(error.message, null, false));
    } else {
      res.status(500).send(response(error.message, null, false));
    }
  });

  return app;
};
