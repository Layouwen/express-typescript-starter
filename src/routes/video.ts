import express from 'express';
import { videoController } from '../controllers';
import { asyncWrapperMiddleware } from '../middleware';

export const videoRouter = express.Router();

videoRouter.get('/stream', asyncWrapperMiddleware(videoController.getStream));
videoRouter.post('/stream', asyncWrapperMiddleware(videoController.postStream));
