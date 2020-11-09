import { enumContentType, enumResponseEncoding, enumResponseType } from './ConfigModel';
export interface IOdinProxyAuth {
    username: string;
    password: string;
}
export class OdinProxyAuth implements IOdinProxyAuth {
    username: string;
    password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
export interface IOdinProxy {
    host: string;
    port: number;
    /**
     * 表示 HTTP 基础验证应当用于连接代理，并提供凭据
     */
    auth?: IOdinProxyAuth;
}
/**
 * odinProxy  表示 HTTP 基础验证应当用于连接代理，并提供凭据
 */
export class OdinProxy implements IOdinProxy {
    host: string = '127.0.0.1';
    port: number;
    /**
     * 表示 HTTP 基础验证应当用于连接代理，并提供凭据
     */
    /**
     * 表示 HTTP 基础验证应当用于连接代理，并提供凭据
     */
    auth?: IOdinProxyAuth;
    /**
     * odinProxy  表示 HTTP 基础验证应当用于连接代理，并提供凭据
     * @param  {IOdinProxy} odinProxy 表示 HTTP 基础验证应当用于连接代理，并提供凭据
     */
    constructor(odinProxy: { host?: string; port?: number; auth?: IOdinProxyAuth }) {
        this.host = odinProxy.host ?? '';
        this.port = odinProxy.port ?? 0;
        this.auth = odinProxy.auth;
    }
}
/**
 * Axios配置模型对象接口
 */
export interface IAxiosConfig {
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

export class AxiosConfigModel implements IAxiosConfig {
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
    constructor(axiosConfig?: {
        url: string;
        baseURL: string;
        defaultContentType?: enumContentType;
        timeout?: number;
        withCredentials?: boolean;
        responseType?: enumResponseType;
        responseEncoding?: enumResponseEncoding;
        xsrfCookieName?: string;
        xsrfHeaderName?: string;
        maxContentLength?: number;
        maxRedirects?: number;
        proxy?: IOdinProxy;
    }) {
        this.url = axiosConfig!.url;
        this.baseURL = axiosConfig!.baseURL;
        this.defaultContentType =
            axiosConfig?.defaultContentType ?? enumContentType.applicationJson;
        this.timeout = axiosConfig?.timeout ?? 5000;
        this.withCredentials = axiosConfig?.withCredentials ?? false;
        this.responseType = axiosConfig?.responseType ?? enumResponseType.json;
        this.responseEncoding = axiosConfig?.responseEncoding ?? enumResponseEncoding.utf8;
        this.xsrfCookieName = axiosConfig?.xsrfCookieName ?? 'XSRF-TOKEN';
        this.xsrfHeaderName = axiosConfig?.xsrfHeaderName ?? 'X-XSRF-TOKEN';
        this.maxContentLength = axiosConfig?.maxContentLength ?? 2000;
        this.maxRedirects = axiosConfig?.maxRedirects ?? 5;
        this.proxy = axiosConfig?.proxy ?? false;
    }
}
