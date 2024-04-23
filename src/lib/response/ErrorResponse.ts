import { BaseResponse, BaseResponseOptions } from './BaseResponse';

const defaultErrorResponseOptions = {
  code: 400,
  message: 'error',
};

export class ErrorResponse extends BaseResponse {
  constructor(options: Partial<BaseResponseOptions> = { ...defaultErrorResponseOptions }) {
    const _options = { ...defaultErrorResponseOptions, ...options };
    super(_options);
  }
}
