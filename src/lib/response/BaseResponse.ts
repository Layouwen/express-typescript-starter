export interface BaseResponseOptions {
  code: number;
  message: string;
  data?: Record<string, any>;
}

export class BaseResponse {
  public code: number;
  public message: string;
  public data?: Record<string, any>;

  constructor({ code, message, data }: BaseResponseOptions) {
    this.code = code;
    this.message = message;

    if (data) {
      this.data = data;
    }
  }
}
