import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export interface IApiClient {
  get axiosInstance(): AxiosInstance;
  get<T = any>(url: string, version: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any, D = any>(url: string, version: string, data?: D, config?: AxiosRequestConfig,): Promise<T>
  put<T = any, D = any>(url: string, version: string, data?: D, config?: AxiosRequestConfig): Promise<T>
  delete<T = any>(url: string, version: string, config?: AxiosRequestConfig): Promise<T>
  patch<T = any, D = any>(url: string, version: string, data?: D, config?: AxiosRequestConfig): Promise<T>
}
