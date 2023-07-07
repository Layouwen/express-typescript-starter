// @ts-ignore
import { Logger } from 'avan-logger';
import path from 'path';
import log4js from 'log4js';

type LoggerInterface = {
  daily: log4js.Logger;
  error: log4js.Logger;
  debug: log4js.Logger;
};

const logPath = path.join(process.cwd(), 'logs');
export const logger: LoggerInterface = new Logger(logPath);

