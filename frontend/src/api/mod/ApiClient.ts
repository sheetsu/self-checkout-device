import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { type ApiErrorType } from '@/api/types/api.types';
import ApiError from '@/api/mod/ApiError';
import { keysToCamel } from '@/api/helpers/keysToCamel';

class ApiClient {
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
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.instance.get<T>(url, config);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.instance.patch<T>(url, data, config);
      return keysToCamel(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default ApiClient;
