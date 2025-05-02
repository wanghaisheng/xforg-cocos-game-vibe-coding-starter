import { IStore } from '../../../extensions/app/assets/base/BaseModel';
import { app } from '../../app/app';
// store中只允许在根路径下定义方法，任何变量在外部访问都是readonly
// store类型的引入是借鉴了Web前端框架中全局状态管理的思路，意图是让数据更安全，更可控。同时框架中还提供了数据绑定的扩展包，可以通过pkg的方式安装，实现「数据->视图」的单向绑定。

export default class User implements IStore<User> {
    token = '';
    username = '';

    async login() {
        const res = await app.manager.api.login();
        this.token = res.data.token;
        this.username = res.data.username;
    }
}