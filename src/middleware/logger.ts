import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, query, body, headers, ip } = req;
  logger.daily.info(method, url, query, body, headers['user-agent'], headers.host, ip);
  next();
};
