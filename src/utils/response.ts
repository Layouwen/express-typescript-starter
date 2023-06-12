type Config = {
  data?: Record<string, any>;
  message: string;
  status: number;
};

class Response {
  data?: Record<string, any>;
  msg: string;
  status: number;
  constructor(config: Config) {
    const { data, message, status } = config;
    if (data) {
      this.data = data;
    }
    this.msg = message;
    this.status = status;
  }
}

class SuccessResponse extends Response {
  constructor({ data, status = 200, message = '成功' } = {} as Partial<Config>) {
    super({ data, status, message });
  }
}

class ErrorResponse extends Response {
  constructor({ data, status = 400, message = '失败' } = {} as Partial<Config>) {
    super({ data, status, message });
  }
}

export { Response, SuccessResponse, ErrorResponse };
