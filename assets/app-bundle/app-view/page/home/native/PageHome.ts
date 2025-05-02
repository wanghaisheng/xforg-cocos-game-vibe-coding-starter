import { _decorator } from 'cc';
import BaseView from '../../../../../../extensions/app/assets/base/BaseView';
import UIManager from '../../../../../../extensions/app/assets/manager/ui/UIManager';
import { IMiniViewNames } from '../../../../../app-builtin/app-admin/executor';
import { HomeController } from '../../../../../app-builtin/app-controller/HomeController';
const { ccclass, property } = _decorator;

@ccclass('PageHome')
export class PageHome extends BaseView.BindController(HomeController) {
    // 子界面列表，数组顺序为子界面排列顺序
    protected miniViews: IMiniViewNames = [UIManager.MiniViewName.PaperHomeIndex];

    protected beforeShow(next: (error?: string) => void, data?: any) {
        // 加载子界面
        this.showMiniViews({
            views: [UIManager.MiniViewName.PaperHomeIndex],
            onFinish: next
        });
    }

    // 初始化的相关逻辑写在这
    protected onShow() {
        // 只能通过绑定的controller实例监听事件
        this.controller.on(HomeController.Event.Refresh1, (name) => {
            this.warn(`[Refresh1] 收到${name}调用的刷新事件`);
        }, this);
        this.controller.on(HomeController.Event.Refresh2, (name) => {
            this.warn(`[Refresh2] 收到${name}调用的刷新事件`);
        }, this);
    }

    protected onHide(): void {
        // 移除监听事件，防止内存泄漏
        this.controller.targetOff(this);
    }
}