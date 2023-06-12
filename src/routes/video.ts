import express from 'express';
import { videoController } from '../controllers';

export const videoRouter = express.Router();

videoRouter.get('/stream', videoController.getStream);
videoRouter.post('/stream', videoController.postStream);
