import { expressHttpLogger } from '@avanlan/logger';
import { logger } from '../utils';

export const loggerMiddleware = expressHttpLogger(logger);
