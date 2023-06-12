import express, { Application } from 'express';
import { videoRouter } from './video';

const apiRouter = express.Router();
apiRouter.use('/video', videoRouter);

export const initRoute = (app: Application) => {
  app.use('/api', apiRouter);
};
