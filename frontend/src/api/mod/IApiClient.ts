import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export interface IApiClient {
  get axiosInstance(): AxiosInstance;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig,): Promise<AxiosResponse<T>>
  put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
}
