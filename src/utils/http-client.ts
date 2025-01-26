import Axios, {type AxiosInstance, type AxiosRequestConfig} from "axios";
import {App} from "@/constants/app.constants.ts";
import type {Result} from "@/utils/result.ts";

type UnwrapResult<T> =
  T extends Result<infer U> ? Result<U> : Result<T>

export class HttpClient {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: typeof window === "undefined" ? App.BASE_URL : "",
      adapter: "fetch",
    })

    this.axios.interceptors.response.use(res => {
      if (res.data.$) {
        // @ts-ignore
        res.$ = res.data.$

        // @ts-ignore
        res.code = res.data.code || res.status

        // @ts-ignore
        res.msg = res.data.msg
      } else if (res.data) {
        // @ts-ignore
        res.$ = res.data
        // @ts-ignore
        res.code = res.status
        // @ts-ignore
        res.msg = res.statusText
      }
      return Promise.resolve(res)
    })
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<UnwrapResult<T>> {
    return this.axios.request({
      ...config,
      method: "get",
      url,
    })
  }

  async post<T = any>(url: string, config?: AxiosRequestConfig): Promise<UnwrapResult<T>> {
    return this.axios.request({
      ...config,
      method: "post",
      data: config?.data,
      url,
    })
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<UnwrapResult<T>> {
    return this.axios.request({
      ...config,
      method: "delete",
      url,
    })
  }
}

export const httpClient = new HttpClient()
