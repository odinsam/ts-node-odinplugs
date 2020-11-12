# odinplugs

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
TODO: Put more badges here.

the module is utils.contain axios and localstorage.
Other updates will follow
[readme.md](https://github.com/odinsam/ts-node-odinplugs/blob/main/OdinPlugs/readme.md)

## 包含内容

- [odinplugs](#odinplugs)
  - [包含内容](#包含内容)
  - [安装](#安装)
  - [使用](#使用)
  - [维护 git](#维护-git)
  - [License](#license)

## 安装

```
npm i odinplugs -g
或者
npm i odinplugs --save-dev
```

## 使用

LocalStorageHelper example

```
import { LocalStorageHelper } from 'odinplugs/dist/LocalStorage/LocalStorageHelper';
```

get value by key.if expiredtime timeout,the key-value will be auto remove.

```
LocalStorageHelper.get(key)
```

set value by key.expiredtime is minute

```
LocalStorageHelper.set(key,value,expired)
```

remove key-value by key

```
LocalStorageHelper.remove(key)
```

axios example

```
export class MyAxios {
    static requestInterceptorsNumber: number | null = null;
    static responseInterceptorsNumber: number | null = null;
    static GetInstance(configModel: AxiosConfigModel): AxiosHelper {
        const axiosHelper = new AxiosHelper(configModel);
        //add custome Interceptors
        axiosHelper.setInterceptors({
            interceptorsRequest: config => {
                return config;
            },
            interceptorResponse: data => {
                if (data.status === 200 && data.statusText === 'OK') {
                    return Promise.resolve(data.data);
                } else return Promise.resolve(data);
            },
            interceptorsResponseError: error => {
                return Promise.reject(error);
            },
        });
        this.requestInterceptorsNumber = axiosHelper.requestInterceptorsNumber;
        this.responseInterceptorsNumber = axiosHelper.responseInterceptorsNumber;
        return axiosHelper;
    }
}
export const axiosHelper = MyAxios.GetInstance(
    new AxiosConfigModel({
        url: '',
        baseURL: configs.baseUrl,
        defaultContentType: enumContentType.textHtml,
    })
);

//remove requestInterceptors and responseInterceptors
axiosHelper.removeInterceptors({
    requestInterceptors: true,
    responseInterceptors: true,
});
```

创建 api 接口配置文件

```
import { axiosHelper } from '../../infrastructure/utils/myAxios/MyAxios';

export const DemoApi = {
    GetTodo() {
        return axiosHelper.instance.get('/todo');
    },
};
```

使用 api 接口文件

```
DemoApi.GetTodo()
            .then(data => {
                console.log(data);
                OdinAuthen.authed = true;
                OdinAuthen.authPath = enumPages.Home;
                OdinHistory.Push(OdinAuthen);
            })
            .catch(error => {
                console.log(error);
            });
```

## 维护 git

[@https://github.com/odinsam/ts-node-odinplugs.git](https://github.com/https://github.com/odinsam/ts-node-odinplugs.git)

## License

MIT © 2020 odinsam
