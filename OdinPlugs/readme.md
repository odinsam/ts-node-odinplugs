# odinplugs

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
TODO: Put more badges here.

the module is utils.contain axios and localstorage.
Other updates will follow

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
npm i odinplugs --save-dev
```

## Usage

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
