export class GBPApiError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly url?: string;
  public readonly method?: string;
  public readonly responseBody?: any;

  constructor(
    message: string,
    status: number,
    options?: {
      code?: string;
      url?: string;
      method?: string;
      responseBody?: any;
    }
  ) {
    super(message);
    this.name = 'GBPApiError';
    this.status = status;
    this.code = options?.code;
    this.url = options?.url;
    this.method = options?.method;
    this.responseBody = options?.responseBody;

    // Set prototype explicitly for built-in Error subclassing in TS
    Object.setPrototypeOf(this, GBPApiError.prototype);
  }
}

export class AuthenticationError extends GBPApiError {
  constructor(message: string, options?: any) {
    super(message, 401, options);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class RateLimitError extends GBPApiError {
  constructor(message: string, options?: any) {
    super(message, 429, options);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}
