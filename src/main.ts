import express from 'express';
import config from './config';
import { logger, mqttTopicInfoList } from './utils';
import { initRoute } from './routes';
import { errorHandleMiddleware, loggerMiddleware } from './middleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from '../package.json';
import './init';
import { MqttClient } from './lib';

!(async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(loggerMiddleware);

  initRoute(app);

  app.use(errorHandleMiddleware);

  const mqttClient = new MqttClient({
    brokerUrl: config.mqtt.url,
    opts: config.mqtt.opts,
  });
  mqttClient.connect().then(client => client.onSubscribes(mqttTopicInfoList));

  app.listen(config.port, () => {
    logger.daily.info(`========================================`);
    logger.daily.info(`${pkg.name}`);
    logger.daily.info(`version ${pkg.version}`);
    logger.daily.info(`Server running on port ${config.port}`);
    logger.daily.info(`========================================`);
  });
})();
