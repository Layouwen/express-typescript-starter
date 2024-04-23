import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';
import { BaseResponse, ErrorResponse } from '../lib';

export const errorHandleMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorResponse = new ErrorResponse();

  res.status(500);

  if (err instanceof BaseResponse) {
    return res.json(err);
  } else if (err instanceof Error) {
    logger.error.error('errorHandle middleware', err.message, err.stack);

    errorResponse.message = err.message;
  } else if (typeof err === 'string') {
    logger.error.error('errorHandle middleware', err);

    errorResponse.message = err;
  }

  res.json(errorResponse);
};
