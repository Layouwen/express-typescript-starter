import { NextFunction, Request, Response } from 'express';
import { SuccessResponse, ErrorResponse } from '../lib';
import { videoService } from '../services';

class VideoController {
  async getStream(req: Request, res: Response, next: NextFunction) {
    try {
      const url = videoService.getStream();
      res.json(new SuccessResponse({ data: { url } }));
    } catch (e) {
      next(e);
    }
  }

  async postStream(req: Request, res: Response, next: NextFunction) {
    try {
      const url = videoService.postStream();
      res.json(new ErrorResponse({ data: { url } }));
    } catch (e) {
      next(e);
    }
  }
}

export const videoController = new VideoController();
