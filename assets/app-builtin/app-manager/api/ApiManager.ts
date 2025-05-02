import { _decorator } from 'cc';
import BaseManager from '../../../../extensions/app/assets/base/BaseManager';
const { ccclass, property } = _decorator;

interface ILogin {
    errno: number,
    errmsg: string,
    data: {
        token: string,
        username: string
    }
}

/**
 * 接口管理器
 */
@ccclass('ApiManager')
export class ApiManager extends BaseManager {
    /**
     * 登录
     * @returns 
     */
    login() {
        return new Promise<ILogin>((resolve, reject) => {
            // 模拟登录
            setTimeout(() => {
                resolve({
                    errno: 0,
                    errmsg: '',
                    data: {
                        token: '<token>',
                        username: '<username>'
                    }
                });
            }, 3000);
        });
    }
}