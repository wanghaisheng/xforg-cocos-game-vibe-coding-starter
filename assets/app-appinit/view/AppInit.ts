import { Button, _decorator } from 'cc';
import BaseAppInit from '../../../extensions/app/assets/base/BaseAppInit';
import { app } from '../../app/app';
const { ccclass, property } = _decorator;

@ccclass('AppInit')
export class AppInit extends BaseAppInit {
    @property(Button)
    login: Button;

    /**
    * 获得用户资源总量，这里返回几，就需要用户自行调用几次nextInit
    */
    protected getUserAssetNum(): number {
        return 1;
    }

    protected onUserInit() {
        this.login.node.active = true;
        this.login.node.on(Button.EventType.CLICK, async () => {
            // 登录
            const uuid = app.manager.ui.showLoading();
            await app.store.user.login();
            app.manager.ui.hideLoading(uuid);
            app.manager.ui.showToast('登录成功');
            // 下一步
            this.nextInit();
        });
    }

    onLoad() {
        this.login.node.active = false;
    }

    onFinish() {
        // 执行完成操作
        this.node.destroy();
    }
}