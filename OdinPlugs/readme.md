# odinplugs

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
TODO: Put more badges here.

the module is utils.contain axios and localstorage.
Other updates will follow
[中文说明](https://github.com/odinsam/ts-node-odinplugs/blob/main/OdinPlugs/readme-zhcn.md)

## Table of Contents

- [odinplugs](#odinplugs)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
  - [Maintainers](#maintainers)
  - [Contributing](#contributing)
  - [License](#license)

## Install

```
npm i odinplugs -g
or
npm i odinplugs --save-dev
```

## Usage

LocalStorageHelper 示例:

```
import { LocalStorageHelper } from 'odinplugs/dist/LocalStorage/LocalStorageHelper';
```

从 localstorage 里取值，如果过期会自动移除

```
LocalStorageHelper.get(key)
```

向 localstorage 里赋值，expired 为过期时间

```
LocalStorageHelper.set(key,value,expired)
```

移除 localstorage 的键值对

```
LocalStorageHelper.remove(key)
```

axios 示例

```
export class MyAxios {
    // 请求拦截器标识
    static requestInterceptorsNumber: number | null = null;
    // 响应拦截器标识
    static responseInterceptorsNumber: number | null = null;
    static GetInstance(configModel: AxiosConfigModel): AxiosHelper {
        const axiosHelper = new AxiosHelper(configModel);
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

//移除请求拦截器和响应拦截器
axiosHelper.removeInterceptors({
    requestInterceptors: true,
    responseInterceptors: true,
});
```

create api config file

```
import { axiosHelper } from '../../infrastructure/utils/myAxios/MyAxios';

export const DemoApi = {
    GetTodo() {
        return axiosHelper.instance.get('/todo');
    },
};
```

use api

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

## Maintainers

[@https://github.com/odinsam/ts-node-odinplugs.git](https://github.com/https://github.com/odinsam/ts-node-odinplugs.git)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2020 odinsam
