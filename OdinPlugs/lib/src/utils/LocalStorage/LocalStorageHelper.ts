import * as dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc'); // dependent on utc plugin
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
export class LocalStorageHelper {
    /**
     * localStorage key 是否存在 如果存在 返回 true 否则返回 false
     * @param {String} 	key 键
     * return boolean 是否存在
     */
    static hashKey(key: string): boolean {
        return localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== null;
    }

    /**
     * set 存储方法
     * @param {String} 	key 键
     * @param {object} 	value 值，
     * @param {String} 	expired 过期时间，以分钟为单位，非必须
     * return void
     */
    static set(key: string, value: any, expired: number): void {
        const dt = dayjs().add(8, 'hour').add(expired, 'minute');
        let jsonVal = {
            value: value,
            expired: dt,
        };
        const str = JSON.stringify(jsonVal);
        localStorage.setItem(key, str);
    }

    /**
     * get 按照key关键字获取localstorage里的信息
     * @param {String} 	key-键
     * @param {String} 	expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
     * @returns Object 获取到的对象，可能是undefind
     */
    static get(key: string): any | undefined {
        if (this.hashKey(key)) {
            let obj = JSON.parse(localStorage.getItem(key)!);
            let expiredDate = dayjs(obj['expired']).unix();
            let dt = dayjs().add(8, 'hour').unix();
            if (expiredDate > dt) {
                return obj['value'];
            } else {
                localStorage.removeItem(key);
                return;
            }
        }
        return undefined;
    }

    /**
     * remove 删除方法
     * @param {String} 	key 键
     * return void
     */
    static remove(key: string): void {
        localStorage.removeItem(key);
    }
}
