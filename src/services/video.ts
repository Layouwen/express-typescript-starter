import { ErrorResponse } from '../lib';

class VideoService {
  getStream() {
    return 'video stream';
  }

  postStream() {
    throw new ErrorResponse({ message: 'post stream error' });
  }
}

export const videoService = new VideoService();
