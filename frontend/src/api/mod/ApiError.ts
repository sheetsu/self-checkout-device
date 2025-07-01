import type { ApiErrorType } from '@/api/types/api.types';

class ApiError extends Error {
  public readonly type: ApiErrorType;
  public readonly status?: number;
  public readonly data?: any;

  constructor(
    message: string,
    type: ApiErrorType = 'unknown',
    status?: number,
    data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.data = data;
  }
}

export default ApiError;
