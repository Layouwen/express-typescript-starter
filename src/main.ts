import express from 'express';
import config from './config';
import { logger } from './utils';
import { initRoute } from './routes';
import { loggerMiddleware } from './middleware';
import bodyParser from 'body-parser';

!(async () => {
  const app = express();

  app.use(loggerMiddleware(logger));
  app.use(bodyParser.json());

  initRoute(app);

  app.listen(config.port, () => {
    logger.daily.info(`Server running on port ${config.port}`);
  });
})();
