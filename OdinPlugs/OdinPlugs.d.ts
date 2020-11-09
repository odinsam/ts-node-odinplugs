import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Dictionary } from 'typescript-collections';
import { AxiosConfigModel, IOdinProxy } from './lib/src/utils/Axios/axiosConfig/AxiosConfig';
import {
    enumContentType,
    enumResponseEncoding,
    enumResponseType,
} from './lib/src/utils/Axios/axiosConfig/ConfigModel';
import { IOdinError } from './lib/src/utils/Axios/errorHandle';

declare module utils {
    module LocalStorage {
        class LocalStorageHelper {
            /**
             * localStorage key 是否存在 如果存在 返回 true 否则返回 false
             * @param {String} 	key 键
             * return boolean 是否存在
             */
            static hashKey(key: string): boolean;
            /**
             * set 存储方法
             * @param {String} 	key 键
             * @param {object} 	value 值，
             * @param {String} 	expired 过期时间，以分钟为单位，非必须
             * return void
             */
            static set(key: string, value: any, expired: number): void;
            /**
             * get 按照key关键字获取localstorage里的信息
             * @param {String} 	key-键
             * @param {String} 	expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
             * @returns Object 获取到的对象，可能是undefind
             */
            static get(key: string): any | undefined;
            /**
             * remove 删除方法
             * @param {String} 	key 键
             * return void
             */
            static remove(key: string): void;
        }
    }
    module Axios {
        module axiosConfig {
            /**
             * Axios配置模型对象接口
             */
            interface IAxiosConfig {
                /**
                 * 请求的服务器 URL  e.g. getUser/:userId
                 */
                url: string;
                /**
                 * 将自动加在 url 前面，除非 url 是一个绝对 URL (不推荐)  e.g. https://some-domain.com/api/v1/
                 */
                baseURL: string;
                /**
                 * 默认的ContentType类型
                 */
                defaultContentType: enumContentType;
                /**
                 * 请求超时的毫秒数(0 表示无超时时间) 如果请求话费了超过 `timeout` 的时间，请求将被中断
                 */
                timeout: number;
                /**
                 * 表示跨域请求时是否需要使用凭证
                 */
                withCredentials: boolean;
                /**
                 * 服务器响应的数据类型
                 */
                responseType: enumResponseType;
                /**
                 * 服务器响应的字符编码
                 */
                responseEncoding: enumResponseEncoding;
                /**
                 * 用作 xsrf token 的值的cookie的名称
                 */
                xsrfCookieName: string;
                /**
                 * the name of the http header that carries the xsrf token value
                 */
                xsrfHeaderName: string;
                /**
                 * 允许的响应内容的最大字节
                 */
                maxContentLength: number;
                /**
                 * node.js 中 follow 的最大重定向数目 如果设置为0，将不会 follow 任何重定向
                 */
                maxRedirects: number;
                /**
                 * 定义代理服务器的主机名称和端口
                 */
                proxy?: IOdinProxy | false;
            }
            /**
             * axios配置模型对象
             */
            class AxiosConfigModel implements IAxiosConfig {
                /**
                 * 请求的服务器 URL  e.g. getUser/:userId
                 */
                url: string;
                /**
                 * 将自动加在 url 前面，除非 url 是一个绝对 URL (不推荐)  e.g. https://some-domain.com/api/v1/
                 */
                baseURL: string;
                /**
                 *【可选参数】
                 * 默认的ContentType类型
                 *【defaultValue: enumContentType.applicationJson 】
                 */
                defaultContentType: enumContentType;
                /**
                 *【可选参数】
                 * 请求超时的毫秒数(0 表示无超时时间) 如果请求话费了超过 `timeout` 的时间，请求将被中断
                 *【defaultValue: 5000 】
                 */
                timeout: number;
                /**
                 *【可选参数】
                 * 表示跨域请求时是否需要使用凭证
                 *【defaultValue: false 】
                 */
                withCredentials: boolean;
                /**
                 *【可选参数】
                 * 服务器响应的数据类型,value type is enumResponseType
                 *【defaultValue: enumResponseType.json 】
                 */
                responseType: enumResponseType;
                /**
                 *【可选参数】
                 * 服务器响应的字符编码
                 *【defaultValue: enumResponseEncoding.utf8 】
                 */
                responseEncoding: enumResponseEncoding;
                /**
                 *【可选参数】
                 * 用作 xsrf token 的值的cookie的名称
                 *【defaultValue: 'XSRF-TOKEN' 】
                 */
                xsrfCookieName: string;
                /**
                 *【可选参数】
                 * the name of the http header that carries the xsrf token value
                 *【defaultValue: 'X-XSRF-TOKEN' 】
                 */
                xsrfHeaderName: string;
                /**
                 *【可选参数】
                 * 允许的响应内容的最大字节
                 *【defaultValue: 2000 】
                 */
                maxContentLength: number;
                /**
                 *【可选参数】
                 * node.js 中 follow 的最大重定向数目 如果设置为0，将不会 follow 任何重定向
                 *【defaultValue: 5 】
                 */
                maxRedirects: number;
                /**
                 *【可选参数】
                 * 定义代理服务器的主机名称和端口
                 *【defaultValue: null 】
                 */
                proxy?: IOdinProxy | false;
            }
            /**
             * 错误码对象接口
             */
        }
        interface OdinError {
            /**
             * 错误码编号
             */
            errorCode: string;
            /**
             * 错误码对象
             */
            error: any;
        }
        /**
         * 错误码操作类
         */
        class ErrorHelper {
            Errors: Dictionary<string, IOdinError>;
            /**
             * 构造函数  添加错误对象数组到 Errors（type is Dictionary<string, OdinError>）中
             * @param  {IOdinError[]} errors 错误对象数组，
             */
            constructor(errors: IOdinError[]);
            /**
             * 添加错误对象到Errors集合
             * @param  {IOdinError} error对象
             */
            SetError(error: IOdinError);

            /**
             * 通过错误编码获取错误对象
             * @param  {string} errorCode 错误编码
             * @returns OdinError 如果错误编码存在返回错误对象，如果不存在返回null
             */
            GetErrorByCode(errorCode: string): IOdinError | null;
        }
        /**
         * 请求拦截类型，类型是方法 返回AxiosRequestConfig类型
         * @param  {AxiosRequestConfig} config
         */
        type typeInterceptorsRequest = (config: AxiosRequestConfig) => AxiosRequestConfig;
        /**
         * 响应拦截类型，类型是方法 返回AxiosResponse<any> | Promise<AxiosResponse<any>>类型
         * @param  {AxiosResponse<any>} value
         */
        type typeInterceptorResponse = (
            value: AxiosResponse<any>
        ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;
        /**
         * 请求拦截错误类型，类型是方法 返回any
         * @param  {any} error
         */
        type typeInterceptorsRequestError = (error: any) => any;
        /**
         * 响应拦截错误类型，类型是方法 返回any
         * @param  {any} error
         */
        type typeInterceptorsResponseError = (error: any) => any;
        class AxiosHelper {
            /**
             * 构造函数
             * @param  {AxiosConfigModel} axiosConfig 构造配置参数
             */
            constructor(axiosConfig: AxiosConfigModel);
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
            }): void;
        }
    }
}
