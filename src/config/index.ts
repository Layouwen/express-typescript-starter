import dotenv from 'dotenv';
import pkg from '../../package.json';

dotenv.config();

export default {
  port: process.env.PORT || 8033,
  mqtt: {
    url: process.env.MQTT_URL || 'ws://localhost:1883',
    opts: {
      protocolVersion: 5 as const,
      clientId: pkg.name,
      username: process.env.MQTT_OPTS_USERNAME,
      password: process.env.MQTT_OPTS_PASSWORD,
      clean: false,
    },
  },
};
