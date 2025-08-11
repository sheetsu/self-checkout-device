import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { type ApiErrorType } from '@/api/types/api.types';
import ApiError from '@/api/mod/ApiError';
import { keysToCamel } from '@/api/helpers/keysToCamel';
import { keysToSnake } from '@/api/helpers/keysToSnake';
import { IApiClient } from '@/api/mod/IApiClient';
import { parseUrl } from '@/api/helpers/urlParser';

class ApiClient implements IApiClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  public get axiosInstance(): AxiosInstance {
    return this.instance;
  }

  private handleError(error: any): never {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      let type: ApiErrorType = 'unknown';

      if (!error.response || !status) {
        type = 'network';
      } else if (status === 401) {
        type = 'unauthorized';
      } else if (status === 403) {
        type = 'forbidden';
      } else if (status === 422) {
        type = 'validation';
      } else if (status >= 500) {
        type = 'server';
      }

      console.error(`API error [${status}] ${error.config?.url}`, error);

      throw new ApiError(`API error: ${error.message}`, type, status, data);
    } else {
      console.error('Unexpected error in ApiClient', error);
      throw new ApiError('Unexpected error', 'unknown');
    }
  }

  public async get<T = any>(
    url: string,
    version: string = 'v1',
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.instance.get<T>(parseUrl(url, version), config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async post<T = any, D = any>(
    url: string,
    version: string = 'v1',
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.instance.post<T>(parseUrl(url, version), keysToSnake(data), config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async put<T = any, D = any>(
    url: string,
    version: string = 'v1',
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.instance.put<T>(parseUrl(url, version), keysToSnake(data), config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete<T = any>(
    url: string,
    version: string = 'v1',
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.instance.delete<T>(parseUrl(url, version), config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async patch<T = any, D = any>(
    url: string,
    version: string = 'v1',
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.instance.patch<T>(parseUrl(url, version), keysToSnake(data), config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default ApiClient;
