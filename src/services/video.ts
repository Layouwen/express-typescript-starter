import { ErrorResponse } from '../lib';

class VideoService {
  getStream() {
    return 'video stream';
  }

  postStream() {
    return this.postSteamThrowError();
  }

  postSteamThrowError() {
    if (Math.random() > 0.5) {
      throw new ErrorResponse({ message: 'post stream error' });
    }

    return 'post stream';
  }
}

export const videoService = new VideoService();
