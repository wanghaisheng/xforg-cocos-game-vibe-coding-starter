import { _decorator, Button } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { app } from '../../../../../app/app';
const { ccclass, property } = _decorator;
@ccclass('PageOver')
export class PageOver extends BaseView {
    @property(Button)
    goto: Button;

    // 子界面列表，数组顺序为子界面排列顺序
    protected miniViews: IMiniViewNames = [];
    // 初始化的相关逻辑写在这
    protected onShow() {
        this.goto.node.on(Button.EventType.CLICK, () => {
            app.manager.ui.show({ name: 'PageHome' });
        });
    }

    protected onHide() {
        this.goto.node.off(Button.EventType.CLICK);
    }
}