// 在http.js中引入axios
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { AxiosConfigModel } from './axiosConfig/AxiosConfig';
/**
 * 请求拦截类型，类型是方法 返回AxiosRequestConfig类型
 * @param  {AxiosRequestConfig} config
 */
export type typeInterceptorsRequest = (config: AxiosRequestConfig) => AxiosRequestConfig;
/**
 * 响应拦截类型，类型是方法 返回AxiosResponse<any> | Promise<AxiosResponse<any>>类型
 * @param  {AxiosResponse<any>} value
 */
export type typeInterceptorResponse = (
    value: AxiosResponse<any>
) => AxiosResponse<any> | Promise<AxiosResponse<any>>;
/**
 * 请求拦截错误类型，类型是方法 返回any
 * @param  {any} error
 */
export type typeInterceptorsRequestError = (error: any) => any;
/**
 * 响应拦截错误类型，类型是方法 返回any
 * @param  {any} error
 */
export type typeInterceptorsResponseError = (error: any) => any;

export class AxiosHelper {
    instance: AxiosInstance;
    requestInterceptorsNumber: number | null = null;
    responseInterceptorsNumber: number | null = null;
    /**
     * 构造函数
     * @param  {AxiosConfigModel} axiosConfig 构造配置参数
     */
    constructor(axiosConfig: AxiosConfigModel) {
        this.instance = axios.create({ ...axiosConfig });
        this.instance.defaults.headers.post['Content-Type'] = axiosConfig.defaultContentType;
        this.requestInterceptorsNumber = null;
        this.responseInterceptorsNumber = null;
    }
    /**
     * 设置axios拦截器 参数可选 如果添加对应拦截器 则会有对应的拦截器ID，
     * 请求拦截器requestInterceptorsNumber 响应拦截器responseInterceptorsNumber
     * @param  {{interceptorsRequest?:typeInterceptorsRequest;interceptorsRequestError?:typeInterceptorsRequestError;interceptorResponse?:typeInterceptorResponse;interceptorsResponseError?:typeInterceptorsResponseError;}} interceptors
     * interceptorsRequest 请求拦截器
     * interceptorsRequestError 请求错误拦截器
     * interceptorResponse 响应拦截器
     * interceptorsResponseError 响应错误拦截器
     * @returns void
     */
    setInterceptors(interceptors: {
        interceptorsRequest?: typeInterceptorsRequest;
        interceptorsRequestError?: typeInterceptorsRequestError;
        interceptorResponse?: typeInterceptorResponse;
        interceptorsResponseError?: typeInterceptorsResponseError;
    }): void {
        if (interceptors.interceptorsRequest !== undefined) {
            if (interceptors.interceptorsRequestError !== undefined) {
                this.requestInterceptorsNumber = this.instance.interceptors.request.use(
                    interceptors.interceptorsRequest,
                    interceptors.interceptorsRequestError
                );
            } else {
                this.requestInterceptorsNumber = this.instance.interceptors.request.use(
                    interceptors.interceptorsRequest
                );
            }
        }
        if (interceptors.interceptorResponse !== undefined) {
            if (interceptors.interceptorsResponseError !== undefined) {
                this.responseInterceptorsNumber = this.instance.interceptors.response.use(
                    interceptors.interceptorResponse,
                    interceptors.interceptorsResponseError
                );
            } else {
                this.responseInterceptorsNumber = this.instance.interceptors.response.use(
                    interceptors.interceptorResponse
                );
            }
        }
    }
    /**
     * 移除拦截器 可选参数 true移除拦截器
     * @param  {{_requestInterceptors?:boolean;_responseInterceptors?:boolean;}} interceptorsNumber
     * _requestInterceptors   是否移除请求拦截器 true 移除
     * _responseInterceptors  是否移除响应拦截器 true 移除
     * @returns void
     */
    removeInterceptors(interceptorsNumber: {
        requestInterceptors?: boolean;
        responseInterceptors?: boolean;
    }): void {
        if (
            interceptorsNumber.requestInterceptors !== undefined &&
            interceptorsNumber.requestInterceptors
        ) {
            if (this.requestInterceptorsNumber !== null) {
                this.instance.interceptors.request.eject(this.requestInterceptorsNumber);
                this.requestInterceptorsNumber = null;
            }
        }
        if (
            interceptorsNumber.responseInterceptors !== undefined &&
            interceptorsNumber.responseInterceptors
        ) {
            if (this.responseInterceptorsNumber !== null) {
                this.instance.interceptors.response.eject(this.responseInterceptorsNumber);
                this.responseInterceptorsNumber = null;
            }
        }
    }
}
