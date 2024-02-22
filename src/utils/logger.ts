import winston, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { SPLAT } from 'triple-beam';
import { name as PROJECT_NAME } from '../../package.json';

const getTimestampFormat = () =>
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  });

const getErrorsFormat = () => format.errors({ stack: true });

const getPrintfFormat = () =>
  format.printf(({ level, service, timestamp, message, ...rest }) => {
    const parseMessage = (message: any) => {
      return typeof message === 'object' ? JSON.stringify(message) : message;
    };

    let result = `[${timestamp}] [${service}] [${level.toUpperCase()}]: ${parseMessage(message)}`;

    const splat = rest[SPLAT];
    if (splat?.length) {
      splat.forEach((i: any) => {
        result += ` ${parseMessage(i)}`;
      });
    }

    return result;
  });

const getBaseFormat = () => format.combine(getTimestampFormat(), getErrorsFormat(), getPrintfFormat());

export const errorLogger = winston.createLogger({
  level: 'debug',
  defaultMeta: { service: PROJECT_NAME },
  format: getBaseFormat(),
  transports: [
    new DailyRotateFile({
      level: 'debug',
      dirname: 'logs/error',
      filename: 'error.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      // maxSize: '20m',
      // maxFiles: '14d',
    }),
    new transports.Console(),
  ],
});

export const dailyLogger = winston.createLogger({
  level: 'debug',
  defaultMeta: { service: PROJECT_NAME },
  format: getBaseFormat(),
  transports: [
    new DailyRotateFile({
      level: 'debug',
      dirname: 'logs/daily',
      filename: 'daily.%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    }),
    new transports.Console(),
  ],
});

export const debugLogger = winston.createLogger({
  level: 'debug',
  defaultMeta: { service: PROJECT_NAME },
  format: getBaseFormat(),
  transports: [
    new transports.File({
      level: 'debug',
      dirname: 'logs',
      filename: 'debug.log',
    }),
    new transports.Console(),
  ],
});

export const logger = {
  error: errorLogger,
  daily: dailyLogger,
  debug: debugLogger,
};
