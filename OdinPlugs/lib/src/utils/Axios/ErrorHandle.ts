import { Dictionary } from 'typescript-collections';
export interface IOdinError {
    errorCode: string;
    error: any;
}
export class ErrorHelper {
    Errors: Dictionary<string, IOdinError> = new Dictionary<string, IOdinError>();
    /**
     * 构造函数  添加错误对象数组到 Errors（type is Dictionary<string, OdinError>）中
     * @param  {OdinError[]} errors 错误对象数组，
     */
    constructor(errors: IOdinError[]) {
        for (let index in errors) {
            if (!this.Errors.containsKey(errors[index].errorCode))
                this.Errors.setValue(errors[index].errorCode, errors[index].error);
            else throw 'key已经存在';
        }
    }
    /**
     * 添加错误对象到Errors集合
     * @param  {OdinError} error对象
     */
    SetError(error: IOdinError) {
        if (!this.Errors.containsKey(error.errorCode)) this.Errors.setValue(error.errorCode, error);
        else throw 'key已经存在';
    }
    /**
     * 通过错误编码获取错误对象
     * @param  {string} errorCode 错误编码
     * @returns OdinError 如果错误编码存在返回错误对象，如果不存在返回null
     */
    GetErrorByCode(errorCode: string): IOdinError | null {
        if (!this.Errors.containsKey(errorCode)) this.Errors.getValue(errorCode);
        return null;
    }
}
