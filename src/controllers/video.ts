import { Request, Response } from 'express';
import { SuccessResponse, ErrorResponse } from '../utils';
import { videoService } from '../services';

class VideoController {
  async getStream(req: Request, res: Response) {
    const url = videoService.getStream();
    res.json(new SuccessResponse({ data: { url } }));
  }
  async postStream(req: Request, res: Response) {
    const url = videoService.getStream();
    res.json(new ErrorResponse({ data: { url } }));
  }
}

export const videoController = new VideoController();
