import express from 'express';
import config from './config';
import { logger } from './utils';
import { initRoute } from './routes';
import { loggerMiddleware } from './middleware';
import bodyParser from 'body-parser';
import cors from 'cors';

!(async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(loggerMiddleware(logger));

  initRoute(app);

  app.listen(config.port, () => {
    logger.daily.info(`Server running on port ${config.port}`);
  });
})();
