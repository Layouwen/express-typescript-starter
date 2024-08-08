import pkg from '../../package.json';
import { Logger } from '@avanlan/logger';

export const logger = new Logger({
  projectName: pkg.name,
});
