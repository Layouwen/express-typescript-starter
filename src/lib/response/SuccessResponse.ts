import { BaseResponse, BaseResponseOptions } from './BaseResponse';

const defaultSuccessResponseOptions = {
  code: 200,
  message: 'success',
};

export class SuccessResponse extends BaseResponse {
  constructor(options: Partial<BaseResponseOptions> = { ...defaultSuccessResponseOptions }) {
    const _options = { ...defaultSuccessResponseOptions, ...options };
    super(_options);
  }
}
